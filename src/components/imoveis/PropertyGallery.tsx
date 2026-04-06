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

  const mainImgObj = images?.find((img) => img.isMain) || images?.[0];
  const mainImage = mainImgObj?.url || mainImageFallback;
  const otherImages = images?.filter(img => img.url !== mainImage) || [];

  if (!images || images.length === 0) {
    return (
      <div className="relative aspect-video overflow-hidden bg-slate-200 rounded-xl">
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
      {/* Container Principal */}
      <div className="relative grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 h-[300px] md:h-[500px] gap-2 rounded-2xl overflow-hidden group">
        
        {/* Esquerda: Imagem Principal (Ocupa 1 coluna inteira no mobile, 3 colunas e 2 linhas no desktop) */}
        <div 
          className="relative col-span-1 md:col-span-3 md:row-span-2 w-full h-full cursor-pointer overflow-hidden"
          onClick={() => {
            setCurrentIndex(images.findIndex(i => i.url === mainImage) >= 0 ? images.findIndex(i => i.url === mainImage) : 0);
            setIsOpen(true);
          }}
        >
          <CloudinaryImage
            size="full"
            src={mainImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
            priority
          />
          {/* Sombra de hover suave apenas para interatividade na foto principal */}
          <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
        </div>

        {/* Direita: Duas Imagens Menores (Ocultas no Mobile) */}
        {images.length > 1 && (
          <div className="hidden md:block relative col-span-1 row-span-1 w-full h-full cursor-pointer overflow-hidden"
               onClick={() => {
                 setCurrentIndex(images.findIndex(i => i.url === otherImages[0].url));
                 setIsOpen(true);
               }}>
            <CloudinaryImage
              size="list"
              src={otherImages[0].url}
              alt={`${title} - Foto 2`}
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
          </div>
        )}

        {images.length > 2 && (
          <div className="hidden md:block relative col-span-1 row-span-1 w-full h-full cursor-pointer overflow-hidden"
               onClick={() => {
                 setCurrentIndex(images.findIndex(i => i.url === otherImages[1].url));
                 setIsOpen(true);
               }}>
            <CloudinaryImage
              size="list"
              src={otherImages[1].url}
              alt={`${title} - Foto 3`}
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            {/* Overlay Escuro com o Botão para "+ Fotos" se houver mais de 3 */}
            {images.length > 3 ? (
              <div className="absolute inset-0 bg-black/30 hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                <span className="text-white font-bold text-xl tracking-wider">+ {images.length - 3}</span>
              </div>
            ) : (
              <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
            )}
          </div>
        )}

        {/* Botão flutuante para acessar todas rotas, especialmente p/ celular ou quando há fotos ocultas */}
        <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 z-10">
          <button 
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setCurrentIndex(0);
              setIsOpen(true);
            }}
            className="flex items-center gap-2 bg-white/90 backdrop-blur-md text-slate-900 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-white hover:scale-105 hover:shadow-2xl active:scale-95 transition-all shadow-xl cursor-pointer border border-slate-200/50"
          >
            <span>Ver todas</span>
            <span className="bg-slate-900 text-white px-2 py-0.5 rounded-md font-black">{images.length}</span>
          </button>
        </div>
      </div>

      {/* Fullscreen Modal using Portal */}
      {mounted && modalContent && createPortal(modalContent, document.body)}
    </>
  );
}
