import React from "react";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { SearchBar } from "./SearchBar";
import { WHATSAPP_MESSAGES } from "@/lib/constants";

export const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden bg-primary">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.webp"
          alt="Imóveis Capão Novo - Vista aérea privilegiada dos melhores condomínios do litoral"
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/50 to-primary/90" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-10 pt-32 sm:pt-40 lg:pt-44 pb-0 flex flex-col items-center text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white font-bold leading-tight mb-8 md:mb-10 tracking-tight max-w-5xl">
          Imóveis em <em className="italic font-normal text-secondary">Capão Novo RS</em>:<br />
          Casas, Apartamentos e Terrenos à Venda
        </h1>

        <div className="max-w-3xl mb-12 space-y-6">
          <p className="text-lg md:text-xl text-white/90 font-sans leading-relaxed">
            Encontre os melhores imóveis à venda em Capão Novo, com curadoria estratégica para quem busca segurança, valorização e qualidade de vida no litoral norte gaúcho.
          </p>
          <p className="text-base md:text-lg text-white/70 font-sans leading-relaxed">
            Apartamentos, casas e terrenos selecionados com base em dados reais de mercado, localização e potencial de crescimento.
          </p>
        </div>

        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-4">
            <a
              href={WHATSAPP_MESSAGES.geral}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-5 bg-secondary text-white text-xs font-bold uppercase tracking-[0.2em] rounded transition-all duration-300 hover:bg-secondary/90 hover:-translate-y-0.5 shadow-xl cursor-pointer"
            >
              <MessageCircle size={18} />
              Falar com Especialista
            </a>
            <p className="text-[10px] md:text-xs text-secondary font-bold uppercase tracking-[0.15em]">
              👉 Descubra as melhores oportunidades hoje
            </p>
          </div>

          {/* Quick Links / Featured Segments */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-14 md:mb-20">
            <a href="/terrenos" className="text-[9px] md:text-[10px] font-sans font-bold text-white/60 hover:text-secondary uppercase tracking-[0.3em] transition-colors border-b border-white/10 hover:border-secondary pb-1">
              Terrenos & Condomínios
            </a>
            <a href="/posto-5" className="text-[9px] md:text-[10px] font-sans font-bold text-white/60 hover:text-secondary uppercase tracking-[0.3em] transition-colors border-b border-white/10 hover:border-secondary pb-1">
              Oportunidades Posto 5
            </a>
            <a href="/sobre" className="text-[9px] md:text-[10px] font-sans font-bold text-white/60 hover:text-secondary uppercase tracking-[0.3em] transition-colors border-b border-white/10 hover:border-secondary pb-1">
              30 Anos de Confiança
            </a>
          </div>
        </div>
      </div>

      {/* Search Bar — overlapping hero bottom */}
      <div className="relative z-20">
        <SearchBar />
      </div>

      {/* WhatsApp floating button with text label */}
      <a
        href={WHATSAPP_MESSAGES.geral}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-6 md:right-8 z-[100] h-14 bg-green-500 text-white rounded-full flex items-center px-4 gap-3 shadow-[0_10px_25px_-5px_rgba(34,197,94,0.4)] hover:bg-green-600 transition-all duration-300 hover:scale-105 group active:scale-95 cursor-pointer"
        aria-label="Falar pelo WhatsApp - Plantão de Vendas"
      >
        <span className="text-[11px] font-sans font-bold uppercase tracking-widest pl-1">
          Plantão de Vendas
        </span>
        <div className="w-8 h-8 flex items-center justify-center bg-white/20 rounded-full transition-colors group-hover:bg-white/30">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.570-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </div>
      </a>
    </section>
  );
};
