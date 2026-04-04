import { Metadata } from 'next';
import { Header } from "@/components/layout/Header";
import { CTA } from "@/components/home/CTA";
import { Footer } from "@/components/home/Footer";
import { MessageCircle, CheckCircle2 } from "lucide-react";
import { WHATSAPP_MESSAGES } from "@/lib/constants";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terreno de Esquina em Capão Novo RS | Lotes à Venda",
  description: "Terrenos de esquina em Capão Novo RS. Maior aproveitamento construtivo, visibilidade e valorização. Oportunidades selecionadas com análise jurídica completa.",
  keywords: ["terreno de esquina capão novo", "lote esquina capão novo rs", "terreno esquina litoral norte rs"],
};

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <section className="pt-40 pb-16 px-6 lg:px-10 max-w-[1200px] mx-auto">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-[0.3em] rounded mb-8">
            Maior Aproveitamento
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-primary leading-tight mb-8">
            Terreno de esquina em <em className="italic font-normal text-secondary">Capão Novo RS</em>
          </h1>
          <p className="text-xl text-primary/70 font-sans leading-relaxed mb-6">
            Um <strong>terreno de esquina em Capão Novo</strong> é a escolha premium entre os lotes. Com duas frentes, permite projetos arquitetônicos diferenciados, mais iluminação e maior aproveitamento construtivo.
          </p>
          <p className="text-lg text-primary/60 font-sans leading-relaxed mb-10">
            <strong>Lotes de esquina em Capão Novo RS</strong> se valorizam mais rapidamente pela escassez e versatilidade de uso — residencial ou comercial. Oportunidade para quem investe com visão de médio e longo prazo.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {["Aproveitamento construtivo superior","Valorização acima da média","Duas frentes e flexibilidade de projeto","Alta demanda e escassez natural","Segurança jurídica completa","Análise de viabilidade inclusa"].map(item => (
              <li key={item} className="flex items-center gap-3 p-4 bg-surface-container-low rounded-lg border border-outline-variant/30">
                <CheckCircle2 size={16} className="text-secondary shrink-0" />
                <span className="text-sm font-sans text-primary/80">{item}</span>
              </li>
            ))}
          </ul>
          <a href={WHATSAPP_MESSAGES.terrenos} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-5 bg-secondary text-white text-xs font-bold uppercase tracking-[0.2em] rounded hover:bg-secondary/90 transition-all duration-300 shadow-xl mb-16">
            <MessageCircle size={18} />Ver terrenos de esquina disponíveis
          </a>
          <div className="pt-12 border-t border-outline-variant">
            <h2 className="text-2xl font-serif text-primary mb-8">Mais terrenos em Capão Novo</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { href: "/terrenos-capao-novo", label: "Todos os terrenos" },
                { href: "/terreno-para-investimento-capao-novo", label: "Terrenos para investimento" },
                { href: "/terreno-comercial-capao-novo", label: "Terrenos comerciais" },
                { href: "/casas-capao-novo", label: "Casas em Capão Novo" },
              ].map(link => (<Link key={link.href} href={link.href} className="text-secondary font-bold text-sm hover:underline">→ {link.label}</Link>))}
            </div>
          </div>
        </div>
      </section>
      <CTA /><Footer />
    </main>
  );
}
