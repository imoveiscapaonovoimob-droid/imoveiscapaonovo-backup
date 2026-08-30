import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/home/Footer";
import { ShareButtons } from "@/components/shared/ShareButtons";
import { WHATSAPP_MESSAGES } from "@/lib/constants";
import {
  PenTool,
  ArrowLeft,
  AlertTriangle,
  CheckCircle2,
  Compass,
  Ruler,
  FileCheck2,
  Waves,
  XCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Os Melhores Imóveis Frente-Mar de 2026 | Guia de Curadoria | Imóveis Capão Novo",
  description:
    "Como reconhecer um verdadeiro imóvel frente-mar em Capão Novo: critérios técnicos de curadoria, distância real do mar, documentação, condomínios de referência e os erros mais comuns na hora de comprar.",
  keywords: [
    "imóveis frente-mar Capão Novo",
    "casas frente mar Capão da Canoa",
    "apartamento pé na areia litoral gaúcho",
    "imóveis à beira-mar RS",
    "curadoria imobiliária Capão Novo",
  ],
  alternates: {
    canonical: "https://imoveiscapaonovo.com.br/blog/melhores-imoveis-frente-mar-2026",
  },
  openGraph: {
    type: "article",
    locale: "pt_BR",
    url: "https://imoveiscapaonovo.com.br/blog/melhores-imoveis-frente-mar-2026",
    title: "Os Melhores Imóveis Frente-Mar de 2026",
    description:
      "Nossa seleção anual de residências que redefinem o conceito de luxo e 'pé-na-areia' no litoral gaúcho.",
    siteName: "Imóveis Capão Novo",
    images: [{ url: "/blog2_new.jpeg", width: 1200, height: 630, alt: "Imóvel frente-mar em Capão Novo" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Os Melhores Imóveis Frente-Mar de 2026",
  description:
    "Como reconhecer um verdadeiro imóvel frente-mar em Capão Novo: critérios técnicos de curadoria, documentação e erros comuns na compra.",
  image: "https://imoveiscapaonovo.com.br/blog2_new.jpeg",
  author: { "@type": "Person", name: "Lenine Kerber" },
  publisher: {
    "@type": "Organization",
    name: "Imóveis Capão Novo",
    logo: { "@type": "ImageObject", url: "https://imoveiscapaonovo.com.br/icon.png" },
  },
  datePublished: "2026-08-28",
  url: "https://imoveiscapaonovo.com.br/blog/melhores-imoveis-frente-mar-2026",
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
          style={{ backgroundImage: "url('/blog2_new.jpeg')" }}
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
            <PenTool size={14} className="text-secondary" />
            <span className="text-secondary text-[9px] font-sans font-black tracking-[0.4em] uppercase">
              Curadoria
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-white leading-tight tracking-tighter mb-8">
            Os melhores imóveis{" "}
            <span className="italic">frente-mar</span> de 2026
          </h1>
          <p className="text-white/70 text-lg sm:text-xl font-serif italic leading-relaxed max-w-2xl">
            Nossa seleção anual de residências que redefinem o conceito de luxo e &ldquo;pé-na-areia&rdquo; no litoral gaúcho
          </p>
        </div>
      </section>

      {/* Article Body */}
      <article className="max-w-3xl mx-auto px-6 lg:px-10 py-16 sm:py-24">

        {/* Direct Answer */}
        <div className="bg-secondary/5 border border-secondary/20 rounded-lg p-6 sm:p-8 mb-12">
          <p className="text-[9px] font-sans font-black tracking-[0.3em] uppercase text-secondary mb-3">Resposta direta</p>
          <p className="text-primary text-base sm:text-lg font-sans leading-relaxed">
            Um imóvel frente-mar real é aquele cujo terreno faz limite direto com a faixa de areia, sem quarteirão intermediário, com vista de mar aberta e permanente. Isso é diferente de &ldquo;quadra-mar&rdquo; (um quarteirão da praia) ou &ldquo;vista parcial&rdquo; (dois ou mais quarteirões) — categorias que não deveriam ter o mesmo preço, mas frequentemente são anunciadas como sinônimos.
          </p>
        </div>

        {/* Intro */}
        <div className="border-l-2 border-secondary pl-6 mb-16">
          <p className="text-primary/80 text-lg sm:text-xl font-serif leading-relaxed">
            &ldquo;Frente-mar&rdquo; é, hoje, um dos termos mais usados — e mais mal usados — do mercado imobiliário do litoral gaúcho. É comum encontrar anúncios de imóveis &ldquo;quase frente-mar&rdquo;, &ldquo;a poucos passos do mar&rdquo; ou &ldquo;com vista para o mar&rdquo; que, na prática, ficam a três ou quatro quarteirões da orla.
          </p>
          <p className="text-primary/70 text-base sm:text-lg font-serif leading-relaxed mt-4">
            Antes de falar em curadoria, luxo ou valorização, existe uma pergunta mais simples que todo comprador deveria fazer: <em>o que, tecnicamente, define um imóvel frente-mar?</em>
          </p>
          <p className="text-primary/90 text-lg sm:text-xl font-serif leading-relaxed mt-6 font-medium">
            Este guia reúne os critérios que usamos para curar cada oportunidade em Capão Novo —{" "}
            <span className="italic text-secondary">
              e os erros mais comuns que fazem compradores pagarem preço de frente-mar por um imóvel que não é.
            </span>
          </p>
        </div>

        {/* Section 1 */}
        <Section
          number="1"
          icon={<Waves size={20} className="text-secondary" />}
          title="O que é, de fato, um imóvel frente-mar"
        >
          <p>
            No mercado de Capão Novo e Capão da Canoa, três categorias costumam ser confundidas entre si — e o preço deveria refletir essa diferença:
          </p>
          <div className="grid grid-cols-1 gap-3 my-6">
            <CategoryCard
              tier="Frente-mar real"
              description="O terreno faz limite direto com a faixa de areia ou com a avenida-calçadão da orla, sem quarteirão intermediário. Vista de mar aberta e permanente, sem risco de bloqueio por construções futuras."
              highlight
            />
            <CategoryCard
              tier="Quadra-mar"
              description="Um quarteirão da praia. Pode ter vista de mar em andares mais altos, mas está sujeito a ser bloqueada por edificações vizinhas ao longo do tempo."
            />
            <CategoryCard
              tier="Vista mar parcial / distante"
              description="A dois ou mais quarteirões, com vista de mar apenas em determinados ângulos ou andares altos. Não deveria ser precificado como frente-mar."
            />
          </div>
          <Callout>
            Regra prática: peça sempre a distância em metros até a faixa de areia — não a descrição comercial do anúncio. Um bom corretor mede, não estima.
          </Callout>
        </Section>

        {/* Section 2 */}
        <Section
          number="2"
          icon={<Compass size={20} className="text-secondary" />}
          title="Orientação solar: o critério mais ignorado"
        >
          <p>
            No litoral norte gaúcho, a orientação da fachada principal tem impacto direto no conforto térmico, na incidência de sol na varanda e até na durabilidade de esquadrias expostas à maresia.
          </p>
          <BulletList
            items={[
              "Fachada Leste/Nordeste: sol da manhã, ideal para quem usa a varanda cedo e busca menos calor à tarde",
              "Fachada Norte: maior incidência solar ao longo do dia — valorizada no inverno gaúcho",
              "Fachada Oeste: pôr do sol sobre o mar, um diferencial estético forte, mas com mais calor no fim da tarde no verão",
            ]}
          />
          <p className="mt-4">
            Nenhuma orientação é &ldquo;errada&rdquo; — mas cada uma muda a experiência de morar no imóvel, e poucos anúncios mencionam esse dado.
          </p>
        </Section>

        {/* Section 3 */}
        <Section
          number="3"
          icon={<Ruler size={20} className="text-secondary" />}
          title="Construção e conservação: o que olhar além da decoração"
        >
          <p>
            Imóveis à beira-mar enfrentam um desgaste que não existe no interior: a maresia acelera a corrosão de estruturas metálicas, esquadrias e instalações elétricas. Uma curadoria séria avalia:
          </p>
          <BulletList
            items={[
              "Tipo de esquadria (alumínio anodizado ou PVC resistem melhor que ferro comum)",
              "Estado da pintura externa e sinais de infiltração em platibandas e sacadas",
              "Idade e manutenção do sistema hidráulico e elétrico",
              "Qualidade do revestimento de fachada em edifícios (cerâmica solta é um alerta comum na orla)",
            ]}
          />
          <Note>
            Um imóvel mais antigo, bem conservado e com manutenção documentada costuma ser uma escolha mais segura do que um imóvel novo com acabamento não adequado ao ambiente litorâneo.
          </Note>
        </Section>

        {/* Section 4 */}
        <Section
          number="4"
          icon={<FileCheck2 size={20} className="text-secondary" />}
          title="Documentação: onde a maioria das negociações trava"
        >
          <p>
            Parte relevante dos imóveis à venda no litoral ainda apresenta pendências documentais — normal em regiões de ocupação mais antiga, mas que precisa ser mapeada antes da negociação, não depois.
          </p>
          <BulletList
            items={[
              "Matrícula atualizada e sem ônus (ou com ônus claramente identificados)",
              "Averbação de construção — imóveis 'a averbar' costumam exigir tempo extra de regularização",
              "Situação de inventário, quando aplicável",
              "Regularidade de IPTU e, em condomínios, de taxas condominiais",
            ]}
          />
          <Callout>
            Todo imóvel que curamos passa por essa checagem documental antes de ser oferecido — é o que separa uma &ldquo;oportunidade&rdquo; real de um problema disfarçado de oportunidade.
          </Callout>
        </Section>

        {/* Section 5 */}
        <Section
          number="5"
          icon={<Waves size={20} className="text-secondary" />}
          title="Onde procurar: regiões de referência em Capão Novo"
        >
          <p>
            Nem toda região de Capão Novo tem o mesmo perfil. Conhecer as diferenças ajuda a alinhar expectativa e orçamento:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
            <div className="p-5 border border-outline-variant bg-surface-container-low">
              <p className="text-[9px] font-sans font-black tracking-[0.35em] uppercase text-primary/40 mb-2">Posto 4 e Posto 5</p>
              <p className="text-sm font-serif text-primary/70 leading-relaxed">
                Trechos mais tradicionais da orla, com forte concentração de imóveis realmente frente-mar e infraestrutura de praia consolidada.
              </p>
            </div>
            <div className="p-5 border border-outline-variant bg-surface-container-low">
              <p className="text-[9px] font-sans font-black tracking-[0.35em] uppercase text-primary/40 mb-2">Village</p>
              <p className="text-sm font-serif text-primary/70 leading-relaxed">
                Bairro planejado com bom acesso, procurado por quem busca praticidade e segurança sem abrir mão da proximidade do mar.
              </p>
            </div>
            <div className="p-5 border border-secondary/30 bg-secondary/5">
              <p className="text-[9px] font-sans font-black tracking-[0.35em] uppercase text-secondary mb-2">Costa Serena</p>
              <p className="text-sm font-serif text-primary/70 leading-relaxed">
                Condomínio fechado com foco em segurança e infraestrutura de lazer — perfil familiar, portaria 24h.
              </p>
            </div>
            <div className="p-5 border border-secondary/30 bg-secondary/5">
              <p className="text-[9px] font-sans font-black tracking-[0.35em] uppercase text-secondary mb-2">Velas da Marina e Terrasul</p>
              <p className="text-sm font-serif text-primary/70 leading-relaxed">
                Empreendimentos de alto padrão com clube náutico e área gourmet — o segmento mais exclusivo da região.
              </p>
            </div>
          </div>
        </Section>

        {/* Erros comuns */}
        <div className="my-16 p-6 sm:p-8 border border-outline-variant bg-surface-container-low">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle size={18} className="text-primary/50" />
            <h2 className="text-lg font-sans font-bold uppercase tracking-[0.2em] text-primary/60 text-sm">
              5 erros comuns na hora de comprar frente-mar
            </h2>
          </div>
          <ul className="space-y-4">
            {[
              "Confiar na descrição do anúncio em vez de conferir a distância real até a areia",
              "Não verificar se há terreno vazio entre o imóvel e a orla, que pode receber uma construção futura e bloquear a vista",
              "Ignorar o estado das instalações elétricas e hidráulicas em imóveis mais antigos",
              "Fechar negócio sem consultar a matrícula atualizada e a situação de averbação",
              "Comparar preço por m² sem considerar orientação solar, andar e tipo de vista",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <XCircle size={16} className="text-primary/40 shrink-0 mt-0.5" />
                <span className="text-primary/70 font-serif leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Conclusão */}
        <div className="my-16">
          <span className="text-secondary text-[10px] font-sans font-black tracking-[0.4em] uppercase mb-4 block">
            Conclusão
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-primary leading-tight tracking-tighter mb-8">
            Curadoria é o que separa{" "}
            <span className="italic">um bom anúncio de um bom imóvel</span>
          </h2>
          <p className="text-primary/70 font-serif text-lg leading-relaxed mb-6">
            Um verdadeiro imóvel frente-mar de 2026 reúne, ao mesmo tempo:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {[
              "Distância real e verificada até a faixa de areia",
              "Orientação solar compatível com o uso pretendido",
              "Estrutura e acabamento preparados para o clima litorâneo",
              "Documentação regularizada ou com pendências claramente mapeadas",
              "Localização dentro de uma região com infraestrutura consolidada",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 p-4 border border-secondary/20 bg-secondary/5">
                <CheckCircle2 size={16} className="text-secondary shrink-0 mt-0.5" />
                <span className="text-sm font-serif text-primary">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-primary/70 font-serif leading-relaxed">
            É esse o filtro que aplicamos antes de qualquer imóvel entrar em nosso portfólio — para que &ldquo;frente-mar&rdquo; volte a significar exatamente o que promete.
          </p>
        </div>

        {/* Share */}
        <ShareButtons
          title="Os Melhores Imóveis Frente-Mar de 2026"
          description="Nossa seleção anual de residências que redefinem o conceito de luxo e 'pé-na-areia' no litoral gaúcho."
          url="https://imoveiscapaonovo.com.br/blog/melhores-imoveis-frente-mar-2026"
        />

        {/* CTA */}
        <div className="border-t border-outline-variant pt-12 mt-4 text-center">
          <p className="text-primary/50 text-[9px] font-sans font-black tracking-[0.4em] uppercase mb-4">
            Próximo Passo
          </p>
          <h2 className="text-2xl sm:text-3xl font-serif text-primary mb-4">
            Quer conhecer as opções frente-mar disponíveis agora?
          </h2>
          <p className="text-primary/60 font-serif italic mb-8 max-w-md mx-auto">
            Aplicamos esses critérios em cada imóvel do nosso portfólio antes de recomendá-lo.
          </p>
          <a
            href={WHATSAPP_MESSAGES.frentemar}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-primary text-white px-8 py-4 text-[10px] font-sans font-bold uppercase tracking-[0.3em] hover:bg-secondary transition-colors duration-300"
          >
            Falar com um especialista
          </a>
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

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 my-4">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="w-1.5 h-1.5 rounded-full mt-2.5 shrink-0 bg-secondary" />
          <span className="font-serif">{item}</span>
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

function CategoryCard({
  tier,
  description,
  highlight = false,
}: {
  tier: string;
  description: string;
  highlight?: boolean;
}) {
  return (
    <div className={`p-5 border ${highlight ? "border-secondary/30 bg-secondary/5" : "border-outline-variant bg-surface-container-low"}`}>
      <p className={`text-[9px] font-sans font-black tracking-[0.35em] uppercase mb-2 ${highlight ? "text-secondary" : "text-primary/40"}`}>
        {tier}
      </p>
      <p className="text-sm font-serif text-primary/70 leading-relaxed">{description}</p>
    </div>
  );
}
