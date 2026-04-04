import { Metadata } from 'next';
import { Header } from "@/components/layout/Header";
import { PropertyGrid } from "@/components/home/PropertyGrid";
import { CTA } from "@/components/home/CTA";
import { Footer } from "@/components/home/Footer";

export const metadata: Metadata = {
  title: "Imóveis Costa Serena | Luxo Contemporâneo em Capão",
  description: "Encontre os imóveis luxuosos no Condomínio Costa Serena.",
};

export default function Page() {
  return (
    <main className="min-h-screen">
      <Header />
      <section className="pt-32 pb-8 px-6 lg:px-10 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif text-primary mb-6">
          Condomínio Costa Serena
        </h1>
        <article className="prose prose-lg text-secondary/80 max-w-none">
          <p>
            Viver no <strong>Condomínio Costa Serena</strong> é mergulhar no design praiano. Residências luxuosas de assinaturas modernas e o clube completo idealizado para atender os desejos e silêncio exigidos por famílias de alto poder aquisitivo no Rio Grande do Sul.
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
