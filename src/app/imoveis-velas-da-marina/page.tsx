import { Metadata } from 'next';
import { Header } from "@/components/layout/Header";
import { PropertyGrid } from "@/components/home/PropertyGrid";
import { CTA } from "@/components/home/CTA";
import { Footer } from "@/components/home/Footer";

export const metadata: Metadata = {
  title: "Imóveis Velas da Marina | Luxo Náutico",
  description: "A essência náutica no litoral gaúcho através dos luxuosos imóveis Velas da Marina.",
};

export default function Page() {
  return (
    <main className="min-h-screen">
      <Header />
      <section className="pt-32 pb-8 px-6 lg:px-10 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif text-primary mb-6">
          Condomínio Velas da Marina
        </h1>
        <article className="prose prose-lg text-secondary/80 max-w-none">
          <p>
            Experimente o puro estilo de vida sofisticado e náutico. Conheça e reserve exclusividades dos <strong>imóveis de alto luxo no Velas da Marina</strong>. Uma marina à disposição, praias artificiais particulares, quadras de esporte premium num projeto incomparável de requinte litorâneo no sul do Brasil.
          </p>
        </article>
      </section>

      <div className="bg-secondary/5 py-8">
        <PropertyGrid />
      </div>

      <CTA />
      <Footer />
    </main>
  );
}
