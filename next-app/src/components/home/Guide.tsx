import React from "react";
import Image from "next/image";

export const Guide = () => {
  return (
    <section className="py-16 sm:py-20 px-6 lg:px-10 bg-white">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Left — Text */}
          <div>
            <span className="text-secondary text-[10px] font-sans font-bold uppercase tracking-[0.4em] mb-4 block">
              Descubra a Região
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-primary mb-4 sm:mb-6 leading-tight">
              Guia<br />
              Capão<br />
              Novo
            </h2>
            <p className="text-primary/60 font-serif italic text-base sm:text-lg leading-relaxed mb-8 max-w-sm">
              &ldquo;O guia completo de Capão Novo. Descubra as melhores oportunidades para você no litoral gaúcho.&rdquo;
            </p>
            <button className="px-8 py-3 border-2 border-primary text-primary text-xs font-bold uppercase tracking-widest rounded hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer">
              Acessar o Guia
            </button>
          </div>

          {/* Right — Image Grid */}
          {/* On mobile: stacked single column; on lg: 2-col masonry grid */}
          <div className="grid grid-cols-2 grid-rows-2 gap-3 h-[300px] sm:h-[400px] lg:h-[480px]">
            <div className="relative overflow-hidden rounded group row-span-1">
              <Image
                src="/imagem1.webp"
                alt="Vista aérea de Capão Novo"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="relative overflow-hidden rounded group row-span-2">
              <Image
                src="/imagem2.jpg"
                alt="Praia de Capão Novo"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="relative overflow-hidden rounded group row-span-1">
              <Image
                src="/imagem3.jpg"
                alt="Lazer em Capão Novo"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
