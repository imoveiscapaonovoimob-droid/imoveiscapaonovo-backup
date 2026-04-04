'use server';

import { revalidatePath } from 'next/cache';
import connectDB from '@/lib/mongodb';
import Property from '@/models/Property';
import cloudinary from '@/lib/cloudinary';
import { slugify } from '@/lib/utils';

export async function createProperty(formData: any) {
  try {
    await connectDB();

    const {
      title,
      description,
      call,
      price,
      category,
      location,
      address,
      youtubeId,
      link360,
      features,
      values,
      buildingInfo,
      amenities,
      images,
      isPublished,
      isFeatured,
    } = formData;

    // Basic Validation
    if (!title || !price || !category) {
      return { success: false, error: 'Campos obrigatórios faltando (Título, Preço ou Categoria)' };
    }

    if (!images || images.length === 0) {
      return { success: false, error: 'É necessário pelo menos uma imagem' };
    }

    const slug = `${slugify(title)}-${Math.random().toString(36).substring(2, 7)}`;

    // 1. Upload Images to Cloudinary
    const uploadedImages = [];
    for (const img of images) {
      // img is { data: string (base64/dataurl), isMain: boolean }
      const uploadResponse = await cloudinary.uploader.upload(img.data, {
        folder: 'imoveis-capao-novo',
        resource_type: 'image',
      });

      uploadedImages.push({
        url: uploadResponse.secure_url,
        public_id: uploadResponse.public_id,
        isMain: img.isMain,
      });
    }

    // 2. Create Property in MongoDB
    const newProperty = await Property.create({
      title,
      slug,
      description,
      call,
      price: Number(price),
      category,
      location,
      address,
      youtubeId,
      link360,
      features: {
        bedrooms: Number(features.bedrooms),
        suites: Number(features.suites),
        bathrooms: Number(features.bathrooms),
        parking: Number(features.parking),
        area: Number(features.area),
      },
      values: {
        condo: Number(values.condo),
        iptu: Number(values.iptu),
      },
      buildingInfo: {
        ...buildingInfo,
        year: buildingInfo.year ? Number(buildingInfo.year) : undefined,
        floors: buildingInfo.floors ? Number(buildingInfo.floors) : undefined,
        aptsPerFloor: buildingInfo.aptsPerFloor ? Number(buildingInfo.aptsPerFloor) : undefined,
        totalApts: buildingInfo.totalApts ? Number(buildingInfo.totalApts) : undefined,
        deliveryDate: buildingInfo.deliveryDate ? new Date(buildingInfo.deliveryDate) : undefined,
      },
      amenities,
      images: uploadedImages,
      isPublished: Boolean(isPublished),
      isFeatured: Boolean(isFeatured),
    });

    revalidatePath('/');
    revalidatePath('/imoveis');
    revalidatePath(`/imoveis/${category}`);

    return { success: true, propertyId: newProperty._id.toString() };
  } catch (error: any) {
    console.error('Error creating property:', error);
    return { success: false, error: error.message || 'Internal Server Error' };
  }
}

export async function getAllProperties() {
  try {
    await connectDB();
    const properties = await Property.find({})
      .sort({ createdAt: -1 })
      .select('title price category location isPublished isFeatured images createdAt slug')
      .lean();

    return {
      success: true,
      properties: JSON.parse(JSON.stringify(properties)),
    };
  } catch (error: any) {
    console.error('Error fetching properties:', error);
    return { success: false, error: error.message, properties: [] };
  }
}

export async function deleteProperty(id: string) {
  try {
    await connectDB();

    const property = await Property.findById(id);
    if (!property) return { success: false, error: 'Property not found' };

    // Delete images from Cloudinary first
    if (property.images?.length > 0) {
      await Promise.all(
        property.images.map((img: { public_id: string }) =>
          cloudinary.uploader.destroy(img.public_id)
        )
      );
    }

    await Property.findByIdAndDelete(id);

    revalidatePath('/admin/dashboard');
    revalidatePath('/');

    return { success: true };
  } catch (error: any) {
    console.error('Error deleting property:', error);
    return { success: false, error: error.message || 'Internal Server Error' };
  }
}

export async function getLatestProperties(limit = 8) {
  try {
    await connectDB();
    const properties = await Property.find({ isPublished: true })
      .sort({ createdAt: -1 })
      .limit(limit)
      .select('title slug price location images features category')
      .lean();

    return {
      success: true,
      properties: JSON.parse(JSON.stringify(properties)),
    };
  } catch (error: any) {
    console.error('Error fetching latest properties:', error);
    return { success: false, error: error.message, properties: [] };
  }
}

export async function searchProperties(filters: any) {
  try {
    await connectDB();
    
    const { category, minPrice, maxPrice, location } = filters;
    const query: any = { isPublished: true };

    if (category && category !== 'all') {
      query.category = category;
    }

    if (location && location !== 'all') {
      // Usar regex para busca parcial ou exata ignorando case
      query.location = { $regex: location, $options: 'i' };
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const properties = await Property.find(query)
      .sort({ createdAt: -1 })
      .select('title slug price location images features category')
      .lean();

    return {
      success: true,
      properties: JSON.parse(JSON.stringify(properties)),
    };
  } catch (error: any) {
    console.error('Error searching properties:', error);
    return { success: false, error: error.message, properties: [] };
  }
}


