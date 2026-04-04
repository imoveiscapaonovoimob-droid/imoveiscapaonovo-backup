"use client";

import React from "react";
import { Search, ChevronDown } from "lucide-react";

export const SearchBar = () => {
  return (
    <div className="w-full bg-white/95 backdrop-blur-md shadow-2xl border-t border-white/20">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-8">
        {/* Label */}
        <h2 className="text-xl md:text-2xl font-serif font-bold text-primary mb-6 text-center">
          Encontre seu imóvel ideal em Capão Novo
        </h2>

        <div className="flex flex-col md:flex-row items-stretch md:items-end gap-4">
          {/* Tipo */}
          <div className="flex-1 min-w-0">
            <span className="block text-left text-[9px] font-bold uppercase tracking-[0.3em] text-primary/50 mb-1.5">
              O que você procura?
            </span>
            <div className="relative">
              <select className="w-full appearance-none bg-surface-container-low border border-black/10 rounded px-4 py-3 md:py-2.5 text-sm text-primary focus:outline-none focus:border-secondary transition-colors cursor-pointer pr-8 font-sans">
                <option>Casas à venda em Capão Novo</option>
                <option>Apartamentos em Capão Novo</option>
                <option>Terrenos em Capão Novo</option>
                <option>Condomínios fechados no litoral</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/40 pointer-events-none" />
            </div>
          </div>

          {/* Faixa de Preço */}
          <div className="flex-1 min-w-0">
            <span className="block text-left text-[9px] font-bold uppercase tracking-[0.3em] text-primary/50 mb-1.5">
              Faixa de Valor
            </span>
            <div className="relative">
              <select className="w-full appearance-none bg-surface-container-low border border-black/10 rounded px-4 py-3 md:py-2.5 text-sm text-primary focus:outline-none focus:border-secondary transition-colors cursor-pointer pr-8 font-sans">
                <option>Oportunidades (Até R$ 400k)</option>
                <option>Intermediários (R$ 400k - R$ 800k)</option>
                <option>Alto Padrão (Acima de R$ 800k)</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/40 pointer-events-none" />
            </div>
          </div>

          {/* Localização */}
          <div className="flex-1 min-w-0">
            <span className="block text-left text-[9px] font-bold uppercase tracking-[0.3em] text-primary/50 mb-1.5">
              Localização
            </span>
            <div className="relative">
              <select className="w-full appearance-none bg-surface-container-low border border-black/10 rounded px-4 py-3 md:py-2.5 text-sm text-primary focus:outline-none focus:border-secondary transition-colors cursor-pointer pr-8 font-sans">
                <option>Toda a cidade</option>
                <option>Próximo ao Mar (Posto 4)</option>
                <option>Região Central (Posto 5)</option>
                <option>Village / Novos Loteamentos</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/40 pointer-events-none" />
            </div>
          </div>

          {/* Search Button */}
          <button className="flex items-center justify-center gap-2 px-8 py-3 md:py-2.5 bg-secondary text-white text-xs font-bold uppercase tracking-widest rounded hover:bg-secondary/90 transition-all duration-300 w-full md:w-auto mt-2 md:mt-0 cursor-pointer min-w-fit shadow-lg shadow-secondary/20">
            <Search size={15} />
            Buscar Agora
          </button>
        </div>

        <p className="text-[10px] md:text-xs text-secondary font-bold uppercase tracking-[0.15em] mt-6 text-center">
          👉 Filtre por tipo, localização e faixa de valor.
        </p>
      </div>
    </div>
  );
};
