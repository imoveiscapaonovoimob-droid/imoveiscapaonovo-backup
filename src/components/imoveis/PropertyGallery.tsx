'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
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
        <Image
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

  return (
    <>
      {/* Thumbnail / Cover */}
      <div className="relative aspect-video overflow-hidden bg-slate-200 group">
        <Image
          src={mainImage}
          alt={title}
          fill
          className="object-cover"
        />
        <div className="absolute bottom-6 right-6">
          <button 
            onClick={() => {
              setCurrentIndex(0);
              setIsOpen(true);
            }}
            className="bg-white/90 backdrop-blur-md text-slate-900 px-6 py-3 text-xs font-black uppercase tracking-widest hover:bg-white transition-colors"
          >
            Ver todas as {images.length} fotos
          </button>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-50 p-2"
          >
            <X size={32} />
          </button>

          <div className="relative w-full h-full max-w-6xl max-h-[85vh] mx-auto flex items-center justify-center p-4">
            {images.length > 1 && (
              <button
                onClick={prevImage}
                className="absolute left-4 md:left-10 text-white/50 hover:text-white transition-colors z-50 p-2 bg-black/20 rounded-full hover:bg-black/50"
              >
                <ChevronLeft size={48} />
              </button>
            )}

            <div className="relative w-full h-full">
              <Image
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
                className="absolute right-4 md:right-10 text-white/50 hover:text-white transition-colors z-50 p-2 bg-black/20 rounded-full hover:bg-black/50"
              >
                <ChevronRight size={48} />
              </button>
            )}
          </div>

          <div className="absolute bottom-6 left-0 right-0 flex justify-center text-white/50 text-sm font-medium tracking-widest uppercase">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
