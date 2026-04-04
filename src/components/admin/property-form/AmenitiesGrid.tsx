'use client';

import React from 'react';
import { AMENITIES_LIST } from '@/constants/property-options';

interface AmenitiesGridProps {
  selectedAmenities: string[];
  onChange: (amenities: string[]) => void;
}

export default function AmenitiesGrid({ selectedAmenities, onChange }: AmenitiesGridProps) {
  const categories = Array.from(new Set(AMENITIES_LIST.map(a => a.category)));

  const toggleAmenity = (id: string) => {
    if (selectedAmenities.includes(id)) {
      onChange(selectedAmenities.filter(a => a !== id));
    } else {
      onChange([...selectedAmenities, id]);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
      {categories.map((category) => (
        <div key={category} className="space-y-6">
          <h3 className="font-noto text-xs uppercase tracking-[0.2em] text-[#775A19] border-b border-[#775A19]/10 pb-4">
            {category}
          </h3>
          <div className="grid grid-cols-1 gap-y-3">
            {AMENITIES_LIST.filter(a => a.category === category).map((amenity) => {
              const isChecked = selectedAmenities.includes(amenity.id);
              
              return (
                <label 
                  key={amenity.id} 
                  className={`
                    flex items-center gap-4 cursor-pointer group 
                    transition-all duration-300
                    hover:translate-x-1
                  `}
                >
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      checked={isChecked}
                      onChange={() => toggleAmenity(amenity.id)}
                    />
                    <div className={`
                      w-5 h-5 border transition-all duration-300
                      ${isChecked ? 'bg-[#002B49] border-[#002B49]' : 'bg-white border-[#002B49]/20'}
                      group-hover:border-[#775A19]
                    `} />
                    {isChecked && (
                      <svg 
                        className="absolute inset-0 m-auto w-3 h-3 text-white pointer-events-none" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor" 
                        strokeWidth={3}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className={`
                    font-manrope text-sm tracking-wide transition-colors duration-300
                    ${isChecked ? 'text-[#002B49] font-medium' : 'text-[#002B49]/50'}
                    group-hover:text-[#002B49]
                  `}>
                    {amenity.label}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
