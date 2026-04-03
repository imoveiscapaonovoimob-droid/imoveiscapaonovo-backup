import React from "react";
import { Diamond, Landmark, Home, Building2 } from "lucide-react";
import { WHATSAPP_MESSAGES } from "@/lib/constants";

const PROFILES = [
  {
    icon: <Diamond size={24} />,
    title: "Frente Mar",
    description: "Imóveis com vista e acesso direto à praia",
    href: WHATSAPP_MESSAGES.frentemar,
  },
  {
    icon: <Landmark size={24} />,
    title: "Oportunidades",
    description: "Melhores preços e condições especiais",
    href: WHATSAPP_MESSAGES.oportunidades,
  },
  {
    icon: <Home size={24} />,
    title: "Casas",
    description: "Residências com conforto e privacidade",
    href: WHATSAPP_MESSAGES.casas,
  },
  {
    icon: <Building2 size={24} />,
    title: "Apartamentos",
    description: "Praticidade no litoral gaúcho",
    href: WHATSAPP_MESSAGES.apartamentos,
  },
];

export const ProfileSearch = () => {
  return (
    <section className="py-20 px-6 lg:px-10 bg-white">
      <div className="max-w-[1200px] mx-auto text-center">
        <span className="text-secondary text-[10px] font-sans font-bold uppercase tracking-[0.4em] mb-4 block">
          Buscar por Perfil
        </span>
        <h2 className="text-3xl md:text-4xl font-serif text-primary mb-16 leading-tight">
          Como você quer seu <em className="italic">imóvel</em>?
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {PROFILES.map((profile, idx) => (
            <a
              key={idx}
              href={profile.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-black/8 rounded p-5 sm:p-8 flex flex-col items-center text-center hover:border-secondary/30 hover:shadow-lg transition-all duration-400 group cursor-pointer"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center mb-3 sm:mb-5 bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-300 rounded">
                {profile.icon}
              </div>
              <h4 className="text-primary font-serif text-base sm:text-lg mb-1 sm:mb-2 leading-tight">
                {profile.title}
              </h4>
              <p className="text-primary/50 text-xs sm:text-sm leading-relaxed font-sans hidden sm:block">
                {profile.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
