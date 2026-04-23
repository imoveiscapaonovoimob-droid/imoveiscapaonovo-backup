import { NextRequest, NextResponse } from 'next/server';

interface RequestCodeBody {
  name: string;
  phone: string;
}

interface RequestCodeResponse {
  success: boolean;
  message: string;
}

export async function POST(request: NextRequest): Promise<NextResponse<RequestCodeResponse>> {
  try {
    const body: RequestCodeBody = await request.json();
    const { name, phone } = body;

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

    /* ================================================================
     * 📦 SALVAR OTP NO VERCEL KV (Redis) — IMPLEMENTAR AQUI
     * ================================================================
     * 
     * Instale o pacote: npm install @vercel/kv
     * 
     * import { kv } from '@vercel/kv';
     * 
     * // Salva o código OTP com expiração de 10 minutos (600 segundos)
     * // A chave é baseada no telefone sanitizado para fácil recuperação
     * await kv.set(`otp:${cleanPhone}`, otpCode, { ex: 600 });
     * 
     * // Para recuperar depois na rota /validate-code:
     * // const storedCode = await kv.get(`otp:${cleanPhone}`);
     * 
     * Variáveis de ambiente necessárias no .env.local e Vercel:
     *   KV_REST_API_URL=<sua-url>
     *   KV_REST_API_TOKEN=<seu-token>
     * 
     * ================================================================ */

    /* ================================================================
     * 📲 ENVIAR OTP VIA API DO WHATSAPP — IMPLEMENTAR AQUI
     * ================================================================
     * 
     * Exemplo com Z-API (https://developer.z-api.io/):
     * 
     * const ZAPI_INSTANCE_ID = process.env.ZAPI_INSTANCE_ID;
     * const ZAPI_TOKEN = process.env.ZAPI_TOKEN;
     * const ZAPI_CLIENT_TOKEN = process.env.ZAPI_CLIENT_TOKEN;
     * 
     * await fetch(
     *   `https://api.z-api.io/instances/${ZAPI_INSTANCE_ID}/token/${ZAPI_TOKEN}/send-text`,
     *   {
     *     method: 'POST',
     *     headers: {
     *       'Content-Type': 'application/json',
     *       'Client-Token': ZAPI_CLIENT_TOKEN!,
     *     },
     *     body: JSON.stringify({
     *       phone: `55${cleanPhone}`,
     *       message: `🏡 *Imóveis Capão Novo*\n\nOlá ${name}! Seu código de acesso é:\n\n🔑 *${otpCode}*\n\nInsira no site para desbloquear todas as fotos do imóvel.\n\nEsse código expira em 10 minutos.`,
     *     }),
     *   }
     * );
     * 
     * ────────────────────────────────────────────────────
     * 
     * Exemplo com Evolution API (https://doc.evolution-api.com/):
     * 
     * const EVOLUTION_URL = process.env.EVOLUTION_API_URL;
     * const EVOLUTION_KEY = process.env.EVOLUTION_API_KEY;
     * const EVOLUTION_INSTANCE = process.env.EVOLUTION_INSTANCE;
     * 
     * await fetch(
     *   `${EVOLUTION_URL}/message/sendText/${EVOLUTION_INSTANCE}`,
     *   {
     *     method: 'POST',
     *     headers: {
     *       'Content-Type': 'application/json',
     *       'apikey': EVOLUTION_KEY!,
     *     },
     *     body: JSON.stringify({
     *       number: `55${cleanPhone}@s.whatsapp.net`,
     *       text: `🏡 *Imóveis Capão Novo*\n\nOlá ${name}! Seu código de acesso é:\n\n🔑 *${otpCode}*\n\nInsira no site para desbloquear todas as fotos do imóvel.\n\nEsse código expira em 10 minutos.`,
     *     }),
     *   }
     * );
     * 
     * ================================================================ */

    // MOCK TEMPORÁRIO: Loga o código no console do servidor
    console.log(`[OTP] Código ${otpCode} gerado para ${name} (${cleanPhone})`);

    return NextResponse.json(
      { success: true, message: 'Código enviado com sucesso para o seu WhatsApp.' },
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
