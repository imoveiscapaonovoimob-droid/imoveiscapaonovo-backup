'use client';

import { Share2, Instagram, Link as LinkIcon, Heart, Loader2 } from 'lucide-react';
import { useState, useRef } from 'react';
import * as htmlToImage from 'html-to-image';

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
  const postRef = useRef<HTMLDivElement>(null);
  
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
    if (!postRef.current) return;
    setIsGenerating(true);

    try {
      // FORÇA O CARREGAMENTO DA IMAGEM EM BASE64:
      // Isso previne que o Safari/Chrome no celular gere o quadrado preto por causa de CORS ou Image Lazy Loading
      const response = await fetch(mainImage, { mode: 'cors' });
      const imageBlob = await response.blob();
      const base64DataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(imageBlob);
      });

      // Aplica o base64 diretamente no nó DOM da imagem do template
      const imgElement = postRef.current.querySelector('img');
      if (imgElement) {
        imgElement.src = base64DataUrl;
        // Tempo microscópico para a engine do Safari "printar" o base64 no DOM invisível
        await new Promise(r => setTimeout(r, 150));
      }

      // 1. Gera a imagem do elemento escondido
      const blob = await htmlToImage.toBlob(postRef.current, {
        cacheBust: true,
        quality: 1,
        pixelRatio: 1, // Fix memory load issues
      });

      if (!blob) throw new Error("Erro ao gerar imagem");

      const file = new File([blob], 'post-imovel.png', { type: 'image/png' });

      // 2. Copia a Legenda
      navigator.clipboard.writeText(captionFormat);

      // 3. Compartilhamento Nativo com arquivo (para Mobile/Instagram) ou Download
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: title,
        });
        // Disparar o aviso apenas DEPOIS que o share funcionou, ou não usar alert.
      } else {
        // Fallback: Baixar no Computador
        const objUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = objUrl;
        a.download = `capao-novo-${slug}.png`;
        a.click();
        URL.revokeObjectURL(objUrl);
        // Avisar ao usuário do computador que baixou e copiou!
        alert('📦 Imagem baixada no seu computador e texto da Legenda foi copiado para sua área de transferência! Cole no post do seu Instagram!');
      }
    } catch (err) {
      console.error('Falha ao exportar imagem', err);
      alert('Houve um erro ao processar a imagem do post.');
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

      {/* INSTAGRAM POST TEMPLATE (ESCONDIDO DA TELA: Renderiza fora do viewport para capturar canvas) */}
      <div 
        ref={postRef}
        className="fixed top-0 left-0 bg-[#001629] overflow-hidden flex flex-col justify-between shadow-none border-none outline-none"
        style={{ width: '1080px', height: '1080px', zIndex: -9999, transform: 'translate(-200vw, -200vh)' }}
      >
        {/* Imagem do Imóvel Ocupando 75% da altura */}
        <div className="h-[750px] w-full relative">
          <img 
            src={mainImage} 
            alt="Imagem Capa" 
            crossOrigin="anonymous"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
          {/* Logo overlay superior */}
          <div className="absolute top-12 left-12 bg-[#001629]/80 backdrop-blur-md px-8 py-4 rounded-sm flex items-center gap-4">
             <span className="text-white font-serif text-3xl">Imóveis</span>
             <span className="text-accent font-sans uppercase font-black tracking-widest mt-1">Capão Novo</span>
          </div>
        </div>

        {/* Informações Inferiores (25%) */}
        <div className="h-[330px] bg-[#001629] w-full px-16 py-12 flex flex-col justify-center">
          <span className="text-accent text-lg font-black uppercase tracking-[0.4em] mb-4">Lançamento Exclusivo</span>
          <h1 className="text-white text-5xl font-serif mb-8 line-clamp-2 leading-tight">{title}</h1>
          <div className="flex justify-between items-end border-t border-white/20 pt-8 mt-2">
            <div className="text-white/60 text-2xl font-sans tracking-widest uppercase flex gap-8">
              {area && <span>{area}M²</span>}
              {bedrooms && <span>{bedrooms} DORMS</span>}
            </div>
            <div className="text-accent text-6xl font-serif italic">
              {price}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
