"use client";

import React from "react";
import { Search, ChevronDown } from "lucide-react";

export const SearchBar = () => {
  return (
    <div className="w-full bg-white/95 backdrop-blur-md shadow-2xl border-t border-white/20">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-5">
        {/* Label */}
        <p className="text-[10px] font-sans font-bold uppercase tracking-[0.4em] text-secondary mb-4 text-center">
          Encontre seu Imóvel Ideal em Capão Novo
        </p>

        <div className="flex flex-col md:flex-row items-stretch md:items-end gap-4">
          {/* Tipo */}
          <div className="flex-1 min-w-0">
            <label className="block text-left text-[9px] font-bold uppercase tracking-[0.3em] text-primary/50 mb-1.5">
              Tipo
            </label>
            <div className="relative">
              <select className="w-full appearance-none bg-surface-container-low border border-black/10 rounded px-4 py-3 md:py-2.5 text-sm text-primary focus:outline-none focus:border-secondary transition-colors cursor-pointer pr-8 font-sans">
                <option>Casas</option>
                <option>Apartamentos</option>
                <option>Terrenos</option>
                <option>Condomínios</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/40 pointer-events-none" />
            </div>
          </div>

          {/* Faixa de Preço */}
          <div className="flex-1 min-w-0">
            <label className="block text-left text-[9px] font-bold uppercase tracking-[0.3em] text-primary/50 mb-1.5">
              Faixa de Preço
            </label>
            <div className="relative">
              <select className="w-full appearance-none bg-surface-container-low border border-black/10 rounded px-4 py-3 md:py-2.5 text-sm text-primary focus:outline-none focus:border-secondary transition-colors cursor-pointer pr-8 font-sans">
                <option>R$ 200k – R$ 500Mil</option>
                <option>R$ 500k – R$ 1 Milhão</option>
                <option>Acima de R$ 1M</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/40 pointer-events-none" />
            </div>
          </div>

          {/* Localização */}
          <div className="flex-1 min-w-0">
            <label className="block text-left text-[9px] font-bold uppercase tracking-[0.3em] text-primary/50 mb-1.5">
              Localização
            </label>
            <div className="relative">
              <select className="w-full appearance-none bg-surface-container-low border border-black/10 rounded px-4 py-3 md:py-2.5 text-sm text-primary focus:outline-none focus:border-secondary transition-colors cursor-pointer pr-8 font-sans">
                <option>Posto 04</option>
                <option>Posto 05</option>
                <option>Village</option>
                <option>Toda a cidade</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/40 pointer-events-none" />
            </div>
          </div>

          {/* Search Button */}
          <button className="flex items-center justify-center gap-2 px-8 py-3 md:py-2.5 bg-secondary text-white text-xs font-bold uppercase tracking-widest rounded hover:bg-secondary/90 transition-all duration-300 w-full md:w-auto mt-2 md:mt-0 cursor-pointer min-w-fit">
            <Search size={15} />
            Buscar Imóvel
          </button>
        </div>
      </div>
    </div>
  );
};
