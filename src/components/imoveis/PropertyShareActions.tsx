'use client';

import { Share2, Instagram, Link as LinkIcon, Heart, Loader2 } from 'lucide-react';
import { useState } from 'react';

interface PropertyShareActionsProps {
  title: string;
  slug: string;
  mainImage: string;
  price: string;
  bedrooms?: number;
  area?: number;
}

export function PropertyShareActions({ title, slug, mainImage, price, bedrooms, area }: PropertyShareActionsProps) {
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  

  const url = typeof window !== 'undefined' 
    ? window.location.href 
    : `https://imoveiscapaonovo.com.br/imoveis-capao-novo/${slug}`;

  const message = `Confira este imóvel incrível que encontrei na Imóveis Capão Novo: ${title}`;

  const captionFormat = `🏠 ${title}\n\n💰 ${price}\n📏 ${area ? area + 'm²' : ''} | 🛏️ ${bedrooms ? bedrooms + ' dorms' : ''}\n\n✨ Confira os detalhes exclusivos no link da nossa bio ou entre em contato pelo Direct para agendar sua visita!\n\n📲 Mais sobre o imóvel: ${url}\n\n#ImoveisCapaoNovo #CapaoNovo #ImoveisNoLitoral #LitoralGaucho #CasaNaPraia #InvestimentoImobiliario`;

  const handleShareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Imóveis Capão Novo: ${title}`,
          text: message,
          url: url,
        });
      } catch (err) {
        console.log('Compartilhamento cancelado ou falhou', err);
      }
    } else {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      alert('Link copiado para a área de transferência!');
    }
  };

  const handleInstagramExport = async () => {
    setIsGenerating(true);

    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1080;
      canvas.height = 1080;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error("Canvas não suportado");

      // Fundo
      ctx.fillStyle = '#001629';
      ctx.fillRect(0, 0, 1080, 1080);

      // Carregar a imagem principal
      const loadImage = (url: string): Promise<HTMLImageElement> => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.onload = () => resolve(img);
          img.onerror = () => {
             // Fallback para evitar travamento: tentamos sem crossOrigin, ou injetamos um fundo vazio
             resolve(img);
          };
          img.src = url;
        });
      };

      // Tenta carregar a mainImage
      let imgObj: HTMLImageElement | null = null;
      try {
        imgObj = await loadImage(mainImage);
      } catch (e) {
        console.warn("Falha ao carregar a imagem para o canvas (CORS bloqueou)");
      }

      // Desenhar a Imagem (75% altura = 810px) com o recurso de cortar proporcional (object-fit: cover)
      if (imgObj && imgObj.width > 0) {
        const targetW = 1080;
        const targetH = 810;
        const imgRatio = imgObj.width / imgObj.height;
        const targetRatio = targetW / targetH;
        let drawW, drawH, drawX, drawY;

        if (imgRatio > targetRatio) {
           drawH = imgObj.height;
           drawW = imgObj.height * targetRatio;
           drawX = (imgObj.width - drawW) / 2;
           drawY = 0;
        } else {
           drawW = imgObj.width;
           drawH = imgObj.width / targetRatio;
           drawX = 0;
           drawY = (imgObj.height - drawH) / 2;
        }
        ctx.drawImage(imgObj, drawX, drawY, drawW, drawH, 0, 0, targetW, targetH);
      } else {
        ctx.fillStyle = '#112233';
        ctx.fillRect(0, 0, 1080, 810);
      }

      // Logo/Marca D'água
      ctx.fillStyle = 'rgba(0, 22, 41, 0.85)';
      ctx.beginPath();
      ctx.roundRect(40, 40, 420, 80, 10);
      ctx.fill();
      
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '36px "Times New Roman", serif'; // Simula Manrope Serif
      ctx.fillText('Imóveis', 70, 92);
      ctx.fillStyle = '#C3A562';
      ctx.font = 'bold 24px Arial, sans-serif'; 
      ctx.fillText('CAPÃO NOVO', 200, 90);

      // Rodapé Textos (Y = 810 a 1080)
      ctx.fillStyle = '#C3A562';
      ctx.font = 'bold 20px Arial';
      ctx.fillText('LANÇAMENTO EXCLUSIVO', 60, 870);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 46px "Times New Roman", serif';
      // Quebrar o título se for muito grande
      const maxTitleWidth = 960;
      let titleText = title;
      if (ctx.measureText(titleText).width > maxTitleWidth) {
         titleText = titleText.substring(0, 45) + '...';
      }
      ctx.fillText(titleText, 60, 940);

      // Linha Separadora
      ctx.strokeStyle = 'rgba(255,255,255,0.2)';
      ctx.beginPath();
      ctx.moveTo(60, 990);
      ctx.lineTo(1020, 990);
      ctx.stroke();

      // Features + Preço
      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      ctx.font = 'bold 24px Arial';
      const features = [area ? `${area}M²` : '', bedrooms ? `${bedrooms} DORMS` : ''].filter(Boolean).join('   |   ');
      ctx.fillText(features, 60, 1040);

      ctx.fillStyle = '#C3A562';
      ctx.font = 'italic bold 56px "Times New Roman", serif';
      const priceMetrics = ctx.measureText(price);
      ctx.fillText(price, 1020 - priceMetrics.width, 1045);

      // Exportar para Arquivo
      const blob = await new Promise<Blob | null>(res => canvas.toBlob(res, 'image/png'));
      if (!blob) throw new Error("Falha na geração do Canvas Blob");

      const file = new File([blob], 'post-imovel.png', { type: 'image/png' });

      // 2. Copia a Legenda
      navigator.clipboard.writeText(captionFormat);

      // 3. Compartilhamento Nativo com arquivo (para Mobile/Instagram) ou Download
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: title,
        });
      } else {
        const objUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = objUrl;
        a.download = `capao-novo-${slug}.png`;
        a.click();
        URL.revokeObjectURL(objUrl);
        alert('📦 Imagem salva no seu Computador! A Legenda do post também já foi copiada!');
      }
    } catch (err) {
      console.error('Falha ao exportar imagem nativa', err);
      alert('Não foi possível processar a foto. O Instagram suporta apenas acesso manual neste dispositivo.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-2 md:gap-4">
        {/* Botão de Link Tradicional */}
        <button 
          onClick={handleShareLink}
          className="p-2 flex items-center justify-center text-[#001629]/60 hover:text-accent transition-colors bg-white/50 hover:bg-white rounded-full group relative"
          title="Compartilhar Link"
        >
          <Share2 size={18} className={copied ? "text-green-600 scale-110 transition-transform" : "group-hover:scale-110 transition-transform"} />
        </button>

        {/* Botão de Post Instagram */}
        <button 
          onClick={handleInstagramExport}
          disabled={isGenerating}
          className="px-4 py-2 flex items-center justify-center gap-2 text-white bg-gradient-to-tr from-[#E1306C] to-[#833AB4] hover:opacity-90 font-bold text-[10px] uppercase tracking-widest transition-all rounded-sm shadow-md disabled:opacity-50"
          title="Exportar para Instagram Feed"
        >
          {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Instagram size={16} />}
          <span className="hidden md:inline">{isGenerating ? 'Gerando...' : 'Post Instagram'}</span>
        </button>

        {/* Botão Favoritos */}
        <button 
          className="p-2 text-[#001629]/60 hover:text-accent transition-colors bg-white/50 hover:bg-white rounded-full group hidden md:flex"
          title="Salvar nos Favoritos"
        >
          <Heart size={18} className="group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </>
  );
}
