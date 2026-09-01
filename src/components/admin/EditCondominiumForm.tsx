'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import FormInput from '@/components/admin/property-form/FormInput';
import AmenitiesGrid from '@/components/admin/property-form/AmenitiesGrid';
import PhotoUploader from '@/components/admin/property-form/PhotoUploader';
import { updateCondominium } from '@/lib/actions/condominium.actions';
import { PROPERTY_LOCATIONS } from '@/constants/property-options';

interface Photo {
  id: string;
  file?: File;
  preview: string;
  isMain: boolean;
  public_id?: string;
  url?: string;
}

interface Props {
  condominium: any;
}

// ── Helpers (mesmo padrão visual de NewCondominiumForm) ────────────────────────
const SectionTitle = ({ icon, title, subtitle }: { icon: string; title: string; subtitle: string }) => (
  <div className="mb-8">
    <span className="text-2xl mr-3">{icon}</span>
    <h3 className="inline font-noto text-sm uppercase tracking-[0.25em] text-[#775A19]">{title}</h3>
    <p className="mt-1 font-manrope text-[10px] text-[#002B49]/40 tracking-widest uppercase">{subtitle}</p>
  </div>
);

const Select = ({
  label, value, onChange, options,
}: { label: string; value: string; onChange: (v: string) => void; options: { label: string; value: string }[] }) => (
  <div className="flex flex-col gap-2">
    <label className="font-noto text-xs uppercase tracking-[0.15em] text-[#002B49]/60">{label}</label>
    <select
      className="bg-[#F9FCFF] border-b border-[#002B49]/10 p-3 font-manrope text-sm text-[#002B49] focus:outline-none focus:border-[#775A19]"
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      <option value="">— Selecione —</option>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  </div>
);

export default function EditCondominiumForm({ condominium }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('');

  const [photos, setPhotos] = useState<Photo[]>(
    (condominium.images || []).map((img: any) => ({
      id: img.public_id,
      preview: img.url,
      isMain: img.isMain,
      public_id: img.public_id,
    }))
  );

  const [formData, setFormData] = useState({
    name: condominium.name || '',
    description: condominium.description || '',
    disposition: condominium.disposition || 'vertical',
    location: condominium.location || 'Capão Novo',
    address: condominium.address || '',
    amenities: (condominium.amenities || []) as string[],
    builder: condominium.builder || '',
    adminCompany: condominium.adminCompany || '',
    builtYear: condominium.builtYear || '',
    totalArea: String(condominium.totalArea || ''),
    isPublished: condominium.isPublished ?? true,
    isFeatured: condominium.isFeatured ?? false,
    // Acesso exclusivo do corretor — não aparece no site
    concierge: condominium.broker?.concierge || '',
    caretaker: condominium.broker?.caretaker || '',
  });

  const updateField = (field: string, value: any) => setFormData(f => ({ ...f, [field]: value }));

  const handleSubmit = async () => {
    if (!formData.name.trim()) { alert('O nome do condomínio é obrigatório.'); return; }

    setLoading(true);
    setUploadProgress(0);
    setUploadStatus('Preparando...');

    try {
      const finalImages: any[] = [];

      const uploadSinglePhoto = async (photo: any, index: number) => {
        if (photo.public_id && !photo.file) {
          return { url: photo.preview || photo.url, public_id: photo.public_id, isMain: photo.isMain };
        }
        setUploadStatus(`Enviando foto ${index + 1} de ${photos.length}...`);
        const sigRes = await fetch('/api/upload/signature');
        const sigData = await sigRes.json();
        if (!sigRes.ok) throw new Error(`Falha na autorização para a foto ${index + 1}`);

        const fd = new FormData();
        fd.append('file', photo.file);
        fd.append('api_key', sigData.api_key);
        fd.append('timestamp', sigData.timestamp);
        fd.append('signature', sigData.signature);
        fd.append('folder', sigData.folder);

        const res = await fetch(`https://api.cloudinary.com/v1_1/${sigData.cloud_name}/image/upload`, {
          method: 'POST',
          body: fd,
        });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(`Upload Falhou (${index + 1}): ${err.error?.message || 'Erro no Cloudinary'}`);
        }
        const data = await res.json();
        return { url: data.secure_url, public_id: data.public_id, isMain: photo.isMain };
      };

      for (let i = 0; i < photos.length; i += 3) {
        const batch = photos.slice(i, i + 3).map((p, idx) => uploadSinglePhoto(p, i + idx));
        const results = await Promise.all(batch);
        finalImages.push(...results);
        setUploadProgress(Math.round(((i + batch.length) / Math.max(photos.length, 1)) * 100));
      }

      setUploadStatus('Salvando dados...');

      const result = await updateCondominium(condominium._id, {
        ...formData,
        images: finalImages,
      });

      if (result.success) {
        router.push('/admin/condominiums');
      } else {
        alert('Erro ao atualizar: ' + result.error);
      }
    } catch (err: any) {
      console.error(err);
      alert('Erro ao processar: ' + (err.message || 'Erro inesperado'));
    } finally {
      setLoading(false);
      setUploadStatus('');
    }
  };

  return (
    <div className="min-h-screen bg-white py-20 px-8 lg:px-24">
      <div className="max-w-4xl mx-auto mb-16">
        <button
          onClick={() => router.push('/admin/condominiums')}
          className="text-[#001629]/40 hover:text-[#001629] transition-colors text-xs uppercase tracking-widest font-manrope mb-6 block"
        >
          ← Condomínios
        </button>
        <h1 className="font-noto text-5xl text-[#002B49] mb-3 tracking-tighter">Editar Condomínio</h1>
        <p className="font-manrope text-sm text-[#002B49]/40 tracking-widest uppercase">{condominium.name}</p>
      </div>

      <div className="max-w-4xl mx-auto space-y-16">
        {/* Dados principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          <FormInput label="Nome do Condomínio *" value={formData.name}
            onChange={e => updateField('name', e.target.value)} className="md:col-span-2" />

          <Select label="Disposição" value={formData.disposition} onChange={v => updateField('disposition', v)}
            options={[{ label: 'Vertical', value: 'vertical' }, { label: 'Horizontal', value: 'horizontal' }]} />

          <Select label="Localização" value={formData.location} onChange={v => updateField('location', v)}
            options={PROPERTY_LOCATIONS.map(l => ({ label: l, value: l }))} />

          <FormInput label="Endereço" value={formData.address}
            onChange={e => updateField('address', e.target.value)} className="md:col-span-2" />

          <div className="md:col-span-2 flex flex-col gap-2">
            <label className="font-noto text-xs uppercase tracking-[0.15em] text-[#002B49]/60">Descrição</label>
            <textarea
              className="bg-[#F9FCFF] border-b border-[#002B49]/10 p-4 font-manrope text-sm text-[#002B49] focus:outline-none focus:border-[#775A19] min-h-[150px] tracking-wide leading-relaxed"
              value={formData.description}
              onChange={e => updateField('description', e.target.value)}
            />
          </div>
        </div>

        {/* Construção */}
        <div className="bg-[#F9FCFF] p-8 border border-[#002B49]/5">
          <SectionTitle icon="🏗️" title="Construção" subtitle="Construtora, ano e área total" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FormInput label="Construtora" value={formData.builder}
              onChange={e => updateField('builder', e.target.value)} />
            <FormInput label="Administradora" value={formData.adminCompany}
              onChange={e => updateField('adminCompany', e.target.value)} />
            <FormInput label="Construído em" value={formData.builtYear}
              onChange={e => updateField('builtYear', e.target.value)} placeholder="Ex: 2020" />
            <FormInput label="Área Total (m²)" type="number" value={formData.totalArea}
              onChange={e => updateField('totalArea', e.target.value)} />
          </div>
        </div>

        {/* Características */}
        <div>
          <SectionTitle icon="✨" title="Infraestrutura e Amenidades" subtitle="Selecione todos que se aplicam" />
          <AmenitiesGrid
            selectedAmenities={formData.amenities}
            onChange={list => updateField('amenities', list)}
          />
        </div>

        {/* Fotos */}
        <div>
          <SectionTitle icon="📸" title="Gestão de Imagens" subtitle="Adicione, remova ou reordene as fotos do condomínio" />
          <PhotoUploader photos={photos} setPhotos={setPhotos} />
          <p className="mt-4 text-[10px] text-[#002B49]/40 font-manrope uppercase tracking-widest">
            Usadas como reserva nos imóveis vinculados que não tiverem fotos próprias.
          </p>
        </div>

        {/* Administração — acesso exclusivo do corretor */}
        <div className="bg-[#F9FCFF] p-8 border border-[#002B49]/5">
          <SectionTitle icon="🔑" title="Administração" subtitle="Acesso exclusivo do corretor — não aparece no site" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormInput label="Síndico" value={formData.concierge}
              onChange={e => updateField('concierge', e.target.value)} />
            <FormInput label="Zelador" value={formData.caretaker}
              onChange={e => updateField('caretaker', e.target.value)} />
          </div>
        </div>

        {/* Publicação */}
        <div className="bg-[#002B49]/5 p-8 flex flex-col md:flex-row items-center justify-between gap-8 border border-[#002B49]/10">
          <SectionTitle icon="📢" title="Status da Publicação" subtitle="Controle visibilidade e destaque no site" />
          <div className="flex gap-8">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={formData.isPublished}
                onChange={e => updateField('isPublished', e.target.checked)}
                className="w-5 h-5 accent-[#002B49]" />
              <span className="font-noto text-[10px] uppercase tracking-widest text-[#002B49]">Anunciar Site</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={formData.isFeatured}
                onChange={e => updateField('isFeatured', e.target.checked)}
                className="w-5 h-5 accent-[#775A19]" />
              <span className="font-noto text-[10px] uppercase tracking-widest text-[#775A19]">Destaque</span>
            </label>
          </div>
        </div>

        {/* Ações */}
        <div className="flex justify-end gap-4 pt-8 border-t border-[#002B49]/5">
          <button
            type="button"
            onClick={() => router.push('/admin/condominiums')}
            className="px-8 py-4 border border-[#002B49]/20 text-[#002B49] text-[10px] font-manrope uppercase tracking-[0.3em] hover:border-[#002B49] transition-all"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="relative px-12 py-4 bg-[#775A19] text-white text-[10px] font-noto uppercase tracking-[0.4em] hover:bg-[#002B49] transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[220px]"
          >
            {loading ? (uploadStatus || `Salvando ${uploadProgress}%`) : 'Salvar Alterações'}
          </button>
        </div>
      </div>
    </div>
  );
}
