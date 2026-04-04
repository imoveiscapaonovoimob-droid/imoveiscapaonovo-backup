'use client';

import { useState, useTransition } from 'react';
import { deleteProperty } from '@/lib/actions/property.actions';
import { useRouter } from 'next/navigation';

interface Property {
  _id: string;
  title: string;
  price: number;
  category: string;
  location: string;
  isPublished: boolean;
  isFeatured: boolean;
  images: { url: string; isMain: boolean }[];
  createdAt: string;
  slug: string;
}

interface Props {
  properties: Property[];
  categoryLabels: Record<string, string>;
}

export default function PropertyTable({ properties, categoryLabels }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    startTransition(async () => {
      const result = await deleteProperty(id);
      if (result.success) {
        router.refresh();
      } else {
        alert('Erro ao excluir: ' + result.error);
      }
      setDeletingId(null);
      setConfirmingId(null);
    });
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(price);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' });

  return (
    <div className="bg-white border border-[#001629]/5 overflow-hidden">
      {/* Table header */}
      <div className="grid grid-cols-[auto_1fr_120px_120px_100px_80px_80px_180px] gap-0 px-6 py-4 border-b border-[#001629]/5 bg-[#001629]/[0.02]">
        {['', 'Imóvel', 'Categoria', 'Localização', 'Valor', 'Publicado', 'Destaque', 'Ações'].map((h) => (
          <span key={h} className="font-manrope text-[9px] uppercase tracking-[0.25em] text-[#001629]/40">
            {h}
          </span>
        ))}
      </div>

      {/* Rows */}
      {properties.map((p) => {
        const mainImage = p.images?.find((img) => img.isMain)?.url || p.images?.[0]?.url;
        const isDeleting = deletingId === p._id;
        const isConfirming = confirmingId === p._id;

        return (
          <div
            key={p._id}
            className={`grid grid-cols-[auto_1fr_120px_120px_100px_80px_80px_180px] gap-0 px-6 py-4 border-b border-[#001629]/5 items-center transition-colors ${
              isDeleting ? 'opacity-40 bg-red-50' : 'hover:bg-[#001629]/[0.015]'
            }`}
          >
            {/* Thumbnail */}
            <div className="w-12 h-10 mr-4 bg-[#001629]/5 overflow-hidden shrink-0">
              {mainImage ? (
                <img src={mainImage} alt={p.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-[#001629]/20 text-xs">—</span>
                </div>
              )}
            </div>

            {/* Title */}
            <div className="min-w-0 pr-4">
              <p className="font-noto text-sm text-[#001629] truncate leading-tight">{p.title}</p>
              <p className="font-manrope text-[10px] text-[#001629]/30 mt-0.5">{formatDate(p.createdAt)}</p>
            </div>

            {/* Category */}
            <span className="font-manrope text-[10px] uppercase tracking-widest text-[#001629]/60">
              {categoryLabels[p.category] ?? p.category}
            </span>

            {/* Location */}
            <span className="font-manrope text-[10px] text-[#001629]/60 truncate">{p.location}</span>

            {/* Price */}
            <span className="font-manrope text-xs font-semibold text-[#001629]">{formatPrice(p.price)}</span>

            {/* Published dot */}
            <div className="flex justify-center">
              <span className={`w-2 h-2 rounded-full ${p.isPublished ? 'bg-emerald-400' : 'bg-[#001629]/20'}`} />
            </div>

            {/* Featured dot */}
            <div className="flex justify-center">
              <span className={`w-2 h-2 rounded-full ${p.isFeatured ? 'bg-[#775a19]' : 'bg-[#001629]/20'}`} />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 justify-end">
              {isConfirming ? (
                <>
                  <button
                    onClick={() => handleDelete(p._id)}
                    disabled={isDeleting}
                    className="px-2 py-1 bg-red-600 text-white text-[9px] uppercase tracking-widest font-manrope hover:bg-red-700 disabled:opacity-50 transition-colors"
                  >
                    {isDeleting ? '...' : 'Sim'}
                  </button>
                  <button
                    onClick={() => setConfirmingId(null)}
                    className="px-2 py-1 border border-[#001629]/20 text-[#001629]/60 text-[9px] uppercase tracking-widest font-manrope hover:border-[#001629]/60 transition-colors"
                  >
                    Não
                  </button>
                </>
              ) : (
                <>
                  {p.isPublished && (
                    <a
                      href={`/imoveis/${p.slug || p._id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Ver publicação no site"
                      className="px-3 py-1.5 border border-emerald-200 text-emerald-600 text-[9px] uppercase tracking-widest font-manrope hover:bg-emerald-50 hover:border-emerald-400 transition-colors flex items-center gap-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                      Ver
                    </a>
                  )}
                  <a
                    href={`/admin/properties/${p._id}/edit`}
                    className="px-3 py-1.5 border border-[#001629]/20 text-[#001629] text-[9px] uppercase tracking-widest font-manrope hover:border-[#775a19] hover:text-[#775a19] transition-colors"
                  >
                    Editar
                  </a>
                  <button
                    onClick={() => setConfirmingId(p._id)}
                    className="px-3 py-1.5 border border-red-200 text-red-400 text-[9px] uppercase tracking-widest font-manrope hover:bg-red-50 hover:border-red-400 transition-colors"
                  >
                    Excluir
                  </button>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
