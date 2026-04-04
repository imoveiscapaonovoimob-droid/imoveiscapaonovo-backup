import React from "react";
import { PropertyCard } from "./PropertyCard";
import { PROPERTIES } from "@/data/properties";
import Link from "next/link";

export const PropertyGrid = () => {
  return (
    <section className="py-20 px-6 lg:px-10 bg-surface-container-low">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <span className="text-secondary text-[10px] font-sans font-bold uppercase tracking-[0.4em] mb-2 block">
              Oportunidades
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-primary leading-tight">
              Novos Agenciamentos
            </h2>
          </div>

          <Link
            href="/imoveis-capao-novo"
            className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-primary hover:text-secondary transition-colors duration-300 border-b border-primary/20 hover:border-secondary pb-1"
          >
            Ver portfólio completo
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {PROPERTIES.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
      </div>
    </section>
  );
};
