import { Metadata } from 'next';
import { Header } from "@/components/layout/Header";
import { CTA } from "@/components/home/CTA";
import { Footer } from "@/components/home/Footer";
import { MessageCircle, CheckCircle2 } from "lucide-react";
import { WHATSAPP_MESSAGES } from "@/lib/constants";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Casa 3 Dormitórios em Capão Novo RS | Imóveis Capão Novo",
  description: "Casas com 3 dormitórios à venda em Capão Novo RS. Espaço para a família, conforto e excelente localização no litoral norte gaúcho. Curadoria especializada.",
  keywords: ["casa 3 dormitorios capão novo", "casa 3 quartos capão novo rs", "casa familiar capão novo litoral"],
};

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <section className="pt-40 pb-16 px-6 lg:px-10 max-w-[1200px] mx-auto">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-[0.3em] rounded mb-8">
            Para a Família Inteira
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-primary leading-tight mb-8">
            Casas 3 dormitórios em <em className="italic font-normal text-secondary">Capão Novo RS</em>
          </h1>
          <p className="text-xl text-primary/70 font-sans leading-relaxed mb-6">
            Uma <strong>casa com 3 dormitórios em Capão Novo</strong> é a escolha preferida de famílias que buscam qualidade de vida no litoral norte gaúcho. Com espaço para todos, privacidade e o conforto de um lar completo, esses imóveis combinam moradia e investimento de forma equilibrada.
          </p>
          <p className="text-lg text-primary/60 font-sans leading-relaxed mb-10">
            As <strong>casas de 3 quartos em Capão Novo RS</strong> geralmente incluem suítes, sala de estar e jantar integradas, cozinha ampla, área de lazer e pátio. São muito procuradas tanto para moradia fixa quanto para veraneio de família.
          </p>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {[
              "Espaço para a família com conforto",
              "Melhores para moradia fixa no litoral",
              "Alta valorização por demanda familiar",
              "Opções em condomínio fechado",
              "Boa oferta de custo-benefício",
              "Segurança jurídica na transação"
            ].map(item => (
              <li key={item} className="flex items-center gap-3 p-4 bg-surface-container-low rounded-lg border border-outline-variant/30">
                <CheckCircle2 size={16} className="text-secondary shrink-0" />
                <span className="text-sm font-sans text-primary/80">{item}</span>
              </li>
            ))}
          </ul>

          <a
            href={WHATSAPP_MESSAGES.casas}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-5 bg-secondary text-white text-xs font-bold uppercase tracking-[0.2em] rounded hover:bg-secondary/90 transition-all duration-300 shadow-xl mb-16"
          >
            <MessageCircle size={18} />
            Ver casas 3 dormitórios disponíveis
          </a>

          <div className="pt-12 border-t border-outline-variant">
            <h2 className="text-2xl font-serif text-primary mb-8">Mais opções de imóveis em Capão Novo</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { href: "/casas-capao-novo", label: "Todas as casas em Capão Novo" },
                { href: "/casa-2-dormitorios-capao-novo", label: "Casas 2 dormitórios" },
                { href: "/casa-perto-do-mar-capao-novo", label: "Casas perto do mar" },
                { href: "/casa-com-patio-capao-novo", label: "Casas com pátio" },
                { href: "/terrenos-capao-novo", label: "Terrenos em Capão Novo" },
              ].map(link => (
                <Link key={link.href} href={link.href} className="text-secondary font-bold text-sm hover:underline">
                  → {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      <CTA />
      <Footer />
    </main>
  );
}
