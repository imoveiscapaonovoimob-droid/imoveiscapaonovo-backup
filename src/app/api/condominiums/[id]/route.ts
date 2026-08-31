import { NextResponse } from 'next/server';
import { updateCondominium, deleteCondominium } from '@/lib/actions/condominium.actions';
import { normalizeCondominiumPayload } from '../route';

function isAuthorized(request: Request): boolean {
  const token = request.headers.get('x-sync-token');
  const expected = process.env.PROPERTY_SYNC_TOKEN;
  return !!expected && token === expected;
}

/** PUT /api/condominiums/[id] — atualiza um condomínio já publicado. */
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Token de sincronização inválido ou ausente.' }, { status: 401 });
  }
  try {
    const { id } = await params;
    const body = await request.json();
    const payload = normalizeCondominiumPayload(body);

    const result = await updateCondominium(id, payload);
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
    return NextResponse.json({ id });
  } catch (error: any) {
    console.error('[/api/condominiums/[id] PUT]', error);
    return NextResponse.json({ error: error.message || 'Erro interno' }, { status: 500 });
  }
}

/** DELETE /api/condominiums/[id] — remove um condomínio. */
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Token de sincronização inválido ou ausente.' }, { status: 401 });
  }
  try {
    const { id } = await params;
    const result = await deleteCondominium(id);
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error('[/api/condominiums/[id] DELETE]', error);
    return NextResponse.json({ error: error.message || 'Erro interno' }, { status: 500 });
  }
}
