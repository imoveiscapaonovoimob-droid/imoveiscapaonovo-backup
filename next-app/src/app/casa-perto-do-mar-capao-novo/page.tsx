import { Metadata } from 'next';
import { Header } from "@/components/layout/Header";
import { CTA } from "@/components/home/CTA";
import { Footer } from "@/components/home/Footer";
import { MessageCircle, CheckCircle2 } from "lucide-react";
import { WHATSAPP_MESSAGES } from "@/lib/constants";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Casa Perto do Mar em Capão Novo RS | Imóveis à Venda",
  description: "Casas perto do mar em Capão Novo RS. Localização privilegiada, valorização acelerada e qualidade de vida no litoral norte gaúcho. Curadoria especializada.",
  keywords: ["casa perto do mar capão novo", "casa praia capão novo rs", "imóvel beira mar capão novo", "casa frente mar capão novo"],
};

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <section className="pt-40 pb-16 px-6 lg:px-10 max-w-[1200px] mx-auto">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-[0.3em] rounded mb-8">
            Localização Privilegiada
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-primary leading-tight mb-8">
            Casa perto do mar em <em className="italic font-normal text-secondary">Capão Novo RS</em>
          </h1>
          <p className="text-xl text-primary/70 font-sans leading-relaxed mb-6">
            Uma <strong>casa perto do mar em Capão Novo</strong> é um dos ativos imobiliários mais valiosos do litoral norte gaúcho. A proximidade com a praia garante não apenas qualidade de vida incomparável, mas também uma valorização histórica consistente e alta liquidez no mercado.
          </p>
          <p className="text-lg text-primary/60 font-sans leading-relaxed mb-10">
            Capão Novo possui praias extensas e bem preservadas, com fácil acesso a diferentes regiões do litoral. <strong>Casas à beira-mar em Capão Novo RS</strong> são altamente rentáveis para aluguel de temporada e representam um patrimônio com tendência de valorização no longo prazo.
          </p>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {[
              "Valorização acelerada e liquidez alta",
              "Alta rentabilidade em aluguel de temporada",
              "Vista e acesso privilegiado à praia",
              "Escassez natural de imóveis beira-mar",
              "Demanda maior do que a oferta",
              "Segurança jurídica na transação"
            ].map(item => (
              <li key={item} className="flex items-center gap-3 p-4 bg-surface-container-low rounded-lg border border-outline-variant/30">
                <CheckCircle2 size={16} className="text-secondary shrink-0" />
                <span className="text-sm font-sans text-primary/80">{item}</span>
              </li>
            ))}
          </ul>

          <a
            href={WHATSAPP_MESSAGES.frentemar}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-5 bg-secondary text-white text-xs font-bold uppercase tracking-[0.2em] rounded hover:bg-secondary/90 transition-all duration-300 shadow-xl mb-16"
          >
            <MessageCircle size={18} />
            Ver casas perto do mar disponíveis
          </a>

          <div className="pt-12 border-t border-outline-variant">
            <h2 className="text-2xl font-serif text-primary mb-8">Explore mais imóveis em Capão Novo</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { href: "/casas-capao-novo", label: "Todas as casas em Capão Novo" },
                { href: "/casa-2-dormitorios-capao-novo", label: "Casas 2 dormitórios" },
                { href: "/casa-3-dormitorios-capao-novo", label: "Casas 3 dormitórios" },
                { href: "/apartamento-perto-do-mar-capao-novo", label: "Apartamentos perto do mar" },
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
