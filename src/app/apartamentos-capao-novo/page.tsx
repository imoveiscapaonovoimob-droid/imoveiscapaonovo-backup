import { Metadata } from 'next';
import { Header } from "@/components/layout/Header";
import { ProfileSearch } from "@/components/home/ProfileSearch";
import { CTA } from "@/components/home/CTA";
import { Footer } from "@/components/home/Footer";
import { searchProperties } from "@/lib/actions/property.actions";
import { PropertyCard } from "@/components/home/PropertyCard";

export const metadata: Metadata = {
  title: "Apartamentos Capão da Canoa Capão Novo",
  description: "Encontre os melhores apartamentos em Capão Novo, Capão da Canoa. Mobiliados, vista para o mar e mais.",
};

export default async function Page() {
  const { properties } = await searchProperties({ category: "apartamento" });

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* HEADER SEO */}
      <section className="pt-32 pb-8 px-6 lg:px-10 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif text-primary mb-6">
          Apartamentos Capão da Canoa Capão Novo
        </h1>
        <article className="prose prose-lg text-secondary max-w-none">
          <p>
            A conveniência e luxuosidade vertical reunida de forma única no litoral. A nossa vitrine de <strong>Apartamentos em Capão Novo</strong> foi montada para entregar a melhor experiência - seja buscando um duplex que respire a brisa do oceano ou um mobiliado pronto para morar no próximo verão.
            Buscamos sempre destacar projetos de segurança robusta e lazer ininterrupto para a sua família inteira.
          </p>
        </article>
      </section>

      {/* Grid de Imóveis (Apartamentos) */}
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
              <h3 className="font-noto text-2xl text-primary mb-4">Nenhum apartamento encontrado no momento.</h3>
            </div>
          )}
        </div>
      </div>

      <ProfileSearch />

      <CTA />
      <Footer />
    </main>
  );
}
