import React from 'react';
import { SearchBar } from '@/components/home/SearchBar';
import { PropertyCard } from '@/components/home/PropertyCard';
import { searchProperties } from '@/lib/actions/property.actions';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/home/Footer';

export const metadata = {
  title: 'Busca de Imóveis | Imóveis Capão Novo',
  description: 'Encontre as melhores casas e apartamentos em Capão Novo e região.',
};

export default async function SearchResultsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const tipo = searchParams.tipo as string;
  const min = searchParams.min as string;
  const max = searchParams.max as string;
  const local = searchParams.local as string;

  const { properties, success } = await searchProperties({
    category: tipo,
    minPrice: min,
    maxPrice: max,
    location: local,
  });

  return (
    <main className="min-h-screen bg-[#FDFDFD]">
      <Header />
      
      {/* Search Header */}
      <div className="pt-32 pb-12 bg-[#002B49]">
        <div className="max-w-[1200px] mx-auto px-6">
          <h1 className="font-noto text-4xl md:text-5xl text-white mb-2 brightness-125">
            Resultados da Busca
          </h1>
          <p className="font-manrope text-sm text-white/60 tracking-widest uppercase mb-12">
            Encontramos {properties.length} imóveis para você
          </p>
        </div>
        <div className="relative -mb-20 z-10">
          <SearchBar />
        </div>
      </div>

      {/* Results Grid */}
      <div className="max-w-[1200px] mx-auto px-6 pt-32 pb-24">
        {properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {properties.map((property: any) => (
              <PropertyCard 
                key={property._id}
                id={property._id}
                title={property.title}
                price={property.price}
                location={property.location}
                beds={property.features?.bedrooms || 0}
                image={property.images?.[0] || "/images/placeholder-property.jpg"}
                slug={property.slug}
                tags={[property.category, property.type].filter(Boolean)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-black/5 rounded-lg">
            <h3 className="font-noto text-2xl text-primary mb-4">Nenhum imóvel encontrado</h3>
            <p className="font-manrope text-[#002B49]/60 max-w-md mx-auto">
              Tente ajustar seus filtros ou entre em contato conosco para ajudarmos na sua busca.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
