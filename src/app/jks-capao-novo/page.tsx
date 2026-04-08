import { Metadata } from 'next';
import { Header } from "@/components/layout/Header";
import { ProfileSearch } from "@/components/home/ProfileSearch";
import { CTA } from "@/components/home/CTA";
import { Footer } from "@/components/home/Footer";
import { searchProperties } from "@/lib/actions/property.actions";
import { PropertyCard } from "@/components/home/PropertyCard";

export const metadata: Metadata = {
  title: "Apartamentos JK em Capão Novo | Inteligência Litorânea",
  description: "Encontre as melhores opções de apartamentos tipo JK à venda em Capão Novo. Excelente rentabilidade e perfeitos para as férias de verão.",
};

export default async function Page() {
  const { properties } = await searchProperties({ category: "jk" });

  return (
    <main className="min-h-screen">
      <Header />

      {/* HEADER SEO */}
      <section className="pt-32 pb-8 px-6 lg:px-10 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif text-primary mb-6">
          Apartamentos JK em Capão Novo
        </h1>
        <article className="prose prose-lg text-secondary/80 max-w-none">
          <p>
            Otimização financeira e lazer: conheça as opções de investimentos em aptos de 1 ambiente, os clássicos e modernos <strong>JKs em Capão Novo</strong>.
            Garantindo custos de manutenção diminutos mas aproveitando as incríveis belezas da orla gaúcha, estas unidades encantam investidores, casais e clientes exigentes em facilidades.
            Sua jornada pelo investimento litoral rentável flui pelas nossas indicações altamente curadas pelo time.
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
              <h3 className="font-noto text-2xl text-primary mb-4">Nenhum JK foi encontrado na busca atual.</h3>
            </div>
          )}
        </div>
      </div>

      <ProfileSearch />

      {/* FAQ DE CONVERSÃO */}
      <section className="py-16 px-6 lg:px-10 max-w-3xl mx-auto">
        <h2 className="text-2xl font-serif text-primary mb-6">Perguntas Frequentes (JKs em Capão Novo)</h2>
        <div className="space-y-4">
          <details className="p-4 border border-secondary/20 bg-white rounded-lg">
            <summary className="font-bold cursor-pointer text-primary">O que difere um JK de um Apartamento tradicional?</summary>
            <p className="mt-4 text-secondary/80">O JK (abreviação baseada no formato de Quarto/Conjugado) costuma ser um living de peça única onde as divisórias são formadas pelos próprios móveis, conferindo um ambiente unificado otimizado.</p>
          </details>
          <details className="p-4 border border-secondary/20 bg-white rounded-lg">
            <summary className="font-bold cursor-pointer text-primary">JK é fácil de mobiliar na praia?</summary>
            <p className="mt-4 text-secondary/80">Extremamente. O layout de um bom projeto marcenaria viabiliza que poucos itens se tornem uma casa acolhedora para veraneio completo.</p>
          </details>
        </div>
      </section>

      <CTA />

      <Footer />
    </main>
  );
}
