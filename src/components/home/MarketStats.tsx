import React from "react";
import { TrendingUp, Home, DollarSign, LineChart } from "lucide-react";

const STATS = [
  {
    label: "Valorização Média",
    value: "+12%",
    sub: "ao ano (2023-2026)",
    Icon: TrendingUp,
  },
  {
    label: "Preço Médio m²",
    value: "R$ 8.500",
    sub: "frente mar / premium",
    Icon: Home,
  },
  {
    label: "Demanda Alta",
    value: "18%",
    sub: "crescimento em vendas",
    Icon: LineChart,
  },
  {
    label: "Rentabilidade",
    value: "8-12%",
    sub: "aluguel temporada",
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
              Inteligência de Mercado
            </h2>
            <h3 className="text-3xl md:text-4xl font-serif text-primary leading-tight mb-8">
              O momento <em className="italic font-normal">estratégico</em> para <br className="hidden md:block" />
              investir em Capão Novo
            </h3>
            <p className="text-primary/60 font-serif italic leading-relaxed text-sm mb-10">
              "Segundo dados da Câmara de Dirigentes Lojistas de Capão da Canoa, o mercado local registra sua fase mais sólida de expansão na última década."
            </p>
            <div className="flex items-center gap-4 py-6 border-y border-outline-variant">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white shrink-0">
                <span className="text-xs font-serif italic">CN</span>
              </div>
              <div>
                <p className="text-[9px] font-sans font-black uppercase tracking-widest text-primary">CDLCC Market Report 2026</p>
                <p className="text-[9px] font-sans font-bold uppercase tracking-widest text-primary/30">Fonte de Dados Autorizada</p>
              </div>
            </div>
          </div>

          <div className="lg:w-2/3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-outline-variant border border-outline-variant">
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
            <div className="mt-8 p-6 border border-secondary/10 bg-secondary/[0.03] flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                <span className="text-secondary font-serif italic text-xs">A</span>
              </div>
              <p className="text-[10px] font-sans font-bold uppercase tracking-widest text-primary/60 leading-relaxed">
                <strong className="text-primary">Selo de Auditoria Técnica:</strong> Cada dado acima e cada imóvel de nossa seleção passa por uma rigorosa análise de viabilidade técnico-jurídica, garantindo sua segurança patrimonial em Capão Novo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
