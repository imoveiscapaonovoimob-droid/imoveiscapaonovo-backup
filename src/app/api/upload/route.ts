import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

/**
 * POST /api/upload
 * Recebe um único arquivo de imagem como FormData e faz upload ao Cloudinary.
 * Retorna { url, public_id }.
 * 
 * Usando esta rota no client eliminamos o limite de tamanho do Server Action,
 * pois cada foto é enviada individualmente para a API route (limite: 50MB por arquivo).
 */
export async function POST(request: Request) {
  try {
    let fileSource: any = null;
    let isMain = false;

    // Tentamos ler como JSON ou FormData
    const contentType = request.headers.get('content-type') || '';
    
    if (contentType.includes('application/json')) {
      const data = await request.json();
      fileSource = data.file; // base64 string
      isMain = Boolean(data.isMain);
    } else {
      const formData = await request.formData();
      fileSource = formData.get('file'); // File object
      isMain = formData.get('isMain') === 'true';
    }

    if (!fileSource) {
      return NextResponse.json({ error: 'Nenhum arquivo ou dado enviado' }, { status: 400 });
    }

    // Processamento do upload
    // Cloudinary uploader.upload aceita tanto base64 quanto stream/buffer/file
    const result: any = await new Promise((resolve, reject) => {
      // Se for um File object, precisamos converter para Buffer
      if (fileSource && typeof fileSource !== 'string' && (fileSource as any).arrayBuffer) {
        (fileSource as any).arrayBuffer().then((bytes: any) => {
          const buffer = Buffer.from(bytes);
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'imoveis-capao-novo', resource_type: 'image' },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          uploadStream.end(buffer);
        }).catch(reject);
      } else {
        // Se for string (Base64), enviamos diretamente
        cloudinary.uploader.upload(fileSource, { 
          folder: 'imoveis-capao-novo', 
          resource_type: 'image' 
        }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        });
      }
    });

    return NextResponse.json({
      url: result.secure_url,
      public_id: result.public_id,
      isMain,
    });
  } catch (error: any) {
    console.error('[/api/upload]', error);
    return NextResponse.json(
      { error: error.message || 'Erro no upload' },
      { status: 500 }
    );
  }
}
