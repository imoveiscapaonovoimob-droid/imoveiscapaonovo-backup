'use server';

import { redirect } from 'next/navigation';
import connectDB from '@/lib/mongodb';
import Property from '@/models/Property';
import { slugify } from '@/lib/utils';
import { revalidatePath } from 'next/cache';
import { resolveImages } from '@/lib/image-sync';

// Remove campos com string vazia que têm enum no schema
function sanitizeEnums(data: any) {
  const clone = { ...data };
  if (!clone.address || clone.address.trim() === '') clone.address = 'A divulgar';
  if (clone.strategicData?.urgency === '') clone.strategicData = { ...clone.strategicData, urgency: undefined };
  if (clone.propertyProfile?.classification === '') clone.propertyProfile = { ...clone.propertyProfile, classification: undefined };
  if (clone.documentation?.status === '') clone.documentation = { ...clone.documentation, status: undefined };
  return clone;
}

/** Monta o subdocumento `broker` (acesso exclusivo do corretor) a partir do formData plano do formulário. */
function buildBrokerField(sanitized: any) {
  return {
    owner: {
      name: sanitized.ownerName || undefined,
      contact: sanitized.ownerContact || undefined,
    },
    agenciador: sanitized.agenciador || undefined,
    correspondingAgent: sanitized.correspondingAgent || undefined,
    matricula: sanitized.matricula || undefined,
    chaves: sanitized.chaves || undefined,
    internalValue: sanitized.internalValue ? Number(sanitized.internalValue) : undefined,
    hasSign: Boolean(sanitized.hasSign),
    negotiationNotes: sanitized.negotiationNotes || undefined,
    strategicData: sanitized.strategicData || {},
    commercialIntelligence: {
      commissionPercentage: sanitized.commercialIntelligence?.commissionPercentage
        ? Number(sanitized.commercialIntelligence.commissionPercentage) : undefined,
      netValueExpected: sanitized.commercialIntelligence?.netValueExpected
        ? Number(sanitized.commercialIntelligence.netValueExpected) : undefined,
      proposalsHistory: sanitized.commercialIntelligence?.proposalsHistory || undefined,
    },
    idealCustomerProfile: sanitized.idealCustomerProfile || undefined,
    documentation: sanitized.documentation || {},
    financialStatus: sanitized.financialStatus?.hasEncumbrance !== undefined
      ? sanitized.financialStatus : undefined,
  };
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
    // Se vierem em base64 (formulário do site) ou como URL externa (sincronização
    // do CRM), `resolveImages` faz o upload/re-hospedagem no Cloudinary.
    const finalImages = await resolveImages(images, 'imoveis-capao-novo');

    const updatedImages = finalImages.length > 0 ? finalImages : existing.images;

    await Property.findByIdAndUpdate(id, {
      title,
      description,
      call,
      price: Number(price),
      category,
      purposes: sanitized.purposes?.length ? sanitized.purposes : ['venda'],
      status: sanitized.status || 'ativo',
      location,
      address,
      addressComplement: sanitized.addressComplement || undefined,
      block: sanitized.block || undefined,
      lot: sanitized.lot || undefined,
      showStreet: sanitized.showStreet ?? true,
      showNumber: sanitized.showNumber ?? true,
      onPromotion: Boolean(sanitized.onPromotion),
      youtubeId,
      instagramUrl,
      link360,
      features: {
        bedrooms:     Number(features?.bedrooms  ?? 0),
        suites:       Number(features?.suites    ?? 0),
        bathrooms:    Number(features?.bathrooms ?? 1),
        restrooms:    Number(features?.restrooms ?? 0),
        livings:      Number(features?.livings ?? 0),
        storageRooms: Number(features?.storageRooms ?? 0),
        furnishedStatus: features?.furnishedStatus || undefined,
        parking:      Number(features?.parking   ?? 0),
        area:         Number(features?.area      ?? 0),
      },
      values: {
        condo: Number(values?.condo ?? 0),
        iptu:  Number(values?.iptu  ?? 0),
      },
      buildingInfo: {
        ...buildingInfo,
        year:         buildingInfo?.year         ? Number(buildingInfo.year)         : undefined,
        floors:       buildingInfo?.floors       ? Number(buildingInfo.floors)       : undefined,
        aptsPerFloor: buildingInfo?.aptsPerFloor ? Number(buildingInfo.aptsPerFloor) : undefined,
        totalApts:    buildingInfo?.totalApts    ? Number(buildingInfo.totalApts)    : undefined,
      },
      condominiumId: sanitized.condominiumId || undefined,
      amenities: amenities || [],
      images: updatedImages,
      isPublished: Boolean(isPublished),
      isFeatured:  Boolean(isFeatured),

      propertyProfile: sanitized.propertyProfile || {},
      advancedLocation: {
        distanceToSea: sanitized.advancedLocation?.distanceToSea
          ? Number(sanitized.advancedLocation.distanceToSea)
          : undefined,
        proximities: sanitized.advancedLocation?.proximities || [],
      },

      // ── Acesso exclusivo do corretor ──────────────────────────────────────
      broker: buildBrokerField(sanitized),

      // ── Características/financeiro (mesmos campos que o cadastro novo já usa) ──
      areas: sanitized.areas?.privateArea || sanitized.areas?.totalArea
        ? sanitized.areas : undefined,
      garageType: sanitized.garageType?.length ? sanitized.garageType : undefined,
      iptuPeriod:         sanitized.iptuPeriod      || 'Anual',
      exclusivity:        Boolean(sanitized.exclusivity),
      paymentMethods:     sanitized.paymentMethods   || [],
      directPaymentTerms: sanitized.directPayment?.minEntry || sanitized.directPayment?.maxMonths
        ? sanitized.directPayment : undefined,
      acceptsExchange:    Boolean(sanitized.acceptsExchange),
      exchange: sanitized.acceptsExchange && (sanitized.exchange?.limitPercent || sanitized.exchange?.assetTypes?.length)
        ? sanitized.exchange : undefined,
    });

    revalidatePath('/admin/dashboard');
    revalidatePath('/');

    return { success: true };
  } catch (error: any) {
    console.error('Error updating property:', error);
    return { success: false, error: error.message || 'Internal Server Error' };
  }
}
