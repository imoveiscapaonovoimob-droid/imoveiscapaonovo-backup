import React from "react";
import Image from "next/image";
import { TrendingUp, PenTool } from "lucide-react";

const ARTICLES = [
  {
    category: "Estratégia",
    title: "Por que investir em Capão Novo agora?",
    excerpt: "Análise técnica sobre a valorização de 18% ao ano no litoral norte e as novas infraestruturas que estão transformando a região.",
    image: "/blog1_new.png",
    icon: <TrendingUp size={14} />,
  },
  {
    category: "Curadoria",
    title: "Os melhores imóveis frente-mar de 2026",
    excerpt: "Nossa seleção anual de residências que redefinem o conceito de luxo e 'pé-na-areia' no litoral gaúcho.",
    image: "/blog2_new.jpeg",
    icon: <PenTool size={14} />,
  },
];

export const Blog = () => {
  return (
    <section className="py-16 sm:py-32 px-6 lg:px-12 bg-white">
      <div className="max-w-[1440px] mx-auto">
        <div className="text-center mb-10 sm:mb-32">
          <span className="text-secondary text-[10px] font-sans font-black tracking-[0.4em] uppercase mb-6 block">
            Nossa Visão
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-primary leading-tight tracking-tighter lowercase">
            inteligência <span className="italic">imobiliária</span>
          </h2>
          <div className="w-12 h-[1px] bg-secondary mx-auto mt-8"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-20 lg:gap-32">
          {ARTICLES.map((article, idx) => (
            <article key={idx} className="flex flex-col group cursor-pointer group">
              <div className="aspect-[16/10] overflow-hidden mb-6 sm:mb-12 bg-surface-container-low transition-all duration-700 group-hover:shadow-[0_40px_80px_-15px_rgba(0,22,41,0.1)]">
                <Image 
                  src={article.image} 
                  alt={article.title} 
                  width={800} 
                  height={500}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
              </div>
              <div className="flex flex-col flex-grow">
                <div className="flex items-center gap-4 mb-3 sm:mb-6">
                  <span className="text-secondary">{article.icon}</span>
                  <span className="text-secondary text-[9px] font-sans font-black tracking-[0.4em] uppercase block">
                    {article.category}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif text-primary mb-3 sm:mb-6 group-hover:text-secondary transition-colors duration-500 leading-tight">
                  {article.title}
                </h3>
                <p className="text-primary/60 text-base sm:text-lg font-serif italic leading-relaxed mb-6 sm:mb-10 flex-grow">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-6 text-primary hover:text-secondary transition-all duration-300">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-[0.3em]">Ler Artigo</span>
                  <div className="w-12 h-[1px] bg-outline-variant group-hover:w-20 group-hover:bg-secondary transition-all duration-500" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
