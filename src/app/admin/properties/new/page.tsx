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
  CARDINAL_DIRECTIONS,
  PROPERTY_STREETS,
} from '@/constants/property-options';

// ── Currency helpers ──────────────────────────────────────────────────────────
const formatCurrency = (value: string | number) => {
  if (!value) return '';
  const amount = typeof value === 'string' ? value.replace(/\D/g, '') : value.toString();
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
    parseFloat(amount) / 100
  );
};
const parseCurrency = (value: string) => value.replace(/\D/g, '');

// ── Shared sub-components ────────────────────────────────────────────────────
const TOTAL_STEPS = 6;

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

const ProximityTags = ({ tags, onChange }: { tags: string[]; onChange: (t: string[]) => void }) => {
  const [input, setInput] = useState('');
  const add = () => {
    const v = input.trim();
    if (v && !tags.includes(v)) { onChange([...tags, v]); setInput(''); }
  };
  return (
    <div className="flex flex-col gap-3">
      <label className="font-noto text-xs uppercase tracking-[0.15em] text-[#002B49]/60">Proximidades</label>
      <div className="flex gap-2">
        <input
          className="flex-1 bg-[#F9FCFF] border-b border-[#002B49]/10 p-3 font-manrope text-sm text-[#002B49] focus:outline-none focus:border-[#775A19]"
          placeholder="Ex: Supermercado, Praça, Escola…"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), add())}
        />
        <button type="button" onClick={add}
          className="px-4 py-2 bg-[#775A19] text-white text-xs uppercase tracking-widest hover:bg-[#002B49] transition-colors">
          +
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map(tag => (
          <span key={tag} className="flex items-center gap-2 bg-[#002B49]/5 px-3 py-1.5 text-[10px] font-manrope uppercase tracking-widest text-[#002B49]">
            {tag}
            <button type="button" onClick={() => onChange(tags.filter(t => t !== tag))}
              className="text-[#775A19] hover:text-red-600 transition-colors">×</button>
          </span>
        ))}
      </div>
    </div>
  );
};

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function NewPropertyPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ current: number; total: number } | null>(null);
  const [photos, setPhotos] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    // Step 1 – Básicas
    title:       '',
    description: '',
    call:        '',
    price:       '',
    category:    'casa',
    location:    'Capão Novo',
    address:     '',

    // Step 2 – Detalhes
    features:    { bedrooms: 0, suites: 0, bathrooms: 1, parking: 0, area: 0 },
    values:      { condo: 0, iptu: 0 },
    buildingInfo: {
      year: '', floors: '', aptsPerFloor: '', totalApts: '',
      position: 'Frente', view: '', orientation: 'Norte',
      facade: '', opening: '', condition: '', isNeverInhabited: false, deliveryDate: '',
    },
    amenities:   [] as string[],

    // Step 3 – Estratégia Comercial
    strategicData: { sellerMotivation: '', urgency: '', negotiationFlexibility: '' },
    commercialIntelligence: { commissionPercentage: '', netValueExpected: '', proposalsHistory: '' },
    propertyProfile: { classification: '' },

    // Step 4 – Localização Avançada
    advancedLocation: { distanceToSea: '', proximities: [] as string[] },

    // Step 5 – Perfil & Documentação
    idealCustomerProfile: '',
    documentation: { status: '', details: '' },

    // Step 6 – Publicação
    youtubeId:   '',
    link360:     '',
    isPublished: true,
    isFeatured:  false,
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const updateNested = (parent: string, field: string, value: any) =>
    setFormData(prev => ({
      ...prev,
      [parent]: { ...(prev[parent as keyof typeof prev] as any), [field]: value },
    }));

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (photos.length === 0) {
        alert('Adicione pelo menos uma foto antes de publicar.');
        setLoading(false);
        return;
      }

      // Upload direto ao Cloudinary pelo client (Signed Upload)
      // Resolve o erro de 'Unexpected response' (limite de 4.5MB do Vercel)
      const uploadedImages: { url: string; public_id: string; isMain: boolean }[] = [];
      setUploadProgress({ current: 0, total: photos.length });

      // Função auxiliar para upload individual com retry e assinatura fresca
      const uploadSinglePhoto = async (p: any, index: number) => {
        if (p.url && !p.file) {
          return { url: p.url, public_id: p.public_id, isMain: p.isMain };
        }

        // Fresh signature for each file (prevents expiration during long batch uploads)
        const sigRes = await fetch('/api/upload/signature');
        const sigData = await sigRes.json();
        if (!sigRes.ok) throw new Error(`Falha na autorização para a foto ${index + 1}`);

        const fd = new FormData();
        fd.append('file', p.file);
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
          throw new Error(`Cloudinary Error (${index + 1}): ${err.error?.message || 'Falha no upload'}`);
        }

        const data = await res.json();
        setUploadProgress(prev => prev ? { ...prev, current: prev.current + 1 } : null);
        
        return { 
          url: data.secure_url, 
          public_id: data.public_id, 
          isMain: p.isMain 
        };
      };

      // Upload em paralelo com concorrência controlada (limite de 3)
      for (let i = 0; i < photos.length; i += 3) {
        const batch = photos.slice(i, i + 3).map((p, idx) => uploadSinglePhoto(p, i + idx));
        const results = await Promise.all(batch);
        uploadedImages.push(...results);
      }

      const priceNum = parseFloat(parseCurrency(formData.price)) / 100;
      const condoNum = parseFloat(parseCurrency(String(formData.values.condo))) / 100;
      const iptuNum  = parseFloat(parseCurrency(String(formData.values.iptu)))  / 100;

      const cleanData = {
        ...formData,
        price: isNaN(priceNum) ? 0 : priceNum,
        values: {
          condo: isNaN(condoNum) ? 0 : condoNum,
          iptu:  isNaN(iptuNum)  ? 0 : iptuNum,
        },
        commercialIntelligence: {
          ...formData.commercialIntelligence,
          commissionPercentage: formData.commercialIntelligence.commissionPercentage
            ? Number(formData.commercialIntelligence.commissionPercentage) : undefined,
          netValueExpected: formData.commercialIntelligence.netValueExpected
            ? Number(formData.commercialIntelligence.netValueExpected) : undefined,
        },
        advancedLocation: {
          ...formData.advancedLocation,
          distanceToSea: formData.advancedLocation.distanceToSea
            ? Number(formData.advancedLocation.distanceToSea) : undefined,
        },
        images: uploadedImages, // já são URLs do Cloudinary, não base64
      };

      const result = await createProperty(cleanData);
      if (result.success) {
        router.push('/admin/dashboard');
      } else {
        alert('Erro ao salvar imóvel: ' + result.error);
      }
    } catch (error: any) {
      console.error('[handleSubmit error]', error);
      alert('Erro ao processar: ' + (error?.message || String(error)));
    } finally {
      setLoading(false);
      setUploadProgress(null);
    }
  };

  const slideVariants = {
    initial: { opacity: 0, x: 24 },
    animate: { opacity: 1, x: 0 },
    exit:    { opacity: 0, x: -24 },
  };

  return (
    <div className="min-h-screen bg-white py-20 px-8 lg:px-24">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-16">
        <button
          onClick={() => router.push('/admin/dashboard')}
          className="text-[#001629]/40 hover:text-[#001629] transition-colors text-xs uppercase tracking-widest font-manrope mb-6 block"
        >
          ← Dashboard
        </button>
        <h1 className="font-noto text-5xl text-[#002B49] mb-3 tracking-tighter">Novo Patrimônio</h1>
        <p className="font-manrope text-sm text-[#002B49]/40 tracking-widest uppercase">Curadoria da Vitrine Imobiliária</p>
      </div>

      <div className="max-w-4xl mx-auto">
        <StepIndicator currentStep={step} />

        <div className="mt-24">
          <AnimatePresence mode="wait">

            {/* ── STEP 1: Básicas ─────────────────────────────────────────── */}
            {step === 1 && (
              <motion.div key="step-1" variants={slideVariants} initial="initial" animate="animate" exit="exit"
                transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
                className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8"
              >
                <FormInput label="Título do Anúncio" placeholder="Ex: Casa 4 Dormitórios com Anexo"
                  value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="md:col-span-2" />
                <FormInput label="Chamada Marketing" placeholder="Ex: Oportunidade única no litoral gaúcho!"
                  value={formData.call} onChange={e => setFormData({ ...formData, call: e.target.value })} className="md:col-span-2" />

                <Select label="Categoria" value={formData.category} onChange={v => setFormData({ ...formData, category: v })}
                  options={PROPERTY_CATEGORIES.map(c => ({ label: c.label, value: c.value }))} />

                <FormInput label="Valor de Venda (R$)" placeholder="R$ 0,00"
                  value={formData.price}
                  onChange={e => setFormData({ ...formData, price: formatCurrency(e.target.value) })} />

                <Select label="Localização" value={formData.location} onChange={v => setFormData({ ...formData, location: v })}
                  options={PROPERTY_LOCATIONS.map(l => ({ label: l, value: l }))} />

                <div className="flex flex-col gap-2">
                  <label className="font-noto text-xs uppercase tracking-[0.15em] text-[#002B49]/60">Endereço / Referência</label>
                  <input
                    list="streets"
                    className="bg-[#F9FCFF] border-b border-[#002B49]/10 p-3 font-manrope text-sm text-[#002B49] focus:outline-none focus:border-[#775A19]"
                    placeholder="Comece a digitar o nome da rua..."
                    value={formData.address}
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                  />
                  <datalist id="streets">
                    {PROPERTY_STREETS.map(s => <option key={s} value={s} />)}
                  </datalist>
                </div>

                <div className="md:col-span-2 flex flex-col gap-2">
                  <label className="font-noto text-xs uppercase tracking-[0.15em] text-[#002B49]/60">Descrição Detalhada</label>
                  <textarea
                    className="bg-[#F9FCFF] border-b border-[#002B49]/10 p-4 font-manrope text-sm text-[#002B49] focus:outline-none focus:border-[#775A19] min-h-[150px] tracking-wide leading-relaxed"
                    placeholder="Descreva os diferenciais e qualidades arquitetônicas..."
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
              </motion.div>
            )}

            {/* ── STEP 2: Detalhes ─────────────────────────────────────────── */}
            {step === 2 && (
              <motion.div key="step-2" variants={slideVariants} initial="initial" animate="animate" exit="exit"
                transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }} className="space-y-20"
              >
                <div className="bg-[#F9FCFF] p-8 border border-[#002B49]/5">
                  <SectionTitle icon="🏠" title="Características da Unidade" subtitle="Composição física do imóvel" />
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                    <FormInput label="Dormitórios" type="number" value={formData.features.bedrooms} onChange={e => updateNested('features', 'bedrooms', e.target.value)} />
                    <FormInput label="Suítes"      type="number" value={formData.features.suites}   onChange={e => updateNested('features', 'suites', e.target.value)} />
                    <FormInput label="Banheiros"   type="number" value={formData.features.bathrooms} onChange={e => updateNested('features', 'bathrooms', e.target.value)} />
                    <FormInput label="Vagas"       type="number" value={formData.features.parking}  onChange={e => updateNested('features', 'parking', e.target.value)} />
                    <FormInput label="Área m²"     type="number" value={formData.features.area}     onChange={e => updateNested('features', 'area', e.target.value)} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <SectionTitle icon="💰" title="Valores Mensais" subtitle="Condomínio e IPTU" />
                    <div className="grid grid-cols-2 gap-8">
                      <FormInput label="Condomínio (R$)" placeholder="R$ 0,00"
                        value={formData.values.condo === 0 ? '' : formatCurrency(formData.values.condo)}
                        onChange={e => updateNested('values', 'condo', formatCurrency(e.target.value))} />
                      <FormInput label="IPTU (R$)" placeholder="R$ 0,00"
                        value={formData.values.iptu === 0 ? '' : formatCurrency(formData.values.iptu)}
                        onChange={e => updateNested('values', 'iptu', formatCurrency(e.target.value))} />
                    </div>
                  </div>
                  <div className="space-y-8">
                    <SectionTitle icon="🏗️" title="Informações do Imóvel" subtitle="Ano, andares e estado" />
                    <div className="grid grid-cols-2 gap-8">
                      <FormInput label="Ano Const." type="number" value={formData.buildingInfo.year || ''}
                        onChange={e => updateNested('buildingInfo', 'year', e.target.value)} />
                      <Select label="Posição Solar" value={formData.buildingInfo.orientation}
                        onChange={v => updateNested('buildingInfo', 'orientation', v)}
                        options={CARDINAL_DIRECTIONS.map(d => ({ label: d, value: d }))} />
                    </div>
                    <Select label="Estado de Conservação" value={formData.buildingInfo.condition}
                      onChange={v => updateNested('buildingInfo', 'condition', v)}
                      options={[
                        { label: 'Novo / Nunca habitado', value: 'Novo' },
                        { label: 'Excelente',             value: 'Excelente' },
                        { label: 'Bom',                   value: 'Bom' },
                        { label: 'Necessita reforma',     value: 'Reforma' },
                      ]} />
                  </div>
                </div>

                <div>
                  <SectionTitle icon="✨" title="Infraestrutura e Amenidades" subtitle="Selecione todos que se aplicam" />
                  <AmenitiesGrid selectedAmenities={formData.amenities}
                    onChange={list => setFormData({ ...formData, amenities: list })} />
                </div>
              </motion.div>
            )}

            {/* ── STEP 3: Estratégia Comercial ─────────────────────────────── */}
            {step === 3 && (
              <motion.div key="step-3" variants={slideVariants} initial="initial" animate="animate" exit="exit"
                transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }} className="space-y-16"
              >
                <div className="bg-[#F9FCFF] p-8 border border-[#002B49]/5">
                  <SectionTitle icon="🎯" title="Dados Estratégicos do Vendedor" subtitle="Contexto interno — não aparece no site" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Select label="Motivação do Vendedor" value={formData.strategicData.sellerMotivation}
                      onChange={v => updateNested('strategicData', 'sellerMotivation', v)}
                      options={[
                        { label: 'Mudança de cidade',      value: 'Mudança de cidade' },
                        { label: 'Investimento',           value: 'Investimento' },
                        { label: 'Divórcio / Herança',     value: 'Divórcio ou Herança' },
                        { label: 'Troca por outro imóvel', value: 'Troca' },
                        { label: 'Dívida / Necessidade',   value: 'Necessidade Financeira' },
                        { label: 'Outro',                  value: 'Outro' },
                      ]} />
                    <Select label="Urgência de Venda" value={formData.strategicData.urgency}
                      onChange={v => updateNested('strategicData', 'urgency', v)}
                      options={[
                        { label: '🟢 Baixa',    value: 'Baixa' },
                        { label: '🟡 Média',    value: 'Média' },
                        { label: '🟠 Alta',     value: 'Alta' },
                        { label: '🔴 Imediata', value: 'Imediata' },
                      ]} />
                    <div className="md:col-span-2 flex flex-col gap-2">
                      <label className="font-noto text-xs uppercase tracking-[0.15em] text-[#002B49]/60">Flexibilidade de Negociação</label>
                      <input
                        className="bg-transparent border-b border-[#002B49]/10 p-3 font-manrope text-sm text-[#002B49] focus:outline-none focus:border-[#775A19]"
                        placeholder="Ex: Aceita carro na troca, imóvel menor, permuta…"
                        value={formData.strategicData.negotiationFlexibility}
                        onChange={e => updateNested('strategicData', 'negotiationFlexibility', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-[#F9FCFF] p-8 border border-[#002B49]/5">
                  <SectionTitle icon="📊" title="Inteligência Comercial" subtitle="Comissão, valor líquido e histórico" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormInput label="Comissão (%)" type="number"
                      value={formData.commercialIntelligence.commissionPercentage}
                      onChange={e => updateNested('commercialIntelligence', 'commissionPercentage', e.target.value)} />
                    <FormInput label="Valor Líquido Esperado (R$)" type="number"
                      value={formData.commercialIntelligence.netValueExpected}
                      onChange={e => updateNested('commercialIntelligence', 'netValueExpected', e.target.value)} />
                    <div className="md:col-span-2 flex flex-col gap-2">
                      <label className="font-noto text-xs uppercase tracking-[0.15em] text-[#002B49]/60">Histórico de Propostas</label>
                      <textarea
                        className="bg-transparent border-b border-[#002B49]/10 p-4 font-manrope text-sm text-[#002B49] focus:outline-none focus:border-[#775A19] min-h-[100px]"
                        placeholder="Anote propostas anteriores, condições, datas…"
                        value={formData.commercialIntelligence.proposalsHistory}
                        onChange={e => updateNested('commercialIntelligence', 'proposalsHistory', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <SectionTitle icon="🏆" title="Perfil do Imóvel" subtitle="Classificação para CRM e filtragem interna" />
                  <Select label="Classificação" value={formData.propertyProfile.classification}
                    onChange={v => updateNested('propertyProfile', 'classification', v)}
                    options={[
                      { label: '⭐ Standard',     value: 'Standard' },
                      { label: '⭐⭐ Alto Padrão', value: 'Alto Padrão' },
                      { label: '⭐⭐⭐ Luxo',      value: 'Luxo' },
                      { label: '💵 Investimento', value: 'Investimento' },
                      { label: '🚀 Lançamento',   value: 'Lançamento' },
                    ]} />
                </div>
              </motion.div>
            )}

            {/* ── STEP 4: Localização Avançada ─────────────────────────────── */}
            {step === 4 && (
              <motion.div key="step-4" variants={slideVariants} initial="initial" animate="animate" exit="exit"
                transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }} className="space-y-16"
              >
                <div className="bg-[#F9FCFF] p-8 border border-[#002B49]/5">
                  <SectionTitle icon="🌊" title="Distância do Mar" subtitle="Em metros até a orla ou praia mais próxima" />
                  <div className="flex items-end gap-4">
                    <div className="flex-1">
                      <FormInput label="Distância ao Mar (metros)" type="number"
                        value={formData.advancedLocation.distanceToSea}
                        onChange={e => updateNested('advancedLocation', 'distanceToSea', e.target.value)} />
                    </div>
                    {Number(formData.advancedLocation.distanceToSea) > 0 && (
                      <div className="pb-2 text-sm font-manrope text-[#775A19] tracking-widest">
                        ≈ {(Number(formData.advancedLocation.distanceToSea) / 1000).toFixed(2)} km
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <SectionTitle icon="📍" title="Proximidades" subtitle="Estabelecimentos e referências perto do imóvel" />
                  <ProximityTags
                    tags={formData.advancedLocation.proximities}
                    onChange={tags => setFormData(prev => ({
                      ...prev,
                      advancedLocation: { ...prev.advancedLocation, proximities: tags },
                    }))}
                  />
                  <p className="mt-4 text-[9px] text-[#002B49]/30 font-manrope uppercase tracking-widest">
                    Pressione Enter ou clique + para adicionar. Ex: Supermercado, Farmácia, Igreja, Shopping…
                  </p>
                </div>
              </motion.div>
            )}

            {/* ── STEP 5: Perfil & Documentação ────────────────────────────── */}
            {step === 5 && (
              <motion.div key="step-5" variants={slideVariants} initial="initial" animate="animate" exit="exit"
                transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }} className="space-y-16"
              >
                <div className="bg-[#F9FCFF] p-8 border border-[#002B49]/5">
                  <SectionTitle icon="👤" title="Perfil do Cliente Ideal" subtitle="Quem é o comprador perfeito para este imóvel?" />
                  <textarea
                    className="w-full bg-transparent border-b border-[#002B49]/10 p-4 font-manrope text-sm text-[#002B49] focus:outline-none focus:border-[#775A19] min-h-[120px]"
                    placeholder="Ex: Família com 2 filhos, casal jovem investidor, turista que busca renda com aluguel de temporada…"
                    value={formData.idealCustomerProfile}
                    onChange={e => setFormData({ ...formData, idealCustomerProfile: e.target.value })}
                  />
                </div>

                <div>
                  <SectionTitle icon="📄" title="Documentação" subtitle="Regularidade e situação jurídica do imóvel" />
                  <div className="space-y-8">
                    <Select label="Status Documental" value={formData.documentation.status}
                      onChange={v => updateNested('documentation', 'status', v)}
                      options={[
                        { label: '✅ 100% Regularizado',           value: '100% Regularizado' },
                        { label: '⚖️ Em inventário',              value: 'Em inventário' },
                        { label: '⚠️ Falta averbação',            value: 'Falta averbação' },
                        { label: '📝 Contrato de Compra e Venda', value: 'Contrato de Compra e Venda' },
                      ]} />
                    <div className="flex flex-col gap-2">
                      <label className="font-noto text-xs uppercase tracking-[0.15em] text-[#002B49]/60">Observações Jurídicas</label>
                      <textarea
                        className="bg-[#F9FCFF] border-b border-[#002B49]/10 p-4 font-manrope text-sm text-[#002B49] focus:outline-none focus:border-[#775A19] min-h-[100px]"
                        placeholder="Pendências, inventário, documentos faltantes, etc…"
                        value={formData.documentation.details}
                        onChange={e => updateNested('documentation', 'details', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── STEP 6: Publicação + Fotos ───────────────────────────────── */}
            {step === 6 && (
              <motion.div key="step-6" variants={slideVariants} initial="initial" animate="animate" exit="exit"
                transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }} className="space-y-16"
              >
                <div>
                  <SectionTitle icon="📸" title="Galeria de Imagens" subtitle="Arraste ou selecione as fotos do imóvel" />
                  <PhotoUploader photos={photos} setPhotos={setPhotos} />
                </div>

                <div>
                  <SectionTitle icon="🎬" title="Mídia Digital" subtitle="YouTube e Tour 360" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <FormInput label="ID YouTube (Ex: jNQXAC9IVRw)" value={formData.youtubeId}
                      onChange={e => setFormData({ ...formData, youtubeId: e.target.value })} />
                    <FormInput label="Link Tour 360" value={formData.link360}
                      onChange={e => setFormData({ ...formData, link360: e.target.value })} />
                  </div>
                </div>

                <div className="bg-[#002B49]/5 p-8 flex flex-col md:flex-row items-center justify-between gap-8 border border-[#002B49]/10">
                  <div>
                    <SectionTitle icon="📢" title="Status da Publicação" subtitle="Este imóvel entrará na vitrine imediatamente" />
                  </div>
                  <div className="flex gap-8">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" checked={formData.isPublished}
                        onChange={e => setFormData({ ...formData, isPublished: e.target.checked })}
                        className="w-5 h-5 accent-[#002B49]" />
                      <span className="font-noto text-[10px] uppercase tracking-widest text-[#002B49]">Anunciar Site</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" checked={formData.isFeatured}
                        onChange={e => setFormData({ ...formData, isFeatured: e.target.checked })}
                        className="w-5 h-5 accent-[#775A19]" />
                      <span className="font-noto text-[10px] uppercase tracking-widest text-[#775A19]">Destaque Home</span>
                    </label>
                  </div>
                </div>

                {/* Summary */}
                <div className="border border-[#002B49]/10 p-8 space-y-4">
                  <p className="font-noto text-xs uppercase tracking-[0.2em] text-[#775A19] mb-6">Resumo antes de publicar</p>
                  {[
                    { label: 'Título',        value: formData.title || '—' },
                    { label: 'Preço',         value: formData.price || '—' },
                    { label: 'Categoria',     value: formData.category },
                    { label: 'Classificação', value: formData.propertyProfile.classification || 'Não definida' },
                    { label: 'Urgência',      value: formData.strategicData.urgency || 'Não definida' },
                    { label: 'Documentação',  value: formData.documentation.status || 'Não definida' },
                    { label: 'Fotos',         value: `${photos.length} imagem(ns) adicionada(s)` },
                  ].map(row => (
                    <div key={row.label} className="flex justify-between text-xs font-manrope border-b border-[#002B49]/5 pb-3">
                      <span className="text-[#002B49]/40 uppercase tracking-wider">{row.label}</span>
                      <span className="text-[#002B49] font-medium max-w-xs text-right">{row.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation buttons */}
        <div className="mt-20 flex justify-between pt-12 border-t border-[#002B49]/5">
          <button type="button"
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

          <div className="flex items-center gap-3">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i + 1 === step ? 'bg-[#775A19] w-4' : i + 1 < step ? 'bg-[#002B49] w-1.5' : 'bg-[#002B49]/15 w-1.5'}`} />
            ))}
          </div>

          <button type="button"
            onClick={step === TOTAL_STEPS ? handleSubmit : nextStep}
            disabled={loading}
            className="relative px-12 py-5 bg-[#002B49] group overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed min-w-[240px]"
          >
            {/* Base hover effect (stays behind progress) */}
            <div className="absolute inset-0 bg-[#775A19] translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-0" />
            
            {/* Animated Progress Fill */}
            {loading && uploadProgress && (
              <motion.div 
                className="absolute inset-0 bg-[#775A19]/30 origin-left z-0"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: uploadProgress.current / uploadProgress.total }}
                transition={{ type: 'spring', damping: 25, stiffness: 120 }}
              />
            )}
            
            <span className="relative z-10 font-noto text-[10px] text-white uppercase tracking-[0.4em] flex items-center justify-center gap-3">
              {loading ? (
                uploadProgress ? (
                  <>
                    <span className="w-1.5 h-1.5 bg-[#775A19] rounded-full animate-pulse" />
                    <span>Upload {Math.round((uploadProgress.current / uploadProgress.total) * 100)}%</span>
                  </>
                ) : (
                  <>
                    <svg className="animate-spin h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Processando</span>
                  </>
                )
              ) : step === TOTAL_STEPS ? (
                'Publicar Patrimônio'
              ) : (
                'Prosseguir'
              )}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
