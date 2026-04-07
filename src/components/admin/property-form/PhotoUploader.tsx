'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  defaultDropAnimationSideEffects,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Trash2, Star, GripVertical } from 'lucide-react';

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

/* ──────────────── SORTABLE ITEM COMPONENT ──────────────── */

interface SortablePhotoProps {
  photo: Photo;
  onRemove: (id: string) => void;
  onSetMain: (id: string) => void;
}

function SortablePhoto({ photo, onRemove, onSetMain }: SortablePhotoProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: photo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
    zIndex: isDragging ? 50 : undefined,
    opacity: isDragging ? 0.3 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        relative aspect-square bg-[#F9FCFF] border overflow-hidden group rounded-sm
        ${photo.isMain ? 'border-[#775A19] ring-1 ring-[#775A19]/20' : 'border-[#002B49]/5'}
        ${isDragging ? 'shadow-2xl' : 'shadow-sm'}
        transition-shadow duration-300
      `}
    >
      <Image 
        src={photo.preview} 
        alt="Preview" 
        fill 
        className="object-cover transition-transform duration-700 group-hover:scale-105" 
      />
      
      {/* Handle for Dragging */}
      <div 
        {...attributes} 
        {...listeners} 
        className="absolute inset-0 cursor-grab active:cursor-grabbing z-10"
        title="Arraste para reordenar"
      />

      {/* Badge Main */}
      {photo.isMain && (
        <div className="absolute top-2 left-2 px-2 py-1 bg-[#775A19] text-white font-noto text-[8px] uppercase tracking-widest z-20 flex items-center gap-1 shadow-md">
          <Star size={8} fill="currentColor" />
          Foto Principal
        </div>
      )}

      {/* Overlay Controls (Always visible/responsive icons for speed) */}
      <div className="absolute top-2 right-2 z-20 flex gap-1 items-start">
        {!photo.isMain && (
           <button 
           onClick={(e) => { e.stopPropagation(); onSetMain(photo.id); }}
           className="p-1.5 bg-white/80 hover:bg-[#775A19] text-[#775A19] hover:text-white backdrop-[blur(4px)] rounded-md transition-all shadow-sm group/btn"
           title="Definir como principal"
         >
           <Star size={14} className="group-hover/btn:scale-110 transition-transform" />
         </button>
        )}
        <button 
          onClick={(e) => { e.stopPropagation(); onRemove(photo.id); }}
          className="p-1.5 bg-white/80 hover:bg-red-600 text-red-600 hover:text-white backdrop-[blur(4px)] rounded-md transition-all shadow-sm group/btn"
          title="Remover foto"
        >
          <Trash2 size={14} className="group-hover/btn:scale-110 transition-transform" />
        </button>
      </div>

      {/* Drag Indicator (Visual reinforcement) */}
      <div className="absolute bottom-2 left-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="bg-black/40 backdrop-blur-md p-1 rounded text-white/80">
          <GripVertical size={14} />
        </div>
      </div>
    </div>
  );
}

/* ──────────────── MAIN COMPONENT ──────────────── */

export default function PhotoUploader({ photos, setPhotos }: PhotoUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Sensibilidade: arrastar precisa mover 8px pra começar (évita cliques acidentais)
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    
    const newPhotos: Photo[] = Array.from(files).map(file => ({
      id: Math.random().toString(36).substr(2, 9) + Date.now(),
      file,
      preview: URL.createObjectURL(file),
      isMain: false
    }));

    if (photos.length === 0 && newPhotos.length > 0) {
      newPhotos[0].isMain = true;
    }

    const updated = [...photos, ...newPhotos];
    if (typeof setPhotos === 'function') (setPhotos as any)(updated);
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    
    if (over && active.id !== over.id) {
      const oldIndex = photos.findIndex((p) => p.id === active.id);
      const newIndex = photos.findIndex((p) => p.id === over.id);
      
      const newPhotos = arrayMove(photos, oldIndex, newIndex);
      if (typeof setPhotos === 'function') (setPhotos as any)(newPhotos);
    }
  };

  const removePhoto = (id: string) => {
    const updated = photos.filter(p => p.id !== id);
    if (updated.length > 0 && !updated.find(p => p.isMain)) {
      updated[0].isMain = true;
    }
    if (typeof setPhotos === 'function') (setPhotos as any)(updated);
  };

  const setMain = (id: string) => {
    const updated = photos.map(p => ({ ...p, isMain: p.id === id }));
    if (typeof setPhotos === 'function') (setPhotos as any)(updated);
  };

  return (
    <div className="space-y-8">
      {/* Upload Zone */}
      <div 
        onDragOver={(e) => { e.preventDefault(); setIsUploading(true); }}
        onDragLeave={() => setIsUploading(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsUploading(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => fileInputRef.current?.click()}
        className={`
          relative border-2 border-dashed h-56 flex flex-col items-center justify-center cursor-pointer
          transition-all duration-300 group rounded-xl
          ${isUploading ? 'bg-[#002B49]/5 border-[#775A19]' : 'border-[#002B49]/10 bg-slate-50 hover:bg-white hover:border-[#775A19]/30'}
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
        
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-white shadow-xl shadow-slate-200/50 rounded-2xl flex items-center justify-center mx-auto transition-transform group-hover:-translate-y-2 duration-500 border border-slate-100">
            <svg className="w-8 h-8 text-[#775A19]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
            </svg>
          </div>
          <div className="space-y-1">
            <p className="font-noto text-sm font-bold tracking-tight text-[#001629]">
              Agilidade no Processo: Arraste ou Selecione
            </p>
            <p className="font-manrope text-xs text-[#001629]/40">
              Solte suas fotos aqui para iniciar o upload instantâneo.
            </p>
          </div>
        </div>
      </div>

      {/* Sortable Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-lg text-[#001629]">Galeria Ordenável</h3>
          <span className="text-[10px] text-[#001629]/50 uppercase tracking-[0.2em] font-bold">
            {photos.length} fotos carregadas
          </span>
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={(e) => setActiveId(e.active.id as string)}
          onDragEnd={onDragEnd}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <SortableContext items={photos.map(p => p.id)} strategy={rectSortingStrategy}>
              {photos.map((photo) => (
                <SortablePhoto 
                  key={photo.id} 
                  photo={photo} 
                  onRemove={removePhoto} 
                  onSetMain={setMain} 
                />
              ))}
            </SortableContext>
          </div>

          <DragOverlay dropAnimation={{
            sideEffects: defaultDropAnimationSideEffects({
              styles: {
                active: {
                  opacity: '0.4',
                },
              },
            }),
          }}>
            {activeId ? (
              <div className="w-full h-full aspect-square relative rounded-lg overflow-hidden ring-4 ring-[#775A19] shadow-2xl opacity-90">
                <Image 
                  src={photos.find(p => p.id === activeId)?.preview || ''} 
                  alt="Dragging" 
                  fill 
                  className="object-cover" 
                />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>

        {photos.length === 0 && (
          <div className="h-40 border border-dashed border-slate-200 rounded-lg flex items-center justify-center text-slate-400 text-xs italic">
            Nenhuma foto selecionada até o momento.
          </div>
        )}
      </div>
    </div>
  );
}
