import { Metadata } from 'next';
import { Header } from "@/components/layout/Header";
import { CTA } from "@/components/home/CTA";
import { Footer } from "@/components/home/Footer";
import { MessageCircle, CheckCircle2 } from "lucide-react";
import { WHATSAPP_MESSAGES } from "@/lib/constants";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Casa com Pátio em Capão Novo RS | Imóveis à Venda",
  description: "Casas com pátio em Capão Novo RS. Espaço ao ar livre para crianças, pets e churrascos. Qualidade de vida no litoral norte gaúcho com segurança jurídica.",
  keywords: ["casa com patio capão novo", "casa pátio frente capão novo rs", "casa ampla capão novo litoral"],
};

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <section className="pt-40 pb-16 px-6 lg:px-10 max-w-[1200px] mx-auto">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-[0.3em] rounded mb-8">
            Espaço e Qualidade de Vida
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-primary leading-tight mb-8">
            Casa com pátio em <em className="italic font-normal text-secondary">Capão Novo RS</em>
          </h1>
          <p className="text-xl text-primary/70 font-sans leading-relaxed mb-6">
            Quem busca uma <strong>casa com pátio em Capão Novo</strong> sabe o valor de ter um espaço externo exclusivo no litoral. Área verde para as crianças brincarem, espaço para pets, churrasqueira e jardim são diferenciais que elevam a qualidade de vida e a valorização do imóvel.
          </p>
          <p className="text-lg text-primary/60 font-sans leading-relaxed mb-10">
            Em Capão Novo RS, <strong>casas com pátio</strong> são frequentemente encontradas em loteamentos abertos e regiões mais tranquilas da cidade, com terrenos acima de 300m². São uma das opções mais valorizadas para quem busca um lar completo no litoral norte gaúcho com privacidade e liberdade.
          </p>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {[
              "Espaço externo para lazer e família",
              "Ideal para crianças e pets",
              "Churrasqueira e área de lazer",
              "Terrenos acima de 300m²",
              "Privacidade em ambiente natural",
              "Alta procura e boa liquidez"
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
            Ver casas com pátio disponíveis
          </a>

          <div className="pt-12 border-t border-outline-variant">
            <h2 className="text-2xl font-serif text-primary mb-8">Mais opções de casas em Capão Novo</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { href: "/casas-capao-novo", label: "Todas as casas em Capão Novo" },
                { href: "/casa-3-dormitorios-capao-novo", label: "Casas 3 dormitórios" },
                { href: "/terrenos-capao-novo", label: "Terrenos em Capão Novo" },
                { href: "/apartamentos-capao-novo", label: "Apartamentos em Capão Novo" },
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
