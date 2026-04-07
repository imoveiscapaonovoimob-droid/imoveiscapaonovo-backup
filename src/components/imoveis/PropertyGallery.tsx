'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import CloudinaryImage from '@/components/ui/CloudinaryImage';
import { ChevronLeft, ChevronRight, X, Camera } from 'lucide-react';

interface PropertyImage {
  url: string;
  isMain?: boolean;
}

interface PropertyGalleryProps {
  title: string;
  images: PropertyImage[];
  mainImageFallback: string;
}

export function PropertyGallery({ title, images, mainImageFallback }: PropertyGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') setIsOpen(false);
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, nextImage, prevImage]);

  const allImages = images && images.length > 0 ? images : [{ url: mainImageFallback }];
  const mainImg = allImages.find((img) => img.isMain) || allImages[0];
  const mainIdx = allImages.indexOf(mainImg);
  const totalCount = allImages.length;

  const openAt = (idx: number) => {
    setCurrentIndex(idx);
    setIsOpen(true);
  };

  /* ── LIGHTBOX ─────────────────────────────────────────────── */
  const modal = isOpen ? (
    <div className="fixed inset-0 z-[99999] bg-black/98 flex flex-col" onClick={() => setIsOpen(false)}>
      <div className="flex items-center justify-between px-6 py-4 shrink-0" onClick={(e) => e.stopPropagation()}>
        <span className="text-white/40 text-xs font-black tracking-[0.3em] uppercase">
          {currentIndex + 1} / {totalCount}
        </span>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white/50 hover:text-white transition-all p-2 hover:rotate-90"
        >
          <X size={32} />
        </button>
      </div>

      <div className="flex-1 relative flex items-center justify-center px-4 md:px-20 py-2" onClick={(e) => e.stopPropagation()}>
        {totalCount > 1 && (
          <button
            onClick={prevImage}
            className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 bg-white/5 hover:bg-white/20 text-white rounded-full p-4 transition-all z-10 backdrop-blur-md border border-white/10"
          >
            <ChevronLeft size={40} />
          </button>
        )}
        <div className="relative w-full h-full">
          <CloudinaryImage
            size="full"
            src={allImages[currentIndex].url}
            alt={`${title} - Foto ${currentIndex + 1}`}
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        </div>
        {totalCount > 1 && (
          <button
            onClick={nextImage}
            className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 bg-white/5 hover:bg-white/20 text-white rounded-full p-4 transition-all z-10 backdrop-blur-md border border-white/10"
          >
            <ChevronRight size={40} />
          </button>
        )}
      </div>

      {totalCount > 1 && (
        <div className="shrink-0 px-6 pb-10 pt-4" onClick={(e) => e.stopPropagation()}>
          <div className="flex gap-3 overflow-x-auto justify-center scrollbar-none">
            {allImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`relative shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  i === currentIndex ? 'border-[#C9A96E] scale-110 shadow-lg brightness-110' : 'border-transparent opacity-30 hover:opacity-100 hover:scale-105'
                }`}
              >
                <CloudinaryImage size="thumbnail" src={img.url} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  ) : null;

  /* ── SMART GRID LOGIC ───────────────────────────────────────── */
  // Determine layout based on image count
  const renderDesktopGrid = () => {
    if (totalCount === 1) {
      return (
        <div className="w-full h-[540px] relative cursor-pointer group" onClick={() => openAt(0)}>
          <CloudinaryImage size="full" src={allImages[0].url} alt={title} fill className="object-cover rounded-2xl" />
        </div>
      );
    }

    if (totalCount === 2) {
      return (
        <div className="grid grid-cols-2 gap-1.5 h-[540px] rounded-2xl overflow-hidden">
          {allImages.map((img, i) => (
            <div key={i} className="relative cursor-pointer group overflow-hidden" onClick={() => openAt(i)}>
              <CloudinaryImage size="full" src={img.url} alt={title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </div>
          ))}
        </div>
      );
    }

    // Default: 1 main + others (up to 4 small)
    // We'll use a dynamic grid based on how many "small" images we have
    const smallImages = allImages.filter((_, i) => i !== mainIdx).slice(0, 4);
    const smallCount = smallImages.length;
    
    // Grid class based on count of small images:
    // 1 -> 1 col, 1 row
    // 2 -> 1 col, 2 rows
    // 3,4 -> 2 cols, 2 rows
    const smallGridClass = smallCount <= 2 ? 'grid-cols-1' : 'grid-cols-2';
    const smallRowsClass = smallCount === 1 ? 'grid-rows-1' : 'grid-rows-2';

    return (
      <div className="grid grid-cols-[2fr_1fr] md:grid-cols-[2.5fr_1fr] lg:grid-cols-[3fr_1.2fr] gap-2 h-[540px] rounded-2xl overflow-hidden">
        {/* Main Large Image */}
        <div className="relative cursor-pointer overflow-hidden group" onClick={() => openAt(mainIdx)}>
          <CloudinaryImage 
            size="full" 
            src={mainImg.url} 
            alt={title} 
            fill 
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" 
            priority 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Dynamic Small Grid */}
        <div className={`grid ${smallGridClass} ${smallRowsClass} gap-2`}>
          {smallImages.map((img, i) => {
            const isLast = i === smallImages.length - 1;
            const remaining = totalCount - (smallCount + 1);
            const realIdx = allImages.indexOf(img);
            
            return (
              <div key={i} className="relative cursor-pointer overflow-hidden group" onClick={() => openAt(realIdx)}>
                <CloudinaryImage 
                  size="list" 
                  src={img.url} 
                  alt={`${title} - Foto ${i + 2}`} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                
                {isLast && remaining > 0 ? (
                  <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-1 hover:bg-black/70 transition-all duration-300 backdrop-blur-[2px]">
                    <Camera size={26} className="text-accent animate-pulse" />
                    <span className="text-white font-black text-2xl">+{remaining}</span>
                    <span className="text-white/60 text-[10px] font-black uppercase tracking-[0.2em]">fotos</span>
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-500" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="w-full select-none">
        {/* Desktop Layout */}
        <div className="hidden md:block">
          {renderDesktopGrid()}
        </div>

        {/* Mobile: Elegant Horizontal Strip */}
        <div className="md:hidden">
          <div className="flex gap-2 overflow-x-auto snap-x snap-mandatory rounded-2xl h-[340px] scrollbar-none items-center">
            {allImages.slice(0, 5).map((img, i) => (
              <div
                key={i}
                className="relative shrink-0 w-[85vw] h-full snap-center cursor-pointer rounded-2xl overflow-hidden shadow-xl"
                onClick={() => openAt(i)}
              >
                <CloudinaryImage
                  size="list"
                  src={img.url}
                  alt={`${title} - Foto ${i + 1}`}
                  fill
                  className="object-cover"
                  priority={i === 0}
                />
                <div className="absolute top-4 right-4 bg-black/50 text-white text-[10px] px-2 py-1 rounded-md font-bold backdrop-blur-md">
                  {i + 1} / {totalCount}
                </div>
              </div>
            ))}
            {totalCount > 5 && (
              <div 
                className="shrink-0 w-[50vw] h-full snap-center bg-[#001629] rounded-2xl flex flex-col items-center justify-center gap-4 cursor-pointer active:scale-95 transition-transform"
                onClick={() => openAt(5)}
              >
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                  <Camera size={24} />
                </div>
                <span className="text-white text-xs font-black uppercase tracking-widest">+ {totalCount - 5} Fotos</span>
              </div>
            )}
          </div>
        </div>

        {/* Premium Floating "View All" Pill */}
        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={() => openAt(0)}
            className="group flex items-center gap-3 bg-white hover:bg-[#001629] text-[#001629] hover:text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-2xl border border-slate-100 hover:border-[#001629]"
          >
            <Camera size={16} className="text-accent group-hover:scale-110 transition-transform duration-500" />
            <span>Ver portfólio completo ({totalCount})</span>
          </button>
        </div>
      </div>

      {mounted && modal && createPortal(modal, document.body)}
    </>
  );
}
