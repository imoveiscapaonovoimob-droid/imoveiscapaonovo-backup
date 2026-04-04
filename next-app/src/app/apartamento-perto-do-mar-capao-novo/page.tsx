import { Metadata } from 'next';
import { Header } from "@/components/layout/Header";
import { CTA } from "@/components/home/CTA";
import { Footer } from "@/components/home/Footer";
import { MessageCircle, CheckCircle2 } from "lucide-react";
import { WHATSAPP_MESSAGES } from "@/lib/constants";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Apartamento Perto do Mar em Capão Novo RS | À Venda",
  description: "Apartamentos perto do mar em Capão Novo RS. Localização privilegiada, alta valorização e rentabilidade no aluguel de temporada. Curadoria especializada.",
  keywords: ["apartamento perto do mar capão novo", "apartamento praia capão novo rs", "apartamento beira mar capão novo litoral"],
};

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <section className="pt-40 pb-16 px-6 lg:px-10 max-w-[1200px] mx-auto">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-[0.3em] rounded mb-8">
            Vista e Valor
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-primary leading-tight mb-8">
            Apartamento perto do mar em <em className="italic font-normal text-secondary">Capão Novo RS</em>
          </h1>
          <p className="text-xl text-primary/70 font-sans leading-relaxed mb-6">
            Um <strong>apartamento perto do mar em Capão Novo</strong> é considerado ouro no mercado imobiliário litorâneo gaúcho. A combinação de localização privilegiada, vista para o oceano e alta demanda turística cria um ativo de valorização histórica consistente.
          </p>
          <p className="text-lg text-primary/60 font-sans leading-relaxed mb-10">
            <strong>Apartamentos à beira-mar em Capão Novo RS</strong> são escassos, justamente por isso a demanda supera a oferta ano após ano. Quem investe nessa categoria não só usufrui de uma localização única, mas também se beneficia de valorização acelerada e alta liquidez, podendo revender ou locar com facilidade.
          </p>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {[
              "Vista privilegiada para o oceano",
              "Valorização acelerada por escassez",
              "Demanda superior à oferta",
              "Alta rentabilidade em temporada",
              "Localização de máximo prestígio",
              "Curadoria técnico-jurídica"
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
            Ver apartamentos perto do mar
          </a>

          <div className="pt-12 border-t border-outline-variant">
            <h2 className="text-2xl font-serif text-primary mb-8">Continue explorando imóveis em Capão Novo</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { href: "/apartamentos-capao-novo", label: "Todos os apartamentos em Capão Novo" },
                { href: "/apartamento-mobiliado-capao-novo", label: "Apartamentos mobiliados" },
                { href: "/casa-perto-do-mar-capao-novo", label: "Casas perto do mar" },
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
