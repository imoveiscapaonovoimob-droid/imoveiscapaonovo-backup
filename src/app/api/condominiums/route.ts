import { NextResponse } from 'next/server';
import { createCondominium } from '@/lib/actions/condominium.actions';

/**
 * POST /api/condominiums
 * Cria um condomínio a partir do CRM WhatsApp desktop. Mesmo padrão de auth
 * de /api/properties (token compartilhado, não sessão do NextAuth).
 */
function isAuthorized(request: Request): boolean {
  const token = request.headers.get('x-sync-token');
  const expected = process.env.PROPERTY_SYNC_TOKEN;
  return !!expected && token === expected;
}

export function normalizeCondominiumPayload(body: any) {
  return {
    name: body.name,
    description: body.description || '',
    disposition: body.disposition,
    location: body.location || 'Capão Novo',
    address: body.address || 'A divulgar',
    images: Array.isArray(body.images)
      ? body.images.map((img: any, i: number) => ({
          url: img.url,
          public_id: img.public_id || `crm-sync-${Date.now()}-${i}`,
          isMain: !!img.isMain,
        }))
      : [],
    amenities: Array.isArray(body.amenities) ? body.amenities : [],
    builder: body.builder,
    adminCompany: body.adminCompany,
    builtYear: body.builtYear,
    totalArea: body.totalArea,
    isPublished: !!body.isPublished,
    isFeatured: !!body.isFeatured,
  };
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Token de sincronização inválido ou ausente.' }, { status: 401 });
  }
  try {
    const body = await request.json();
    const payload = normalizeCondominiumPayload(body);

    if (!payload.name) {
      return NextResponse.json({ error: 'Campo obrigatório faltando (nome).' }, { status: 400 });
    }

    const result = await createCondominium(payload);
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
    return NextResponse.json({ id: result.condominiumId });
  } catch (error: any) {
    console.error('[/api/condominiums POST]', error);
    return NextResponse.json({ error: error.message || 'Erro interno' }, { status: 500 });
  }
}
