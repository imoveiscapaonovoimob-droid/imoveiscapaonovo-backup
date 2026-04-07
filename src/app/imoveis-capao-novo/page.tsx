import { Metadata } from 'next';
import { Header } from "@/components/layout/Header";
import { ProfileSearch } from "@/components/home/ProfileSearch";
import { CTA } from "@/components/home/CTA";
import { Footer } from "@/components/home/Footer";
import { searchProperties } from "@/lib/actions/property.actions";
import { PropertyCard } from "@/components/home/PropertyCard";

export const metadata: Metadata = {
  title: "Imóveis Capão Novo | Encontre seu Imóvel Ideal",
  description: "As melhores oportunidades em Imóveis Capão Novo. Casas, apartamentos e terrenos com curadoria exclusiva e alto padrão.",
};

export default async function Page() {
  const { properties } = await searchProperties({});

  return (
    <main className="min-h-screen">
      <Header />
      <section className="pt-32 pb-8 px-6 lg:px-10 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif text-primary mb-6">
          Imóveis em Capão Novo
        </h1>
        <article className="prose prose-lg text-secondary/80 max-w-none">
          <p>
            Descubra as mais exclusivas opções de <strong>Imóveis em Capão Novo</strong>. Nossa curadoria seleciona cuidadosamente propriedades frente-mar, em condomínios fechados ou nas localizações mais desejadas do litoral. 
            Navegue pela nossa vitrine para ter acesso ao maior inventário de luxo da região e planeje suas férias blindado em segurança, com o melhor potencial de rentabilidade de aluguel e revenda do Litoral Norte.
          </p>
        </article>
      </section>

      {/* Grid de Imóveis (Todos) */}
      <div className="bg-surface-container-low py-16 px-6 lg:px-10">
        <div className="max-w-[1440px] mx-auto">
          {properties && properties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {properties.map((property: any) => (
                <PropertyCard 
                  key={property._id}
                  id={property._id}
                  title={property.title}
                  price={property.price}
                  location={property.location}
                  beds={property.features?.bedrooms || 0}
                  image={property.images?.find((i: any) => i.isMain)?.url || property.images?.[0]?.url || "/images/placeholder-property.jpg"}
                  slug={property.slug}
                  tags={[property.category].filter(Boolean)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white border border-black/5 rounded-lg">
              <h3 className="font-noto text-2xl text-primary mb-4">Nenhum imóvel encontrado no momento.</h3>
            </div>
          )}
        </div>
      </div>

      <ProfileSearch />

      <section className="py-16 px-6 lg:px-10 max-w-3xl mx-auto">
        <h2 className="text-2xl font-serif text-primary mb-6">Perguntas Frequentes (Imóveis em Capão Novo)</h2>
        <div className="space-y-4">
          <details className="p-4 border border-secondary/20 bg-white rounded-lg">
            <summary className="font-bold cursor-pointer text-primary">Vale a pena investir em imóveis em Capão Novo?</summary>
            <p className="mt-4 text-secondary/80">Completamente. Capão Novo oferece uma qualidade de vida ímpar, segurança 24h em seus condomínios de ponta e constante valorização imobiliária graças à nova onda de investimentos infraestruturais gaúchos no Litoral Norte.</p>
          </details>
          <details className="p-4 border border-secondary/20 bg-white rounded-lg">
            <summary className="font-bold cursor-pointer text-primary">Qual o melhor lugar de Capão Novo para investir?</summary>
            <p className="mt-4 text-secondary/80">Depende de sua necessidade: Capão Novo Posto 4 entrega ótima mobilidade; Capão Novo Village traz conforto e calmaria; Já para padrão "resort", Costa Serena e Velas da Marina figuram entre os mais luxuosos de todo RS. Nós da imobiliária temos acesso a todos.</p>
          </details>
        </div>
      </section>

      <CTA />
      <Footer />
    </main>
  );
}
