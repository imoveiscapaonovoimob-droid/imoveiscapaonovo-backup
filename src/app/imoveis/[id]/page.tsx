import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getPropertyBySlugOrId } from '@/lib/actions/property.actions';
import { PropertyGallery } from '@/components/imoveis/PropertyGallery';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/home/Footer';
import { 
  Bed, 
  Square, 
  Bath, 
  Car, 
  CheckCircle2, 
  MapPin, 
  ArrowLeft,
  Share2,
  Heart,
  MessageSquare
} from 'lucide-react';
import Link from 'next/link';

export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const result = await getPropertyBySlugOrId(id);

  if (!result.success || !result.property) {
    notFound();
  }

  const property = result.property;
  // Default values mapping to old format temporarily
  const mainImage = property.images?.find((img: any) => img.isMain)?.url || property.images?.[0]?.url || '/placeholder.jpg';
  const priceFormatted = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(property.price);

  return (
    <main className="min-h-screen bg-slate-50">
      <Header />
      
      {/* Navigation Bar */}
      <div className="bg-white border-b border-slate-100 sticky top-20 z-40 backdrop-blur-md bg-white/80">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-accent transition-colors">
            <ArrowLeft size={14} />
            Voltar para Portfólio
          </Link>
          
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-accent transition-colors">
              <Share2 size={18} />
            </button>
            <button className="p-2 text-slate-400 hover:text-accent transition-colors">
              <Heart size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Header Info */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-accent/10 text-accent text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5">
                  Exclusividade
                </span>
                <span className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                  ID: #{property._id?.toString().slice(-6) || '0000'}
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-serif text-slate-900 leading-tight mb-6">
                {property.title}
              </h1>
              <div className="flex items-center gap-2 text-slate-500 font-medium">
                <MapPin size={18} className="text-accent" />
                {property.location || property.address || ''}
              </div>
            </div>

            {/* Gallery Component */}
            <PropertyGallery 
              title={property.title} 
              images={property.images} 
              mainImageFallback="/placeholder.jpg" 
            />

            {/* Quick Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: <Square size={20} />, label: "Área Total", value: `${property.features?.area || 0}m²` },
                { icon: <Bed size={20} />, label: "Dormitórios", value: property.features?.bedrooms || 0 },
                { icon: <Bath size={20} />, label: "Banheiros", value: property.features?.bathrooms || 0 },
                { icon: <Car size={20} />, label: "Vagas", value: property.features?.parking || 0 },
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-6 border border-slate-100 flex flex-col items-center text-center">
                  <div className="text-accent mb-3">{item.icon}</div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">{item.label}</span>
                  <span className="text-sm font-bold text-slate-900">{item.value}</span>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="bg-white p-12 border border-slate-100">
              <h3 className="text-2xl font-serif text-slate-900 mb-8 pb-8 border-b border-slate-50">
                Sobre este <span className="italic">Imóvel</span>
              </h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                {property.description}
              </p>
            </div>

            {/* Features */}
            <div className="bg-white p-12 border border-slate-100">
              <h3 className="text-2xl font-serif text-slate-900 mb-8">
                Diferenciais e <span className="italic">Comodidades</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                {property.amenities?.map((feature: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-3 text-slate-600">
                    <CheckCircle2 size={18} className="text-accent" />
                    <span className="text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Price & Action Card */}
            <div className="bg-slate-900 text-white p-10 sticky top-40 shadow-2xl">
              <span className="text-accent text-[10px] font-black uppercase tracking-[0.3em] mb-4 block">
                Valor de Investimento
              </span>
              <div className="text-4xl font-serif italic mb-8">
                {priceFormatted}
              </div>
              
              <div className="space-y-4 mb-10 pt-8 border-t border-white/10">
                {property.values?.iptu && (
                  <div className="flex justify-between text-xs tracking-widest uppercase">
                    <span className="text-white/40">IPTU anual</span>
                    <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(property.values.iptu)}</span>
                  </div>
                )}
                {property.values?.condo && (
                  <div className="flex justify-between text-xs tracking-widest uppercase">
                    <span className="text-white/40">Condomínio</span>
                    <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(property.values.condo)}</span>
                  </div>
                )}
              </div>

              <button className="w-full bg-accent text-slate-900 py-6 text-xs font-black uppercase tracking-[0.2em] hover:bg-white transition-all duration-500 mb-4 rounded-sm">
                Agendar Visita Exclusiva
              </button>
              <button className="w-full flex items-center justify-center gap-3 border border-white/20 py-6 text-xs font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all duration-500 rounded-sm">
                <MessageSquare size={16} />
                Falar no WhatsApp
              </button>
            </div>

            {/* Agent Info (Placeholder) */}
            <div className="bg-white p-8 border border-slate-100 flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-slate-100 overflow-hidden relative grayscale">
                <div className="absolute inset-0 flex items-center justify-center text-slate-300 font-serif italic">Photo</div>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold block mb-1">Consultor</span>
                <h4 className="font-serif text-lg text-slate-900">Especialista Local</h4>
                <p className="text-xs text-slate-500 mt-1 uppercase tracking-tighter">Capão Novo & Litoral</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
