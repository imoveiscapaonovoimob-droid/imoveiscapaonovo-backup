import { Metadata } from 'next';
import { Header } from "@/components/layout/Header";
import { CTA } from "@/components/home/CTA";
import { Footer } from "@/components/home/Footer";
import { MessageCircle, CheckCircle2 } from "lucide-react";
import { WHATSAPP_MESSAGES } from "@/lib/constants";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Apartamento Barato em Capão Novo RS | Melhor custo-benefício",
  description: "Apartamentos com o melhor custo-benefício em Capão Novo RS. Opções financiáveis, bom potencial de valorização e segurança jurídica no litoral norte gaúcho.",
  keywords: ["apartamento barato capão novo", "apartamento acessível capão novo rs", "apartamento investimento capão novo"],
};

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <section className="pt-40 pb-16 px-6 lg:px-10 max-w-[1200px] mx-auto">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-[0.3em] rounded mb-8">
            Custo-Benefício Real
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-primary leading-tight mb-8">
            Apartamentos com melhor custo-benefício em <em className="italic font-normal text-secondary">Capão Novo RS</em>
          </h1>
          <p className="text-xl text-primary/70 font-sans leading-relaxed mb-6">
            Encontrar um <strong>apartamento acessível em Capão Novo</strong> sem abrir mão da qualidade e do potencial de valorização é o nosso trabalho. Mapeamos unidades subprecificadas, oportunidades de primeira venda e imóveis em regiões emergentes do litoral norte gaúcho.
          </p>
          <p className="text-lg text-primary/60 font-sans leading-relaxed mb-10">
            <strong>Apartamentos com bom custo-benefício em Capão Novo RS</strong> não significam baixa qualidade. Significam compra inteligente: imóvel certo, no momento certo, com o preço justo de mercado e perspectiva real de ganho patrimonial.
          </p>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {[
              "Unidades a partir de R$ 180 mil",
              "Elegíveis ao financiamento bancário",
              "Imóveis em regiões com alta demanda",
              "Análise criteriosa de mercado",
              "Bom retorno com aluguel de temporada",
              "100% de segurança jurídica"
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
            Ver oportunidades de apartamentos
          </a>

          <div className="pt-12 border-t border-outline-variant">
            <h2 className="text-2xl font-serif text-primary mb-8">Mais opções em Capão Novo</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { href: "/apartamentos-capao-novo", label: "Todos os apartamentos em Capão Novo" },
                { href: "/apartamento-2-dormitorios-capao-novo", label: "Apartamentos 2 dormitórios" },
                { href: "/apartamento-mobiliado-capao-novo", label: "Apartamentos mobiliados" },
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
