import { Metadata } from 'next';
import { Header } from "@/components/layout/Header";
import { ProfileSearch } from "@/components/home/ProfileSearch";
import { CTA } from "@/components/home/CTA";
import { Footer } from "@/components/home/Footer";
import { searchProperties } from "@/lib/actions/property.actions";
import { PropertyCard } from "@/components/home/PropertyCard";

export const metadata: Metadata = {
  title: "Apartamentos Duplex em Capão Novo | Vista e Muito Conforto",
  description: "Encontre os melhores apartamentos duplex à venda em Capão Novo. Exclusividade, vistas incríveis e opções prontas para investir.",
};

export default async function Page() {
  const { properties } = await searchProperties({ category: "duplex" });

  return (
    <main className="min-h-screen">
      <Header />

      {/* HEADER SEO */}
      <section className="pt-32 pb-8 px-6 lg:px-10 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif text-primary mb-6">
          Apartamentos Duplex em Capão Novo
        </h1>
        <article className="prose prose-lg text-secondary/80 max-w-none">
          <p>
            Vistas panorâmicas, ambientes muito bem dimensionados e o prestígio característico: encontre aqui os melhores <strong>Apartamentos Duplex em Capão Novo</strong>.
            Combinando as qualidades da vida em condomínio com o conforto que imita em área uma casa, o duplex atende famílias grandes, encontros de finais de semana e reuniões inesquecíveis em torno de terraços deslumbrantes.
            Explore nossas melhores listagens e conte com a nossa negociação focada em segurança.
          </p>
        </article>
      </section>

      {/* Grid de Imóveis */}
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
              <h3 className="font-noto text-2xl text-primary mb-4">Nenhum imóvel duplex listado no momento.</h3>
            </div>
          )}
        </div>
      </div>

      <ProfileSearch />

      {/* FAQ DE CONVERSÃO */}
      <section className="py-16 px-6 lg:px-10 max-w-3xl mx-auto">
        <h2 className="text-2xl font-serif text-primary mb-6">Perguntas Frequentes (Duplex em Capão Novo)</h2>
        <div className="space-y-4">
          <details className="p-4 border border-secondary/20 bg-white rounded-lg">
            <summary className="font-bold cursor-pointer text-primary">Os duplex costumam ter terraços próprios?</summary>
            <p className="mt-4 text-secondary/80">Muitos dos projetos trazem no seu segundo andar áreas de convívio generosas com terrações e possibilidade de fechamento em vidro, explorando a posição solar.</p>
          </details>
          <details className="p-4 border border-secondary/20 bg-white rounded-lg">
            <summary className="font-bold cursor-pointer text-primary">Qual o perfil preferido dos compradores?</summary>
            <p className="mt-4 text-secondary/80">Quem avalia duplex geralmente deseja o tamanho e a independência física de andares de uma casa, mas atrelados à segurança reforçada de edifícios novos do litoral gaúcho.</p>
          </details>
        </div>
      </section>

      <CTA />

      <Footer />
    </main>
  );
}
