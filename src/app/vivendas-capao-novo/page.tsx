import { Metadata } from 'next';
import { Header } from "@/components/layout/Header";
import { ProfileSearch } from "@/components/home/ProfileSearch";
import { CTA } from "@/components/home/CTA";
import { Footer } from "@/components/home/Footer";
import { searchProperties } from "@/lib/actions/property.actions";
import { PropertyCard } from "@/components/home/PropertyCard";

export const metadata: Metadata = {
  title: "Vivendas em Capão Novo | Charme e Alto Padrão",
  description: "Descubra charmosas vivendas à venda em Capão Novo. Imóveis de alto padrão com arquitetura diferenciada e exclusividade.",
};

export default async function Page() {
  const { properties } = await searchProperties({ category: "vivenda" });

  return (
    <main className="min-h-screen">
      <Header />

      {/* HEADER SEO */}
      <section className="pt-32 pb-8 px-6 lg:px-10 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif text-primary mb-6">
          Vivendas em Capão Novo
        </h1>
        <article className="prose prose-lg text-secondary/80 max-w-none">
          <p>
            Tradição, refino e extrema exclusividade: assim definimos nossa carteira premium de <strong>Vivendas em Capão Novo</strong>.
            Propriedades selecionadas que encantam por sua identidade arquitetônica formidável, jardins muito bem cuidados e a verdadeira sensação de casa de verão espetacular.
            Por muitas vezes não estarem abertamente no mercado de massa digital, agendamos o seu atendimento online ou presencial para apresentação confidencial de ativos de ouro.
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
              <h3 className="font-noto text-2xl text-primary mb-4">Nenhuma vivenda disponível publicamente no momento.</h3>
            </div>
          )}
        </div>
      </div>

      <ProfileSearch />

      {/* FAQ DE CONVERSÃO */}
      <section className="py-16 px-6 lg:px-10 max-w-3xl mx-auto">
        <h2 className="text-2xl font-serif text-primary mb-6">Perguntas Frequentes (Vivendas em Capão Novo)</h2>
        <div className="space-y-4">
          <details className="p-4 border border-secondary/20 bg-white rounded-lg">
            <summary className="font-bold cursor-pointer text-primary">Qual a diferença de uma casa comum para uma Vivenda?</summary>
            <p className="mt-4 text-secondary/80">Vivendas destacam-se pelo seu estilo de construção imponente, metragens amplas, terrenos arborizados e aquele charme familiar intemporal em loteamentos de qualidade superior.</p>
          </details>
          <details className="p-4 border border-secondary/20 bg-white rounded-lg">
            <summary className="font-bold cursor-pointer text-primary">Elas possuem operação de venda off-market?</summary>
            <p className="mt-4 text-secondary/80">Muitas propriedades que classificamos no altíssimo padrão funcionam como Pocket Deals ou Venda Discreta (off-market). Nossa equipe realiza a curadoria após um primeiro contato.</p>
          </details>
        </div>
      </section>

      <CTA />

      <Footer />
    </main>
  );
}
