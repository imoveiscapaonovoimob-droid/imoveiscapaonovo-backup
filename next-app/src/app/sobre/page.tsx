import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/home/Footer";
import { Award, Clock, Heart, MessageCircle, Building2, ShieldCheck, TrendingUp } from "lucide-react";
import type { Metadata } from "next";
import { WHATSAPP_MESSAGES } from "@/lib/constants";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Sobre Nós | Imóveis Capão Novo | 30 Anos de Tradição",
  description: "Conheça a história da Imóveis Capão Novo. Especialistas em curadoria imobiliária no litoral gaúcho com foco em qualidade e transparência.",
};

const VALUES = [
  {
    icon: <Award size={20} />,
    title: "Expertise Local",
    description: "Mais de 30 anos de mercado no litoral norte gaúcho. Conhecemos cada rua, cada bairro, cada oportunidade antes de surgir.",
  },
  {
    icon: <Clock size={20} />,
    title: "Atendimento Ágil",
    description: "Respondemos em até 2 horas. Seu tempo é precioso — a gente sabe disso e respeita.",
  },
  {
    icon: <Heart size={20} />,
    title: "Curadoria com Propósito",
    description: "Não vendemos qualquer imóvel. Cada propriedade passa por nossa análise criteriosa de valor, localização e potencial.",
  },
];

export default function SobrePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Imóveis Capão Novo",
    "image": "https://imoveiscapaonovo.site/hero.webp",
    "description": "Imobiliária especializada em imóveis de alto padrão e terrenos em Capão Novo, litoral norte gaúcho.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Capão Novo, Capão da Canoa",
      "addressRegion": "RS",
      "addressCountry": "BR"
    },
    "telephone": "+5551984241088",
    "url": "https://imoveiscapaonovo.site",
    "areaServed": ["Capão Novo", "Capão da Canoa", "Costa Serena", "Velas da Marina"],
    "founder": {
      "@type": "Person",
      "name": "Lenine Kerber"
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Script
        id="real-estate-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-primary pt-44 pb-32 px-6 lg:px-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')]" />
        <div className="max-w-[1440px] mx-auto relative z-10 text-center md:text-left">
          <span className="text-secondary text-[10px] font-sans font-bold uppercase tracking-[0.4em] mb-4 block">
            Nossa História
          </span>
          <h1 className="text-6xl md:text-8xl font-serif text-white leading-none mb-8">
            Tradição &<br /><em className="italic text-secondary">Autoridade</em>
          </h1>
          <p className="text-white/40 font-serif italic text-xl max-w-lg leading-relaxed mx-auto md:mx-0">
            &ldquo;Transformamos a experiência de compra no litoral em um processo de curadoria artística e segurança jurídica.&rdquo;
          </p>
        </div>
      </section>

      {/* Story Block */}
      <section className="py-24 px-6 lg:px-10 bg-white">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-secondary text-[10px] font-sans font-bold uppercase tracking-[0.4em] mb-4 block">
              Desde 1994 no Litoral
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-primary mb-8 leading-tight">
              Uma imobiliária que<br /><em className="italic text-secondary">respira o mar</em>
            </h2>
            <div className="flex flex-col gap-6 text-primary/70 font-light leading-relaxed text-lg">
              <p>
                A <strong>Imóveis Capão Novo</strong> nasceu da paixão pelo litoral norte gaúcho. Entendemos que um imóvel na praia não é apenas tijolo e cimento; é o cenário onde memórias familiares serão construídas.
              </p>
              <p>
                Liderada por <strong>Lenine Kerber</strong>, um dos corretores mais experientes da região, nossa equipe curatorial seleciona cada oportunidade com o rigor de quem vive o dia a dia de Capão da Canoa há mais de três décadas. Nossa aliança estratégica com a Montenegro Imóveis potencializa nossa entrega, unindo curadoria local com força comercial.
              </p>
              <div className="flex items-center gap-3 pt-4 text-primary font-bold">
                <ShieldCheck className="text-secondary" />
                <span>CRECI/RS 85784 — Autoridade em Litoral Norte</span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6 md:gap-8">
            {[
              { value: "30+", label: "Anos de Mercado", icon: <Clock className="w-4 h-4 text-secondary mb-2" /> },
              { value: "+1.000", label: "Contratos Fechados", icon: <Building2 className="w-4 h-4 text-secondary mb-2" /> },
              { value: "18%", label: "Valorização Média", icon: <TrendingUp className="w-4 h-4 text-secondary mb-2" /> },
              { value: "100%", label: "Foco no Cliente", icon: <Heart className="w-4 h-4 text-secondary mb-2" /> },
            ].map((stat, i) => (
              <div key={i} className="p-8 bg-surface-container-lowest border border-outline-variant/5 rounded-sm shadow-sm flex flex-col items-center group hover:border-secondary/20 transition-all">
                {stat.icon}
                <span className="text-4xl font-serif text-primary block mb-2">{stat.value}</span>
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-primary/50 text-center">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 lg:px-10 bg-surface-container-low/30 backdrop-blur-sm">
        <div className="max-w-[1440px] mx-auto text-center">
          <span className="text-secondary text-[10px] font-sans font-bold uppercase tracking-[0.4em] mb-4 block">
            Nossos Diferenciais
          </span>
          <h2 className="text-4xl font-serif text-primary leading-tight mb-16">
            Por que nos escolher?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {VALUES.map((val, i) => (
              <div key={i} className="bg-white rounded p-10 border border-outline-variant/10 hover:shadow-2xl transition-all duration-500 text-left relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/5 -mr-12 -mt-12 rounded-full transform group-hover:scale-150 transition-transform duration-700" />
                <div className="w-14 h-14 flex items-center justify-center bg-secondary/10 text-secondary rounded mb-8 group-hover:bg-secondary group-hover:text-white transition-all duration-500">
                  {val.icon}
                </div>
                <h3 className="text-2xl font-serif text-primary mb-4">{val.title}</h3>
                <p className="text-primary/60 text-base font-light leading-relaxed">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ do Site */}
      <section className="py-24 px-6 lg:px-10 max-w-4xl mx-auto">
        <h2 className="text-3xl font-serif text-primary text-center mb-16">Dúvida sobre nosso trabalho?</h2>
        <div className="space-y-12">
          <div className="space-y-4">
            <h4 className="text-xl font-serif text-primary border-l-2 border-secondary pl-4">Vocês atendem apenas Capão Novo?</h4>
            <p className="text-primary/70 leading-relaxed pl-4">Embora nosso DNA seja Capão Novo, atuamos em todo o litoral norte gaúcho, incluindo os principais condomínios fechados e áreas nobres de Capão da Canoa.</p>
          </div>
          <div className="space-y-4">
            <h4 className="text-xl font-serif text-primary border-l-2 border-secondary pl-4">Como funciona a curadoria de imóveis?</h4>
            <p className="text-primary/70 leading-relaxed pl-4">Não listamos todos os imóveis disponíveis. Filtramos por qualidade construtiva, documentação regular e potencial de mercado. Só levamos até você o que nós mesmos compraríamos.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32 px-6 lg:px-10 bg-primary text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')]" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="text-secondary/60 text-[9px] font-sans font-bold uppercase tracking-[0.4em] mb-4">
            © 2026 Imóveis Capão Novo — CRECI/RS 85784
          </div>
          <h2 className="text-5xl md:text-7xl font-serif text-white mb-12 leading-tight">
            Encontre seu lugar <br />ao <em className="italic text-secondary">sol.</em>
          </h2>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
             <a
              href={WHATSAPP_MESSAGES.geral}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-12 py-6 bg-secondary text-white text-[11px] font-bold uppercase tracking-[0.3em] rounded hover:shadow-2xl hover:scale-105 transition-all duration-500"
            >
              <MessageCircle size={18} fill="currentColor" />
              Solicitar Atendimento
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
