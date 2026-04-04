import React from "react";
import { CheckCircle2, MessageCircle, ArrowRight } from "lucide-react";
import { WHATSAPP_MESSAGES } from "@/lib/constants";

export const SEOBlock = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Main SEO Content */}
          <div className="lg:col-span-8 space-y-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-serif text-primary mb-8 leading-tight">
                Imóveis à venda em Capão Novo RS
              </h2>
              <p className="text-lg text-primary/70 font-sans leading-relaxed mb-8">
                Se você está buscando imóveis em Capão Novo RS, saiba que a região oferece diversas opções para diferentes perfis, desde quem busca a tranquilidade da moradia fixa até investidores focados em alta rentabilidade.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                {[
                  "Casas à venda em Capão Novo",
                  "Apartamentos à venda em Capão Novo",
                  "Terrenos para investimento",
                  "Imóveis próximos ao mar",
                  "Imóveis lado serra",
                  "Imóveis em condomínio fechado"
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 p-4 bg-surface-container-low rounded-lg border border-outline-variant/30">
                    <CheckCircle2 size={18} className="text-secondary shrink-0" />
                    <span className="text-sm font-sans font-bold text-primary/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary/5 p-10 rounded-2xl border border-primary/10">
              <h3 className="text-xl font-serif text-primary mb-6">Capão Novo é ideal para:</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: "Morar com qualidade", desc: "Infraestrutura completa e segurança." },
                  { title: "Investir com valorização", desc: "Mercado em plena expansão no litoral." },
                  { title: "Imóvel para veraneio", desc: "A melhor relação custo-benefício do RS." },
                  { title: "Renda com aluguel", desc: "Alta demanda na temporada de verão." }
                ].map((item) => (
                  <li key={item.title} className="flex gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0" />
                    <div>
                      <strong className="block text-primary text-sm uppercase tracking-widest mb-1">{item.title}</strong>
                      <span className="text-xs text-primary/60 font-sans">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Content Segments */}
            <div className="space-y-16 pt-8">
              <div className="border-l-4 border-secondary pl-8">
                <h4 className="text-2xl font-serif text-primary mb-4">Casas à venda em Capão Novo</h4>
                <p className="text-primary/70 leading-relaxed mb-6 font-sans">
                  As casas em Capão Novo oferecem terrenos amplos, localizações privilegiadas em regiões de moradores consolidadas e uma proximidade única com o mar, mantendo um excelente custo-benefício para quem deseja sair do agito mas estar perto de tudo.
                </p>
                <div className="flex flex-wrap gap-3">
                  {["Terrenos Amplos", "Regiões de Moradores", "Proximidade com o Mar"].map(tag => (
                    <span key={tag} className="px-3 py-1 bg-secondary/5 text-secondary text-[10px] font-black uppercase tracking-widest border border-secondary/20 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>

              <div className="border-l-4 border-secondary pl-8">
                <h4 className="text-2xl font-serif text-primary mb-4">Apartamentos em Capão Novo</h4>
                <p className="text-primary/70 leading-relaxed mb-6 font-sans">
                  Perfeitos para quem busca praticidade e segurança. Nossos apartamentos selecionados oferecem proximidade com a praia e ótimas opções financiáveis, muitos deles já mobiliados e prontos para o seu veraneio ou para gerar renda imediata.
                </p>
                <div className="flex flex-wrap gap-3">
                  {["Praticidade", "Segurança", "Opções Financiáveis"].map(tag => (
                    <span key={tag} className="px-3 py-1 bg-secondary/5 text-secondary text-[10px] font-black uppercase tracking-widest border border-secondary/20 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>

              <div className="border-l-4 border-secondary pl-8">
                <h4 className="text-2xl font-serif text-primary mb-4">Terrenos em Capão Novo</h4>
                <p className="text-primary/70 leading-relaxed mb-6 font-sans">
                  Com o crescimento constante da região, comprar um terreno em Capão Novo hoje representa uma das maiores oportunidades de investimento do litoral norte, com alto potencial de valorização patrimonial nos próximos anos.
                </p>
                <p className="text-sm font-sans font-bold text-secondary flex items-center gap-2">
                  <ArrowRight size={16} /> Alto potencial de valorização nos próximos anos
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar CTA */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 p-10 bg-primary text-white rounded-3xl shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
              
              <span className="text-secondary text-[10px] font-sans font-black tracking-[0.4em] uppercase mb-6 block">
                Conversão Direta
              </span>
              <h3 className="text-3xl font-serif mb-8 leading-tight">
                Quer encontrar o melhor imóvel em Capão Novo?
              </h3>
              
              <div className="space-y-6 mb-12">
                <p className="text-white/60 text-sm font-sans italic leading-relaxed">
                  Nossa equipe especializada está pronta para apresentar as melhores oportunidades antes mesmo de chegarem ao mercado aberto.
                </p>
                <ul className="space-y-4">
                  {[
                    "Oportunidades exclusivas",
                    "Alto potencial de valorização",
                    "Negociações estratégicas"
                  ].map(item => (
                    <li key={item} className="flex items-center gap-3 text-[11px] font-sans font-bold uppercase tracking-widest">
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={WHATSAPP_MESSAGES.geral}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-secondary text-primary py-6 px-4 rounded-xl font-sans font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white transition-all duration-300"
              >
                <MessageCircle size={18} fill="currentColor" />
                Falar pelo WhatsApp
              </a>
              
              <p className="text-center text-[9px] text-white/30 uppercase tracking-[0.2em] mt-6 font-bold">
                Receba as melhores ofertas hoje
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
