import { Metadata } from 'next';
import { Header } from "@/components/layout/Header";
import { PropertyGrid } from "@/components/home/PropertyGrid";
import { CTA } from "@/components/home/CTA";
import { Footer } from "@/components/home/Footer";

export const metadata: Metadata = {
  title: "Imóveis Terrasul | Condomínio Fechado Capão Novo",
  description: "Tranquilidade e segurança para sua família nos exclusivos imóveis e lotes do condomínio Terrasul.",
};

export default function Page() {
  return (
    <main className="min-h-screen">
      <Header />
      <section className="pt-32 pb-8 px-6 lg:px-10 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif text-primary mb-6">
          Condomínio Terrasul
        </h1>
        <article className="prose prose-lg text-secondary/80 max-w-none">
          <p>
            Viver no <strong>Condomínio Terrasul</strong> é escolher o refúgio perfeito sem abrir mão da segurança e do lazer completo. Imóveis alto padrão e lotes na medida certa para construir sua história em Capão Novo.
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
