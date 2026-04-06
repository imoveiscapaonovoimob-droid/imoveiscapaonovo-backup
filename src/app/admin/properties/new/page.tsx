'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import StepIndicator from '@/components/admin/property-form/StepIndicator';
import FormInput from '@/components/admin/property-form/FormInput';
import PhotoUploader from '@/components/admin/property-form/PhotoUploader';
import { createProperty } from '@/lib/actions/property.actions';
import {
  CardSection, CardHeader, SectionDivider, LineInput, MoneyInput,
  IncrementField, TagGroup, BinaryToggle, CollapsibleSection, CalcValue, SelectLine,
} from '@/components/admin/property-form/PropertyFormUI';
import {
  PROPERTY_CATEGORIES,
  PROPERTY_LOCATIONS,
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
    // ── Step 1: Básicas ───────────────────────────────────────────────────────
    title:       '',
    description: '',
    call:        '',
    price:       '',
    category:    'casa',
    location:    'Capão Novo',
    address:     '',

    // ── Step 2: Características ───────────────────────────────────────────────
    areas: { privateArea: '', totalArea: '', terrainArea: '', terrainDimensions: '' },
    features:    { bedrooms: 0, suites: 0, bathrooms: 1, parking: 0, area: 0 },
    garageType:  [] as string[],
    internalTags: [] as string[],  // finishes + special rooms
    furnitureTag: '',              // single-select: furniture status
    condoTags:   [] as string[],   // condo features
    buildingInfo: {
      year: '', floors: '', aptsPerFloor: '', totalApts: '',
      position: 'Frente', view: '', orientation: 'Norte',
      facade: '', opening: '', condition: '', isNeverInhabited: false, deliveryDate: '',
    },

    // ── Step 3: Financeiro ────────────────────────────────────────────────────
    values:          { condo: '', iptu: '' },
    iptuPeriod:      'Anual',
    exclusivity:     false,
    paymentMethods:  [] as string[],
    directPayment:   { minEntry: '', maxMonths: '' },
    acceptsExchange: false,
    exchange:        { limitPercent: '', assetTypes: [] as string[], regions: '', notes: '' },
    financialStatus: { hasEncumbrance: false, balance: '', bank: '' },

    // ── Step 3 (legacy kept for backward compat) ──────────────────────────────
    strategicData: { sellerMotivation: '', urgency: '', negotiationFlexibility: '' },
    commercialIntelligence: { commissionPercentage: '', netValueExpected: '', proposalsHistory: '' },
    propertyProfile: { classification: '' },
    amenities:   [] as string[],

    // ── Step 4: Localização Avançada ──────────────────────────────────────────
    advancedLocation: { distanceToSea: '', proximities: [] as string[] },

    // ── Step 5: Perfil & Documentação ─────────────────────────────────────────
    idealCustomerProfile: '',
    documentation: { status: '', details: '' },

    // ── Step 6: Publicação ────────────────────────────────────────────────────
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

      // Merge tag arrays into amenities for backward compat with DB schema
      const allAmenities = [
        ...formData.internalTags,
        ...(formData.furnitureTag ? [formData.furnitureTag] : []),
        ...formData.condoTags,
        ...formData.amenities,
      ];

      const cleanData = {
        ...formData,
        price: isNaN(priceNum) ? 0 : priceNum,
        values: {
          condo: isNaN(condoNum) ? 0 : condoNum,
          iptu:  isNaN(iptuNum)  ? 0 : iptuNum,
        },
        // Map privateArea back to features.area for DB compat
        features: {
          ...formData.features,
          area: formData.areas.privateArea ? Number(formData.areas.privateArea) : formData.features.area,
        },
        amenities: allAmenities,
        garageType: formData.garageType,
        areas: {
          privateArea:       formData.areas.privateArea ? Number(formData.areas.privateArea) : undefined,
          totalArea:         formData.areas.totalArea ? Number(formData.areas.totalArea) : undefined,
          terrainArea:       formData.areas.terrainArea ? Number(formData.areas.terrainArea) : undefined,
          terrainDimensions: formData.areas.terrainDimensions || undefined,
        },
        iptuPeriod:      formData.iptuPeriod,
        exclusivity:     formData.exclusivity,
        paymentMethods:  formData.paymentMethods,
        directPayment:   formData.directPayment,
        acceptsExchange: formData.acceptsExchange,
        exchange:        formData.exchange,
        financialStatus: {
          hasEncumbrance: formData.financialStatus.hasEncumbrance,
          balance: formData.financialStatus.balance ? Number(parseCurrency(formData.financialStatus.balance)) / 100 : undefined,
          bank:    formData.financialStatus.bank || undefined,
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
        images: uploadedImages,
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

            {/* ── STEP 2: Características ───────────────────────────────────── */}
            {step === 2 && (
              <motion.div key="step-2" variants={slideVariants} initial="initial" animate="animate" exit="exit"
                transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }} className="space-y-6"
              >
                {/* Card 1 – Áreas */}
                <CardSection>
                  <CardHeader icon="📐" title="Áreas e Dimensões" subtitle="Medidas em m²" />
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <LineInput label="Área Privativa / Útil" suffix="m²" type="number"
                      value={formData.areas.privateArea}
                      onChange={v => setFormData(p => ({ ...p, areas: { ...p.areas, privateArea: v } }))} />
                    <LineInput label="Área Total" suffix="m²" type="number"
                      value={formData.areas.totalArea}
                      onChange={v => setFormData(p => ({ ...p, areas: { ...p.areas, totalArea: v } }))} />
                    {formData.category !== 'apartamento' && (
                      <LineInput label="Área do Terreno" suffix="m²" type="number"
                        value={formData.areas.terrainArea}
                        onChange={v => setFormData(p => ({ ...p, areas: { ...p.areas, terrainArea: v } }))} />
                    )}
                    <LineInput label="Dimensões do Terreno" placeholder="Ex: 10x25"
                      value={formData.areas.terrainDimensions}
                      onChange={v => setFormData(p => ({ ...p, areas: { ...p.areas, terrainDimensions: v } }))} />
                  </div>
                </CardSection>

                {/* Card 2 – Cômodos */}
                <CardSection>
                  <CardHeader icon="🛏️" title="Cômodos Principais" subtitle="Use os botões — muito mais rápido no celular" />
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
                    <IncrementField label="Dormitórios" value={formData.features.bedrooms}
                      onChange={v => updateNested('features', 'bedrooms', v)} />
                    <IncrementField label="Sendo Suítes"
                      value={formData.features.suites}
                      onChange={v => updateNested('features', 'suites', Math.min(v, formData.features.bedrooms))}
                      max={formData.features.bedrooms} />
                    <IncrementField label="Banheiros Totais" value={formData.features.bathrooms}
                      onChange={v => updateNested('features', 'bathrooms', v)} min={1} />
                    <IncrementField label="Vagas de Garagem" value={formData.features.parking}
                      onChange={v => updateNested('features', 'parking', v)} />
                  </div>
                  {formData.features.parking > 0 && (
                    <TagGroup
                      label="Tipo de Garagem"
                      tags={['Vagas Cobertas', 'Vagas Descobertas']}
                      selected={formData.garageType}
                      onChange={v => setFormData(p => ({ ...p, garageType: v }))}
                    />
                  )}
                </CardSection>

                {/* Card 3 – Detalhes Internos */}
                <CardSection>
                  <CardHeader icon="✨" title="Detalhes Internos" subtitle="Tags clicáveis — selecione os que se aplicam" />
                  <div className="space-y-6">
                    <TagGroup
                      label="Acabamentos & Climatização"
                      tags={['Piso Porcelanato', 'Piso de Madeira', 'Ar Condicionado', 'Lareira', 'Aquecimento a Gás', 'Teto Rebaixado em Gesso']}
                      selected={formData.internalTags}
                      onChange={v => setFormData(p => ({ ...p, internalTags: v }))}
                    />
                    <SectionDivider />
                    <div className="flex flex-col gap-3">
                      <span className="font-manrope text-[9px] uppercase tracking-[0.2em] text-[#002B49]/40">Mobília</span>
                      <div className="flex flex-wrap gap-2">
                        {['Imóvel Vazio', 'Semi-Mobiliado (Planejados)', 'Porteira Fechada (Mobiliado)'].map(tag => (
                          <button key={tag} type="button"
                            onClick={() => setFormData(p => ({ ...p, furnitureTag: p.furnitureTag === tag ? '' : tag }))}
                            className={`px-4 py-2 text-[11px] font-manrope tracking-wider border transition-all duration-200 ${
                              formData.furnitureTag === tag
                                ? 'bg-[#001629] text-[#ffdea5] border-[#001629]'
                                : 'bg-white text-[#002B49]/55 border-[#002B49]/15 hover:border-[#002B49]/40'
                            }`}>{tag}</button>
                        ))}
                      </div>
                    </div>
                    <SectionDivider />
                    <TagGroup
                      label="Ambientes Especiais"
                      tags={['Varanda Gourmet', 'Closet', 'Despensa', 'Dependência de Empregada', 'Lavabo', 'Escritório / Home Office']}
                      selected={formData.internalTags}
                      onChange={v => setFormData(p => ({ ...p, internalTags: v }))}
                    />
                  </div>
                </CardSection>

                {/* Card 4 – Condomínio */}
                <CardSection>
                  <CardHeader icon="🏊" title="Infraestrutura do Condomínio / Lazer" subtitle="Facilidades disponíveis no empreendimento" />
                  <div className="space-y-6">
                    <TagGroup
                      label="Lazer"
                      tags={['Piscina', 'Academia', 'Salão de Festas', 'Churrasqueira', 'Espaço Kids / Brinquedoteca', 'Quadra Poliesportiva']}
                      selected={formData.condoTags}
                      onChange={v => setFormData(p => ({ ...p, condoTags: v }))}
                    />
                    <SectionDivider />
                    <TagGroup
                      label="Facilidades & Segurança"
                      tags={['Portaria 24h', 'Elevador', 'Minimercado', 'Aceita Pets', 'Bicicletário', 'Câmeras de Segurança']}
                      selected={formData.condoTags}
                      onChange={v => setFormData(p => ({ ...p, condoTags: v }))}
                    />
                  </div>
                </CardSection>
              </motion.div>
            )}

            {/* ── STEP 3: Financeiro e Negociação ──────────────────────────── */}
            {step === 3 && (() => {
              const rawPrice = parseFloat(parseCurrency(formData.price)) / 100;
              const pct = parseFloat(formData.commercialIntelligence.commissionPercentage);
              const commissionValue = !isNaN(rawPrice) && !isNaN(pct) && pct > 0
                ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(rawPrice * pct / 100)
                : '—';
              const excLimit = parseFloat(formData.exchange.limitPercent);
              const excValue = !isNaN(rawPrice) && !isNaN(excLimit) && excLimit > 0
                ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(rawPrice * excLimit / 100)
                : null;
              return (
                <motion.div key="step-3" variants={slideVariants} initial="initial" animate="animate" exit="exit"
                  transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }} className="space-y-6"
                >
                  {/* Bloco 1 – Precificação */}
                  <CardSection>
                    <CardHeader icon="💰" title="Precificação do Imóvel" subtitle="Valores com máscara monetária automática" />
                    <div className="space-y-8">
                      <MoneyInput label="Valor de Venda"
                        value={formData.price}
                        onChange={v => setFormData(p => ({ ...p, price: v }))} className="max-w-sm" />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <MoneyInput label="Condomínio / Mês"
                          value={formData.values.condo as string}
                          onChange={v => setFormData(p => ({ ...p, values: { ...p.values, condo: v } }))} />
                        <div>
                          <MoneyInput label="IPTU"
                            value={formData.values.iptu as string}
                            onChange={v => setFormData(p => ({ ...p, values: { ...p.values, iptu: v } }))} />
                          <div className="flex gap-2 mt-3">
                            {['Anual', 'Mensal'].map(period => (
                              <button key={period} type="button"
                                onClick={() => setFormData(p => ({ ...p, iptuPeriod: period }))}
                                className={`px-3 py-1.5 text-[10px] font-manrope tracking-wider border transition-all duration-200 ${
                                  formData.iptuPeriod === period
                                    ? 'bg-[#001629] text-[#ffdea5] border-[#001629]'
                                    : 'bg-white text-[#002B49]/45 border-[#002B49]/15 hover:border-[#002B49]/40'
                                }`}>{period}</button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardSection>

                  {/* Bloco 2 – Comissionamento */}
                  <CardSection>
                    <CardHeader icon="🤝" title="Modelo de Agenciamento" subtitle="Comissionamento — uso interno da imobiliária" />
                    <div className="space-y-8">
                      <div className="grid grid-cols-2 gap-8 max-w-md">
                        <LineInput label="Honorários da Corretora (%)"
                          type="number" placeholder="Ex: 6"
                          value={formData.commercialIntelligence.commissionPercentage}
                          onChange={v => updateNested('commercialIntelligence', 'commissionPercentage', v)} />
                        <CalcValue label="Valor Projetado" value={commissionValue} />
                      </div>
                      <div className="flex flex-col gap-3">
                        <span className="font-manrope text-[9px] uppercase tracking-[0.2em] text-[#002B49]/40">Contrato de Exclusividade?</span>
                        <div className="flex gap-2">
                          <button type="button" onClick={() => setFormData(p => ({ ...p, exclusivity: true }))}
                            className={`px-5 py-2.5 text-[11px] font-manrope tracking-wider border transition-all duration-200 ${
                              formData.exclusivity ? 'bg-[#001629] text-[#ffdea5] border-[#001629]' : 'bg-white text-[#002B49]/55 border-[#002B49]/15 hover:border-[#002B49]/40'
                            }`}>Sim, com exclusividade</button>
                          <button type="button" onClick={() => setFormData(p => ({ ...p, exclusivity: false }))}
                            className={`px-5 py-2.5 text-[11px] font-manrope tracking-wider border transition-all duration-200 ${
                              !formData.exclusivity ? 'bg-[#001629] text-[#ffdea5] border-[#001629]' : 'bg-white text-[#002B49]/55 border-[#002B49]/15 hover:border-[#002B49]/40'
                            }`}>Não, agenciamento comum</button>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="font-manrope text-[9px] uppercase tracking-[0.2em] text-[#002B49]/40">Observações de Comissionamento</label>
                        <textarea
                          className="bg-transparent border-b border-[#002B49]/15 pb-2 font-manrope text-sm text-[#002B49] focus:outline-none focus:border-[#775A19] transition-colors min-h-[80px] resize-none"
                          placeholder="Ex: 50% para quem captou, 50% para quem fechar negócio…"
                          value={formData.commercialIntelligence.proposalsHistory}
                          onChange={e => updateNested('commercialIntelligence', 'proposalsHistory', e.target.value)}
                        />
                      </div>
                    </div>
                  </CardSection>

                  {/* Bloco 3 – Condições de Pagamento */}
                  <CardSection>
                    <CardHeader icon="🏦" title="Condições de Pagamento" subtitle="Estruturas financeiras aceitas pelo proprietário" />
                    <div className="space-y-6">
                      <TagGroup
                        tags={['Financiamento Bancário', 'Uso de FGTS', 'Parcelamento Direto']}
                        selected={formData.paymentMethods}
                        onChange={v => setFormData(p => ({ ...p, paymentMethods: v }))}
                      />
                      <CollapsibleSection open={formData.paymentMethods.includes('Parcelamento Direto')}>
                        <div className="grid grid-cols-2 gap-8 max-w-sm">
                          <LineInput label="Entrada Mínima Exigida" placeholder="Ex: 40% ou R$ 200.000"
                            value={formData.directPayment.minEntry}
                            onChange={v => setFormData(p => ({ ...p, directPayment: { ...p.directPayment, minEntry: v } }))} />
                          <LineInput label="Prazo Máximo (Meses)" type="number" placeholder="Ex: 36"
                            value={formData.directPayment.maxMonths}
                            onChange={v => setFormData(p => ({ ...p, directPayment: { ...p.directPayment, maxMonths: v } }))} />
                        </div>
                      </CollapsibleSection>
                    </div>
                  </CardSection>

                  {/* Bloco 4 – Permuta */}
                  <CardSection>
                    <CardHeader icon="🔄" title="Estratégia de Permuta" subtitle="Crucial para imóveis de alto padrão" />
                    <div className="space-y-6">
                      <BinaryToggle label="O proprietário estuda permuta?"
                        value={formData.acceptsExchange}
                        onChange={v => setFormData(p => ({ ...p, acceptsExchange: v }))} />
                      <CollapsibleSection open={formData.acceptsExchange}>
                        <div className="space-y-6">
                          <div className="flex items-end gap-4 max-w-xs">
                            <LineInput label="Limite da Permuta (% do Valor Total)" type="number" placeholder="Ex: 40"
                              value={formData.exchange.limitPercent}
                              onChange={v => setFormData(p => ({ ...p, exchange: { ...p.exchange, limitPercent: v } }))} />
                            {excValue && (
                              <span className="font-manrope text-sm text-[#775A19] pb-2 whitespace-nowrap">≈ {excValue}</span>
                            )}
                          </div>
                          <TagGroup label="Tipos de Ativos Aceitos"
                            tags={['Apartamento', 'Casa', 'Terreno em Condomínio', 'Sala Comercial', 'Veículo Premium']}
                            selected={formData.exchange.assetTypes}
                            onChange={v => setFormData(p => ({ ...p, exchange: { ...p.exchange, assetTypes: v } }))} />
                          <LineInput label="Regiões Aceitas para o Imóvel da Permuta"
                            placeholder="Ex: Apenas Jardins, Moema ou Itaim Bibi"
                            value={formData.exchange.regions}
                            onChange={v => setFormData(p => ({ ...p, exchange: { ...p.exchange, regions: v } }))} />
                          <div className="flex flex-col gap-2">
                            <label className="font-manrope text-[9px] uppercase tracking-[0.2em] text-[#002B49]/40">Observações adicionais da permuta</label>
                            <textarea
                              className="bg-transparent border-b border-[#002B49]/15 pb-2 font-manrope text-sm text-[#002B49] focus:outline-none focus:border-[#775A19] transition-colors min-h-[80px] resize-none"
                              placeholder="Ex: Carro apenas SUVs acima de 2021, tabela FIPE menos 10%…"
                              value={formData.exchange.notes}
                              onChange={e => setFormData(p => ({ ...p, exchange: { ...p.exchange, notes: e.target.value } }))}
                            />
                          </div>
                        </div>
                      </CollapsibleSection>
                    </div>
                  </CardSection>

                  {/* Bloco 5 – Situação Documental Financeira */}
                  <CardSection>
                    <CardHeader icon="📄" title="Situação Documental Financeira" subtitle="Ônus, alienação e saldo devedor" />
                    <div className="space-y-6">
                      <BinaryToggle label="O imóvel possui ônus financeiro ou alienação?"
                        labelTrue="Sim, alienado / financiado"
                        labelFalse="Não, totalmente quitado"
                        value={formData.financialStatus.hasEncumbrance}
                        onChange={v => setFormData(p => ({ ...p, financialStatus: { ...p.financialStatus, hasEncumbrance: v } }))} />
                      <CollapsibleSection open={formData.financialStatus.hasEncumbrance}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <MoneyInput label="Saldo Devedor Atualizado"
                            value={formData.financialStatus.balance}
                            onChange={v => setFormData(p => ({ ...p, financialStatus: { ...p.financialStatus, balance: v } }))} />
                          <SelectLine label="Banco / Credor"
                            value={formData.financialStatus.bank}
                            onChange={v => setFormData(p => ({ ...p, financialStatus: { ...p.financialStatus, bank: v } }))}
                            options={['Caixa Econômica Federal', 'Itaú', 'Bradesco', 'Banco do Brasil', 'Santander', 'Nubank', 'Sicoob / Sicredi', 'BRB', 'Outro']} />
                        </div>
                      </CollapsibleSection>
                    </div>
                  </CardSection>
                </motion.div>
              );
            })()}

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
