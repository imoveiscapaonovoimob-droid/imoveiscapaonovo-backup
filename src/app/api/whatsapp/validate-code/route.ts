import { NextRequest, NextResponse } from 'next/server';

interface ValidateCodeBody {
  phone: string;
  code: string;
}

interface ValidateCodeResponse {
  success: boolean;
  message: string;
}

export async function POST(request: NextRequest): Promise<NextResponse<ValidateCodeResponse>> {
  try {
    const body: ValidateCodeBody = await request.json();
    const { phone, code } = body;

    if (!phone || !code) {
      return NextResponse.json(
        { success: false, message: 'Telefone e código são obrigatórios.' },
        { status: 400 }
      );
    }

    const cleanPhone = phone.replace(/\D/g, '');

    if (code.length !== 6) {
      return NextResponse.json(
        { success: false, message: 'O código deve ter 6 dígitos.' },
        { status: 400 }
      );
    }

    /* ================================================================
     * 🔐 VALIDAR OTP NO VERCEL KV (Redis) — SUBSTITUIR O MOCK ABAIXO
     * ================================================================
     * 
     * import { kv } from '@vercel/kv';
     * 
     * // Recupera o código OTP armazenado para este telefone
     * const storedCode = await kv.get<string>(`otp:${cleanPhone}`);
     * 
     * if (!storedCode) {
     *   return NextResponse.json(
     *     { success: false, message: 'Código expirado. Solicite um novo.' },
     *     { status: 400 }
     *   );
     * }
     * 
     * if (storedCode !== code) {
     *   return NextResponse.json(
     *     { success: false, message: 'Código inválido. Verifique e tente novamente.' },
     *     { status: 400 }
     *   );
     * }
     * 
     * // Código válido — remove do Redis para impedir reutilização
     * await kv.del(`otp:${cleanPhone}`);
     * 
     * ================================================================ */

    // MOCK TEMPORÁRIO: Aceita o código fixo "123456" para testes
    const MOCK_VALID_CODE = '123456';

    if (code !== MOCK_VALID_CODE) {
      return NextResponse.json(
        { success: false, message: 'Código inválido. Verifique e tente novamente.' },
        { status: 400 }
      );
    }

    console.log(`[OTP] Código validado com sucesso para ${cleanPhone}`);

    return NextResponse.json(
      { success: true, message: 'Acesso liberado! Aproveite todas as fotos.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('[OTP] Erro ao validar código:', error);
    return NextResponse.json(
      { success: false, message: 'Erro interno ao validar código.' },
      { status: 500 }
    );
  }
}
