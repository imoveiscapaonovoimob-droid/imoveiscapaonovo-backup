import React from "react";
import { Home, Building2, Map, ShieldCheck } from "lucide-react";
import { WHATSAPP_MESSAGES } from "@/lib/constants";

const PROFILES = [
  {
    icon: <Home size={28} />,
    title: "🏠 Casas em Capão Novo",
    description: "Residências com conforto, espaço e localização privilegiada.",
    cta: "👉 Ver casas à venda em Capão Novo",
    href: "/casas-capao-novo", // Link interno para SEO
  },
  {
    icon: <Building2 size={28} />,
    title: "🏢 Apartamentos em Capão Novo",
    description: "Praticidade, segurança e excelente custo-benefício no litoral.",
    cta: "👉 Ver apartamentos à venda em Capão Novo",
    href: "/apartamentos-capao-novo", // Link interno para SEO
  },
  {
    icon: <Map size={28} />,
    title: "🌍 Terrenos em Capão Novo",
    description: "Oportunidades para construir ou investir em uma das regiões que mais crescem.",
    cta: "👉 Ver terrenos à venda em Capão Novo",
    href: "/terrenos-capao-novo", // Link interno para SEO
  },
  {
    icon: <ShieldCheck size={28} />,
    title: "🏡 Condomínios em Capão Novo",
    description: "Segurança, lazer e alto padrão para morar ou investir com tranquilidade.",
    cta: "👉 Ver imóveis em condomínio",
    href: "/condominios-capao-novo", // Link interno para SEO
  },
];

export const ProfileSearch = () => {
  return (
    <section className="py-24 px-6 lg:px-10 bg-surface-container-low/30 border-y border-outline-variant">
      <div className="max-w-[1440px] mx-auto text-center">
        <span className="text-secondary text-[10px] font-sans font-black uppercase tracking-[0.5em] mb-4 block">
          Categorias em Destaque
        </span>
        <h2 className="text-3xl md:text-5xl font-serif text-primary mb-16 leading-tight max-w-3xl mx-auto">
          Encontre o <em className="italic font-normal">imóvel ideal</em> em Capão Novo
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROFILES.map((profile, idx) => (
            <a
              key={idx}
              href={profile.href}
              className="bg-white border border-outline-variant rounded-xl p-8 flex flex-col items-center text-center hover:border-secondary hover:shadow-2xl hover:shadow-secondary/10 transition-all duration-500 group cursor-pointer relative overflow-hidden"
            >
              <div className="w-16 h-16 flex items-center justify-center mb-6 bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-500 rounded-full shadow-inner">
                {profile.icon}
              </div>
              
              <h4 className="text-primary font-serif text-xl sm:text-2xl mb-3 leading-tight font-bold">
                {profile.title.split(' ').slice(1).join(' ')}
              </h4>
              
              <p className="text-primary/60 text-sm leading-relaxed font-sans mb-8">
                {profile.description}
              </p>

              <div className="mt-auto pt-6 border-t border-outline-variant/30 w-full">
                <span className="text-[11px] font-sans font-black uppercase tracking-widest text-secondary group-hover:translate-x-1 inline-block transition-transform duration-300">
                  {profile.cta}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
