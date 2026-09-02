import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import connectDB from '@/lib/mongodb';
import SiteLead from '@/models/SiteLead';

interface RequestCodeBody {
  name: string;
  phone: string;
  propertyId?: string;
  propertyTitle?: string;
  propertySlug?: string;
  pageUrl?: string;
  source?: string;
}

interface RequestCodeResponse {
  success: boolean;
  message: string;
}

export async function POST(request: NextRequest): Promise<NextResponse<RequestCodeResponse>> {
  try {
    const body: RequestCodeBody = await request.json();
    const { name, phone, propertyId, propertyTitle, propertySlug, pageUrl, source } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, message: 'Nome e telefone são obrigatórios.' },
        { status: 400 }
      );
    }

    // Sanitiza o telefone (apenas dígitos)
    const cleanPhone = phone.replace(/\D/g, '');

    if (cleanPhone.length < 10 || cleanPhone.length > 13) {
      return NextResponse.json(
        { success: false, message: 'Número de telefone inválido.' },
        { status: 400 }
      );
    }

    // Gera um código OTP de 6 dígitos
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Salva o código OTP no Redis com expiração de 10 minutos
    await kv.set(`otp:${cleanPhone}`, otpCode, { ex: 600 });

    // Envia o OTP via Evolution API (WhatsApp)
    const evolutionUrl = process.env.EVOLUTION_API_URL?.trim();
    const evolutionKey = process.env.EVOLUTION_API_KEY?.trim();
    const evolutionInstance = process.env.EVOLUTION_INSTANCE?.trim();

    if (!evolutionUrl || !evolutionKey || !evolutionInstance) {
      console.error('[OTP] Variáveis da Evolution API não configuradas.');
      return NextResponse.json(
        { success: false, message: 'Serviço de WhatsApp não configurado. Contate o suporte.' },
        { status: 500 }
      );
    }

    const whatsappNumber = cleanPhone.startsWith('55') ? cleanPhone : `55${cleanPhone}`;

    const evolutionResponse = await fetch(
      `${evolutionUrl}/message/sendText/${evolutionInstance}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': evolutionKey,
        },
        body: JSON.stringify({
          number: whatsappNumber,
          text: `🏡 *Imóveis Capão Novo*\n\nOlá, ${name}! Seu código de acesso é:\n\n🔑 *${otpCode}*\n\nInsira no site para desbloquear todas as fotos do imóvel.\n\n_Este código expira em 10 minutos._`,
        }),
      }
    );

    if (!evolutionResponse.ok) {
      const errorBody = await evolutionResponse.text();
      console.error(`[OTP] Evolution API retornou erro ${evolutionResponse.status}:`, errorBody);
      return NextResponse.json(
        { success: false, message: 'Não foi possível enviar o código. Verifique o número e tente novamente.' },
        { status: 502 }
      );
    }

    console.log(`[OTP] Código enviado via WhatsApp para ${whatsappNumber} (${name})`);

    // Grava o lead JÁ na solicitação — se a pessoa não chegar a confirmar o
    // código, o contato continua registrado (fica `verified: false`).
    // Nunca derruba o envio do código por causa da gravação.
    try {
      await connectDB();
      await SiteLead.create({
        name,
        phone: cleanPhone,
        verified: false,
        source: source || 'galeria-imovel',
        propertyId,
        propertyTitle,
        propertySlug,
        pageUrl,
        requestedAt: new Date(),
      });
    } catch (dbError) {
      console.error('[OTP] Falha ao gravar o lead (código foi enviado mesmo assim):', dbError);
    }

    return NextResponse.json(
      { success: true, message: 'Código enviado! Verifique seu WhatsApp.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('[OTP] Erro ao processar solicitação:', error);
    return NextResponse.json(
      { success: false, message: 'Erro interno ao processar solicitação.' },
      { status: 500 }
    );
  }
}
