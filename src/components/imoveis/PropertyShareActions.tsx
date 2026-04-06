'use client';

import { Share2, MessageCircle, Instagram, Link as LinkIcon, Heart } from 'lucide-react';
import { useState } from 'react';

interface PropertyShareActionsProps {
  title: string;
  slug: string;
}

export function PropertyShareActions({ title, slug }: PropertyShareActionsProps) {
  const [copied, setCopied] = useState(false);
  
  // Resolvemos a URL completa do imóvel
  const url = typeof window !== 'undefined' 
    ? window.location.href 
    : `https://imoveiscapaonovo.com.br/imoveis-capao-novo/${slug}`;

  const message = `Confira este imóvel incrível que encontrei na Imóveis Capão Novo: ${title}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Imóveis Capão Novo: ${title}`,
          text: message,
          url: url,
        });
        // navigator.share no celular abrirá as opções nativas: WhatsApp, Instagram Feed, Stories, etc.
      } catch (err) {
        console.log('Compartilhamento cancelado ou falhou', err);
      }
    } else {
      // Fallback para PC: Copiar Link
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      alert('Link copiado para a área de transferência!');
    }
  };

  return (
    <div className="flex items-center gap-2 md:gap-4">
      <button 
        onClick={handleShare}
        className="p-2 flex items-center justify-center text-[#001629]/60 hover:text-accent transition-colors bg-white/50 hover:bg-white rounded-full group relative"
        title="Compartilhar Imóvel"
      >
        <Share2 size={18} className={copied ? "text-green-600 scale-110 transition-transform" : "group-hover:scale-110 transition-transform"} />
      </button>

      <button 
        className="p-2 text-[#001629]/60 hover:text-accent transition-colors bg-white/50 hover:bg-white rounded-full group"
        title="Salvar nos Favoritos"
      >
        <Heart size={18} className="group-hover:scale-110 transition-transform" />
      </button>
    </div>
  );
}
