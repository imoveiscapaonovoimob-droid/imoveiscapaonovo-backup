'use server';

import { revalidatePath } from 'next/cache';
import connectDB from '@/lib/mongodb';
import Condominium from '@/models/Condominium';
import cloudinary from '@/lib/cloudinary';
import { slugify } from '@/lib/utils';
import { resolveImages } from '@/lib/image-sync';

function processImages(images: any[]) {
  return resolveImages(images, 'imoveis-capao-novo/condominios');
}

/** Campos seguros pra qualquer leitura PÚBLICA (nunca inclui `broker`). */
const PUBLIC_CONDOMINIUM_FIELDS = [
  'name', 'slug', 'description', 'disposition', 'location', 'address', 'images',
  'amenities', 'builder', 'adminCompany', 'builtYear', 'totalArea', 'youtubeId', 'link360',
  'isPublished', 'isFeatured', 'isLaunch', 'createdAt', 'updatedAt',
].join(' ');

export async function createCondominium(formData: any) {
  try {
    await connectDB();

    const { name, description, disposition, location, address, images, amenities,
      builder, adminCompany, builtYear, totalArea, youtubeId, link360,
      isPublished, isFeatured, isLaunch, concierge, caretaker } = formData;

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
      youtubeId: youtubeId || undefined,
      link360: link360 || undefined,
      isPublished: Boolean(isPublished),
      isFeatured: Boolean(isFeatured),
      isLaunch: Boolean(isLaunch),
      broker: { concierge: concierge || undefined, caretaker: caretaker || undefined },
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
      builder, adminCompany, builtYear, totalArea, youtubeId, link360,
      isPublished, isFeatured, isLaunch, concierge, caretaker } = formData;

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
      youtubeId: youtubeId || undefined,
      link360: link360 || undefined,
      isPublished: Boolean(isPublished),
      isFeatured: Boolean(isFeatured),
      isLaunch: Boolean(isLaunch),
      broker: { concierge: concierge || undefined, caretaker: caretaker || undefined },
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
      .select(PUBLIC_CONDOMINIUM_FIELDS)
      .lean();
    return { success: true, condominiums: JSON.parse(JSON.stringify(condominiums)) };
  } catch (error: any) {
    console.error('Error fetching published condominiums:', error);
    return { success: false, error: error.message, condominiums: [] };
  }
}

/** Uso exclusivo do /admin (edição) — retorna o documento inteiro, incluindo `broker`. */
export async function getCondominiumById(id: string) {
  try {
    await connectDB();
    const condominium = await Condominium.findById(id).lean();
    if (!condominium) return { success: false, condominium: null };
    return { success: true, condominium: JSON.parse(JSON.stringify(condominium)) };
  } catch (error: any) {
    console.error('Error fetching condominium by id:', error);
    return { success: false, error: error.message, condominium: null };
  }
}

export async function getCondominiumBySlugOrId(idOrSlug: string) {
  try {
    await connectDB();
    const query = idOrSlug.match(/^[0-9a-fA-F]{24}$/)
      ? { _id: idOrSlug }
      : { slug: idOrSlug };

    const condominium = await Condominium.findOne(query).select(PUBLIC_CONDOMINIUM_FIELDS).lean();
    if (!condominium) return { success: false, condominium: null };

    return { success: true, condominium: JSON.parse(JSON.stringify(condominium)) };
  } catch (error: any) {
    console.error('Error fetching condominium by slug/id:', error);
    return { success: false, error: error.message, condominium: null };
  }
}
