import { Metadata } from 'next';
import { Header } from "@/components/layout/Header";
import { PropertyGrid } from "@/components/home/PropertyGrid";
import { CTA } from "@/components/home/CTA";
import { Footer } from "@/components/home/Footer";

export const metadata: Metadata = {
  title: "Imóveis Costa Serena Capão da Canoa | Alto Padrão",
  description: "Conheça os imóveis de alto padrão no Condomínio Costa Serena em Capão da Canoa. Residências exclusivas com infraestrutura completa no litoral norte gaúcho.",
  keywords: ["imóveis Costa Serena", "condomínio Costa Serena Capão da Canoa", "imóveis litoral norte rs", "apartamentos alto padrão Capão da Canoa"],
  alternates: {
    canonical: "https://imoveiscapaonovo.com.br/imoveis-costa-serena",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://imoveiscapaonovo.com.br/imoveis-costa-serena",
    title: "Imóveis Costa Serena | Capão da Canoa",
    description: "Residências exclusivas no Condomínio Costa Serena no litoral norte gaúcho.",
    siteName: "Imóveis Capão Novo",
  },
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
            Descubra a serenidade litorânea com exclusividade no <strong>Condomínio Costa Serena</strong> em Capão da Canoa. 
            Um empreendimento de alto padrão que une conforto, infraestrutura completa e a beleza incomparável do litoral norte gaúcho. 
            Residências projetadas para quem valoriza qualidade de vida, segurança e sofisticação a poucos metros do mar.
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
