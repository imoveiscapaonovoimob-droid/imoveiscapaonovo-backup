import React from "react";
import { CheckCircle2, Quote } from "lucide-react";

const REASONS = [
  {
    title: "Crescimento Populacional",
    desc: "+8% ao ano (IBGE 2025). Aumento constante na procura por moradia fixa.",
  },
  {
    title: "Demanda Superior à Oferta",
    desc: "Média de 2,5 compradores interessados por unidade disponível no mercado.",
  },
  {
    title: "Infraestrutura de Valor",
    desc: "R$ 45 milhões investidos pelo setor público em Capão Novo (2024-2026).",
  },
  {
    title: "Valorização Histórica",
    desc: "Zero desvalorização registrada nos últimos 15 anos na região litorânea.",
  },
];

export const InvestmentInsights = () => {
  return (
    <section className="py-32 bg-primary text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div>
            <h2 className="text-[10px] font-sans font-black uppercase tracking-[0.4em] text-secondary mb-10">
              Insight do Especialista
            </h2>
            <div className="relative mb-16">
              <Quote size={40} className="text-secondary opacity-30 absolute -top-8 -left-8" />
              <blockquote className="text-2xl md:text-3xl font-serif italic text-white/90 leading-relaxed mb-10 z-10 relative">
                "Capão Novo é o novo ponto de valorização do litoral gaúcho. Investidores que compraram em 2023 já viram uma valorização de 30-40% em seus ativos."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-[1px] bg-secondary" />
                <div className="flex flex-col gap-1">
                  <p className="text-[10px] font-sans font-black uppercase tracking-widest text-secondary leading-none">
                    Lenine Kerber
                  </p>
                  <p className="text-[9px] font-sans font-bold uppercase tracking-widest text-white/30 leading-none">
                    Corretor CRECI 85784 — Especialista em Litoral Norte
                  </p>
                </div>
              </div>
            </div>

            <p className="text-white/40 font-serif italic text-sm leading-relaxed mb-12 max-w-lg">
              "A infraestrutura em plena expansão, somada ao novo acesso pela RS-389, coloca Capão Novo como a melhor relação custo-benefício para quem busca investir em 2026 e 2027."
            </p>
          </div>

          <div>
            <h3 className="text-3xl font-serif text-white leading-tight mb-12">
              5 Razões Baseadas em <br />
              <em className="italic font-normal">Dados</em> para Investir Agora
            </h3>
            <div className="space-y-10">
              {REASONS.map((reason) => (
                <div key={reason.title} className="flex gap-6 items-start group">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 transition-colors group-hover:bg-secondary">
                    <CheckCircle2 size={18} className="text-secondary transition-colors group-hover:text-white" />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-sans font-black uppercase tracking-widest text-white mb-2">{reason.title}</h4>
                    <p className="text-white/40 font-serif italic text-sm leading-relaxed transition-colors group-hover:text-white/70">{reason.desc}</p>
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
