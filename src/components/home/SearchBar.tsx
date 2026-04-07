"use client";

import React, { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

export const SearchBar = () => {
  const router = useRouter();
  const [filters, setFilters] = useState({
    type: "all",
    priceRange: "all",
    location: "all",
  });

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (filters.type !== "all") params.set("tipo", filters.type);
    
    if (filters.priceRange !== "all") {
      const [min, max] = filters.priceRange.split("-");
      if (min) params.set("min", min);
      if (max) params.set("max", max);
    }
    
    if (filters.location !== "all") params.set("local", filters.location);

    router.push(`/imoveis?${params.toString()}`);
  };

  return (
    <div className="w-full bg-white/95 backdrop-blur-md shadow-2xl border-t border-white/20">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-8">
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
              <select 
                className="w-full appearance-none bg-surface-container-low border border-black/10 rounded px-4 py-3 md:py-2.5 text-sm text-primary focus:outline-none focus:border-secondary transition-colors cursor-pointer pr-8 font-sans"
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              >
                <option value="all">Todos os imóveis</option>
                <option value="casa">Casas à venda</option>
                <option value="apartamento">Apartamentos</option>
                <option value="terreno">Terrenos</option>
                <option value="comercial">Comercial</option>
                <option value="condominio">Condomínio Fechado</option>
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
              <select 
                className="w-full appearance-none bg-surface-container-low border border-black/10 rounded px-4 py-3 md:py-2.5 text-sm text-primary focus:outline-none focus:border-secondary transition-colors cursor-pointer pr-8 font-sans"
                value={filters.priceRange}
                onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
              >
                <option value="all">Qualquer valor</option>
                <option value="0-400000">Até R$ 400.000</option>
                <option value="400000-800000">R$ 400k - R$ 800k</option>
                <option value="800000-1500000">R$ 800k - R$ 1.5M</option>
                <option value="1500000-999999999">Acima de R$ 1.5M</option>
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
              <select 
                className="w-full appearance-none bg-surface-container-low border border-black/10 rounded px-4 py-3 md:py-2.5 text-sm text-primary focus:outline-none focus:border-secondary transition-colors cursor-pointer pr-8 font-sans"
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              >
                <option value="all">Toda a cidade</option>
                <option value="Capão Novo">Capão Novo (Geral)</option>
                <option value="Posto 4">Posto 4</option>
                <option value="Posto 5">Posto 5</option>
                <option value="Village">Village</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/40 pointer-events-none" />
            </div>
          </div>

          {/* Search Button */}
          <button 
            onClick={handleSearch}
            className="flex items-center justify-center gap-2 px-8 py-3 md:py-2.5 bg-secondary text-white text-xs font-bold uppercase tracking-widest rounded hover:bg-secondary/90 transition-all duration-300 w-full md:w-auto mt-2 md:mt-0 cursor-pointer min-w-fit shadow-lg shadow-secondary/20"
          >
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

