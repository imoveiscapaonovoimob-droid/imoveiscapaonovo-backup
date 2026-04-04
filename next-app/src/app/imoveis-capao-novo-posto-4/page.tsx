import { Metadata } from 'next';
import { Header } from "@/components/layout/Header";
import { PropertyGrid } from "@/components/home/PropertyGrid";
import { CTA } from "@/components/home/CTA";
import { Footer } from "@/components/home/Footer";

export const metadata: Metadata = {
  title: "Imóveis Capão Novo Posto 4 | Alto Padrão",
  description: "Busque imóveis na melhor localização: Capão Novo Posto 4. Segurança, comodidade e requinte.",
};

export default function Page() {
  return (
    <main className="min-h-screen">
      <Header />
      <section className="pt-32 pb-8 px-6 lg:px-10 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif text-primary mb-6">
          Imóveis Capão Novo Posto 4
        </h1>
        <article className="prose prose-lg text-secondary/80 max-w-none">
          <p>
            O prestígio e a tranquilidade no coração do litoral. Descubra nossas seleções premium de <strong>imóveis Capão Novo Posto 4</strong> e faça um negócio seguro e garantido na faixa de areia mais desejada.
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
