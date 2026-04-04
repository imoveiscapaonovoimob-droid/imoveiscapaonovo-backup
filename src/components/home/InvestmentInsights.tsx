import React from "react";
import { CheckCircle2, Quote } from "lucide-react";

const REASONS = [
  {
    title: "Crescimento Populacional Constante",
    desc: "Aumento real na procura por moradia fixa e veraneio de qualidade no litoral norte.",
  },
  {
    title: "Alta Procura por Imóveis",
    desc: "Demanda aquecida que garante liquidez e rentabilidade para investidores atentos.",
  },
  {
    title: "Infraestrutura em Expansão",
    desc: "Investimentos públicos e privados transformando a orla e os acessos da região.",
  },
  {
    title: "Valorização Contínua",
    desc: "Histórico sólido de valorização patrimonial acima da média do mercado imobiliário.",
  },
];

export const InvestmentInsights = () => {
  return (
    <section className="py-32 bg-primary text-white overflow-hidden relative border-y border-white/5">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-secondary/5 to-transparent pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div>
            <h2 className="text-[11px] font-sans font-black uppercase tracking-[0.5em] text-secondary mb-10">
              Diferencial Estratégico
            </h2>
            <h3 className="text-4xl md:text-5xl font-serif text-white leading-tight mb-10">
              Por que investir em <em className="italic font-normal text-secondary">Capão Novo RS</em>?
            </h3>
            
            <div className="relative mb-12">
              <Quote size={48} className="text-secondary opacity-20 absolute -top-10 -left-10" />
              <p className="text-xl md:text-2xl font-serif italic text-white/90 leading-relaxed z-10 relative">
                "Capão Novo é o novo ponto de valorização do litoral gaúcho. Quem compra hoje, antecipa ganhos futuros."
              </p>
            </div>

            <div className="p-8 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
              <p className="text-sm md:text-base font-sans font-bold text-secondary leading-relaxed flex items-center gap-3">
                <span className="text-2xl">👉</span> 
                Região com excelente relação custo-benefício comparada a Capão da Canoa.
              </p>
            </div>
          </div>

          <div className="space-y-12">
            <h4 className="text-[12px] font-sans font-black uppercase tracking-[0.3em] text-white/40 mb-8 border-b border-white/10 pb-4">
              Pilares de Valorização
            </h4>
            <div className="space-y-12">
              {REASONS.map((reason) => (
                <div key={reason.title} className="flex gap-8 items-start group">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0 transition-all duration-500 group-hover:bg-secondary group-hover:-translate-y-1 shadow-lg shadow-secondary/5">
                    <CheckCircle2 size={22} className="text-secondary transition-colors group-hover:text-white" />
                  </div>
                  <div>
                    <h5 className="text-[13px] font-sans font-black uppercase tracking-widest text-white mb-3 group-hover:text-secondary transition-colors">{reason.title}</h5>
                    <p className="text-white/50 font-sans text-sm leading-relaxed transition-colors group-hover:text-white/80">{reason.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
