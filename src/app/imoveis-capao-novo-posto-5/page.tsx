import { Metadata } from 'next';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/home/Footer";
import { MessageCircle, MapPin, ShieldCheck, Waves } from "lucide-react";
import { WHATSAPP_MESSAGES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Imóveis Capão Novo Posto 5 | A Região Mais Nobre do Litoral",
  description: "Descubra os melhores imóveis no Posto 5 em Capão Novo. Apartamentos e casas exclusivos na área mais valorizada e tranquila de Capão da Canoa.",
  keywords: ["imóveis posto 5 capão novo", "apartamentos posto 5", "investimento imobiliário capão novo", "posto 5 capão da canoa"],
};

export default function Page() {
  const faqItems = [
    {
      q: "Por que investir no Posto 5 de Capão Novo?",
      a: "O Posto 5 é conhecido por ser a região mais tranquila e familiar de Capão Novo, apresentando uma valorização constante de 10-15% ao ano e uma infraestrutura de lazer completa à beira-mar."
    },
    {
      q: "Qual o perfil dos imóveis no Posto 5?",
      a: "Predominam apartamentos de médio e alto padrão, além de casas em condomínios fechados ou ruas planejadas, focando em segurança e exclusividade."
    },
    {
      q: "Como é a infraestrutura de lazer no local?",
      a: "O Posto 5 oferece o calçadão mais preservado, quiosques modernos, quadras poliesportivas e monitoramento 24h em diversas áreas."
    }
  ];

  return (
    <main className="min-h-screen bg-surface">
      <Header />
      
      {/* Editorial Header Section */}
      <section className="relative pt-40 pb-20 px-6 lg:px-10 max-w-7xl mx-auto overflow-hidden">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-[0.2em] rounded">
              Região Premium
            </div>
            <h1 className="text-4xl md:text-6xl font-serif text-primary leading-tight">
              Imóveis <em className="italic font-normal text-secondary">Posto 5</em> <br />
              Capão Novo
            </h1>
            <p className="text-lg text-secondary/70 leading-relaxed font-light max-w-xl">
              O Posto 5 representa o auge da exclusividade no litoral gaúcho. Uma região onde o som do mar e a brisa suave ditam o ritmo de uma vida sofisticada e segura.
            </p>
            <div className="pt-4">
              <a
                href={WHATSAPP_MESSAGES.geral}
                className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white text-xs font-bold uppercase tracking-widest rounded transition-all hover:bg-primary/90"
              >
                <MessageCircle size={16} />
                Consultar Disponibilidade
              </a>
            </div>
          </div>
          <div className="flex-1 relative aspect-[4/3] w-full bg-surface-container-low rounded-sm overflow-hidden border border-outline-variant/10 shadow-2xl">
            <div className="absolute inset-0 bg-[url('/hero.webp')] bg-cover bg-center brightness-90 contrast-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
          </div>
        </div>
      </section>

      {/* Strategic Content Grid */}
      <section className="py-24 bg-surface-container-lowest transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="space-y-4">
              <Waves className="text-secondary w-8 h-8 mb-2" />
              <h3 className="text-xl font-serif text-primary">Beira-Mar Preservada</h3>
              <p className="text-secondary/70 font-light leading-relaxed">
                Diferente de áreas mais agitadas, o Posto 5 mantém uma faixa de areia ampla e urbanização planejada que respeita a privacidade dos moradores.
              </p>
            </div>
            <div className="space-y-4">
              <ShieldCheck className="text-secondary w-8 h-8 mb-2" />
              <h3 className="text-xl font-serif text-primary">Segurança Reforçada</h3>
              <p className="text-secondary/70 font-light leading-relaxed">
                Monitoramento constante e patrulhamento preventivo fazem desta zona uma das mais seguras para crianças e famílias em qualquer época do ano.
              </p>
            </div>
            <div className="space-y-4">
              <MapPin className="text-secondary w-8 h-8 mb-2" />
              <h3 className="text-xl font-serif text-primary">Localização Estratégica</h3>
              <p className="text-secondary/70 font-light leading-relaxed">
                Acesso rápido ao centro de Capão da Canoa pela Av. Paraguassú, sem abrir mão do silêncio e da exclusividade de um bairro residencial premium.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Authority Content / Article */}
      <section className="py-24 px-6 lg:px-10 max-w-4xl mx-auto">
        <article className="prose prose-lg prose-headings:font-serif prose-headings:text-primary prose-p:text-secondary/80 max-w-none">
          <h2 className="text-3xl mb-8">O refúgio perfeito para investir ou morar</h2>
          <p>
            O mercado de <strong>imóveis no Posto 5 de Capão Novo</strong> atingiu um novo patamar de interesse por parte de investidores de Porto Alegre e da Serra Gaúcha. A combinação de baixa densidade demográfica e alta qualidade construtiva atrai aqueles que buscam um ativo imobiliário sólido.
          </p>
          <p>
            Seja para curtir as férias em um duplex de luxo ou para obter renda passiva através de aluguel por temporada, o Posto 5 oferece liquidez imediata. Nossa curadoria seleciona apenas unidades com documentação 100% regularizada e vistoria técnica aprovada.
          </p>
        </article>
      </section>

      {/* FAQ Section for SEO/GEO */}
      <section className="py-20 mb-20 bg-surface-container-low/50">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <h2 className="text-2xl font-serif text-primary mb-12 text-center uppercase tracking-widest">
            Perguntas Frequentes
          </h2>
          <div className="space-y-8">
            {faqItems.map((item, i) => (
              <div key={i} className="border-b border-outline-variant/10 pb-6 group">
                <h4 className="text-lg font-serif text-primary mb-3">
                  {item.q}
                </h4>
                <p className="text-secondary/70 font-light italic">
                  — {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
