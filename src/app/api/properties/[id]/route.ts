import { NextResponse } from 'next/server';
import { updateProperty } from '@/lib/actions/property-edit.actions';
import { deleteProperty } from '@/lib/actions/property.actions';
import { normalizePropertyPayload } from '../route';

/**
 * PUT /api/properties/[id]
 * Atualiza um imóvel já publicado a partir do CRM. Mesma autenticação/
 * normalização da rota de criação (ver /api/properties/route.ts).
 */
function isAuthorized(request: Request): boolean {
  const token = request.headers.get('x-sync-token');
  const expected = process.env.PROPERTY_SYNC_TOKEN;
  return !!expected && token === expected;
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Token de sincronização inválido ou ausente.' }, { status: 401 });
  }
  try {
    const { id } = await params;
    const body = await request.json();
    const payload = normalizePropertyPayload(body);

    const result = await updateProperty(id, payload);
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
    return NextResponse.json({ id });
  } catch (error: any) {
    console.error('[/api/properties/[id] PUT]', error);
    return NextResponse.json({ error: error.message || 'Erro interno' }, { status: 500 });
  }
}

/** DELETE /api/properties/[id] — remove um imóvel (usado por "despublicar" / limpeza de testes). */
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Token de sincronização inválido ou ausente.' }, { status: 401 });
  }
  try {
    const { id } = await params;
    const result = await deleteProperty(id);
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error('[/api/properties/[id] DELETE]', error);
    return NextResponse.json({ error: error.message || 'Erro interno' }, { status: 500 });
  }
}
