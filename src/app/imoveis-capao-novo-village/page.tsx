import { Metadata } from 'next';
import { Header } from "@/components/layout/Header";
import { PropertyGrid } from "@/components/home/PropertyGrid";
import { CTA } from "@/components/home/CTA";
import { Footer } from "@/components/home/Footer";

export const metadata: Metadata = {
  title: "Imóveis Capão Novo Village",
  description: "Exclusividade e natureza. Compre seu imóvel no Capão Novo Village.",
};

export default function Page() {
  return (
    <main className="min-h-screen">
      <Header />
      <section className="pt-32 pb-8 px-6 lg:px-10 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif text-primary mb-6">
          Capão Novo Village
        </h1>
        <article className="prose prose-lg text-secondary/80 max-w-none">
          <p>
            Beleza natural e um requinte intocável. Os <strong>imóveis no Capão Novo Village</strong> entregam mais do que moradia, entregam a segurança de um ecossistema projetado do zero para famílias com o padrão de exigência inegociável. 
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
