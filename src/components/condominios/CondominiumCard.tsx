"use client";

import React from "react";
import CloudinaryImage from "@/components/ui/CloudinaryImage";
import { MapPin, Building2 } from "lucide-react";
import Link from "next/link";

interface CondominiumCardProps {
  slug: string;
  name: string;
  location: string;
  image: string;
  disposition?: string;
}

export const CondominiumCard = ({ slug, name, location, image = "/images/placeholder-property.jpg", disposition }: CondominiumCardProps) => {
  return (
    <Link
      href={`/condominios/${slug}`}
      className="group block relative w-full aspect-[4/5] sm:aspect-[3/4] rounded-lg overflow-hidden cursor-pointer"
    >
      <div className="absolute inset-0 w-full h-full z-0">
        <CloudinaryImage
          src={image}
          size="list"
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-black/10 transition-opacity duration-700 opacity-80 group-hover:opacity-100" />
      </div>

      {disposition && (
        <div className="absolute top-0 left-0 right-0 p-4 sm:p-5 flex items-start z-10">
          <span className="px-2 sm:px-3 py-1 sm:py-1.5 text-[8px] sm:text-[9px] font-sans font-bold uppercase tracking-[0.3em] rounded bg-black/40 backdrop-blur-md border border-white/20 text-white shadow-sm">
            {disposition}
          </span>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-10 flex flex-col justify-end sm:translate-y-3 sm:group-hover:translate-y-0 transition-transform duration-500 ease-out">
        <div className="flex items-center gap-4 sm:gap-5 text-white/70 mb-3 sm:mb-4 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500 delay-75">
          <div className="flex items-center gap-1.5">
            <MapPin size={12} className="text-secondary" />
            <span className="text-[9px] font-sans font-bold uppercase tracking-[0.3em] truncate max-w-[140px]">
              {location}
            </span>
          </div>
        </div>

        <h3 className="text-lg sm:text-xl md:text-2xl font-serif text-white leading-tight mb-2 sm:mb-3 pr-4 drop-shadow-md flex items-center gap-2">
          <Building2 size={18} className="text-secondary shrink-0" />
          {name}
        </h3>

        <div className="flex items-center justify-end pt-3 sm:pt-4 mt-1 sm:mt-2 border-t border-white/20">
          <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-secondary hidden sm:flex sm:opacity-0 sm:-translate-x-4 sm:group-hover:opacity-100 sm:group-hover:translate-x-0 transition-all duration-500 delay-150 items-center gap-2">
            Conhecer Condomínio
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
