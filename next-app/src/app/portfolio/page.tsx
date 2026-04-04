import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/home/Footer";
import { PROPERTIES } from "@/data/properties";
import { PropertyCard } from "@/components/home/PropertyCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfólio | Imóveis Capão Novo",
  description: "Conheça nosso portfólio completo de imóveis em Capão Novo. Casas, apartamentos, terrenos e imóveis frente ao mar com as melhores condições.",
};

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Page Hero */}
      <section className="bg-primary pt-44 pb-24 px-6 lg:px-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')]" />
        <div className="max-w-[1440px] mx-auto relative z-10 text-center">
          <span className="text-secondary text-[10px] font-sans font-bold uppercase tracking-[0.4em] mb-4 block">
            Curadoria Premium
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight mb-6">
            Portfólio
          </h1>
          <p className="text-white/40 font-serif italic text-xl max-w-xl mx-auto">
            Todos os nossos agenciamentos, selecionados com rigor editorial.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="bg-white border-b border-black/5 sticky top-0 z-40 py-4 px-6 lg:px-10">
        <div className="max-w-[1440px] mx-auto flex items-center gap-6 overflow-x-auto">
          {["Todos", "Casas", "Apartamentos", "Frente Mar", "Condomínios", "Terrenos"].map((cat, i) => (
            <button
              key={cat}
              className={`text-[9px] font-sans font-bold uppercase tracking-[0.3em] whitespace-nowrap pb-1 border-b-2 transition-all duration-300 cursor-pointer ${
                i === 0
                  ? "border-secondary text-secondary"
                  : "border-transparent text-primary/40 hover:text-primary hover:border-primary/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="py-20 px-6 lg:px-10 bg-surface-container-low">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {PROPERTIES.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
