import { Metadata } from 'next';
import { Header } from "@/components/layout/Header";
import { ProfileSearch } from "@/components/home/ProfileSearch";
import { CTA } from "@/components/home/CTA";
import { Footer } from "@/components/home/Footer";
import { searchProperties } from "@/lib/actions/property.actions";
import { PropertyCard } from "@/components/home/PropertyCard";

export const metadata: Metadata = {
  title: "Sobrados em Capão Novo | Exclusividade e Espaço",
  description: "Encontre os melhores sobrados à venda em Capão Novo. Opções espaçosas, próximas ao mar e com excelente infraestrutura.",
};

export default async function Page() {
  const { properties } = await searchProperties({ category: "sobrado" });

  return (
    <main className="min-h-screen">
      <Header />

      {/* HEADER SEO */}
      <section className="pt-32 pb-8 px-6 lg:px-10 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif text-primary mb-6">
          Sobrados em Capão Novo
        </h1>
        <article className="prose prose-lg text-secondary/80 max-w-none">
          <p>
            Encontrar o sobrado dos sonhos nunca foi tão simples e seguro. Trabalhamos exclusivamente com os mais selecionados <strong>Sobrados em Capão Novo</strong>.
            Nossa carteira atende quem busca alto padrão e tranquilidade, opções de frente mar ou localizadas nas áreas mais reservadas e cobiçadas como o Capão Novo Village ou o Posto 4.
            Ao focar no atendimento via WhatsApp, criamos exclusividade para sua curadoria e negociações discretas com os proprietários da região.
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
              <h3 className="font-noto text-2xl text-primary mb-4">Nenhum sobrado encontrado no momento.</h3>
            </div>
          )}
        </div>
      </div>

      <ProfileSearch />

      {/* FAQ DE CONVERSÃO */}
      <section className="py-16 px-6 lg:px-10 max-w-3xl mx-auto">
        <h2 className="text-2xl font-serif text-primary mb-6">Perguntas Frequentes (Sobrados em Capão Novo)</h2>
        <div className="space-y-4">
          <details className="p-4 border border-secondary/20 bg-white rounded-lg">
            <summary className="font-bold cursor-pointer text-primary">Qual o perfil de um sobrado em Capão Novo?</summary>
            <p className="mt-4 text-secondary/80">Os sobrados oferecem ótima separação entre áreas sociais e privativas, garantindo conforto e privacidade. São muito buscados por famílias que desejam espaço e proximidade à praia sem perder as características únicas do litoral.</p>
          </details>
          <details className="p-4 border border-secondary/20 bg-white rounded-lg">
            <summary className="font-bold cursor-pointer text-primary">Há sobrados em condomínios fechados?</summary>
            <p className="mt-4 text-secondary/80">Sim, dispomos de excelentes unidades em condomínios selecionados, garantindo segurança estendida e alto padrão construtivo. Converse com nossa consultoria pelo WhatsApp para saber mais.</p>
          </details>
        </div>
      </section>

      <CTA />

      <Footer />
    </main>
  );
}
