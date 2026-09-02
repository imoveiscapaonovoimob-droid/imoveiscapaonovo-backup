import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCondominiumBySlugOrId } from '@/lib/actions/condominium.actions';
import { searchProperties } from '@/lib/actions/property.actions';
import { PropertyGallery } from '@/components/imoveis/PropertyGallery';
import { PropertyCard } from '@/components/home/PropertyCard';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/home/Footer';
import { CheckCircle2, MapPin, ArrowLeft, MessageSquare, Building2, Calendar } from 'lucide-react';
import Link from 'next/link';
import { WHATSAPP_URL } from '@/lib/constants';

const BASE_URL = 'https://imoveiscapaonovo.com.br';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const result = await getCondominiumBySlugOrId(slug);

  if (!result.success || !result.condominium) {
    return { title: 'Condomínio não encontrado | Imóveis Capão Novo' };
  }

  const condominium = result.condominium;
  const mainImage = condominium.images?.find((i: any) => i.isMain)?.url || condominium.images?.[0]?.url;
  const description = condominium.description?.slice(0, 160)
    || `Conheça o condomínio ${condominium.name} em ${condominium.location}. Fale com a Imóveis Capão Novo.`;
  const url = `${BASE_URL}/condominios/${condominium.slug}`;

  return {
    title: `${condominium.name} | Imóveis Capão Novo`,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      locale: 'pt_BR',
      url,
      siteName: 'Imóveis Capão Novo',
      title: condominium.name,
      description,
      images: mainImage ? [{ url: mainImage, width: 1200, height: 630, alt: condominium.name }] : undefined,
    },
  };
}

export default async function CondominiumPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = await getCondominiumBySlugOrId(slug);

  if (!result.success || !result.condominium) {
    notFound();
  }

  const condominium = result.condominium;
  // Imóveis vinculados: o CRM publica a unidade com location = nome do
  // condomínio quando ela está vinculada a ele (ver skill de integração).
  const { properties } = await searchProperties({ location: condominium.name });

  return (
    <main className="min-h-screen bg-[#f9f9f9] text-[#001629]">
      <Header />

      <div className="sticky top-20 z-40 bg-[#f9f9f9]/70 backdrop-blur-[20px]">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center">
          <Link href="/condominios" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#001629]/60 hover:text-accent transition-colors">
            <ArrowLeft size={16} />
            Voltar para Condomínios Residenciais
          </Link>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-12 md:py-24">
        <div className="relative mb-24 md:mb-32">
          <div className="w-full md:w-3/4 lg:w-2/3 relative z-20 pb-8 md:pb-0 md:mb-[-100px]">
            <div className="inline-flex items-center gap-3 mb-8 bg-[#1A1A1A] px-4 py-2 shadow-[0_20px_40px_rgba(0,22,41,0.06)]">
              <Building2 size={14} className="text-accent" />
              <span className="text-white text-[10px] font-black uppercase tracking-[0.2em]">
                {condominium.disposition === 'horizontal' ? 'Condomínio Horizontal' : 'Condomínio Vertical'}
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-serif text-[#001629] leading-[1.1] mb-6">
              {condominium.name}
            </h1>

            <div className="flex items-center gap-2 text-[#001629]/60 font-sans text-sm tracking-widest uppercase mb-6">
              <MapPin size={16} className="text-accent" />
              {condominium.location || condominium.address || ''}
            </div>
          </div>

          <div className="w-full relative z-10">
            <PropertyGallery
              title={condominium.name}
              images={condominium.images}
              mainImageFallback="/placeholder.jpg"
              propertyId={condominium._id}
              propertySlug={condominium.slug}
              source="galeria-condominio"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-16 lg:gap-x-16">
          <div className="lg:col-span-8 space-y-20">
            {condominium.description && (
              <div className="max-w-3xl">
                <h3 className="text-3xl font-serif text-[#001629] mb-8">
                  Sobre o <span className="italic text-accent">Condomínio</span>
                </h3>
                <p className="text-[#001629]/80 leading-[1.8] text-lg font-sans font-light whitespace-pre-line">
                  {condominium.description}
                </p>
              </div>
            )}

            {(condominium.builtYear || condominium.builder || condominium.adminCompany) && (
              <div className="bg-[#002B49]/5 p-8 md:p-12">
                <h3 className="text-xl font-serif text-[#001629] mb-8">
                  Detalhes <span className="italic text-accent">do Empreendimento</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {condominium.builtYear && (
                    <div className="flex items-center gap-4">
                      <Calendar size={20} className="text-[#001629]/30" />
                      <div>
                        <span className="block text-[10px] uppercase tracking-widest text-[#001629]/50 mb-1">Construído em</span>
                        <span className="font-bold text-sm tracking-wide">{condominium.builtYear}</span>
                      </div>
                    </div>
                  )}
                  {condominium.builder && (
                    <div>
                      <span className="block text-[10px] uppercase tracking-widest text-[#001629]/50 mb-1">Construtora</span>
                      <span className="font-bold text-sm tracking-wide">{condominium.builder}</span>
                    </div>
                  )}
                  {condominium.adminCompany && (
                    <div>
                      <span className="block text-[10px] uppercase tracking-widest text-[#001629]/50 mb-1">Administradora</span>
                      <span className="font-bold text-sm tracking-wide">{condominium.adminCompany}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {condominium.amenities && condominium.amenities.length > 0 && (
              <div className="bg-white p-10 md:p-16 shadow-[0_20px_40px_rgba(0,22,41,0.03)]">
                <h3 className="text-2xl font-serif text-[#001629] mb-10">
                  Lazer & <span className="italic text-accent">Infraestrutura</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6">
                  {condominium.amenities.map((feature: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-4 text-[#001629]/80">
                      <CheckCircle2 size={18} className="text-accent" />
                      <span className="text-sm font-medium tracking-wide">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {properties && properties.length > 0 && (
              <div>
                <h3 className="text-3xl font-serif text-[#001629] mb-8">
                  Unidades <span className="italic text-accent">Disponíveis</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {properties.map((property: any) => (
                    <PropertyCard
                      key={property._id}
                      id={property._id}
                      slug={property.slug}
                      title={property.title}
                      price={property.price}
                      location={property.location}
                      beds={property.features?.bedrooms || 0}
                      image={property.images?.find((i: any) => i.isMain)?.url || property.images?.[0]?.url || "/images/placeholder-property.jpg"}
                      tags={[property.category].filter(Boolean)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-4 relative">
            <div className="sticky top-32 z-30 flex flex-col gap-8">
              <div className="bg-[#001629] text-white p-10 lg:p-12 shadow-[0_40px_80px_rgba(0,22,41,0.15)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-[50px] pointer-events-none" />

                <span className="text-accent text-[10px] font-black uppercase tracking-[0.3em] mb-4 block">
                  Interessado neste condomínio?
                </span>

                <a
                  href={`${WHATSAPP_URL}?text=${encodeURIComponent(`Olá! Gostaria de saber mais sobre o condomínio ${condominium.name}.`)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="w-full bg-accent text-white py-5 px-6 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[#b0904a] transition-colors duration-300 mb-4 rounded-sm flex items-center justify-center relative overflow-hidden group mt-6"
                >
                  <span className="relative z-10 w-full text-center">Falar com Corretor</span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </a>

                <a
                  href={`${WHATSAPP_URL}?text=${encodeURIComponent(`Olá! Vi o condomínio ${condominium.name} no site e gostaria de mais informações.`)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 bg-white/5 border border-white/10 py-5 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-colors duration-300 rounded-sm group"
                >
                  <MessageSquare size={16} className="text-accent group-hover:scale-110 transition-transform" />
                  <span>Falar no WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
