import { Metadata } from 'next';
import { Header } from "@/components/layout/Header";
import { PropertyGrid } from "@/components/home/PropertyGrid";
import { CTA } from "@/components/home/CTA";
import { Footer } from "@/components/home/Footer";

export const metadata: Metadata = {
  title: "Casas em Capão Novo | Alto Padrão e Frente Mar",
  description: "Encontre as melhores casas à venda em Capão Novo. Opções em condomínios de luxo, próximo à praia e Posto 4.",
};

export default function Page() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* HEADER SEO */}
      <section className="pt-32 pb-8 px-6 lg:px-10 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif text-primary mb-6">
          Casas em Capão Novo
        </h1>
        <article className="prose prose-lg text-secondary/80 max-w-none">
          <p>
            Encontrar a casa dos sonhos nunca foi tão simples e seguro. Trabalhamos exclusivamente com as mais selecionadas <strong>Casas em Capão Novo</strong>.
            Nossa carteira atende quem busca alto padrão, propriedades de frente mar, casas isoladas ou localizadas nas áreas mais reservadas e cobiçadas como o Capão Novo Village ou o Posto 4.
            Ao focar no atendimento via WhatsApp, criamos exclusividade para sua curadoria e negociações discretas com os construtores da região.
          </p>
        </article>
      </section>

      {/* VITRINE */}
      <div className="bg-secondary/5 py-8">
        <PropertyGrid />
      </div>

      {/* FAQ DE CONVERSÃO */}
      <section className="py-16 px-6 lg:px-10 max-w-3xl mx-auto">
        <h2 className="text-2xl font-serif text-primary mb-6">Perguntas Frequentes (Casas em Capão Novo)</h2>
        <div className="space-y-4">
          <details className="p-4 border border-secondary/20 bg-white rounded-lg">
            <summary className="font-bold cursor-pointer text-primary">Qual o preço médio das casas em Capão Novo?</summary>
            <p className="mt-4 text-secondary/80">O valor das propriedades é elástico e reflete a exclusividade. Há opções mais clássicas e vilas que partem de valores atrativos, até gigantescos casarões em condomínios debruçados no mar superando as cifras milionárias. Converse com nossa consultoria pelo WhatsApp para opções no seu orçamento.</p>
          </details>
          <details className="p-4 border border-secondary/20 bg-white rounded-lg">
            <summary className="font-bold cursor-pointer text-primary">Capão Novo aceita permuta de imóveis?</summary>
            <p className="mt-4 text-secondary/80">Vários vendedores de alto nível da nossa base negociam permutas em Porto Alegre ou outras partes do RS e de SC. Entre em contato detalhando a sua intenção.</p>
          </details>
        </div>
      </section>

      <CTA />

      <Footer />
    </main>
  );
}
