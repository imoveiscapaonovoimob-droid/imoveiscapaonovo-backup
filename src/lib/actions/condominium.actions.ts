'use server';

import { revalidatePath } from 'next/cache';
import connectDB from '@/lib/mongodb';
import Condominium from '@/models/Condominium';
import cloudinary from '@/lib/cloudinary';
import { slugify } from '@/lib/utils';

async function processImages(images: any[]) {
  const finalImages = [];
  for (const img of images || []) {
    if (img.url && img.public_id) {
      finalImages.push({ url: img.url, public_id: img.public_id, isMain: !!img.isMain });
    } else if (img.data) {
      const uploadResponse = await cloudinary.uploader.upload(img.data, {
        folder: 'imoveis-capao-novo/condominios',
        resource_type: 'image',
      });
      finalImages.push({ url: uploadResponse.secure_url, public_id: uploadResponse.public_id, isMain: !!img.isMain });
    }
  }
  return finalImages;
}

export async function createCondominium(formData: any) {
  try {
    await connectDB();

    const { name, description, disposition, location, address, images, amenities,
      builder, adminCompany, builtYear, totalArea, isPublished, isFeatured } = formData;

    if (!name) {
      return { success: false, error: 'Campo obrigatório faltando (Nome)' };
    }

    const slug = `${slugify(name)}-${Math.random().toString(36).substring(2, 7)}`;
    const finalImages = await processImages(images);

    const newCondominium = await Condominium.create({
      name,
      slug,
      description: description || '',
      disposition: disposition || undefined,
      location: location || 'Capão Novo',
      address: address || 'A divulgar',
      images: finalImages,
      amenities: amenities || [],
      builder: builder || undefined,
      adminCompany: adminCompany || undefined,
      builtYear: builtYear || undefined,
      totalArea: totalArea ? Number(totalArea) : undefined,
      isPublished: Boolean(isPublished),
      isFeatured: Boolean(isFeatured),
    });

    revalidatePath('/', 'layout');

    return { success: true, condominiumId: newCondominium._id.toString() };
  } catch (error: any) {
    console.error('Error creating condominium:', error);
    return { success: false, error: error.message || 'Internal Server Error' };
  }
}

export async function updateCondominium(id: string, formData: any) {
  try {
    await connectDB();

    const existing = await Condominium.findById(id);
    if (!existing) return { success: false, error: 'Condominium not found' };

    const { name, description, disposition, location, address, images, amenities,
      builder, adminCompany, builtYear, totalArea, isPublished, isFeatured } = formData;

    const finalImages = await processImages(images);
    const updatedImages = finalImages.length > 0 ? finalImages : existing.images;

    await Condominium.findByIdAndUpdate(id, {
      name,
      description: description || '',
      disposition: disposition || undefined,
      location: location || 'Capão Novo',
      address: address || 'A divulgar',
      images: updatedImages,
      amenities: amenities || [],
      builder: builder || undefined,
      adminCompany: adminCompany || undefined,
      builtYear: builtYear || undefined,
      totalArea: totalArea ? Number(totalArea) : undefined,
      isPublished: Boolean(isPublished),
      isFeatured: Boolean(isFeatured),
    });

    revalidatePath('/', 'layout');

    return { success: true };
  } catch (error: any) {
    console.error('Error updating condominium:', error);
    return { success: false, error: error.message || 'Internal Server Error' };
  }
}

export async function deleteCondominium(id: string) {
  try {
    await connectDB();

    const condominium = await Condominium.findById(id);
    if (!condominium) return { success: false, error: 'Condominium not found' };

    if (condominium.images?.length > 0) {
      await Promise.all(
        condominium.images.map((img: { public_id: string }) =>
          cloudinary.uploader.destroy(img.public_id).catch(() => {})
        )
      );
    }

    await Condominium.findByIdAndDelete(id);
    revalidatePath('/', 'layout');

    return { success: true };
  } catch (error: any) {
    console.error('Error deleting condominium:', error);
    return { success: false, error: error.message || 'Internal Server Error' };
  }
}

export async function getAllCondominiums() {
  try {
    await connectDB();
    const condominiums = await Condominium.find({})
      .sort({ createdAt: -1 })
      .lean();
    return { success: true, condominiums: JSON.parse(JSON.stringify(condominiums)) };
  } catch (error: any) {
    console.error('Error fetching condominiums:', error);
    return { success: false, error: error.message, condominiums: [] };
  }
}

export async function getPublishedCondominiums() {
  try {
    await connectDB();
    const condominiums = await Condominium.find({ isPublished: true })
      .sort({ createdAt: -1 })
      .lean();
    return { success: true, condominiums: JSON.parse(JSON.stringify(condominiums)) };
  } catch (error: any) {
    console.error('Error fetching published condominiums:', error);
    return { success: false, error: error.message, condominiums: [] };
  }
}

export async function getCondominiumBySlugOrId(idOrSlug: string) {
  try {
    await connectDB();
    const query = idOrSlug.match(/^[0-9a-fA-F]{24}$/)
      ? { _id: idOrSlug }
      : { slug: idOrSlug };

    const condominium = await Condominium.findOne(query).lean();
    if (!condominium) return { success: false, condominium: null };

    return { success: true, condominium: JSON.parse(JSON.stringify(condominium)) };
  } catch (error: any) {
    console.error('Error fetching condominium by slug/id:', error);
    return { success: false, error: error.message, condominium: null };
  }
}
