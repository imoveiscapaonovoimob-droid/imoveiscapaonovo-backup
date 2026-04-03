import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/home/Footer";
import { PROPERTIES } from "@/data/properties";
import { PropertyCard } from "@/components/home/PropertyCard";
import { Lock } from "lucide-react";
import type { Metadata } from "next";
import { WHATSAPP_MESSAGES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Exclusividades | Imóveis Capão Novo",
  description: "Imóveis exclusivos com representação única de Imóveis Capão Novo. Oportunidades únicas no litoral gaúcho disponíveis apenas para nossos clientes.",
};

// Filter only "featured" or first 4 properties as exclusivities
const EXCLUSIVOS = PROPERTIES.slice(0, 4);

export default function ExclusividadesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="bg-primary pt-44 pb-24 px-6 lg:px-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')]" />
        <div className="max-w-[1440px] mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 border border-secondary/30 rounded">
            <Lock size={11} className="text-secondary" />
            <span className="text-secondary text-[9px] font-sans font-bold uppercase tracking-[0.4em]">
              Representação Única
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-serif text-white leading-none mb-8">
            <em className="italic">Exclusivi</em>dades
          </h1>
          <p className="text-white/40 font-serif italic text-xl max-w-xl mx-auto leading-relaxed">
            &ldquo;Imóveis com representação exclusiva. Oportunidades que você encontra somente aqui.&rdquo;
          </p>
        </div>
      </section>

      {/* Exclusive Badge Info */}
      <section className="py-12 px-6 lg:px-10 bg-secondary/5 border-y border-secondary/10">
        <div className="max-w-[1440px] mx-auto text-center">
          <p className="text-secondary text-sm font-serif italic">
            Nossos imóveis exclusivos não aparecem em outros portais. Cada um passou por uma curadoria rigorosa de localização, estado de conservação e potencial de valorização.
          </p>
        </div>
      </section>

      {/* Exclusive Grid */}
      <section className="py-20 px-6 lg:px-10 bg-surface-container-low">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {EXCLUSIVOS.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>

          {/* CTA */}
          <div className="mt-20 text-center py-20 border-t border-black/5">
            <span className="text-secondary text-[10px] font-sans font-bold uppercase tracking-[0.4em] mb-4 block">
              Lista VIP
            </span>
            <h2 className="text-4xl font-serif text-primary mb-4 leading-tight">
              Receba exclusividades<br />antes de todos
            </h2>
            <p className="text-primary/50 font-serif italic mb-8 max-w-sm mx-auto">
              Entre em nossa lista VIP e receba oportunidades exclusivas antes de entrarem no mercado.
            </p>
            <a
              href={WHATSAPP_MESSAGES.geral}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 bg-secondary text-white text-[10px] font-bold uppercase tracking-widest rounded hover:bg-secondary/90 transition-all duration-300 cursor-pointer"
            >
              Quero Entrar na Lista VIP
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
