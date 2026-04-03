import React from "react";
import { Check, Info } from "lucide-react";

const COMPARISON_DATA = [
  {
    condo: "Costa Serena",
    price: "R$ 850.000",
    appreciation: "+38%",
    infra: "Piscina, Academia, Salão, Portaria 24h",
    focus: "Segurança e Família",
  },
  {
    condo: "Velas da Marina",
    price: "R$ 1.2M",
    appreciation: "+42%",
    infra: "Marina privativa, Club House, Piscina Térmica",
    focus: "Exclusividade Náutica",
  },
  {
    condo: "Terrasul",
    price: "R$ 600.000",
    appreciation: "+35%",
    infra: "Área Gourmet, Quadras Poliesportivas",
    focus: "Custo-Benefício Premium",
  },
  {
    condo: "Village",
    price: "R$ 580.000",
    appreciation: "+28%",
    infra: "Portaria 24h, Playground, Salão de Festas",
    focus: "Acesso Facilitado",
  },
];

export const ComparisonTable = () => {
  return (
    <section className="py-24 bg-white border-b border-outline-variant overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row gap-12 mb-16 items-end">
          <div className="lg:w-1/2">
            <h2 className="text-[10px] font-sans font-black uppercase tracking-[0.4em] text-secondary mb-6">
              Análise Comparativa
            </h2>
            <h3 className="text-3xl md:text-4xl font-serif text-primary leading-tight mb-8">
              Comparativo de <br />
              <em className="italic font-normal">Condomínios</em> de Capão Novo
            </h3>
          </div>
          <div className="lg:w-1/2">
            <p className="text-primary/60 font-serif italic text-sm leading-relaxed mb-4">
              "Escolher o imóvel certo exige visão de longo prazo. Comparamos os principais empreendimentos da região para auxiliar sua tomada de decisão estratégica."
            </p>
            <div className="flex items-center gap-3 py-4 border-t border-outline-variant">
              <Info size={14} className="text-secondary" />
              <p className="text-[9px] font-sans font-black uppercase tracking-widest text-primary/40 leading-none">Dados baseados em transações reais de 2025</p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[1000px] border-collapse bg-white shadow-2xl shadow-primary/5">
            <thead>
              <tr className="bg-primary text-white">
                <th className="py-8 px-10 text-[10px] font-sans font-black uppercase tracking-[0.3em]">Condomínio</th>
                <th className="py-8 px-10 text-[10px] font-sans font-black uppercase tracking-[0.3em]">Preço Médio</th>
                <th className="py-8 px-10 text-[10px] font-sans font-black uppercase tracking-[0.3em]">Valorização (3 anos)</th>
                <th className="py-8 px-10 text-[10px] font-sans font-black uppercase tracking-[0.3em]">Foco</th>
                <th className="py-8 px-10 text-[10px] font-sans font-black uppercase tracking-[0.3em]">Infraestrutura</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {COMPARISON_DATA.map((row) => (
                <tr key={row.condo} className="group hover:bg-surface-container transition-colors duration-500">
                  <td className="py-10 px-10">
                    <span className="text-lg font-serif text-primary font-bold group-hover:text-secondary transition-colors transition-duration-500">{row.condo}</span>
                  </td>
                  <td className="py-10 px-10">
                    <span className="text-sm font-sans font-bold uppercase tracking-widest text-primary">{row.price}</span>
                  </td>
                  <td className="py-10 px-10">
                    <span className="inline-flex items-center gap-2 text-green-600 font-sans font-bold uppercase tracking-widest text-xs">
                      <Check size={14} />
                      {row.appreciation}
                    </span>
                  </td>
                  <td className="py-10 px-10">
                    <span className="text-[10px] font-sans font-black uppercase tracking-widest text-primary/40">{row.focus}</span>
                  </td>
                  <td className="py-10 px-10">
                    <p className="text-[10px] font-sans font-bold uppercase tracking-widest text-primary/60 max-w-xs">{row.infra}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
