'use server';

import { redirect } from 'next/navigation';
import connectDB from '@/lib/mongodb';
import Property from '@/models/Property';
import cloudinary from '@/lib/cloudinary';
import { slugify } from '@/lib/utils';
import { revalidatePath } from 'next/cache';

// Remove campos com string vazia que têm enum no schema
function sanitizeEnums(data: any) {
  const clone = { ...data };
  if (!clone.address || clone.address.trim() === '') clone.address = 'A divulgar';
  if (clone.strategicData?.urgency === '') clone.strategicData = { ...clone.strategicData, urgency: undefined };
  if (clone.propertyProfile?.classification === '') clone.propertyProfile = { ...clone.propertyProfile, classification: undefined };
  if (clone.documentation?.status === '') clone.documentation = { ...clone.documentation, status: undefined };
  return clone;
}

export async function getPropertyById(id: string) {
  try {
    await connectDB();
    const property = await Property.findById(id).lean();
    if (!property) return { success: false, property: null };
    return { success: true, property: JSON.parse(JSON.stringify(property)) };
  } catch (error: any) {
    return { success: false, property: null, error: error.message };
  }
}

export async function updateProperty(id: string, formData: any) {
  try {
    await connectDB();

    const sanitized = sanitizeEnums(formData);
    const {
      title, description, call, price, category, location,
      address, youtubeId, instagramUrl, link360, features, values, buildingInfo,
      amenities, images, isPublished, isFeatured,
    } = sanitized;

    const existing = await Property.findById(id);
    if (!existing) return { success: false, error: 'Property not found' };

    // 1. Process Images
    // Se as imagens já foram enviadas pelo client (API route), usamos as URLs diretamente.
    // Caso contrário (imagens existentes ou fallback), processamos de acordo.
    const finalImages = [];
    for (const img of images || []) {
      if (img.url && img.public_id) {
        // Já está no Cloudinary (seja nova via client ou existente)
        finalImages.push({
          url: img.url,
          public_id: img.public_id,
          isMain: img.isMain,
        });
      } else if (img.data) {
        // Fallback: Upload síncrono no servidor (sujeito a limites)
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

    const updatedImages = finalImages.length > 0 ? finalImages : existing.images;

    await Property.findByIdAndUpdate(id, {
      title,
      description,
      call,
      price: Number(price),
      category,
      location,
      address,
      youtubeId,
      instagramUrl,
      link360,
      features: {
        bedrooms:  Number(features?.bedrooms  ?? 0),
        suites:    Number(features?.suites    ?? 0),
        bathrooms: Number(features?.bathrooms ?? 1),
        parking:   Number(features?.parking   ?? 0),
        area:      Number(features?.area      ?? 0),
      },
      values: {
        condo: Number(values?.condo ?? 0),
        iptu:  Number(values?.iptu  ?? 0),
      },
      buildingInfo: {
        ...buildingInfo,
        year:   buildingInfo?.year   ? Number(buildingInfo.year)   : undefined,
        floors: buildingInfo?.floors ? Number(buildingInfo.floors) : undefined,
      },
      amenities: amenities || [],
      images: updatedImages,
      isPublished: Boolean(isPublished),
      isFeatured:  Boolean(isFeatured),

      // ── Novos módulos de inteligência comercial ──────────────────────────
      strategicData: sanitized.strategicData || {},
      commercialIntelligence: {
        commissionPercentage: sanitized.commercialIntelligence?.commissionPercentage
          ? Number(sanitized.commercialIntelligence.commissionPercentage)
          : undefined,
        netValueExpected: sanitized.commercialIntelligence?.netValueExpected
          ? Number(sanitized.commercialIntelligence.netValueExpected)
          : undefined,
        proposalsHistory: sanitized.commercialIntelligence?.proposalsHistory || undefined,
      },
      propertyProfile:      sanitized.propertyProfile || {},
      advancedLocation: {
        distanceToSea: sanitized.advancedLocation?.distanceToSea
          ? Number(sanitized.advancedLocation.distanceToSea)
          : undefined,
        proximities: sanitized.advancedLocation?.proximities || [],
      },
      idealCustomerProfile: sanitized.idealCustomerProfile || undefined,
      documentation:        sanitized.documentation || {},
    });

    revalidatePath('/admin/dashboard');
    revalidatePath('/');

    return { success: true };
  } catch (error: any) {
    console.error('Error updating property:', error);
    return { success: false, error: error.message || 'Internal Server Error' };
  }
}
