import { Metadata } from 'next';
import { Header } from "@/components/layout/Header";
import { ProfileSearch } from "@/components/home/ProfileSearch";
import { CTA } from "@/components/home/CTA";
import { Footer } from "@/components/home/Footer";
import { searchProperties } from "@/lib/actions/property.actions";
import { PropertyCard } from "@/components/home/PropertyCard";

export const metadata: Metadata = {
  title: "Imóveis em Condomínios | Capão Novo",
  description: "Encontre os melhores imóveis em condomínios fechados em Capão Novo. Segurança, lazer e alto padrão.",
};

export default async function Page() {
  const { properties } = await searchProperties({ category: "condominio" });

  return (
    <main className="min-h-screen">
      <Header />
      <section className="pt-32 pb-8 px-6 lg:px-10 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif text-primary mb-6">
          Condomínios Fechados
        </h1>
        <article className="prose prose-lg text-secondary/80 max-w-none">
          <p>
            Viver em <strong>Condomínios Fechados</strong> é mergulhar no design praiano com total segurança. Residências luxuosas, assinaturas modernas e clubes completos idealizados para atender os desejos e tranquilidade exigidos por famílias de alto poder aquisitivo no Rio Grande do Sul.
          </p>
        </article>
      </section>

      {/* Grid de Imóveis (Condomínios) */}
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
              <h3 className="font-noto text-2xl text-primary mb-4">Nenhum imóvel em condomínio encontrado no momento.</h3>
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
