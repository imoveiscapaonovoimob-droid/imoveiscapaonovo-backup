import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/home/Footer";
import { TrendingUp, ArrowLeft, AlertTriangle, CheckCircle2, BarChart3, Home, Building2, Landmark } from "lucide-react";

export const metadata: Metadata = {
  title: "Por que investir em Capão da Canoa agora? | Análise de Mercado | Imóveis Capão Novo",
  description:
    "Análise técnica sobre valorização e infraestrutura no Litoral Norte gaúcho. Crescimento populacional, ciclo de crédito, custo de construção e dinâmica de oferta e demanda em Capão da Canoa.",
  keywords: [
    "investir em Capão da Canoa",
    "valorização imobiliária litoral norte",
    "mercado imobiliário Capão da Canoa",
    "imóveis Capão da Canoa 2025",
    "análise mercado imobiliário RS",
  ],
  alternates: {
    canonical: "https://imoveiscapaonovo.com.br/blog/investir-capao-da-canoa",
  },
  openGraph: {
    type: "article",
    locale: "pt_BR",
    url: "https://imoveiscapaonovo.com.br/blog/investir-capao-da-canoa",
    title: "Por que investir em Capão da Canoa agora?",
    description:
      "Uma análise técnica sobre valorização e infraestrutura no Litoral Norte gaúcho.",
    siteName: "Imóveis Capão Novo",
    images: [{ url: "/blog1_new.png", width: 1200, height: 630, alt: "Capão da Canoa" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Por que investir em Capão da Canoa agora?",
  description:
    "Uma análise técnica sobre valorização e infraestrutura no Litoral Norte gaúcho.",
  image: "https://imoveiscapaonovo.com.br/blog1_new.png",
  author: { "@type": "Organization", name: "Imóveis Capão Novo" },
  publisher: {
    "@type": "Organization",
    name: "Imóveis Capão Novo",
    logo: { "@type": "ImageObject", url: "https://imoveiscapaonovo.com.br/icon.png" },
  },
  datePublished: "2026-04-17",
  url: "https://imoveiscapaonovo.com.br/blog/investir-capao-da-canoa",
};

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-0 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/blog1_new.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/85 via-primary/70 to-white" />
        <div className="relative max-w-4xl mx-auto px-6 lg:px-10 py-20 sm:py-32">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-[10px] font-sans font-bold uppercase tracking-[0.3em] transition-colors duration-300 mb-10"
          >
            <ArrowLeft size={12} />
            Inteligência Imobiliária
          </Link>
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp size={14} className="text-secondary" />
            <span className="text-secondary text-[9px] font-sans font-black tracking-[0.4em] uppercase">
              Estratégia
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-white leading-tight tracking-tighter mb-8">
            Por que investir em{" "}
            <span className="italic">Capão da Canoa</span> agora?
          </h1>
          <p className="text-white/70 text-lg sm:text-xl font-serif italic leading-relaxed max-w-2xl">
            Uma análise técnica sobre valorização e infraestrutura no Litoral Norte gaúcho
          </p>
        </div>
      </section>

      {/* Article Body */}
      <article className="max-w-3xl mx-auto px-6 lg:px-10 py-16 sm:py-24">

        {/* Intro */}
        <div className="border-l-2 border-secondary pl-6 mb-16">
          <p className="text-primary/80 text-lg sm:text-xl font-serif leading-relaxed">
            A ideia de que <em>"imóvel sempre valoriza"</em> não se sustenta quando analisamos os dados com mais profundidade. No Brasil, especialmente entre 2014 e 2026, o mercado imobiliário apresentou desempenho heterogêneo — e, em muitos casos, perdas em termos reais.
          </p>
          <p className="text-primary/70 text-base sm:text-lg font-serif leading-relaxed mt-4">
            Em grandes capitais como Porto Alegre, estimativas indicam que os imóveis residenciais podem ter acumulado perdas reais relevantes, na faixa de 20% a 30%, dependendo do recorte analisado (tipologia, localização e índice inflacionário adotado, como o IPCA).
          </p>
          <p className="text-primary/70 text-base sm:text-lg font-serif leading-relaxed mt-4">
            É nesse contexto que Capão da Canoa se destaca como um mercado regional com dinâmica própria e fundamentos que justificam uma análise mais criteriosa.
          </p>
          <p className="text-primary/90 text-lg sm:text-xl font-serif leading-relaxed mt-6 font-medium">
            A pergunta central não é mais se o mercado valoriza, mas:{" "}
            <span className="italic text-secondary">
              quais mercados têm capacidade real de sustentar valorização?
            </span>
          </p>
        </div>

        {/* Section 1 */}
        <Section
          number="1"
          icon={<BarChart3 size={20} className="text-secondary" />}
          title="Demografia: o principal vetor de longo prazo"
        >
          <p>
            Os dados do Censo 2022 evidenciam uma mudança relevante no padrão populacional do estado:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
            <StatCard
              label="Capão da Canoa"
              value="+51%"
              sub="crescimento entre 2010 e 2022"
              positive
            />
            <StatCard
              label="Porto Alegre"
              value="−5,4%"
              sub="retração no mesmo período"
              positive={false}
            />
          </div>
          <p>Esse movimento não é pontual — ele reflete transformações estruturais:</p>
          <BulletList
            items={[
              "Interiorização e descentralização urbana",
              "Consolidação do trabalho remoto e híbrido",
              "Busca por qualidade de vida fora dos grandes centros",
            ]}
          />
          <Callout>
            O crescimento populacional sustenta demanda habitacional contínua, que é o principal motor de valorização imobiliária no longo prazo.
          </Callout>
        </Section>

        {/* Section 2 */}
        <Section
          number="2"
          icon={<TrendingUp size={20} className="text-secondary" />}
          title="Valorização real: evidência empírica e limitações"
        >
          <p>
            Ao analisar valorização imobiliária, o ponto central não é o crescimento nominal, mas o ganho acima da inflação (IPCA). No Brasil, grande parte dos mercados urbanos apresentou crescimento nominal positivo com desempenho real limitado ou negativo.
          </p>
          <p className="mt-4">No caso de Capão da Canoa, estimativas de mercado indicam:</p>
          <BulletList
            items={[
              "Valorização nominal expressiva desde 2014, especialmente no ciclo pós-2020",
              "Possibilidade de ganhos reais em segmentos específicos, principalmente imóveis bem localizados e com liquidez funcional",
            ]}
          />
          <Note>
            A ausência de séries públicas padronizadas limita a precisão estatística. Ainda assim, a evidência empírica — baseada em transações, comportamento de preços e liquidez — aponta para desempenho relativo superior ao de centros urbanos consolidados.
          </Note>
        </Section>

        {/* Section 3 */}
        <Section
          number="3"
          icon={<Landmark size={20} className="text-secondary" />}
          title="Atividade de mercado: leitura a partir do ITBI"
        >
          <p>
            A arrecadação de ITBI funciona como um indicador indireto relevante da dinâmica imobiliária local. Dados municipais recentes indicam crescimento real da arrecadação em 2025.
          </p>
          <p className="mt-4">Esse comportamento sugere:</p>
          <BulletList
            items={[
              "Manutenção de volume de transações",
              "Sustentação da demanda, mesmo em ambiente de crédito mais restritivo",
            ]}
          />
          <Note>
            O indicador deve ser interpretado com cautela, pois pode ser influenciado por fatores administrativos e fiscais. Mesmo assim, é consistente com um mercado ativo — não apenas especulativo.
          </Note>
        </Section>

        {/* Section 4 */}
        <Section
          number="4"
          icon={<Home size={20} className="text-secondary" />}
          title="Oferta e demanda: um desequilíbrio favorável"
        >
          <p>A estrutura atual do mercado revela um ponto técnico importante:</p>
          <BulletList
            items={[
              "Oferta limitada de imóveis com boa localização e preço intermediário",
              "Lançamentos concentrados em médio-alto e alto padrão",
              "Crescimento da demanda por moradia permanente",
            ]}
          />
          <p className="mt-4">
            Esse desalinhamento cria uma restrição relativa de oferta qualificada, que tende a sustentar preços, especialmente em imóveis com:
          </p>
          <BulletList
            items={[
              "Localização consolidada",
              "Boa planta e funcionalidade",
              "Condição adequada de conservação",
            ]}
          />
        </Section>

        {/* Section 5 */}
        <Section
          number="5"
          icon={<BarChart3 size={20} className="text-secondary" />}
          title="Ciclo de crédito: leitura estratégica dos juros"
        >
          <p>O atual ambiente de juros elevados impacta diretamente o mercado:</p>
          <BulletList
            items={[
              "Reduz a demanda financiada no curto prazo",
              "Aumenta o poder de negociação do comprador",
              "Diminui a competição por ativos",
            ]}
          />
          <p className="mt-4">Por outro lado, do ponto de vista estratégico:</p>
          <BulletList
            items={[
              "Períodos de crédito restritivo costumam anteceder ciclos de valorização",
              "A possibilidade de portabilidade futura cria flexibilidade financeira",
              "A entrada em momentos de menor concorrência melhora o preço médio de aquisição",
            ]}
          />
          <Callout>
            O cenário atual pode representar uma janela tática de entrada, especialmente para quem pensa no médio e longo prazo.
          </Callout>
        </Section>

        {/* Section 6 */}
        <Section
          number="6"
          icon={<Building2 size={20} className="text-secondary" />}
          title="Custo de construção: efeito de reposição"
        >
          <p>
            O CUB/RS (Custo Unitário Básico) segue em trajetória de alta — com variação superior a 6% até abril de 2026. Esse movimento tem implicações diretas:
          </p>
          <BulletList
            items={[
              "Elevação do custo de novos empreendimentos",
              "Lançamentos com preços mais altos",
              "Reprecificação do estoque existente",
            ]}
          />
          <p className="mt-4">
            Na prática, imóveis já construídos tendem a se valorizar por comparação, funcionando como proteção parcial contra a inflação da construção civil.
          </p>
        </Section>

        {/* Section 7 */}
        <Section
          number="7"
          icon={<Landmark size={20} className="text-secondary" />}
          title="Infraestrutura: evolução gradual, impacto cumulativo"
        >
          <p>
            O desenvolvimento urbano de Capão da Canoa ocorre de forma progressiva, acompanhando o crescimento populacional. Entre os vetores observados:
          </p>
          <BulletList
            items={[
              "Melhorias na mobilidade regional",
              "Expansão de serviços essenciais",
              "Evolução do padrão urbano e construtivo",
              "Investimentos contínuos em saneamento",
            ]}
          />
          <p className="mt-4">
            Embora muitas dessas mudanças sejam incrementais, seu efeito acumulado ao longo do tempo é relevante para a valorização imobiliária.
          </p>
        </Section>

        {/* Section 8 */}
        <Section
          number="8"
          icon={<Home size={20} className="text-secondary" />}
          title="Mudança estrutural: de veraneio para moradia"
        >
          <p>
            Um dos fatores mais importantes — e menos percebidos — é a mudança no uso dos imóveis.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
            <div className="p-5 border border-outline-variant bg-surface-container-low">
              <p className="text-[9px] font-sans font-black tracking-[0.35em] uppercase text-primary/40 mb-3">Modelo Tradicional</p>
              <ul className="space-y-2">
                {["Segunda residência", "Uso sazonal"].map((i) => (
                  <li key={i} className="flex items-center gap-2 text-sm font-serif text-primary/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/30 shrink-0" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-5 border border-secondary/30 bg-secondary/5">
              <p className="text-[9px] font-sans font-black tracking-[0.35em] uppercase text-secondary mb-3">Tendência Atual</p>
              <ul className="space-y-2">
                {["Moradia permanente", "Ocupação contínua", "Integração econômica local"].map((i) => (
                  <li key={i} className="flex items-center gap-2 text-sm font-serif text-primary">
                    <CheckCircle2 size={14} className="text-secondary shrink-0" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p>
            Essa transição reduz a volatilidade da demanda e cria uma base mais sólida para valorização consistente ao longo do tempo.
          </p>
        </Section>

        {/* Visão Crítica */}
        <div className="my-16 p-6 sm:p-8 border border-outline-variant bg-surface-container-low">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle size={18} className="text-primary/50" />
            <h2 className="text-lg font-sans font-bold uppercase tracking-[0.2em] text-primary/60 text-sm">
              Visão Crítica: o que pode limitar o crescimento
            </h2>
          </div>
          <p className="text-primary/70 font-serif leading-relaxed mb-4">
            Nenhum mercado é isento de riscos. Entre os principais pontos de atenção:
          </p>
          <BulletList
            items={[
              "Manutenção prolongada de juros elevados",
              "Eventual desaceleração do movimento de migração",
              "Possível sobreoferta em segmentos específicos (especialmente alto padrão)",
            ]}
            muted
          />
          <p className="text-primary/70 font-serif leading-relaxed mt-4">
            Além disso, o desempenho tende a variar significativamente conforme: localização, tipo de imóvel e faixa de preço.
          </p>
        </div>

        {/* Conclusão */}
        <div className="my-16">
          <span className="text-secondary text-[10px] font-sans font-black tracking-[0.4em] uppercase mb-4 block">
            Conclusão
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-primary leading-tight tracking-tighter mb-8">
            Por que o momento atual{" "}
            <span className="italic">merece atenção</span>
          </h2>
          <p className="text-primary/70 font-serif text-lg leading-relaxed mb-6">
            A combinação atual de fatores coloca Capão da Canoa em uma posição diferenciada:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {[
              "Crescimento populacional consistente",
              "Transição estrutural para moradia permanente",
              "Restrição relativa de oferta qualificada",
              "Pressão de custos na construção civil",
              "Menor competição em função do crédito restritivo",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 p-4 border border-secondary/20 bg-secondary/5">
                <CheckCircle2 size={16} className="text-secondary shrink-0 mt-0.5" />
                <span className="text-sm font-serif text-primary">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-primary/70 font-serif leading-relaxed mb-6">
            Isso não significa valorização automática — mas indica um mercado com fundamentos sólidos e dinâmica própria.
          </p>
          <p className="text-primary/70 font-serif leading-relaxed mb-8">
            No mercado imobiliário, decisões mais eficientes raramente acontecem em cenários "perfeitos", mas sim quando:
          </p>
          <div className="border-l-4 border-secondary pl-6 py-2 mb-10">
            <p className="text-primary text-xl sm:text-2xl font-serif leading-relaxed">
              👉 Os fundamentos estão presentes,<br />
              <span className="italic text-secondary">
                e o preço ainda não reflete totalmente esse potencial
              </span>
            </p>
          </div>
          <p className="text-primary/70 font-serif text-lg leading-relaxed">
            Sob essa perspectiva, o momento atual se mostra relevante para análise estratégica de investimento.
          </p>
        </div>

        {/* CTA */}
        <div className="border-t border-outline-variant pt-12 mt-12 text-center">
          <p className="text-primary/50 text-[9px] font-sans font-black tracking-[0.4em] uppercase mb-4">
            Próximo Passo
          </p>
          <h2 className="text-2xl sm:text-3xl font-serif text-primary mb-4">
            Quer analisar oportunidades específicas?
          </h2>
          <p className="text-primary/60 font-serif italic mb-8 max-w-md mx-auto">
            Nossa equipe mapeia os imóveis com melhor relação entre localização, preço e liquidez no litoral norte.
          </p>
          <Link
            href="/#contato"
            className="inline-flex items-center gap-3 bg-primary text-white px-8 py-4 text-[10px] font-sans font-bold uppercase tracking-[0.3em] hover:bg-secondary transition-colors duration-300"
          >
            Falar com um especialista
          </Link>
        </div>
      </article>

      <Footer />
    </main>
  );
}

/* ─── Sub-components ──────────────────────────────────────────────── */

function Section({
  number,
  icon,
  title,
  children,
}: {
  number: string;
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-16">
      <div className="flex items-center gap-3 mb-6">
        {icon}
        <span className="text-secondary text-[9px] font-sans font-black tracking-[0.4em] uppercase">
          {number}
        </span>
        <div className="w-6 h-[1px] bg-secondary/40" />
      </div>
      <h2 className="text-2xl sm:text-3xl font-serif text-primary leading-tight tracking-tighter mb-6">
        {title}
      </h2>
      <div className="space-y-4 text-primary/70 font-serif text-base sm:text-lg leading-relaxed">
        {children}
      </div>
    </section>
  );
}

function BulletList({ items, muted = false }: { items: string[]; muted?: boolean }) {
  return (
    <ul className="space-y-2 my-4">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className={`w-1.5 h-1.5 rounded-full mt-2.5 shrink-0 ${muted ? "bg-primary/30" : "bg-secondary"}`} />
          <span className={muted ? "text-primary/60 font-serif" : "font-serif"}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="border-l-2 border-secondary pl-6 py-1 my-6 bg-secondary/5">
      <p className="text-primary font-serif text-base sm:text-lg leading-relaxed italic">{children}</p>
    </blockquote>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 my-6 p-4 border border-outline-variant bg-surface-container-low">
      <AlertTriangle size={16} className="text-primary/40 shrink-0 mt-1" />
      <p className="text-primary/60 font-serif text-sm leading-relaxed">{children}</p>
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
  positive,
}: {
  label: string;
  value: string;
  sub: string;
  positive: boolean;
}) {
  return (
    <div className={`p-5 border ${positive ? "border-secondary/30 bg-secondary/5" : "border-outline-variant bg-surface-container-low"}`}>
      <p className="text-[9px] font-sans font-black tracking-[0.35em] uppercase text-primary/40 mb-2">{label}</p>
      <p className={`text-4xl font-serif font-bold tracking-tight mb-1 ${positive ? "text-secondary" : "text-primary/50"}`}>{value}</p>
      <p className="text-xs font-sans text-primary/50">{sub}</p>
    </div>
  );
}
