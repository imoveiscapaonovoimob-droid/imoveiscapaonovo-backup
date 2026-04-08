import { Metadata } from 'next';
import { Header } from "@/components/layout/Header";
import { ProfileSearch } from "@/components/home/ProfileSearch";
import { CTA } from "@/components/home/CTA";
import { Footer } from "@/components/home/Footer";
import { searchProperties } from "@/lib/actions/property.actions";
import { PropertyCard } from "@/components/home/PropertyCard";

export const metadata: Metadata = {
  title: "Studios em Capão Novo | Modernidade e Praticidade",
  description: "Encontre studios modernos e práticos à venda em Capão Novo. Ideais para investimento ou férias com conforto próximo ao mar.",
};

export default async function Page() {
  const { properties } = await searchProperties({ category: "studio" });

  return (
    <main className="min-h-screen">
      <Header />

      {/* HEADER SEO */}
      <section className="pt-32 pb-8 px-6 lg:px-10 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif text-primary mb-6">
          Studios em Capão Novo
        </h1>
        <article className="prose prose-lg text-secondary/80 max-w-none">
          <p>
            O mercado imobiliário litorâneo evoluiu e os <strong>Studios em Capão Novo</strong> lideram as procuras de investidores e de quem quer um cantinho na praia fácil de manter.
            Com metragens inteligentes, essas unidades trazem conceitos de arquitetura contemporânea e foco no que mais importa: aproveitar comércios, infraestrutura da região e, claro, o mar.
            Nossa equipe oferece curadoria voltada ao custo-benefício e excelente liquidez desses imóveis. 
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
              <h3 className="font-noto text-2xl text-primary mb-4">Nenhum studio encontrado no momento.</h3>
            </div>
          )}
        </div>
      </div>

      <ProfileSearch />

      {/* FAQ DE CONVERSÃO */}
      <section className="py-16 px-6 lg:px-10 max-w-3xl mx-auto">
        <h2 className="text-2xl font-serif text-primary mb-6">Perguntas Frequentes (Studios em Capão Novo)</h2>
        <div className="space-y-4">
          <details className="p-4 border border-secondary/20 bg-white rounded-lg">
            <summary className="font-bold cursor-pointer text-primary">Studios são recomendados para aluguel de temporada?</summary>
            <p className="mt-4 text-secondary/80">Sim, são o produto estrela para aplicativos de hospedagem sazonal (como Airbnb). Seu layout em ambiente único exige baixa manutenção e é muito buscado por solteiros e casais.</p>
          </details>
          <details className="p-4 border border-secondary/20 bg-white rounded-lg">
            <summary className="font-bold cursor-pointer text-primary">Qual o custo de um condomínio de Studio?</summary>
            <p className="mt-4 text-secondary/80">O valor do condomínio costuma ser reduzido pela metragem mais compacta, gerando ótimo retorno de operação mensal. Fale com um consultor para mais detalhes financeiros.</p>
          </details>
        </div>
      </section>

      <CTA />

      <Footer />
    </main>
  );
}
