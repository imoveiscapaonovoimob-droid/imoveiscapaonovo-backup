import { Metadata } from 'next';
import { Header } from "@/components/layout/Header";
import { CTA } from "@/components/home/CTA";
import { Footer } from "@/components/home/Footer";
import { MessageCircle, CheckCircle2 } from "lucide-react";
import { WHATSAPP_MESSAGES } from "@/lib/constants";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terreno para Investimento em Capão Novo RS | Lotes à Venda",
  description: "Terrenos para investimento em Capão Novo RS. Alto potencial de valorização, análise estratégica de mercado e segurança jurídica no litoral norte gaúcho.",
  keywords: ["terreno para investimento capão novo", "terreno investimento capão novo rs", "lote para valorizar capão novo litoral"],
};

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <section className="pt-40 pb-16 px-6 lg:px-10 max-w-[1200px] mx-auto">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-[0.3em] rounded mb-8">
            Investimento Inteligente
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-primary leading-tight mb-8">
            Terreno para investimento em <em className="italic font-normal text-secondary">Capão Novo RS</em>
          </h1>
          <p className="text-xl text-primary/70 font-sans leading-relaxed mb-6">
            Comprar um <strong>terreno para investimento em Capão Novo</strong> é uma das estratégias patrimoniais mais inteligentes do litoral norte gaúcho. Com baixa manutenção, alta liquidez e valorização consistente, lotes em Capão Novo RS são destino certo de investidores que pensam no longo prazo.
          </p>
          <p className="text-lg text-primary/60 font-sans leading-relaxed mb-10">
            O crescimento constante de Capão Novo — infraestrutura, acessibilidade e turismo — garante que <strong>terrenos adquiridos hoje</strong> representarão ganhos expressivos nos próximos 5 a 10 anos. Nossa curadoria identifica os lotes com maior margem de valorização estratégica.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {["Alto potencial de valorização futura","Baixa manutenção e alta liquidez","Regiões em plena expansão","Análise estratégica de mercado inclusa","Segurança jurídica total","Opções financiadas disponíveis"].map(item => (
              <li key={item} className="flex items-center gap-3 p-4 bg-surface-container-low rounded-lg border border-outline-variant/30">
                <CheckCircle2 size={16} className="text-secondary shrink-0" />
                <span className="text-sm font-sans text-primary/80">{item}</span>
              </li>
            ))}
          </ul>
          <a href={WHATSAPP_MESSAGES.investir} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-5 bg-secondary text-white text-xs font-bold uppercase tracking-[0.2em] rounded hover:bg-secondary/90 transition-all duration-300 shadow-xl mb-16">
            <MessageCircle size={18} />Ver terrenos para investimento
          </a>
          <div className="pt-12 border-t border-outline-variant">
            <h2 className="text-2xl font-serif text-primary mb-8">Explore mais opções em Capão Novo</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { href: "/terrenos-capao-novo", label: "Todos os terrenos" },
                { href: "/terreno-de-esquina-capao-novo", label: "Terrenos de esquina" },
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
