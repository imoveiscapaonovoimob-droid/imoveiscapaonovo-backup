'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface Photo {
  id: string; // local id
  file?: File;
  preview: string;
  url?: string; // Para imagens vindas do banco
  isMain: boolean;
  public_id?: string; // Para imagens já existentes no Cloudinary
}

interface PhotoUploaderProps {
  photos: Photo[];
  setPhotos: React.Dispatch<React.SetStateAction<Photo[]>> | ((photos: Photo[]) => void);
}

export default function PhotoUploader({ photos, setPhotos }: PhotoUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    
    const newPhotos: Photo[] = Array.from(files).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file),
      isMain: false
    }));

    // If no photos yet, set first as main
    if (photos.length === 0 && newPhotos.length > 0) {
      newPhotos[0].isMain = true;
    }

    const updated = [...photos, ...newPhotos];
    if (typeof setPhotos === 'function') (setPhotos as any)(updated);
  };

  const removePhoto = (id: string) => {
    const updated = photos.filter(p => {
      if (p.id === id) {
        if (p.preview.startsWith('blob:')) {
          URL.revokeObjectURL(p.preview);
        }
        return false;
      }
      return true;
    });

    // If main was removed, set next as main
    if (updated.length > 0 && !updated.find(p => p.isMain)) {
      updated[0].isMain = true;
    }

    if (typeof setPhotos === 'function') {
      (setPhotos as any)(updated);
    }
  };

  const setMain = (id: string) => {
    const updated = photos.map(p => ({ ...p, isMain: p.id === id }));
    if (typeof setPhotos === 'function') (setPhotos as any)(updated);
  };

  const moveLeft = (index: number) => {
    if (index === 0) return;
    const newPhotos = [...photos];
    [newPhotos[index - 1], newPhotos[index]] = [newPhotos[index], newPhotos[index - 1]];
    if (typeof setPhotos === 'function') (setPhotos as any)(newPhotos);
  };

  const moveRight = (index: number) => {
    if (index === photos.length - 1) return;
    const newPhotos = [...photos];
    [newPhotos[index + 1], newPhotos[index]] = [newPhotos[index], newPhotos[index + 1]];
    if (typeof setPhotos === 'function') (setPhotos as any)(newPhotos);
  };

  return (
    <div className="space-y-8">
      {/* Upload Zone */}
      <div 
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => fileInputRef.current?.click()}
        className={`
          relative border h-48 flex flex-col items-center justify-center cursor-pointer
          transition-all duration-500 group
          ${isDragging ? 'bg-[#002B49]/5 border-[#775A19] scale-[1.01]' : 'border-[#002B49]/10 hover:border-[#775A19]/30'}
        `}
      >
        <input 
          type="file" 
          multiple 
          hidden 
          ref={fileInputRef} 
          accept="image/*"
          onChange={(e) => handleFiles(e.target.files)} 
        />
        
        <div className="text-center space-y-3">
          <div className="w-12 h-12 bg-[#002B49]/5 flex items-center justify-center mx-auto transition-transform group-hover:-translate-y-1 duration-500">
            <svg className="w-6 h-6 text-[#775A19]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
            </svg>
          </div>
          <p className="font-noto text-xs tracking-widest text-[#002B49]/60 uppercase">
            Arraste suas fotos ou clique para selecionar
          </p>
          <p className="font-manrope text-[10px] text-[#002B49]/30 tracking-wider">
            Arquivos suportados: JPG, PNG, WEBP.
          </p>
        </div>
      </div>

      {/* Preview Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        <AnimatePresence>
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`
                relative aspect-square bg-[#F9FCFF] border overflow-hidden group
                ${photo.isMain ? 'border-[#775A19] shadow-lg shadow-[#775A19]/10' : 'border-[#002B49]/5'}
              `}
            >
              <Image 
                src={photo.preview} 
                alt={`Preview ${index}`} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              
              {/* Badge Main */}
              {photo.isMain && (
                <div className="absolute top-2 left-2 px-2 py-1 bg-[#775A19] text-white font-noto text-[8px] uppercase tracking-widest z-10">
                  Principal
                </div>
              )}

              {/* Overlay Controls */}
              <div className="absolute inset-0 bg-[#002B49]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3">
                <button 
                  onClick={() => removePhoto(photo.id)}
                  className="self-end text-white/60 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="flex justify-between items-center bg-white/10 backdrop-blur-md p-1 border border-white/10">
                  <div className="flex gap-1">
                    <button 
                      onClick={() => moveLeft(index)}
                      className="p-1 text-white hover:text-[#775A19] disabled:opacity-20"
                      disabled={index === 0}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => moveRight(index)}
                      className="p-1 text-white hover:text-[#775A19] disabled:opacity-20"
                      disabled={index === photos.length - 1}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                  
                  {!photo.isMain && (
                    <button 
                      onClick={() => setMain(photo.id)}
                      className="font-noto text-[8px] text-white uppercase tracking-widest hover:text-[#775A19] transition-colors"
                    >
                      Destacar
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
