'use server';

import { revalidatePath } from 'next/cache';
import connectDB from '@/lib/mongodb';
import Property from '@/models/Property';
import cloudinary from '@/lib/cloudinary';
import { slugify } from '@/lib/utils';

// Remove campos com string vazia que têm enum no schema (Mongoose rejeita '' como valor)
function sanitizeEnums(data: any) {
  const clone = { ...data };

  // address: se vazio, usa string genérica (campo required no schema)
  if (!clone.address || clone.address.trim() === '') {
    clone.address = 'A divulgar';
  }

  // strategicData.urgency
  if (clone.strategicData?.urgency === '') {
    clone.strategicData = { ...clone.strategicData, urgency: undefined };
  }

  // propertyProfile.classification
  if (clone.propertyProfile?.classification === '') {
    clone.propertyProfile = { ...clone.propertyProfile, classification: undefined };
  }

  // documentation.status
  if (clone.documentation?.status === '') {
    clone.documentation = { ...clone.documentation, status: undefined };
  }

  return clone;
}

export async function createProperty(formData: any) {
  try {
    await connectDB();

    const sanitized = sanitizeEnums(formData);
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
    } = sanitized;

    // Basic Validation
    if (!title || !price || !category) {
      return { success: false, error: 'Campos obrigatórios faltando (Título, Preço ou Categoria)' };
    }

    if (!images || images.length === 0) {
      return { success: false, error: 'É necessário pelo menos uma imagem' };
    }

    const slug = `${slugify(title)}-${Math.random().toString(36).substring(2, 7)}`;

    // 1. Process Images
    // Se as imagens já foram enviadas pelo client (API route), usamos as URLs diretamente.
    // Caso contrário (fallback), fazemos o upload aqui (sujeito ao limite de tamanho do Server Action).
    const finalImages = [];
    for (const img of images) {
      if (img.url && img.public_id) {
        finalImages.push({
          url: img.url,
          public_id: img.public_id,
          isMain: img.isMain,
        });
      } else if (img.data) {
        const uploadResponse = await cloudinary.uploader.upload(img.data, {
          folder: 'imoveis-capao-novo',
          resource_type: 'image',
        });

        finalImages.push({
          url: uploadResponse.secure_url,
          public_id: uploadResponse.public_id,
          isMain: img.isMain,
        });
      }
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
        bedrooms:  Number(features.bedrooms),
        suites:    Number(features.suites),
        bathrooms: Number(features.bathrooms),
        parking:   Number(features.parking),
        area:      Number(features.area),
      },
      values: {
        condo: Number(values.condo),
        iptu:  Number(values.iptu),
      },
      buildingInfo: {
        ...buildingInfo,
        year:         buildingInfo.year         ? Number(buildingInfo.year)         : undefined,
        floors:       buildingInfo.floors       ? Number(buildingInfo.floors)       : undefined,
        aptsPerFloor: buildingInfo.aptsPerFloor ? Number(buildingInfo.aptsPerFloor) : undefined,
        totalApts:    buildingInfo.totalApts    ? Number(buildingInfo.totalApts)    : undefined,
        deliveryDate: buildingInfo.deliveryDate ? new Date(buildingInfo.deliveryDate) : undefined,
      },
      amenities,
      images: finalImages,
      isPublished: Boolean(isPublished),
      isFeatured:  Boolean(isFeatured),

      // ── Módulos de inteligência comercial (legado) ────────────────────────
      strategicData:          sanitized.strategicData          || {},
      commercialIntelligence: {
        commissionPercentage: sanitized.commercialIntelligence?.commissionPercentage
          ? Number(sanitized.commercialIntelligence.commissionPercentage) : undefined,
        netValueExpected: sanitized.commercialIntelligence?.netValueExpected
          ? Number(sanitized.commercialIntelligence.netValueExpected) : undefined,
        proposalsHistory: sanitized.commercialIntelligence?.proposalsHistory || undefined,
      },
      propertyProfile:        sanitized.propertyProfile        || {},
      advancedLocation: {
        distanceToSea: sanitized.advancedLocation?.distanceToSea
          ? Number(sanitized.advancedLocation.distanceToSea) : undefined,
        proximities: sanitized.advancedLocation?.proximities || [],
      },
      idealCustomerProfile: sanitized.idealCustomerProfile || undefined,
      documentation:        sanitized.documentation        || {},

      // ── Novos campos UX Step 2: Características ───────────────────────────
      areas: sanitized.areas?.privateArea || sanitized.areas?.totalArea
        ? sanitized.areas : undefined,
      garageType: sanitized.garageType?.length ? sanitized.garageType : undefined,

      // ── Novos campos UX Step 3: Financeiro ───────────────────────────────
      iptuPeriod:         sanitized.iptuPeriod      || 'Anual',
      exclusivity:        Boolean(sanitized.exclusivity),
      paymentMethods:     sanitized.paymentMethods   || [],
      directPaymentTerms: sanitized.directPayment?.minEntry || sanitized.directPayment?.maxMonths
        ? sanitized.directPayment : undefined,
      acceptsExchange:    Boolean(sanitized.acceptsExchange),
      exchange: sanitized.acceptsExchange && (sanitized.exchange?.limitPercent || sanitized.exchange?.assetTypes?.length)
        ? sanitized.exchange : undefined,
      financialStatus: sanitized.financialStatus?.hasEncumbrance !== undefined
        ? sanitized.financialStatus : undefined,
    });

    revalidatePath('/', 'layout');

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

    revalidatePath('/', 'layout');

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
      query.category = { $regex: `^${category}$`, $options: 'i' };
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

export async function getPropertyBySlugOrId(idOrSlug: string) {
  try {
    await connectDB();
    const query = idOrSlug.match(/^[0-9a-fA-F]{24}$/) 
      ? { _id: idOrSlug } 
      : { slug: idOrSlug };
      
    const property = await Property.findOne(query).lean();
    
    if (!property) return { success: false, property: null };
    
    return { 
      success: true, 
      property: JSON.parse(JSON.stringify(property)) 
    };
  } catch (error: any) {
    console.error('Error fetching property by slug/id:', error);
    return { success: false, error: error.message, property: null };
  }
}

