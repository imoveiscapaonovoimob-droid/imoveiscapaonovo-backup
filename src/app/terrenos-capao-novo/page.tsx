import { Metadata } from 'next';
import { Header } from "@/components/layout/Header";
import { PropertyGrid } from "@/components/home/PropertyGrid";
import { CTA } from "@/components/home/CTA";
import { Footer } from "@/components/home/Footer";
import { LandPlot, HardHat, TrendingUp, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Terrenos em Capão Novo | Lotes e Áreas para Construir no Litoral",
  description: "Encontre o terreno ideal em Capão Novo e condomínios de luxo. Lotes com escritura, viabilidade de construção e alta valorização no litoral norte gaúcho.",
  keywords: ["terrenos capão novo", "lotes capão novo", "terrenos em condomínio fechado litoral", "comprar terreno litoral rs"],
};

export default function Page() {
  const faqItems = [
    {
      q: "Qual a metragem padrão dos terrenos em Capão Novo?",
      a: "A maioria dos lotes residenciais varia entre 300m² a 600m². Em condomínios fechados como o Costa Serena, é comum encontrar áreas maiores, preservando o distanciamento entre as casas."
    },
    {
      q: "Como funciona a escritura e documentação?",
      a: "Todos os terrenos em nossa curadoria possuem matrícula individualizada no Registro de Imóveis, garantindo total segurança jurídica no ato da compra."
    },
    {
      q: "A região tem viabilidade para construção imediata?",
      a: "Sim, a grande maioria dos nossos terrenos está em áreas com infraestrutura de água, luz e esgoto pronta, permitindo o início da obra assim que o projeto for aprovado na prefeitura."
    }
  ];

  return (
    <main className="min-h-screen bg-surface">
      <Header />
      
      {/* Editorial Header Section */}
      <section className="relative pt-40 pb-20 px-6 lg:px-10 max-w-7xl mx-auto overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-[0.2em] rounded">
              Oportunidades Únicas
            </div>
            <h1 className="text-4xl md:text-6xl font-serif text-primary leading-tight">
              Terrenos e Lotes <br />
              em <em className="italic font-normal text-secondary">Capão Novo</em>
            </h1>
            <p className="text-xl text-secondary/70 leading-relaxed font-light max-w-2xl">
              A base sólida para o seu projeto arquitetônico. Mapeamos as melhores áreas para quem busca construir do zero ou realizar um investimento seguro no litoral.
            </p>
          </div>
        </div>
      </section>

      {/* Strategic Value Proposition */}
      <section className="py-24 bg-surface-container-low transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
            <div className="space-y-4">
              <LandPlot className="text-secondary w-8 h-8 mx-auto md:mx-0" />
              <h3 className="text-lg font-serif text-primary uppercase tracking-wider">Metragens Amplas</h3>
              <p className="text-secondary/70 text-sm font-light leading-relaxed">
                Áreas planejadas que permitem projetos modernos com jardins, piscinas e amplas zonas de lazer privativo.
              </p>
            </div>
            <div className="space-y-4">
              <TrendingUp className="text-secondary w-8 h-8 mx-auto md:mx-0" />
              <h3 className="text-lg font-serif text-primary uppercase tracking-wider">Alto ROI</h3>
              <p className="text-secondary/70 text-sm font-light leading-relaxed">
                Terrenos são ativos de baixa manutenção e valorização acelerada devido à escassez de áreas beira-mar.
              </p>
            </div>
            <div className="space-y-4">
              <HardHat className="text-secondary w-8 h-8 mx-auto md:mx-0" />
              <h3 className="text-lg font-serif text-primary uppercase tracking-wider">Ready to Build</h3>
              <p className="text-secondary/70 text-sm font-light leading-relaxed">
                Lotes com viabilidade técnica confirmada e infraestrutura urbana pronta para instalação de canteiro de obras.
              </p>
            </div>
            <div className="space-y-4">
              <ShieldCheck className="text-secondary w-8 h-8 mx-auto md:mx-0" />
              <h3 className="text-lg font-serif text-primary uppercase tracking-wider">Segurança Jurídica</h3>
              <p className="text-secondary/70 text-sm font-light leading-relaxed">
                Análise minuciosa de certidões e histórico dominial para uma transação 100% livre de riscos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Listings Section */}
      <section className="py-20 px-6 lg:px-10 max-w-7xl mx-auto">
        <div className="mb-12 flex items-end justify-between border-b border-outline-variant/10 pb-6">
          <h2 className="text-3xl font-serif text-primary">Últimas Unidades</h2>
          <p className="text-secondary/60 text-sm italic">Atualizado hoje</p>
        </div>
        <PropertyGrid />
      </section>

      {/* Buying Guide Section (SEO Content) */}
      <section className="py-24 px-6 lg:px-10 bg-secondary/5">
        <div className="max-w-4xl mx-auto">
          <article className="prose prose-lg prose-headings:font-serif prose-headings:text-primary prose-p:text-secondary/80 max-w-none">
            <h2 className="text-3xl mb-8">Guia: O que considerar ao comprar um terreno em Capão Novo?</h2>
            <p>
              Comprar um terreno no litoral requer atenção a detalhes geográficos e legislações ambientais. Em Capão Novo, é fundamental verificar a proximidade com a zona de dunas e respeitar os recuos municipais para garantir que sua obra possa ser averbada sem entraves.
            </p>
            <h3>Escolha entre Loteamento Aberto ou Condomínio</h3>
            <p>
              Os <strong>loteamentos abertos</strong> oferecem mais liberdade e ausência de taxas mensais, ideais para quem busca uma residência de veraneio tradicional. Já os <strong>condomínios fechados</strong> (como Costa Serena e Velas da Marina) focam em infraestrutura social completa: piscinas, academias e segurança armada, justificando o investimento superior.
            </p>
          </article>
        </div>
      </section>

      {/* FAQ Section for SEO/GEO */}
      <section className="py-24 bg-surface">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <h2 className="text-2xl font-serif text-primary mb-12 text-center uppercase tracking-widest">
            Perguntas Sobre Lotes
          </h2>
          <div className="space-y-8">
            {faqItems.map((item, i) => (
              <div key={i} className="border border-outline-variant/10 p-8 rounded-sm hover:border-secondary transition-colors">
                <h4 className="text-lg font-serif text-primary mb-3">
                  {item.q}
                </h4>
                <p className="text-secondary/70 font-light italic text-sm">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </main>
  );
}
