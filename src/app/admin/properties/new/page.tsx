'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import StepIndicator from '@/components/admin/property-form/StepIndicator';
import FormInput from '@/components/admin/property-form/FormInput';
import AmenitiesGrid from '@/components/admin/property-form/AmenitiesGrid';
import PhotoUploader from '@/components/admin/property-form/PhotoUploader';
import { createProperty } from '@/lib/actions/property.actions';
import { 
  PROPERTY_CATEGORIES, 
  PROPERTY_LOCATIONS, 
  BUILDING_POSITIONS, 
  CARDINAL_DIRECTIONS,
  PROPERTY_STREETS 
} from '@/constants/property-options';

const formatCurrency = (value: string | number) => {
  if (!value) return '';
  const amount = typeof value === 'string' ? value.replace(/\D/g, '') : value.toString();
  const options = { minimumFractionDigits: 2 };
  const result = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(parseFloat(amount) / 100);
  return result;
};

const parseCurrency = (value: string) => {
  return value.replace(/\D/g, '');
};

export default function NewPropertyPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState<any[]>([]);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    call: '',
    price: '',
    category: 'casa',
    location: 'Capão Novo',
    address: '',
    youtubeId: '',
    link360: '',
    features: { bedrooms: 0, suites: 0, bathrooms: 1, parking: 0, area: 0 },
    values: { condo: 0, iptu: 0 },
    buildingInfo: {
      year: '',
      floors: '',
      aptsPerFloor: '',
      totalApts: '',
      position: 'Frente',
      view: '',
      orientation: 'Norte',
      facade: '',
      opening: '',
      condition: '',
      isNeverInhabited: false,
      deliveryDate: '',
    },
    amenities: [] as string[],
    isPublished: true,
    isFeatured: false,
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Convert photos to base64 for server delivery
      const photosData = await Promise.all(
        photos.map(async (p) => {
          const base64 = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(p.file);
          });
          return { data: base64, isMain: p.isMain };
        })
      );

      const cleanData = {
        ...formData,
        price: parseFloat(parseCurrency(formData.price)) / 100,
        values: {
          condo: parseFloat(parseCurrency(formData.values.condo.toString())) / 100,
          iptu: parseFloat(parseCurrency(formData.values.iptu.toString())) / 100,
        },
        images: photosData
      };

      const result = await createProperty(cleanData);

      if (result.success) {
        router.push('/admin/dashboard');
      } else {
        alert('Erro ao salvar imóvel: ' + result.error);
      }
    } catch (error) {
      console.error(error);
      alert('Erro inesperado ao processar o formulário.');
    } finally {
      setLoading(false);
    }
  };

  const updateNested = (parent: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [parent]: { ...prev[parent as keyof typeof prev] as any, [field]: value }
    }));
  };

  return (
    <div className="min-h-screen bg-white py-20 px-8 lg:px-24">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-16">
        <h1 className="font-noto text-5xl text-[#002B49] brightness-125 mb-4 tracking-tighter">
          Novo Patrimônio
        </h1>
        <p className="font-manrope text-sm text-[#002B49]/40 tracking-widest uppercase">
          Curadoria da Vitrine Imobiliária
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <StepIndicator currentStep={step} />

        <div className="mt-20">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8"
              >
                <FormInput 
                  label="Título do Anúncio" 
                  placeholder="Ex: Mansão Neo-Clássica com Vista Mar" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="md:col-span-2"
                />
                <FormInput 
                  label="Chamada Marketing" 
                  placeholder="Ex: Oportunidade Única!" 
                  value={formData.call}
                  onChange={(e) => setFormData({...formData, call: e.target.value})}
                  className="md:col-span-2"
                />
                
                <div className="flex flex-col gap-2">
                  <label className="font-noto text-xs uppercase tracking-[0.15em] text-[#002B49]/60">Categoria</label>
                  <select 
                    className="bg-[#F9FCFF] border-b border-[#002B49]/10 p-3 font-manrope text-sm text-[#002B49] focus:outline-none focus:border-[#775A19]"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value as any})}
                  >
                    {PROPERTY_CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                </div>

                <FormInput 
                  label="Valor de Venda (R$)" 
                  placeholder="R$ 0,00" 
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: formatCurrency(e.target.value)})}
                />

                <div className="flex flex-col gap-2">
                  <label className="font-noto text-xs uppercase tracking-[0.15em] text-[#002B49]/60">Localização</label>
                  <select 
                    className="bg-[#F9FCFF] border-b border-[#002B49]/10 p-3 font-manrope text-sm text-[#002B49] focus:outline-none focus:border-[#775A19]"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                  >
                    {PROPERTY_LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-noto text-xs uppercase tracking-[0.15em] text-[#002B49]/60">Endereço / Referência</label>
                  <input 
                    list="streets"
                    className="bg-[#F9FCFF] border-b border-[#002B49]/10 p-3 font-manrope text-sm text-[#002B49] focus:outline-none focus:border-[#775A19]"
                    placeholder="Comece a digitar o nome da rua..."
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                  <datalist id="streets">
                    {PROPERTY_STREETS.map(s => <option key={s} value={s} />)}
                  </datalist>
                </div>

                <div className="md:col-span-2 flex flex-col gap-2">
                  <label className="font-noto text-xs uppercase tracking-[0.15em] text-[#002B49]/60">Descrição Detalhada</label>
                  <textarea 
                    className="bg-[#F9FCFF] border-b border-[#002B49]/10 p-4 font-manrope text-sm text-[#002B49] focus:outline-none focus:border-[#775A19] min-h-[150px] tracking-wide leading-relaxed"
                    placeholder="Descreva as qualidades arquitetônicas e diferenciais..." 
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-20"
              >
                {/* Features Row */}
                <div className="bg-[#F9FCFF] p-8 border border-[#002B49]/5">
                  <h3 className="font-noto text-xs uppercase tracking-[0.2em] text-[#775A19] mb-8">Características da Unidade</h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                    <FormInput label="Dormitórios" type="number" value={formData.features.bedrooms} onChange={(e) => updateNested('features', 'bedrooms', e.target.value)} />
                    <FormInput label="Suítes" type="number" value={formData.features.suites} onChange={(e) => updateNested('features', 'suites', e.target.value)} />
                    <FormInput label="Banheiros" type="number" value={formData.features.bathrooms} onChange={(e) => updateNested('features', 'bathrooms', e.target.value)} />
                    <FormInput label="Vagas" type="number" value={formData.features.parking} onChange={(e) => updateNested('features', 'parking', e.target.value)} />
                    <FormInput label="Área m²" type="number" value={formData.features.area} onChange={(e) => updateNested('features', 'area', e.target.value)} />
                  </div>
                </div>

                {/* Values and Building Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                  <div className="space-y-8">
                    <h3 className="font-noto text-xs uppercase tracking-[0.2em] text-[#775A19]">Valores Mensais</h3>
                    <div className="grid grid-cols-2 gap-8">
                      <FormInput 
                        label="Condomínio (R$)" 
                        placeholder="R$ 0,00"
                        value={formData.values.condo === 0 ? '' : formatCurrency(formData.values.condo)} 
                        onChange={(e) => updateNested('values', 'condo', formatCurrency(e.target.value))} 
                      />
                      <FormInput 
                        label="IPTU (R$)" 
                        placeholder="R$ 0,00"
                        value={formData.values.iptu === 0 ? '' : formatCurrency(formData.values.iptu)} 
                        onChange={(e) => updateNested('values', 'iptu', formatCurrency(e.target.value))} 
                      />
                    </div>
                  </div>

                  <div className="space-y-8">
                    <h3 className="font-noto text-xs uppercase tracking-[0.2em] text-[#775A19]">Detalhes do Edifício</h3>
                    <div className="grid grid-cols-2 gap-8">
                      <FormInput label="Ano Const." type="number" value={formData.buildingInfo.year || ''} onChange={(e) => updateNested('buildingInfo', 'year', e.target.value)} />
                      <div className="flex flex-col gap-2">
                        <label className="font-noto text-xs uppercase tracking-[0.15em] text-[#002B49]/60">Posição Solar</label>
                        <select 
                          className="bg-transparent border-b border-[#002B49]/10 p-3 font-manrope text-sm text-[#002B49] focus:outline-none focus:border-[#775A19]"
                          value={formData.buildingInfo.orientation}
                          onChange={(e) => updateNested('buildingInfo', 'orientation', e.target.value)}
                        >
                          {CARDINAL_DIRECTIONS.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                <div className="space-y-8">
                  <h3 className="font-noto text-xs uppercase tracking-[0.2em] text-[#775A19]">Infraestrutura e Amenidades</h3>
                  <AmenitiesGrid 
                    selectedAmenities={formData.amenities}
                    onChange={(list) => setFormData({...formData, amenities: list})}
                  />
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-16"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <FormInput label="ID YouTube (Ex: jNQXAC9IVRw)" value={formData.youtubeId} onChange={(e) => setFormData({...formData, youtubeId: e.target.value})} />
                  <FormInput label="Link Tour 360" value={formData.link360} onChange={(e) => setFormData({...formData, link360: e.target.value})} />
                </div>

                <div className="space-y-6">
                  <h3 className="font-noto text-xs uppercase tracking-[0.2em] text-[#775A19]">Galeria de Imagens</h3>
                  <PhotoUploader photos={photos} setPhotos={setPhotos} />
                </div>

                <div className="bg-[#002B49]/5 p-8 flex flex-col md:flex-row items-center justify-between gap-8 border border-[#002B49]/10">
                  <div className="space-y-2">
                    <p className="font-noto text-xs uppercase tracking-[0.2em] text-[#002B49]">Status da Publicação</p>
                    <p className="font-manrope text-[10px] text-[#002B49]/40 tracking-widest leading-relaxed">
                      Este imóvel será publicado imediatamente e poderá ser destacado na Home.
                    </p>
                  </div>
                  <div className="flex gap-8">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" checked={formData.isPublished} onChange={(e) => setFormData({...formData, isPublished: e.target.checked})} className="w-5 h-5 accent-[#002B49]" />
                      <span className="font-noto text-[10px] uppercase tracking-widest text-[#002B49]">Anunciar Site</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" checked={formData.isFeatured} onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})} className="w-5 h-5 accent-[#775A19]" />
                      <span className="font-noto text-[10px] uppercase tracking-widest text-[#775A19]">Destaque Home</span>
                    </label>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Buttons */}
        <div className="mt-20 flex justify-between pt-12 border-t border-[#002B49]/5">
          <button 
            type="button"
            onClick={step === 1 ? () => router.push('/admin/dashboard') : prevStep}
            className="group flex items-center gap-4 text-[#002B49]/40 hover:text-[#002B49] transition-all duration-500"
          >
            <div className="w-5 h-5 flex items-center justify-center border border-current rounded-full transition-transform group-hover:-translate-x-1">
              <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            <span className="font-noto text-[10px] uppercase tracking-[0.3em] font-medium">
              {step === 1 ? 'Cancelar' : 'Anterior'}
            </span>
          </button>

          <button 
            type="button"
            onClick={step === 3 ? handleSubmit : nextStep}
            disabled={loading}
            className={`
              relative px-12 py-5 bg-[#002B49] group overflow-hidden
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            <div className="absolute inset-0 bg-[#775A19] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="relative z-10 font-noto text-[10px] text-white uppercase tracking-[0.4em] transition-colors duration-500">
              {loading ? 'Processando...' : step === 3 ? 'Publicar Patrimônio' : 'Prosseguir'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
