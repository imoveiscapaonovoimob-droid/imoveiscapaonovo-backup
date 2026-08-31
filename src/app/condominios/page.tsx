import { Metadata } from 'next';
import { Header } from "@/components/layout/Header";
import { CTA } from "@/components/home/CTA";
import { Footer } from "@/components/home/Footer";
import { getPublishedCondominiums } from "@/lib/actions/condominium.actions";
import { CondominiumCard } from "@/components/condominios/CondominiumCard";

export const metadata: Metadata = {
  title: "Condomínios em Capão Novo | Imóveis Capão Novo",
  description: "Conheça os principais condomínios e residenciais de Capão Novo e Capão da Canoa — segurança, lazer e infraestrutura completa no litoral norte gaúcho.",
  alternates: { canonical: "https://imoveiscapaonovo.com.br/condominios" },
};

export default async function Page() {
  const { condominiums } = await getPublishedCondominiums();

  return (
    <main className="min-h-screen">
      <Header />
      <section className="pt-32 pb-8 px-6 lg:px-10 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif text-primary mb-6">
          Condomínios e Residenciais
        </h1>
        <article className="prose prose-lg text-secondary max-w-none">
          <p>
            Conheça os principais <strong>condomínios e residenciais</strong> de Capão Novo e região —
            cada empreendimento com sua própria infraestrutura, segurança e estilo de vida.
          </p>
        </article>
      </section>

      <div className="bg-surface-container-low py-16 px-6 lg:px-10">
        <div className="max-w-[1440px] mx-auto">
          {condominiums && condominiums.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {condominiums.map((c: any) => (
                <CondominiumCard
                  key={c._id}
                  slug={c.slug}
                  name={c.name}
                  location={c.location}
                  disposition={c.disposition}
                  image={c.images?.find((i: any) => i.isMain)?.url || c.images?.[0]?.url || "/images/placeholder-property.jpg"}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white border border-black/5 rounded-lg">
              <h3 className="font-noto text-2xl text-primary mb-4">Nenhum condomínio cadastrado no momento.</h3>
            </div>
          )}
        </div>
      </div>

      <CTA />
      <Footer />
    </main>
  );
}
