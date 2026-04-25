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
          Imóveis à Venda em <em className="italic font-normal text-secondary">Capão Novo RS</em>:<br />
          Casas, Apartamentos e Terrenos com Alto Potencial de Valorização
        </h1>

        <div className="max-w-4xl mb-12">
          <p className="text-lg md:text-xl text-white/90 font-sans leading-relaxed">
            Encontre imóveis selecionados com base em localização, preço e potencial real de crescimento — ideais para morar ou investir no litoral norte gaúcho.
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

    </section>
  );
};
