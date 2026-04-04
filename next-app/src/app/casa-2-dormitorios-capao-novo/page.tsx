import { Metadata } from 'next';
import { Header } from "@/components/layout/Header";
import { CTA } from "@/components/home/CTA";
import { Footer } from "@/components/home/Footer";
import { MessageCircle, CheckCircle2 } from "lucide-react";
import { WHATSAPP_MESSAGES } from "@/lib/constants";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Casa 2 Dormitórios em Capão Novo RS | Casas à Venda",
  description: "Casas com 2 dormitórios à venda em Capão Novo RS. Ideais para veraneio, casal ou investimento. Curadoria especializada com análise de valorização e segurança jurídica.",
  keywords: ["casa 2 dormitorios capão novo", "casa dois quartos capão novo rs", "casa 2 quartos litoral rs"],
};

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <section className="pt-40 pb-16 px-6 lg:px-10 max-w-[1200px] mx-auto">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-[0.3em] rounded mb-8">
            Casas Selecionadas
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-primary leading-tight mb-8">
            Casas 2 dormitórios em <em className="italic font-normal text-secondary">Capão Novo RS</em>
          </h1>
          <p className="text-xl text-primary/70 font-sans leading-relaxed mb-6">
            As <strong>casas com 2 dormitórios em Capão Novo</strong> são as mais procuradas do mercado litorâneo gaúcho. Combinam praticidade, custo acessível e excelente retorno para aluguel de temporada, tornando-se uma das apostas favoritas de investidores e famílias que buscam qualidade de vida no litoral norte.
          </p>
          <p className="text-lg text-primary/60 font-sans leading-relaxed mb-10">
            Uma <strong>casa de 2 quartos em Capão Novo RS</strong> geralmente conta com sala integrada, área de serviço, banheiro completo e pátio nos modelos térrea. São ideais para casais, veraneio de final de semana ou como ativo rentável de aluguel por temporada.
          </p>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {[
              "Excelente custo-benefício no litoral RS",
              "Alta demanda para aluguel de temporada",
              "Financiamento bancário disponível",
              "Próximas à praia e comércios",
              "Bom potencial de valorização",
              "Análise jurídica inclusa na curadoria"
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
            Ver casas 2 dormitórios disponíveis
          </a>

          <div className="pt-12 border-t border-outline-variant">
            <h2 className="text-2xl font-serif text-primary mb-8">Mais opções de casas em Capão Novo</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { href: "/casas-capao-novo", label: "Todas as casas em Capão Novo" },
                { href: "/casa-3-dormitorios-capao-novo", label: "Casas 3 dormitórios" },
                { href: "/casa-perto-do-mar-capao-novo", label: "Casas perto do mar" },
                { href: "/apartamentos-capao-novo", label: "Apartamentos em Capão Novo" },
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
