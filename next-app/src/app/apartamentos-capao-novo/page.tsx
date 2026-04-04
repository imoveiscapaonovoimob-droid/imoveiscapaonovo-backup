import { Metadata } from 'next';
import { Header } from "@/components/layout/Header";
import { PropertyGrid } from "@/components/home/PropertyGrid";
import { CTA } from "@/components/home/CTA";
import { Footer } from "@/components/home/Footer";
import { MessageCircle, Building2, TrendingUp, Shield, Wallet } from "lucide-react";
import { WHATSAPP_MESSAGES } from "@/lib/constants";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Apartamentos à venda em Capão Novo RS | Imóveis Capão Novo",
  description: "Apartamentos à venda em Capão Novo RS. Mobiliados, perto do mar, 2 dormitórios, financiáveis. Curadoria especializada com foco em valorização e conversão.",
  keywords: ["apartamentos capão novo", "apartamentos à venda capão novo", "apartamento mobiliado capão novo", "apartamento perto do mar capão novo rs"],
};

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* HERO SEO */}
      <section className="pt-40 pb-16 px-6 lg:px-10 bg-white">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-[0.3em] rounded mb-8">
                <Building2 size={12} />
                Curadoria de Apartamentos
              </div>
              <h1 className="text-4xl md:text-6xl font-serif text-primary leading-tight mb-8">
                Apartamentos à venda em{" "}
                <em className="italic font-normal text-secondary">Capão Novo RS</em>
              </h1>
              <p className="text-xl text-primary/70 font-sans leading-relaxed mb-6">
                O mercado de <strong>apartamentos em Capão Novo RS</strong> vive um momento excepcional. A demanda por imóveis verticais no litoral norte gaúcho cresce ano após ano, impulsionada pelo turismo, pela demanda de veraneio e pela busca por praticidade no litoral.
              </p>
              <p className="text-lg text-primary/60 font-sans leading-relaxed mb-10">
                Nossa curadoria de <strong>apartamentos à venda em Capão Novo</strong> foca em unidades com real potencial: localização privilegiada, acabamento de qualidade, viabilidade de financiamento e alto retorno com aluguel de temporada.
              </p>
              <a
                href={WHATSAPP_MESSAGES.apartamentos}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-5 bg-secondary text-white text-xs font-bold uppercase tracking-[0.2em] rounded hover:bg-secondary/90 transition-all duration-300 hover:-translate-y-0.5 shadow-xl"
              >
                <MessageCircle size={18} />
                Ver apartamentos disponíveis
              </a>
            </div>
            <div className="lg:col-span-1 space-y-4">
              {[
                { label: "8-12%", desc: "Rentabilidade anual com aluguel" },
                { label: "+18%", desc: "Demanda aquecida no litoral" },
                { label: "100%", desc: "Segurança na transação" },
              ].map((s) => (
                <div key={s.label} className="p-6 bg-primary text-white rounded-xl">
                  <span className="text-4xl font-serif text-secondary block mb-1">{s.label}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">{s.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VITRINE */}
      <div className="bg-surface-container-low py-12">
        <div className="max-w-[1440px] mx-auto px-6">
          <h2 className="text-2xl font-serif text-primary mb-8">Apartamentos disponíveis em Capão Novo</h2>
        </div>
        <PropertyGrid />
      </div>

      {/* SUBPÁGINAS LONG TAIL */}
      <section className="py-20 px-6 lg:px-10 bg-white">
        <div className="max-w-[1440px] mx-auto">
          <h2 className="text-3xl font-serif text-primary mb-4">Apartamentos em Capão Novo por perfil</h2>
          <p className="text-primary/60 mb-12 text-lg">Filtramos para você as melhores opções de acordo com o seu objetivo.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { href: "/apartamento-2-dormitorios-capao-novo", title: "2 Dormitórios", desc: "Equilíbrio perfeito entre espaço e custo. Excelente para veraneio." },
              { href: "/apartamento-mobiliado-capao-novo", title: "Mobiliados", desc: "Pronto para usar. Alta rentabilidade como aluguel de temporada." },
              { href: "/apartamento-perto-do-mar-capao-novo", title: "Perto do Mar", desc: "Vista para o oceano e valorização acelerada." },
              { href: "/apartamento-barato-capao-novo", title: "Melhor custo-benefício", desc: "Oportunidades reais para quem quer investir com orçamento estratégico." },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="p-8 border border-outline-variant rounded-xl hover:border-secondary hover:shadow-lg transition-all duration-300 group"
              >
                <h3 className="text-lg font-serif text-primary mb-3 group-hover:text-secondary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-primary/60 font-sans leading-relaxed mb-4">{item.desc}</p>
                <span className="text-[10px] font-black uppercase tracking-widest text-secondary">Ver opções →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CONTEÚDO SEO */}
      <section className="py-20 px-6 lg:px-10 bg-surface-container-low/50">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-12">

              <div>
                <h2 className="text-3xl font-serif text-primary mb-6">
                  Apartamentos em Capão Novo como investimento
                </h2>
                <p className="text-primary/70 leading-relaxed mb-6">
                  Comprar um <strong>apartamento em Capão Novo RS</strong> como investimento é uma das estratégias mais inteligentes do mercado imobiliário gaúcho atual. A combinação de alta demanda turística no verão com crescimento de moradores fixos cria um cenário favorável tanto para aluguel quanto para valorização patrimonial.
                </p>
                <p className="text-primary/70 leading-relaxed">
                  <strong>Apartamentos mobiliados em Capão Novo</strong> geram retorno médio de temporada entre 8% e 12% ao ano, superando a rentabilidade da renda fixa tradicional. E a valorização da unidade ao longo dos anos é um bônus adicional que poucos investimentos oferecem.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-serif text-primary mb-6">
                  O que avaliar ao comprar um apartamento em Capão Novo
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { icon: TrendingUp, title: "Potencial de valorização", desc: "Localização próxima ao mar garante valorização acelereda ao longo dos anos." },
                    { icon: Wallet, title: "Financiamento disponível", desc: "Verifique elegibilidade ao crédito imobiliário. Auxiliamos nesse processo." },
                    { icon: Shield, title: "Situação condominial", desc: "IPTU em dia, taxa condominial e histórico de inadimplência do prédio." },
                    { icon: Building2, title: "Infraestrutura do prédio", desc: "Elevador, gerador, segurança e área de lazer elevam valor e qualidade." },
                  ].map((item) => (
                    <div key={item.title} className="flex gap-4 p-5 bg-white rounded-xl border border-outline-variant/30">
                      <item.icon size={20} className="text-secondary shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-primary text-sm uppercase tracking-wider mb-1">{item.title}</h4>
                        <p className="text-xs text-primary/60 font-sans leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 bg-primary text-white rounded-2xl">
                <h3 className="text-2xl font-serif mb-6">Veja também em Capão Novo</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link href="/casas-capao-novo" className="text-white/80 hover:text-secondary transition-colors text-sm font-bold">
                    → Casas à venda em Capão Novo
                  </Link>
                  <Link href="/terrenos-capao-novo" className="text-white/80 hover:text-secondary transition-colors text-sm font-bold">
                    → Terrenos em Capão Novo
                  </Link>
                  <Link href="/imoveis-capao-novo-posto-4" className="text-white/80 hover:text-secondary transition-colors text-sm font-bold">
                    → Imóveis no Posto 4
                  </Link>
                  <Link href="/imoveis-capao-novo-posto-5" className="text-white/80 hover:text-secondary transition-colors text-sm font-bold">
                    → Imóveis no Posto 5
                  </Link>
                </div>
              </div>
            </div>

            {/* SIDEBAR */}
            <div className="lg:col-span-1">
              <div className="p-8 bg-white border border-outline-variant rounded-2xl sticky top-32">
                <h3 className="text-xl font-serif text-primary mb-6">Dúvidas frequentes</h3>
                <div className="space-y-6">
                  {[
                    { q: "Qual o preço médio de apartamentos em Capão Novo?", a: "Apartamentos de 2 dormitórios partem de R$ 180 mil. Unidades com vista para o mar ou mobiliadas podem superar R$ 600 mil." },
                    { q: "Posso financiar um apartamento em Capão Novo?", a: "Sim. Vários imóveis da nossa carteira são elegíveis ao financiamento bancário pelo Programa Casa Verde e Amarela e linhas FGTS." },
                    { q: "Apartamento mobiliado em Capão Novo vale a pena?", a: "Para aluguel de temporada, sim. A rentabilidade é superior à maioria dos investimentos de renda fixa, com potencial adicional de valorização." },
                  ].map((item, i) => (
                    <details key={i} className="border-b border-outline-variant pb-4 last:border-0">
                      <summary className="font-bold cursor-pointer text-primary text-sm mb-2">{item.q}</summary>
                      <p className="text-xs text-primary/60 leading-relaxed mt-3 font-sans">{item.a}</p>
                    </details>
                  ))}
                </div>
                <a
                  href={WHATSAPP_MESSAGES.apartamentos}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full mt-8 bg-secondary text-white py-5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-secondary/90 transition-colors"
                >
                  <MessageCircle size={16} />
                  Falar com Especialista
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </main>
  );
}
