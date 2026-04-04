"use client";

import React from "react";
import Image from "next/image";
import { Bed, Star, MapPin } from "lucide-react";
import Link from "next/link";

interface PropertyProps {
  id?: string;
  slug?: string;
  title: string;
  location: string;
  price: string | number;
  beds: string | number;
  image: string;
  tags: string[];
  isFeatured?: boolean;
}

export const PropertyCard = ({ id, slug, title, location, price, beds, image = "/images/placeholder-property.jpg", tags }: PropertyProps) => {
  const formatPrice = (val: string | number) => {
    if (typeof val === 'number') {
      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);
    }
    return val;
  };

  const formatBeds = (val: string | number) => {
    if (typeof val === 'number') return `${val} Dorm.`;
    return val;
  };

  return (
    <Link
      href={`/imoveis/${slug || id}`}
      className="group block relative w-full aspect-[4/5] sm:aspect-[3/4] rounded-lg overflow-hidden cursor-pointer"
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
        />
        {/* Soft, dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-black/10 transition-opacity duration-700 opacity-80 group-hover:opacity-100" />
      </div>

      {/* Top Elements (Unified Tags and Favorite) */}
      <div className="absolute top-0 left-0 right-0 p-4 sm:p-5 flex items-start justify-between z-10">
        <div className="flex flex-wrap gap-1.5 sm:gap-2 max-w-[75%]">
          {tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2 sm:px-3 py-1 sm:py-1.5 text-[8px] sm:text-[9px] font-sans font-bold uppercase tracking-[0.3em] rounded bg-black/40 backdrop-blur-md border border-white/20 text-white shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        <button
          onClick={(e) => { e.preventDefault(); }}
          className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center bg-black/40 backdrop-blur-md border border-white/20 text-white hover:text-secondary hover:bg-black/60 transition-all duration-300 rounded-full shadow-sm"
          aria-label="Favoritar"
        >
          <Star size={13} className="stroke-[1.5]" />
        </button>
      </div>

      {/* Bottom Content Area */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-10 flex flex-col justify-end sm:translate-y-3 sm:group-hover:translate-y-0 transition-transform duration-500 ease-out">
        
        {/* Location and Beds — always visible on mobile, hover-reveal on desktop */}
        <div className="flex items-center gap-4 sm:gap-5 text-white/70 mb-3 sm:mb-4 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500 delay-75">
          <div className="flex items-center gap-1.5">
            <MapPin size={12} className="text-secondary" />
            <span className="text-[9px] font-sans font-bold uppercase tracking-[0.3em] truncate max-w-[120px] sm:max-w-[140px]">
              {location}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bed size={12} className="text-secondary" />
            <span className="text-[9px] font-sans font-bold uppercase tracking-[0.3em]">
              {formatBeds(beds)}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl md:text-2xl font-serif text-white leading-tight mb-2 sm:mb-3 pr-4 drop-shadow-md">
          {title}
        </h3>

        {/* Price and Action */}
        <div className="flex items-center justify-between pt-3 sm:pt-4 mt-1 sm:mt-2 border-t border-white/20">
          <span className="text-xl sm:text-2xl font-serif text-white font-medium drop-shadow-md">{formatPrice(price)}</span>
          <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-secondary hidden sm:flex sm:opacity-0 sm:-translate-x-4 sm:group-hover:opacity-100 sm:group-hover:translate-x-0 transition-all duration-500 delay-150 items-center gap-2">
            Ver Detalhes
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
};
