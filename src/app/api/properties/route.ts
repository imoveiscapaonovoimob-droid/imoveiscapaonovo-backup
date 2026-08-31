import { NextResponse } from 'next/server';
import { createProperty } from '@/lib/actions/property.actions';

/**
 * POST /api/properties
 * Cria um imóvel a partir de uma integração externa (CRM WhatsApp desktop).
 * Autenticado por token compartilhado (não usa a sessão do NextAuth — essa
 * rota é chamada por um processo, não por um humano logado no /admin).
 *
 * Reaproveita createProperty() (mesma validação/slug/gravação do form do
 * admin) — esta rota só normaliza o payload de entrada.
 */
function isAuthorized(request: Request): boolean {
  const token = request.headers.get('x-sync-token');
  const expected = process.env.PROPERTY_SYNC_TOKEN;
  return !!expected && token === expected;
}

/** Garante os objetos aninhados que createProperty()/updateProperty() acessam sem `?.`. */
export function normalizePropertyPayload(body: any) {
  return {
    title: body.title,
    description: body.description || '',
    call: body.call,
    price: Number(body.price) || 0,
    category: body.category,
    location: body.location || 'Capão Novo',
    address: body.address || 'A divulgar',
    youtubeId: body.youtubeId,
    instagramUrl: body.instagramUrl,
    link360: body.link360,
    features: {
      bedrooms: Number(body.features?.bedrooms) || 0,
      suites: Number(body.features?.suites) || 0,
      bathrooms: Number(body.features?.bathrooms) || 0,
      parking: Number(body.features?.parking) || 0,
      area: Number(body.features?.area) || 0,
    },
    values: {
      condo: Number(body.values?.condo) || 0,
      iptu: Number(body.values?.iptu) || 0,
    },
    buildingInfo: body.buildingInfo || {},
    amenities: Array.isArray(body.amenities) ? body.amenities : [],
    // public_id nunca pode ficar vazio (createProperty só aceita a imagem se
    // `img.url && img.public_id` forem truthy) — imagens vindas do CRM não
    // passam pelo Cloudinary, então recebem um id sintético.
    images: Array.isArray(body.images)
      ? body.images.map((img: any, i: number) => ({
          url: img.url,
          public_id: img.public_id || `crm-sync-${Date.now()}-${i}`,
          isMain: !!img.isMain,
        }))
      : [],
    isPublished: !!body.isPublished,
    isFeatured: !!body.isFeatured,
    commercialIntelligence: body.commercialIntelligence || {},
    directPaymentTerms: body.directPaymentTerms
      ? {
          minEntry: body.directPaymentTerms.minEntry,
          maxMonths: body.directPaymentTerms.maxMonths != null
            ? String(body.directPaymentTerms.maxMonths)
            : undefined,
        }
      : undefined,
    acceptsExchange: !!body.acceptsExchange,
    exclusivity: !!body.exclusivity,
  };
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Token de sincronização inválido ou ausente.' }, { status: 401 });
  }
  try {
    const body = await request.json();
    const payload = normalizePropertyPayload(body);

    if (!payload.title || !payload.category) {
      return NextResponse.json({ error: 'Campos obrigatórios faltando (título ou categoria).' }, { status: 400 });
    }

    const result = await createProperty(payload);
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
    return NextResponse.json({ id: result.propertyId });
  } catch (error: any) {
    console.error('[/api/properties POST]', error);
    return NextResponse.json({ error: error.message || 'Erro interno' }, { status: 500 });
  }
}
