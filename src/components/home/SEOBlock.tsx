import React from "react";
import Image from "next/image";
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
                Tudo sobre imóveis em Capão Novo
              </h2>
              <p className="text-lg text-primary/70 font-sans leading-relaxed mb-4">
                Seja para morar ou investir, Capão Novo oferece opções para todos os perfis. Aqui você encontra segurança, lazer e rentabilidade no mesmo lugar.
              </p>
              <p className="text-lg text-primary/70 font-sans leading-relaxed mb-8">
                Somos a imobiliária em Capão Novo focada em curadoria: cada imóvel do nosso portfólio passa por uma análise de localização, documentação e potencial de valorização antes de chegar até você.
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
              <h3 className="text-xl font-serif text-primary mb-6">Benefícios da localização</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <li className="flex gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0" />
                  <div>
                    <strong className="block text-primary text-sm uppercase tracking-widest mb-1">Qualidade de Vida</strong>
                    <span className="text-xs text-primary/60 font-sans">Infraestrutura completa, segurança e tranquilidade o ano todo.</span>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0" />
                  <div>
                    <strong className="block text-primary text-sm uppercase tracking-widest mb-1">Rentabilidade</strong>
                    <span className="text-xs text-primary/60 font-sans">Mercado em expansão com alta demanda na temporada.</span>
                  </div>
                </li>
              </ul>

              <h3 className="text-xl font-serif text-primary mb-6">Perfil dos imóveis</h3>
              <p className="text-primary/70 font-sans text-sm mb-8">
                Imóveis com excelente padrão construtivo, perfeitos para famílias que buscam espaço, conforto e proximidade com a praia.
              </p>

              <h3 className="text-xl font-serif text-primary mb-6">Infraestrutura da região</h3>
              <p className="text-primary/70 font-sans text-sm">
                Comércio ativo, mercados, farmácias e espaços de lazer bem preservados que garantem comodidade sem precisar ir a outras praias.
              </p>
            </div>

            {/* Content Segments */}
            <div className="space-y-16 pt-8">
              <div className="border-l-4 border-secondary pl-8">
                <h2 className="text-2xl font-serif text-primary mb-4">Casas à Venda em Capão Novo</h2>
                <p className="text-primary/70 leading-relaxed mb-6 font-sans">
                  Nossas casas em Capão Novo possuem terrenos amplos e excelente localização. Elas garantem o melhor custo-benefício para quem quer tranquilidade perto do mar.
                </p>
                <div className="flex flex-wrap gap-3">
                  {["Terrenos Amplos", "Regiões de Moradores", "Proximidade com o Mar"].map(tag => (
                    <span key={tag} className="px-3 py-1 bg-secondary/5 text-secondary text-[10px] font-black uppercase tracking-widest border border-secondary/20 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>

              <div className="border-l-4 border-secondary pl-8">
                <h2 className="text-2xl font-serif text-primary mb-4">Apartamentos à Venda em Capão Novo</h2>
                <p className="text-primary/70 leading-relaxed mb-6 font-sans">
                  Ideais para quem valoriza praticidade e segurança. Selecionamos opções perto da praia, ideais para gerar renda extra ou passar o verão.
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
            <div className="sticky top-32 p-8 md:p-10 bg-primary text-white rounded-3xl shadow-2xl overflow-hidden relative border border-white/5">
              {/* Decorative Background Element */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
              
              <span className="text-secondary text-[10px] font-sans font-black tracking-[0.4em] uppercase mb-8 block relative z-10 text-center">
                Consultoria Direta
              </span>
              
              <div className="space-y-8 relative z-10 flex flex-col items-center">
                {/* Broker Photo - Premium Adjustment */}
                <div className="group relative w-full h-[340px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-white/5">
                  <Image
                    src="/images/corretor_escritorio.webp"
                    alt="Lenine Kerber - Corretor Especialista"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 400px"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-90" />
                  <div className="absolute bottom-6 inset-x-0 px-6 text-center">
                    <p className="text-secondary text-[8px] font-black uppercase tracking-[0.3em] mb-1">Especialista Local</p>
                    <h4 className="text-xl md:text-2xl font-serif text-white tracking-wide">Lenine Kerber</h4>
                  </div>
                </div>

                <div className="space-y-6 w-full">
                  <p className="text-white/80 text-sm font-sans leading-relaxed text-center">
                    Nossa equipe especializada está pronta para apresentar as melhores oportunidades antes mesmo de chegarem ao mercado aberto.
                  </p>
                  
                  <ul className="space-y-4">
                    {[
                      "Oportunidades exclusivas",
                      "Alto potencial de valorização",
                      "Negociações estratégicas"
                    ].map(item => (
                      <li key={item} className="flex items-center gap-3 text-[10px] font-sans font-bold uppercase tracking-widest text-white/90">
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(212,175,55,0.6)] shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="pt-2">
                    <a
                      href={WHATSAPP_MESSAGES.geral}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 w-full bg-secondary text-primary py-5 px-4 rounded-xl font-sans font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white hover:scale-[1.02] transition-all duration-300 shadow-xl shadow-black/20"
                    >
                      <MessageCircle size={18} fill="currentColor" />
                      Falar Agora
                    </a>
                    
                    <p className="text-center text-[9px] text-white/30 uppercase tracking-[0.3em] mt-6 font-bold">
                      Plantão de Vendas Capão Novo
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
