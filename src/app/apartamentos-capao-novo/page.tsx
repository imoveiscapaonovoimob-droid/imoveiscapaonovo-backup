import { Metadata } from 'next';
import { Header } from "@/components/layout/Header";
import { PropertyGrid } from "@/components/home/PropertyGrid";
import { ProfileSearch } from "@/components/home/ProfileSearch";
import { CTA } from "@/components/home/CTA";
import { Footer } from "@/components/home/Footer";

export const metadata: Metadata = {
  title: "Apartamentos Capão da Canoa Capão Novo",
  description: "Encontre os melhores apartamentos em Capão Novo, Capão da Canoa. Mobiliados, vista para o mar e mais.",
};

export default function Page() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* HEADER SEO */}
      <section className="pt-32 pb-8 px-6 lg:px-10 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif text-primary mb-6">
          Apartamentos Capão da Canoa Capão Novo
        </h1>
        <article className="prose prose-lg text-secondary/80 max-w-none">
          <p>
            A conveniência e luxuosidade vertical reunida de forma única no litoral. A nossa vitrine de <strong>Apartamentos em Capão Novo</strong> foi montada para entregar a melhor experiência - seja buscando um duplex que respire a brisa do oceano ou um mobiliado pronto para morar no próximo verão.
            Buscamos sempre destacar projetos de segurança robusta e lazer ininterrupto para a sua família inteira.
          </p>
        </article>
      </section>

      <ProfileSearch />

      {/* VITRINE */}
      <div className="bg-secondary/5 py-8">
        <PropertyGrid />
      </div>

      <CTA />
      <Footer />
    </main>
  );
}
