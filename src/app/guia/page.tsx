import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/home/Footer";
import { MapPin, Waves, Utensils, Trees, ShoppingBag, Car } from "lucide-react";
import type { Metadata } from "next";
import { WHATSAPP_MESSAGES } from "@/lib/constants";
import { ShareButtons } from "@/components/shared/ShareButtons";

export const metadata: Metadata = {
  title: "Guia Capão Novo | Imóveis Capão Novo",
  description: "Conheça tudo sobre Capão Novo, RS. Praias, restaurantes, pontos turísticos e porque esta cidade é o melhor lugar para viver e investir no litoral gaúcho.",
};

const FAQ_ITEMS = [
  {
    question: "Dá para comprar uma casa com 100 mil reais em Capão Novo?",
    answer: "Uma casa pronta com esse valor é difícil de encontrar hoje em Capão Novo — o portfólio atual da região começa por volta de R$ 320.000 para apartamentos e sobrados mais compactos. Com R$ 100 mil, a opção mais realista costuma ser um terreno menor, mais afastado da praia, ou entrada financiada de um imóvel de maior valor.",
  },
  {
    question: "Quais são os apartamentos novos em Capão da Canoa e Capão Novo?",
    answer: "A região tem lançamentos e empreendimentos recentes principalmente nos condomínios fechados de alto padrão, como Terrasul e Velas da Marina, além de opções mais acessíveis em Village. Como a disponibilidade muda com frequência, o ideal é falar direto com a curadoria para ver o que está disponível agora.",
  },
  {
    question: "É melhor comprar imóvel novo ou usado em Capão Novo?",
    answer: "Depende do objetivo. Imóvel novo costuma vir com garantia de construtora, acabamento atual e menor manutenção no curto prazo, mas o preço por m² é mais alto. Imóvel usado permite mais margem de negociação, entrega imediata e, no litoral, costuma estar em bairros com infraestrutura já consolidada — o que pesa bastante para quem quer usar o imóvel logo.",
  },
  {
    question: "Qual é o melhor bairro de Capão da Canoa para comprar imóvel?",
    answer: "Não existe um único 'melhor' — depende do perfil. Posto 4 tem boa mobilidade e comércio por perto; Posto 5 e Village são mais familiares e tranquilos; Costa Serena, Velas da Marina e Terrasul são os condomínios fechados de padrão mais alto, com segurança e lazer completo.",
  },
  {
    question: "Qual a diferença entre Capão Novo e Capão da Canoa?",
    answer: "Capão Novo é um bairro dentro do município de Capão da Canoa, no litoral norte do Rio Grande do Sul — não é uma cidade separada. Fica a poucos minutos do centro de Capão da Canoa, com um perfil mais residencial e voltado à praia.",
  },
  {
    question: "A Imóveis Capão Novo aceita permuta de imóveis?",
    answer: "Sim. Trabalhamos com permuta (troca de imóveis), com ou sem valor complementar (torna), conforme a negociação entre as partes.",
  },
];

const GUIDE_SECTIONS = [
  {
    icon: <Waves size={20} />,
    title: "Praias & Mar",
    items: ["Praia do Barco", "Praia da Cal", "Arroio Teixeira", "Prainha de Capão"],
    description: "Capão Novo possui mais de 30km de praias rasas e tranquilas, ideais para famílias.",
  },
  {
    icon: <Utensils size={20} />,
    title: "Gastronomia",
    items: ["Restaurantes de Frutos do Mar", "Churrascarias Gaúchas", "Cafés & Bistrôs", "Quiosques na Orla"],
    description: "Uma rica cena gastronômica com culinária regional e contemporânea à beira-mar.",
  },
  {
    icon: <Trees size={20} />,
    title: "Natureza & Lazer",
    items: ["Parque Estadual Itapeva", "Dunas e Costões", "Lagoa do Peixe", "Ciclismo na Orla"],
    description: "Área de preservação e ecoturismo com biodiversidade nativa da Mata Atlântica.",
  },
  {
    icon: <ShoppingBag size={20} />,
    title: "Comércio",
    items: ["Centro Histórico", "Feiras de Artesanato", "Supermercados", "Farmácias & Saúde"],
    description: "Infraestrutura completa para moradores e veranistas durante todo o ano.",
  },
  {
    icon: <Car size={20} />,
    title: "Acesso & Mobilidade",
    items: ["83km de Porto Alegre", "RS-030 até Capão da Canoa", "Aeroporto Salgado Filho", "Estações de Abastecimento"],
    description: "Localização estratégica com fácil acesso pela BR-290 e RS-030.",
  },
  {
    icon: <MapPin size={20} />,
    title: "Bairros & Setores",
    items: ["Posto 04 — Centro", "Posto 05 — Familiar", "Costa Serena", "Village & Condomínios"],
    description: "Cada setor tem personalidade própria, de agitado a tranquilo e exclusivo.",
  },
];

export default function GuiaPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Header />

      {/* Hero */}
      <section className="bg-primary pt-44 pb-32 px-6 lg:px-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')]" />
        <div className="max-w-[1440px] mx-auto relative z-10">
          <span className="text-secondary text-[10px] font-sans font-bold uppercase tracking-[0.4em] mb-4 block">
            Litoral Norte Gaúcho
          </span>
          <h1 className="text-6xl md:text-8xl font-serif text-white leading-none mb-8">
            Guia<br />
            <em className="italic">Capão Novo</em>
          </h1>
          <p className="text-white/40 font-serif italic text-xl max-w-lg leading-relaxed">
            &ldquo;Tudo que você precisa saber para viver, investir e se apaixonar pelo litoral gaúcho.&rdquo;
          </p>
        </div>
      </section>

      {/* Guide Sections */}
      <section className="py-24 px-6 lg:px-10 bg-surface-container-low">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {GUIDE_SECTIONS.map((section, idx) => (
              <div key={idx} className="bg-white rounded p-8 border border-black/5 hover:shadow-lg transition-all duration-300 group">
                <div className="w-12 h-12 flex items-center justify-center bg-secondary/10 text-secondary rounded mb-6 group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                  {section.icon}
                </div>
                <h3 className="text-xl font-serif text-primary mb-3">{section.title}</h3>
                <p className="text-primary/50 text-sm font-sans leading-relaxed mb-5">{section.description}</p>
                <ul className="flex flex-col gap-2">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-[10px] font-sans font-bold uppercase tracking-widest text-primary/40">
                      <div className="w-1 h-1 rounded-full bg-secondary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 lg:px-10 bg-white">
        <div className="max-w-3xl mx-auto">
          <span className="text-secondary text-[10px] font-sans font-bold uppercase tracking-[0.4em] mb-4 block text-center">
            Perguntas Frequentes
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-primary mb-12 leading-tight text-center">
            Dúvidas sobre <em className="italic">Capão Novo</em>
          </h2>
          <div className="flex flex-col gap-8">
            {FAQ_ITEMS.map((item) => (
              <div key={item.question} className="border-b border-black/5 pb-8">
                <h3 className="text-lg font-serif text-primary mb-3">{item.question}</h3>
                <p className="text-primary/60 text-sm font-sans leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Share */}
      <section className="py-10 px-6 lg:px-10 bg-white">
        <div className="max-w-3xl mx-auto">
          <ShareButtons
            title="Guia Capão Novo | Tudo sobre o Litoral Norte Gaúcho"
            description="Praias, restaurantes, pontos turísticos e por que Capão Novo é o melhor lugar para viver e investir no litoral gaúcho."
            url="https://imoveiscapaonovo.com.br/guia"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 lg:px-10 bg-white text-center">
        <div className="max-w-2xl mx-auto">
          <span className="text-secondary text-[10px] font-sans font-bold uppercase tracking-[0.4em] mb-4 block">Pronto para investir?</span>
          <h2 className="text-4xl md:text-5xl font-serif text-primary mb-6 leading-tight">
            Encontre seu imóvel em <em className="italic">Capão Novo</em>
          </h2>
          <a
            href={WHATSAPP_MESSAGES.geral}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 bg-secondary text-white text-[10px] font-bold uppercase tracking-widest rounded hover:bg-secondary/90 transition-all duration-300 cursor-pointer"
          >
            Falar com Especialista
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
