import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Property from '@/models/Property';

/**
 * GET /api/admin/migrate-broker
 * Migração ÚNICA (rodar uma vez, depois remover este arquivo): move os
 * campos "estratégicos" que já existiam soltos no topo do documento
 * (strategicData, commercialIntelligence, documentation, financialStatus,
 * idealCustomerProfile) para dentro do novo subdocumento `broker` — o único
 * campo que as leituras públicas (getPropertyBySlugOrId etc.) agora nunca
 * selecionam. Não apaga nada: se `broker` já tiver algo migrado, não
 * sobrescreve.
 *
 * Autenticado pela sessão do NextAuth (humano logado no /admin) — não é
 * uma rota de integração de máquina, por isso não usa x-sync-token.
 */
export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Não autenticado.' }, { status: 401 });
  }

  await connectDB();

  // Acesso via driver nativo (bypassa o schema do Mongoose) pra conseguir ler
  // os campos legados que já não estão mais declarados no schema atual.
  const collection = Property.collection;
  const docs = await collection.find({}).toArray();

  let migrated = 0;
  let skipped = 0;

  for (const doc of docs as any[]) {
    if (doc.broker) { skipped++; continue; }

    const hasLegacyData = doc.strategicData || doc.commercialIntelligence
      || doc.documentation || doc.financialStatus || doc.idealCustomerProfile;
    if (!hasLegacyData) { skipped++; continue; }

    const broker: any = {
      strategicData: doc.strategicData || {},
      commercialIntelligence: doc.commercialIntelligence || {},
      idealCustomerProfile: doc.idealCustomerProfile || undefined,
      documentation: doc.documentation || {},
      financialStatus: doc.financialStatus || undefined,
    };

    await collection.updateOne(
      { _id: doc._id },
      {
        $set: { broker },
        $unset: {
          strategicData: '',
          commercialIntelligence: '',
          documentation: '',
          financialStatus: '',
          idealCustomerProfile: '',
        },
      },
    );
    migrated++;
  }

  return NextResponse.json({ ok: true, total: docs.length, migrated, skipped });
}
