'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import CloudinaryImage from '@/components/ui/CloudinaryImage';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

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

  useEffect(() => {
    setMounted(true);
  }, []);

  // Esc to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const mainImage = images?.find((img) => img.isMain)?.url || images?.[0]?.url || mainImageFallback;

  if (!images || images.length === 0) {
    return (
      <div className="relative aspect-video overflow-hidden bg-slate-200">
        <CloudinaryImage
          size="list"
          src={mainImageFallback}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
    );
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const modalContent = isOpen ? (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 backdrop-blur-sm">
      <button
        onClick={() => setIsOpen(false)}
        className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-50 p-4"
        aria-label="Fechar Galeria"
      >
        <X size={32} />
      </button>

      <div className="relative w-full h-full max-w-7xl max-h-[90vh] mx-auto flex items-center justify-center p-4 md:p-12">
        {images.length > 1 && (
          <button
            onClick={prevImage}
            className="absolute left-2 md:left-6 text-white/50 hover:text-white transition-colors z-50 p-3 bg-black/40 rounded-full hover:bg-black/80"
          >
            <ChevronLeft size={48} />
          </button>
        )}

        <div className="relative w-full h-full">
          <CloudinaryImage
            size="full"
            src={images[currentIndex].url}
            alt={`${title} - Foto ${currentIndex + 1}`}
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        </div>

        {images.length > 1 && (
          <button
            onClick={nextImage}
            className="absolute right-2 md:right-6 text-white/50 hover:text-white transition-colors z-50 p-3 bg-black/40 rounded-full hover:bg-black/80"
          >
            <ChevronRight size={48} />
          </button>
        )}
      </div>

      <div className="absolute bottom-6 left-0 right-0 flex justify-center text-white/50 text-sm font-medium tracking-widest uppercase">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  ) : null;

  return (
    <>
      {/* Thumbnail / Cover */}
      <div className="relative aspect-video overflow-hidden bg-slate-200 group">
        <CloudinaryImage
          size="list"
          src={mainImage}
          alt={title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
        <div className="absolute bottom-6 right-6 z-10">
          <button 
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setCurrentIndex(0);
              setIsOpen(true);
            }}
            className="bg-white/90 backdrop-blur-md text-slate-900 px-6 py-3 text-xs font-black uppercase tracking-widest hover:bg-white hover:scale-105 active:scale-95 transition-all shadow-xl cursor-pointer"
          >
            Ver todas as {images.length} fotos
          </button>
        </div>
      </div>

      {/* Fullscreen Modal using Portal */}
      {mounted && modalContent && createPortal(modalContent, document.body)}
    </>
  );
}
