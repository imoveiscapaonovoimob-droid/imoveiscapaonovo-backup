import { createHash } from 'crypto';
import cloudinary from './cloudinary';

export interface RawImage {
  url?: string;
  public_id?: string;
  isMain?: boolean;
  data?: string; // base64, upload feito pelo formulário do site
}

export interface ResolvedImage {
  url: string;
  public_id: string;
  isMain: boolean;
}

/**
 * Resolve uma lista de imagens (vindas do formulário do site ou da
 * sincronização do CRM) pro formato final salvo no Mongo — sempre um asset
 * do Cloudinary, pra toda foto do site passar pelo mesmo pipeline de
 * otimização (f_auto/q_auto/resize por contexto) do componente
 * `CloudinaryImage`, que só ativa a otimização pra URLs de res.cloudinary.com.
 *
 * - Já é do Cloudinary (url contém res.cloudinary.com + public_id real): mantém.
 * - Base64 (upload pelo formulário do site): sobe normalmente.
 * - URL externa (ex.: link colado no cadastro do CRM): re-hospeda no
 *   Cloudinary com um public_id determinístico (hash da URL) + overwrite,
 *   pra que clicar em "Publicar no site" de novo com a mesma foto atualize o
 *   mesmo asset em vez de criar um duplicado a cada publicação.
 */
export async function resolveImages(images: RawImage[] | undefined, folder: string): Promise<ResolvedImage[]> {
  const finalImages: ResolvedImage[] = [];

  for (const img of images || []) {
    if (img?.url && img.url.includes('res.cloudinary.com') && img.public_id) {
      finalImages.push({ url: img.url, public_id: img.public_id, isMain: !!img.isMain });
      continue;
    }

    if (img?.data) {
      const uploadResponse = await cloudinary.uploader.upload(img.data, {
        folder,
        resource_type: 'image',
      });
      finalImages.push({ url: uploadResponse.secure_url, public_id: uploadResponse.public_id, isMain: !!img.isMain });
      continue;
    }

    if (img?.url) {
      const hash = createHash('sha1').update(img.url).digest('hex').slice(0, 16);
      try {
        const uploadResponse = await cloudinary.uploader.upload(img.url, {
          folder,
          public_id: `sync-${hash}`,
          overwrite: true,
          resource_type: 'image',
        });
        finalImages.push({ url: uploadResponse.secure_url, public_id: uploadResponse.public_id, isMain: !!img.isMain });
      } catch (err) {
        console.error('[image-sync] Falha ao re-hospedar imagem externa no Cloudinary:', img.url, err);
        // Sem re-hospedar, mantém a foto original (sem otimização) em vez de perdê-la.
        finalImages.push({ url: img.url, public_id: img.public_id || '', isMain: !!img.isMain });
      }
    }
  }

  return finalImages;
}
