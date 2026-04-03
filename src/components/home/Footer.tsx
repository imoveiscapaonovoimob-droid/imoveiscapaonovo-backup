import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Youtube, ArrowRight } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/constants";

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-outline-variant pt-32 pb-32 md:pb-16 px-6 lg:px-12">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-24">
          <div className="lg:col-span-4">
            <Link href="/" className="flex flex-col leading-none mb-10 group">
              <span className="text-5xl font-serif tracking-tight text-primary transition-colors group-hover:text-secondary">
                Imóveis
              </span>
              <span className="text-[22px] font-sans font-bold uppercase tracking-[0.5em] text-secondary leading-none mt-2">
                Capão Novo
              </span>
            </Link>
            <p className="text-primary/60 font-serif italic leading-relaxed mb-10 max-w-sm">
              "Sua curadoria premium de imóveis no litoral norte gaúcho. Mais de 3 décadas transformando sonhos em realidade à beira-mar."
            </p>
            <div className="flex gap-4">
              {[
                { Icon: Facebook, href: SOCIAL_LINKS.facebook, label: "Facebook" },
                { Icon: Instagram, href: SOCIAL_LINKS.instagram, label: "Instagram" },
                ...(SOCIAL_LINKS.youtube ? [{ Icon: Youtube, href: SOCIAL_LINKS.youtube, label: "YouTube" }] : []),
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-12 h-12 flex items-center justify-center bg-surface-container-low text-primary/40 hover:bg-secondary hover:text-primary transition-all duration-500 rounded-full"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-sans font-black uppercase tracking-[0.4em] text-primary mb-8">Navegação</h4>
            <ul className="flex flex-col gap-4">
              {[
                { label: "Início", href: "/" },
                { label: "Posto 5", href: "/posto-5" },
                { label: "Terrenos", href: "/terrenos" },
                { label: "Sobre Nós", href: "/sobre" },
                { label: "Blog", href: "/blog" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-primary/50 hover:text-secondary text-sm font-sans font-bold transition-colors duration-300 uppercase tracking-widest text-[9px]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-sans font-black uppercase tracking-[0.4em] text-primary mb-8">Condomínios</h4>
            <ul className="flex flex-col gap-4">
              {[
                { label: "Posto 4", href: "/imoveis-capao-novo-posto-4" },
                { label: "Village", href: "/imoveis-capao-novo-village" },
                { label: "Costa Serena", href: "/imoveis-costa-serena" },
                { label: "Velas", href: "/imoveis-velas-da-marina" },
                { label: "Terrasul", href: "/imoveis-terrasul" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-primary/50 hover:text-secondary text-sm font-sans font-bold transition-colors duration-300 uppercase tracking-widest text-[9px]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="text-[10px] font-sans font-black uppercase tracking-[0.4em] text-primary mb-8">Newsletter Premium</h4>
            <p className="text-primary/60 text-sm mb-8 font-serif italic leading-relaxed">
              Assine para receber agenciamentos exclusivos antes de entrarem no mercado aberto.
            </p>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="Seu melhor e-mail" 
                className="w-full bg-surface-container-low border-b border-outline-variant px-0 py-5 text-sm outline-none focus:border-secondary transition-all duration-500 placeholder:text-primary/20 placeholder:uppercase placeholder:text-[10px] placeholder:tracking-[0.2em]"
              />
              <button className="absolute right-0 top-1/2 -translate-y-1/2 text-primary hover:text-secondary transition-colors duration-300">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-16 border-t border-outline-variant gap-8">
            <div className="flex flex-col gap-2 text-primary/30 text-[9px] font-sans font-black uppercase tracking-[0.3em] leading-tight">
              <span>© 2026 Imóveis Capão Novo. CRECI/RS 85784</span>
              <address className="not-italic">
                Av. Paraguassu, Capão Novo — Capão da Canoa, RS
              </address>
              <span className="text-primary/20">Curadoria premium em parceria com Montenegro Imóveis</span>
            </div>
            <div className="flex gap-12 text-primary/30 text-[9px] font-sans font-black uppercase tracking-[0.3em]">
              <Link href="/politica-privacidade" className="hover:text-secondary transition-colors">Privacidade</Link>
              <Link href="/termos-uso" className="hover:text-secondary transition-colors">Termos</Link>
            </div>
          </div>
      </div>
    </footer>
  );
};
