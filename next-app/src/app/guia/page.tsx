import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/home/Footer";
import { MapPin, Waves, Utensils, Trees, ShoppingBag, Car } from "lucide-react";
import type { Metadata } from "next";
import { WHATSAPP_MESSAGES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Guia Capão Novo | Imóveis Capão Novo",
  description: "Conheça tudo sobre Capão Novo, RS. Praias, restaurantes, pontos turísticos e porque esta cidade é o melhor lugar para viver e investir no litoral gaúcho.",
};

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
  return (
    <main className="min-h-screen bg-white">
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
