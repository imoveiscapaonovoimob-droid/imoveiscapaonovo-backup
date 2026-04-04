import { Metadata } from 'next';
import { Header } from "@/components/layout/Header";
import { CTA } from "@/components/home/CTA";
import { Footer } from "@/components/home/Footer";
import { MessageCircle, CheckCircle2 } from "lucide-react";
import { WHATSAPP_MESSAGES } from "@/lib/constants";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Casa Barata em Capão Novo RS | Melhor custo-benefício",
  description: "Encontre casas com o melhor custo-benefício em Capão Novo RS. Oportunidades selecionadas com critério técnico, segurança jurídica e alto potencial de valorização.",
  keywords: ["casa barata capão novo", "casa acessível capão novo rs", "casa custo beneficio capão novo"],
};

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <section className="pt-40 pb-16 px-6 lg:px-10 max-w-[1200px] mx-auto">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-[0.3em] rounded mb-8">
            Oportunidades Selecionadas
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-primary leading-tight mb-8">
            Casas com melhor custo-benefício em <em className="italic font-normal text-secondary">Capão Novo RS</em>
          </h1>
          <p className="text-xl text-primary/70 font-sans leading-relaxed mb-6">
            Comprar uma <strong>casa acessível em Capão Novo</strong> com segurança e potencial de valorização é possível com a curadoria certa. Nossa missão é encontrar as melhores oportunidades antes de chegarem ao mercado aberto, garantindo o melhor preço com toda a segurança jurídica.
          </p>
          <p className="text-lg text-primary/60 font-sans leading-relaxed mb-10">
            Casas com menor preço em Capão Novo RS não significam menor qualidade. Identificamos imóveis subprecificados ou em regiões emergentes com alto potencial de ganho, capao novo oferece algumas das melhores oportunidades do litoral norte.
          </p>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {[
              "Casas 2 dormitórios a partir de R$ 250 mil",
              "Imóveis em regiões de alto crescimento",
              "Análise jurídica inclusa na curadoria",
              "Alto potencial de valorização futura",
              "Financiamento bancário disponível",
              "Avaliação de mercado independente"
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
            Ver oportunidades disponíveis agora
          </a>

          <div className="pt-12 border-t border-outline-variant">
            <h2 className="text-2xl font-serif text-primary mb-8">Ver mais opções de casas em Capão Novo</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { href: "/casas-capao-novo", label: "Todas as casas em Capão Novo" },
                { href: "/casa-2-dormitorios-capao-novo", label: "Casas 2 dormitórios" },
                { href: "/casa-3-dormitorios-capao-novo", label: "Casas 3 dormitórios" },
                { href: "/casa-perto-do-mar-capao-novo", label: "Casas perto do mar" },
                { href: "/casa-com-patio-capao-novo", label: "Casas com pátio" },
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
