import React from "react";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_MESSAGES } from "@/lib/constants";

export const CTA = () => {
  return (
    <section className="py-16 sm:py-32 bg-primary relative overflow-hidden concrete-texture">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-x-0 top-0 h-[100px] bg-gradient-to-b from-white/10 to-transparent" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <span className="text-secondary text-[10px] font-sans font-black tracking-[0.5em] uppercase mb-6 sm:mb-10 block">
          Fale com um especialista
        </span>
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white mb-6 sm:mb-12 leading-tight lowercase tracking-tighter">
          deseja investir em <br />
          <span className="italic">capão novo?</span>
        </h2>
        <p className="text-white/40 font-serif italic text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto mb-8 sm:mb-16 leading-relaxed">
          &ldquo;Nossa equipe premium está pronta para encontrar a melhor oportunidade de investimento no litoral norte gaúcho.&rdquo;
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-10 sm:mb-24">
          <a
            href={WHATSAPP_MESSAGES.investir}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-4 bg-secondary text-primary px-10 py-6 font-sans font-black text-[10px] uppercase tracking-[0.3em] transition-all duration-500 hover:shadow-[0_20px_40px_-5px_rgba(207,175,106,0.2)] hover:-translate-y-1 rounded cursor-pointer"
          >
            <MessageCircle size={18} fill="currentColor" />
            Atendimento WhatsApp
          </a>
          <a
            href={WHATSAPP_MESSAGES.investir}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary-outline w-full sm:w-auto text-center"
          >
            Receber Oportunidades
          </a>
        </div>

        <div className="grid grid-cols-3 gap-4 sm:gap-12 md:gap-20 pt-10 sm:pt-20 border-t border-white/5">
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl md:text-5xl font-serif text-white mb-2">30+</span>
            <span className="text-[9px] font-sans font-black tracking-[0.4em] text-white/30 uppercase">Anos de Mercado</span>
          </div>
          <div className="flex flex-col items-center border-x-0 md:border-x border-white/5 px-0 md:px-8">
            <span className="text-3xl sm:text-4xl md:text-5xl font-serif text-white mb-2">18%</span>
            <span className="text-[9px] font-sans font-black tracking-[0.4em] text-white/30 uppercase">Valorização Média</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl md:text-5xl font-serif text-white mb-2">+1k</span>
            <span className="text-[9px] font-sans font-black tracking-[0.4em] text-white/30 uppercase">Clientes Premium</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
