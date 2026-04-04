import { Metadata } from 'next';
import { Header } from "@/components/layout/Header";
import { CTA } from "@/components/home/CTA";
import { Footer } from "@/components/home/Footer";
import { MessageCircle, CheckCircle2 } from "lucide-react";
import { WHATSAPP_MESSAGES } from "@/lib/constants";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Apartamento 2 Dormitórios em Capão Novo RS | À Venda",
  description: "Apartamentos com 2 dormitórios à venda em Capão Novo RS. Praticidade, custo-benefício e ótima rentabilidade para veraneio e aluguel de temporada.",
  keywords: ["apartamento 2 dormitorios capão novo", "apartamento 2 quartos capão novo rs", "ap 2 dorms capão novo litoral"],
};

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <section className="pt-40 pb-16 px-6 lg:px-10 max-w-[1200px] mx-auto">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-[0.3em] rounded mb-8">
            Praticidade no Litoral
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-primary leading-tight mb-8">
            Apartamentos 2 dormitórios em <em className="italic font-normal text-secondary">Capão Novo RS</em>
          </h1>
          <p className="text-xl text-primary/70 font-sans leading-relaxed mb-6">
            Os <strong>apartamentos com 2 dormitórios em Capão Novo</strong> lideram em demanda no litoral norte gaúcho. Combinam o espaço que o casal ou a família pequena precisa com o custo que viabiliza o sonho de ter um imóvel no litoral, seja para moradia, veraneio ou investimento.
          </p>
          <p className="text-lg text-primary/60 font-sans leading-relaxed mb-10">
            Um <strong>apartamento de 2 quartos em Capão Novo RS</strong> costuma ter entre 60m² e 90m², com sala integrada, banheiro social ou suíte, sacada ou varanda, e ótima localização. São os mais procurados para aluguel de temporada, com excelente retorno financeiro durante o verão gaúcho.
          </p>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {[
              "Mais demandados no litoral gaúcho",
              "Retorno atrativo no aluguel de temporada",
              "Financiamento bancário disponível",
              "Boa localização central ou beira-mar",
              "Opções mobiliadas disponíveis",
              "Análise completa de mercado"
            ].map(item => (
              <li key={item} className="flex items-center gap-3 p-4 bg-surface-container-low rounded-lg border border-outline-variant/30">
                <CheckCircle2 size={16} className="text-secondary shrink-0" />
                <span className="text-sm font-sans text-primary/80">{item}</span>
              </li>
            ))}
          </ul>

          <a
            href={WHATSAPP_MESSAGES.apartamentos}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-5 bg-secondary text-white text-xs font-bold uppercase tracking-[0.2em] rounded hover:bg-secondary/90 transition-all duration-300 shadow-xl mb-16"
          >
            <MessageCircle size={18} />
            Ver apartamentos 2 dormitórios disponíveis
          </a>

          <div className="pt-12 border-t border-outline-variant">
            <h2 className="text-2xl font-serif text-primary mb-8">Explore também estes imóveis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { href: "/apartamentos-capao-novo", label: "Todos os apartamentos em Capão Novo" },
                { href: "/apartamento-mobiliado-capao-novo", label: "Apartamentos mobiliados" },
                { href: "/apartamento-perto-do-mar-capao-novo", label: "Apartamentos perto do mar" },
                { href: "/casas-capao-novo", label: "Casas em Capão Novo" },
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
