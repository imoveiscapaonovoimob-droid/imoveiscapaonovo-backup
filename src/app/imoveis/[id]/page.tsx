import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
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
  MessageSquare,
  Building,
  Calendar,
  Compass
} from 'lucide-react';
import Link from 'next/link';
import { WHATSAPP_URL } from '@/lib/constants';
import { PropertyShareActions } from '@/components/imoveis/PropertyShareActions';

const amenityMap: Record<string, string> = {
  barbecue: 'Churrasqueira',
  kitchen_cabinets: 'Armários de Cozinha',
  pool: 'Piscina',
  balcony: 'Sacada / Varanda',
  gym: 'Academia',
  elevator: 'Elevador',
  furnished: 'Mobiliado',
  pet_friendly: 'Aceita Pets',
  security_24h: 'Portaria 24h',
  playground: 'Playground',
  party_room: 'Salão de Festas',
  sports_court: 'Quadra Esportiva',
  service_area: 'Área de Serviço',
  air_conditioning: 'Ar Condicionado',
  fireplace: 'Lareira',
  ocean_view: 'Vista para o Mar',
  garden: 'Jardim',
  suite: 'Suíte Master'
};

function formatAmenity(key: string) {
  return amenityMap[key] || key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const result = await getPropertyBySlugOrId(id);

  if (!result.success || !result.property) {
    notFound();
  }

  const property = result.property;
  const priceFormatted = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(property.price);

  return (
    <main className="min-h-screen bg-[#f9f9f9] text-[#001629]">
      <Header />
      
      {/* Floating Glass Navigation */}
      <div className="sticky top-20 z-40 bg-[#f9f9f9]/70 backdrop-blur-[20px]">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/imoveis" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#001629]/60 hover:text-accent transition-colors">
            <ArrowLeft size={16} />
            Voltar para Portfólio
          </Link>
          
          <PropertyShareActions 
            title={property.title} 
            slug={property.slug}
            mainImage={property.images?.find((i: any) => i.isMain)?.url || property.images?.[0]?.url || '/placeholder.jpg'}
            price={priceFormatted}
            bedrooms={property.features?.bedrooms}
            area={property.features?.area}
          />
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-12 md:py-24">
        {/* Editorial Hero Layout with Overlap */}
        <div className="relative mb-24 md:mb-32">
          {/* Typographic Hero */}
          <div className="w-full md:w-3/4 lg:w-2/3 relative z-20 pb-8 md:pb-0 md:mb-[-100px]">
            <div className="inline-flex items-center gap-3 mb-8 bg-[#1A1A1A] px-4 py-2 shadow-[0_20px_40px_rgba(0,22,41,0.06)]">
              <span className="text-accent text-xs font-serif italic">Status</span>
              <span className="text-white text-[10px] font-black uppercase tracking-[0.2em]">
                Exclusividade
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif text-[#001629] leading-[1.1] mb-6">
              {property.title}
            </h1>
            
            <div className="flex items-center gap-2 text-[#001629]/60 font-sans text-sm tracking-widest uppercase mb-6">
              <MapPin size={16} className="text-accent" />
              {property.location || property.address || ''}
            </div>
          </div>

          {/* Property Gallery (Overlapped) */}
          <div className="w-full md:w-5/6 ml-auto relative z-10">
             <PropertyGallery 
              title={property.title} 
              images={property.images} 
              mainImageFallback="/placeholder.jpg" 
             />
          </div>
        </div>

        {/* Content & Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-16 lg:gap-x-16">
          
          {/* Main Details */}
          <div className="lg:col-span-8 space-y-20">
            
            {/* Minimal Metrics Dashboard */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: <Square size={24} />, label: "Área Total", value: `${property.features?.area || 0}m²` },
                { icon: <Bed size={24} />, label: "Dormitórios", value: property.features?.bedrooms || 0 },
                { icon: <Bath size={24} />, label: "Banheiros", value: property.features?.bathrooms || 0 },
                { icon: <Car size={24} />, label: "Vagas", value: property.features?.parking || 0 },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-start">
                  <div className="text-accent mb-4">{item.icon}</div>
                  <span className="text-3xl font-serif text-[#001629] mb-1">{item.value}</span>
                  <span className="text-[10px] text-[#001629]/50 uppercase tracking-[0.2em] font-bold">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Building Info (If available) */}
            {(property.buildingInfo?.year || property.buildingInfo?.position || property.buildingInfo?.condition) && (
              <div className="bg-[#002B49]/5 p-8 md:p-12">
                 <h3 className="text-xl font-serif text-[#001629] mb-8">
                  Detalhes <span className="italic text-accent">Técnicos</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {property.buildingInfo?.year && (
                    <div className="flex items-center gap-4">
                      <Calendar size={20} className="text-[#001629]/30" />
                      <div>
                        <span className="block text-[10px] uppercase tracking-widest text-[#001629]/50 mb-1">Construção</span>
                        <span className="font-bold text-sm tracking-wide">{property.buildingInfo.year}</span>
                      </div>
                    </div>
                  )}
                  {property.buildingInfo?.position && (
                    <div className="flex items-center gap-4">
                      <Compass size={20} className="text-[#001629]/30" />
                      <div>
                        <span className="block text-[10px] uppercase tracking-widest text-[#001629]/50 mb-1">Posição Solar</span>
                        <span className="font-bold text-sm tracking-wide">{property.buildingInfo.position}</span>
                      </div>
                    </div>
                  )}
                  {property.buildingInfo?.condition && (
                    <div className="flex items-center gap-4">
                      <Building size={20} className="text-[#001629]/30" />
                      <div>
                        <span className="block text-[10px] uppercase tracking-widest text-[#001629]/50 mb-1">Condição</span>
                        <span className="font-bold text-sm tracking-wide">{property.buildingInfo.condition}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Editorial Description */}
            <div className="max-w-3xl">
              <h3 className="text-3xl font-serif text-[#001629] mb-8">
                A Experiência <span className="italic text-accent">do Imóvel</span>
              </h3>
              <p className="text-[#001629]/80 leading-[1.8] text-lg font-sans font-light whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Amenities Grid */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="bg-white p-10 md:p-16 shadow-[0_20px_40px_rgba(0,22,41,0.03)]">
                <h3 className="text-2xl font-serif text-[#001629] mb-10">
                  Diferenciais & <span className="italic text-accent">Comodidades</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6">
                  {property.amenities.map((feature: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-4 text-[#001629]/80">
                      <CheckCircle2 size={18} className="text-accent" />
                      <span className="text-sm font-medium tracking-wide">{formatAmenity(feature)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-32 z-30 flex flex-col gap-8">
              
              {/* Premium Price Card */}
              <div className="bg-[#001629] text-white p-10 lg:p-12 shadow-[0_40px_80px_rgba(0,22,41,0.15)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-[50px] pointer-events-none" />
                
                <span className="text-accent text-[10px] font-black uppercase tracking-[0.3em] mb-4 block">
                  Valor de Investimento
                </span>
                
                <div className="text-4xl lg:text-5xl font-serif italic mb-10">
                  {priceFormatted}
                </div>
                
                {/* Bug Fix: Only render if value is greater than 0 explicitly */}
                {((property.values?.iptu ?? 0) > 0 || (property.values?.condo ?? 0) > 0) && (
                  <div className="space-y-5 mb-10 pt-8 border-t border-white/10">
                    {(property.values?.iptu ?? 0) > 0 && (
                      <div className="flex justify-between items-center text-xs tracking-widest uppercase">
                        <span className="text-white/40">IPTU anual</span>
                        <span className="font-bold tracking-widest">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(property.values!.iptu)}</span>
                      </div>
                    )}
                    {(property.values?.condo ?? 0) > 0 && (
                      <div className="flex justify-between items-center text-xs tracking-widest uppercase">
                        <span className="text-white/40">Condomínio</span>
                        <span className="font-bold tracking-widest">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(property.values!.condo)}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Botões Funcionais de Contato Direcionados ao WhatsApp */}
                <a 
                  href={`${WHATSAPP_URL}?text=${encodeURIComponent(`Olá! Gostaria de agendar uma visita exclusiva para o imóvel: ${property.title}. Poderiam me dar mais informações?`)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="w-full bg-accent text-white py-5 px-6 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[#b0904a] transition-colors duration-300 mb-4 rounded-sm flex items-center justify-center relative overflow-hidden group"
                >
                  <span className="relative z-10 w-full text-center">Agendar Visita Exclusiva</span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </a>
                
                <a 
                  href={`${WHATSAPP_URL}?text=${encodeURIComponent(`Olá! Tenho interesse no imóvel que encontrei no site: ${property.title}.`)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 bg-white/5 border border-white/10 py-5 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-colors duration-300 rounded-sm group"
                >
                  <MessageSquare size={16} className="text-accent group-hover:scale-110 transition-transform" />
                  <span>Falar no WhatsApp</span>
                </a>
              </div>

              {/* Agent Info - Inside the sticky flow to never roll under the card */}
              <div className="bg-[#f9f9f9] p-8 flex items-center gap-6 group cursor-pointer hover:bg-white transition-colors border border-[#001629]/5">
                <div className="w-16 h-16 rounded-full bg-[#001629]/5 overflow-hidden relative transition-all duration-500 border border-[#001629]/10 shrink-0">
                  <Image
                    src="/images/leninekerber.jpg"
                    alt="Lenine Kerber"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="overflow-hidden">
                  <span className="text-[10px] text-accent uppercase tracking-[0.2em] font-black block mb-1">CORRETOR</span>
                  <h4 className="font-serif text-lg text-[#001629] truncate">Lenine Kerber</h4>
                  <p className="text-[10px] text-[#001629]/50 mt-1 uppercase tracking-widest truncate">CRECI-RS 85.784</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
