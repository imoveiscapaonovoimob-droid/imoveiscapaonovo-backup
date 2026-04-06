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

      // Desenhar a Imagem (2/3 da altura = 720px) com object-fit: cover
      if (imgObj && imgObj.width > 0) {
        const targetW = 1080;
        const targetH = 720;
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
        ctx.fillRect(0, 0, 1080, 720);
      }

      // Adicionar gradiente escuro de transição entre a imagem e o texto
      const gradient = ctx.createLinearGradient(0, 600, 0, 720);
      gradient.addColorStop(0, 'rgba(0, 22, 41, 0)');
      gradient.addColorStop(1, 'rgba(0, 22, 41, 1)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 600, 1080, 120);

      // Fundo Inferior (Azul super escuro/preto da marca)
      ctx.fillStyle = '#00101C'; // Um pouco mais escuro para maior contraste
      ctx.fillRect(0, 720, 1080, 360);

      // Logo/Marca D'água mais sutil
      ctx.fillStyle = 'rgba(0, 16, 28, 0.9)';
      ctx.beginPath();
      ctx.roundRect(40, 40, 380, 70, 8);
      ctx.fill();
      
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '30px system-ui, -apple-system, sans-serif'; 
      ctx.fillText('Imóveis', 70, 86);
      ctx.fillStyle = '#C3A562';
      ctx.font = '900 22px system-ui, -apple-system, sans-serif'; 
      ctx.fillText('CAPÃO NOVO', 200, 85);

      // Rodapé Textos (Y = 720 a 1080)
      ctx.fillStyle = '#C3A562';
      ctx.font = '800 18px system-ui, -apple-system, sans-serif';
      ctx.letterSpacing = '4px'; // Supported no chrome moderno
      ctx.fillText('LANÇAMENTO EXCLUSIVO', 60, 790);
      ctx.letterSpacing = '0px';

      // Quebra de Texto Automática para o Título (Line wrap)
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '800 48px system-ui, -apple-system, sans-serif';
      
      const wrapText = (context: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
        const words = text.split(' ');
        let line = '';
        let currentY = y;
        let linesCount = 0;

        for (let n = 0; n < words.length; n++) {
          const testLine = line + words[n] + ' ';
          const metrics = context.measureText(testLine);
          const testWidth = metrics.width;
          if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, currentY);
            line = words[n] + ' ';
            currentY += lineHeight;
            linesCount++;
            if (linesCount >= 2) {
               // Limita a 2 linhas e adiciona reticências se houver mais palavras
               line = line.trim() + '...';
               break;
            }
          } else {
            line = testLine;
          }
        }
        if (linesCount < 2) {
          context.fillText(line, x, currentY);
        }
      };

      // Escreve até 2 linhas de texto para o título sem cortar a última palavra
      wrapText(ctx, title, 60, 860, 960, 60);

      // Linha Separadora Finíssima
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(60, 980);
      ctx.lineTo(1020, 980);
      ctx.stroke();

      // Features / Metragens
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.font = '600 22px system-ui, -apple-system, sans-serif';
      const features = [area ? `${area} M²` : '', bedrooms ? `${bedrooms} DORMS` : ''].filter(Boolean).join('   •   ');
      ctx.fillText(features, 60, 1030);

      // Preço Extra Gigante e Destacado
      ctx.fillStyle = '#C3A562';
      ctx.font = '800 58px system-ui, -apple-system, sans-serif';
      const priceMetrics = ctx.measureText(price);
      ctx.fillText(price, 1020 - priceMetrics.width, 1035);

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
