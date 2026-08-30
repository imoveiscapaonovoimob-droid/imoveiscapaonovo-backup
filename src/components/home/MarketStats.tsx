import React from "react";
import { TrendingUp, Home, DollarSign, LineChart } from "lucide-react";

const STATS = [
  {
    label: "Valorização",
    value: "+7,9%",
    sub: "ao ano — 2ª maior do litoral norte",
    Icon: TrendingUp,
  },
  {
    label: "Preço do m²",
    value: "R$ 3.700-7.700",
    sub: "em Capão Novo, conforme localização",
    Icon: Home,
  },
  {
    label: "Volume de Vendas",
    value: "R$ 1,9 Bi",
    sub: "VGV 2025 — maior do litoral norte",
    Icon: LineChart,
  },
  {
    label: "Rentabilidade",
    value: "5-8%",
    sub: "aluguel de temporada, estimativa realista",
    Icon: DollarSign,
  },
];

export const MarketStats = () => {
  return (
    <section className="py-24 bg-surface-container-low overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/3">
            <h2 className="text-[10px] font-sans font-black uppercase tracking-[0.4em] text-secondary mb-6">
              Investimento e Valorização
            </h2>
            <h2 className="text-3xl md:text-4xl font-serif text-primary leading-tight mb-8">
              Por que investir em <em className="italic font-normal">Capão Novo?</em>
            </h2>
            <div className="space-y-6 mb-10">
              <p className="text-primary/80 font-sans leading-relaxed text-sm">
                O mercado imobiliário de Capão Novo vive um dos seus melhores ciclos de valorização. A combinação de infraestrutura em expansão e alta procura por qualidade de vida impulsiona os preços.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-sm font-sans font-bold text-primary">
                  <span className="text-xl">📈</span>
                  Capão da Canoa valoriza cerca de 7,9% ao ano
                </li>
                <li className="flex items-center gap-3 text-sm font-sans font-bold text-primary">
                  <span className="text-xl">💰</span>
                  Frente-mar valoriza 30-50% a mais que a média
                </li>
                <li className="flex items-center gap-3 text-sm font-sans font-bold text-primary">
                  <span className="text-xl">🚀</span>
                  Maior volume de vendas do litoral norte em 2025
                </li>
              </ul>
            </div>
            <div className="flex items-center gap-4 py-6 border-y border-outline-variant">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/20">
                <LineChart size={20} />
              </div>
              <div>
                <p className="text-[9px] font-sans font-black uppercase tracking-widest text-primary">Market Intelligence 2026</p>
                <p className="text-[9px] font-sans font-bold uppercase tracking-widest text-primary/30">Estimativas de mercado regional</p>
              </div>
            </div>
          </div>

          <div className="lg:w-2/3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-outline-variant border border-outline-variant rounded-lg overflow-hidden shadow-2xl">
              {STATS.map((stat) => (
                <div key={stat.label} className="bg-white p-10 flex flex-col items-center text-center group hover:bg-surface-container transition-colors duration-500">
                  <stat.Icon size={24} className="text-secondary mb-6 transition-transform duration-500 group-hover:scale-110" />
                  <span className="text-4xl font-serif text-primary font-bold mb-2 tracking-tighter">{stat.value}</span>
                  <span className="text-[10px] font-sans font-black uppercase tracking-widest text-primary mb-1">{stat.label}</span>
                  <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-primary/30">{stat.sub}</span>
                </div>
              ))}
            </div>
            
            {/* EAAT Trust Banner */}
            <div className="mt-8 p-8 border-l-4 border-secondary bg-white shadow-xl flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <p className="text-[11px] font-sans font-black uppercase tracking-[0.2em] text-primary">
                  Todos os imóveis são analisados com critérios:
                </p>
                <div className="flex flex-wrap gap-4 mt-2">
                  <span className="px-3 py-1 bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/10 rounded">Viabilidade Jurídica</span>
                  <span className="px-3 py-1 bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/10 rounded">Potencial de Valorização</span>
                  <span className="px-3 py-1 bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/10 rounded">Localização Estratégica</span>
                </div>
              </div>
              <p className="text-sm font-sans font-bold text-secondary leading-relaxed flex items-center gap-2">
                👉 Segurança real para quem quer investir ou morar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
