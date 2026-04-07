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
  // right-side thumbnails: up to 6 images excluding main
  const thumbs = allImages.filter((_, i) => i !== mainIdx).slice(0, 6);
  const totalCount = allImages.length;

  const openAt = (idx: number) => {
    setCurrentIndex(idx);
    setIsOpen(true);
  };

  /* ── LIGHTBOX ─────────────────────────────────────────────── */
  const modal = isOpen ? (
    <div className="fixed inset-0 z-[99999] bg-black/96 flex flex-col" onClick={() => setIsOpen(false)}>
      {/* top bar */}
      <div className="flex items-center justify-between px-6 py-4 shrink-0" onClick={(e) => e.stopPropagation()}>
        <span className="text-white/50 text-sm font-medium tracking-widest uppercase">
          {currentIndex + 1} <span className="text-white/20">/ {totalCount}</span>
        </span>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white/50 hover:text-white transition-colors p-2"
          aria-label="Fechar"
        >
          <X size={28} />
        </button>
      </div>

      {/* image */}
      <div className="flex-1 relative flex items-center justify-center px-16 py-2" onClick={(e) => e.stopPropagation()}>
        {totalCount > 1 && (
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/25 text-white rounded-full p-3 transition-all z-10"
          >
            <ChevronLeft size={32} />
          </button>
        )}
        <div className="relative w-full h-full max-h-[75vh]">
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
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/25 text-white rounded-full p-3 transition-all z-10"
          >
            <ChevronRight size={32} />
          </button>
        )}
      </div>

      {/* filmstrip */}
      {totalCount > 1 && (
        <div className="shrink-0 px-6 pb-6 pt-2" onClick={(e) => e.stopPropagation()}>
          <div className="flex gap-2 overflow-x-auto justify-center">
            {allImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`relative shrink-0 w-16 h-12 rounded overflow-hidden border-2 transition-all ${
                  i === currentIndex ? 'border-[#C9A96E] opacity-100' : 'border-transparent opacity-40 hover:opacity-70'
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

  /* ── GRID LAYOUT ──────────────────────────────────────────── */
  return (
    <>
      <div className="w-full">
        {/* Desktop: 1 big + grid of 6 */}
        <div className="hidden md:grid grid-cols-[3fr_2fr] gap-1.5 h-[540px] rounded-2xl overflow-hidden">

          {/* Main large image */}
          <div
            className="relative cursor-pointer overflow-hidden group"
            onClick={() => openAt(mainIdx)}
          >
            <CloudinaryImage
              size="full"
              src={mainImg.url}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Right: 2 cols × 3 rows = 6 thumbs */}
          <div className="grid grid-cols-2 grid-rows-3 gap-1.5">
            {Array.from({ length: 6 }).map((_, i) => {
              const img = thumbs[i];
              const isLast = i === 5;
              const remaining = totalCount - 7; // >main + 6 thumbs
              if (!img) return <div key={i} className="bg-slate-100 rounded" />;

              const realIdx = allImages.indexOf(img);
              return (
                <div
                  key={i}
                  className="relative cursor-pointer overflow-hidden group"
                  onClick={() => openAt(realIdx)}
                >
                  <CloudinaryImage
                    size="list"
                    src={img.url}
                    alt={`${title} - Foto ${i + 2}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  />
                  {/* Last cell overlay: show "+N FOTOS" if there are more */}
                  {isLast && remaining > 0 ? (
                    <div className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center gap-1 hover:bg-black/65 transition-colors">
                      <Camera size={22} className="text-white/80" />
                      <span className="text-white font-black text-xl leading-none">+{remaining}</span>
                      <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest">fotos</span>
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile: horizontal scroll strip */}
        <div className="flex md:hidden gap-2 overflow-x-auto snap-x snap-mandatory rounded-xl h-[260px] scrollbar-none">
          {allImages.map((img, i) => (
            <div
              key={i}
              className="relative shrink-0 w-[80vw] h-full snap-center cursor-pointer rounded-xl overflow-hidden"
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
            </div>
          ))}
        </div>

        {/* Pill: "Ver todas X fotos" */}
        <div className="flex justify-end mt-3">
          <button
            type="button"
            onClick={() => openAt(0)}
            className="flex items-center gap-2 bg-white border border-slate-200 shadow-sm text-slate-800 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:shadow-md hover:bg-[#001629] hover:text-white hover:border-[#001629] transition-all duration-300 cursor-pointer"
          >
            <Camera size={14} />
            Ver todas as {totalCount} fotos
          </button>
        </div>
      </div>

      {mounted && modal && createPortal(modal, document.body)}
    </>
  );
}
