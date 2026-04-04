import { Metadata } from 'next';
import { Header } from "@/components/layout/Header";
import { PropertyGrid } from "@/components/home/PropertyGrid";
import { CTA } from "@/components/home/CTA";
import { Footer } from "@/components/home/Footer";
import { MessageCircle, CheckCircle2, TrendingUp, MapPin, Home, Shield } from "lucide-react";
import { WHATSAPP_MESSAGES } from "@/lib/constants";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Casas à venda em Capão Novo RS | Imóveis Capão Novo",
  description: "Encontre casas à venda em Capão Novo RS. Casa 2 e 3 dormitórios, perto do mar, com pátio e condomínio fechado. Curadoria especializada e alto potencial de valorização.",
  keywords: ["casas capão novo", "casas à venda capão novo", "casas capao novo rs", "casa perto do mar capão novo", "casa 3 dormitorios capão novo"],
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
                <Home size={12} />
                Curadoria de Casas
              </div>
              <h1 className="text-4xl md:text-6xl font-serif text-primary leading-tight mb-8">
                Casas à venda em{" "}
                <em className="italic font-normal text-secondary">Capão Novo RS</em>
              </h1>
              <p className="text-xl text-primary/70 font-sans leading-relaxed mb-6">
                Capão Novo RS é hoje uma das regiões mais procuradas para quem busca uma casa com qualidade de vida, valorização imobiliária e segurança patrimonial no litoral norte gaúcho. Se você está pesquisando <strong>casas à venda em Capão Novo</strong>, chegou ao lugar certo.
              </p>
              <p className="text-lg text-primary/60 font-sans leading-relaxed mb-10">
                Nossa curadoria vai além da listagem de imóveis. Analisamos cada <strong>casa em Capão Novo RS</strong> com critérios técnicos, jurídicos e de mercado, garantindo que você invista com segurança e inteligência.
              </p>
              <a
                href={WHATSAPP_MESSAGES.casas}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-5 bg-secondary text-white text-xs font-bold uppercase tracking-[0.2em] rounded hover:bg-secondary/90 transition-all duration-300 hover:-translate-y-0.5 shadow-xl"
              >
                <MessageCircle size={18} />
                Ver casas disponíveis agora
              </a>
            </div>
            <div className="lg:col-span-1 space-y-4">
              {[
                { label: "+12%", desc: "Valorização média ao ano" },
                { label: "30+", desc: "Anos de expertise local" },
                { label: "100%", desc: "Segurança jurídica" },
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
          <h2 className="text-2xl font-serif text-primary mb-8 px-0">Casas disponíveis em Capão Novo</h2>
        </div>
        <PropertyGrid />
      </div>

      {/* SUBPÁGINAS LONG TAIL */}
      <section className="py-20 px-6 lg:px-10 bg-white">
        <div className="max-w-[1440px] mx-auto">
          <h2 className="text-3xl font-serif text-primary mb-4">Encontre a casa ideal por perfil</h2>
          <p className="text-primary/60 mb-12 text-lg">Refinamos nossa busca para que você chegue mais rápido à casa certa.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { href: "/casa-2-dormitorios-capao-novo", title: "Casas 2 Dormitórios", desc: "Ótimas para casais e veraneio. Custo-benefício e praticidade." },
              { href: "/casa-3-dormitorios-capao-novo", title: "Casas 3 Dormitórios", desc: "Espaço para a família. Ideal para moradia fixa com conforto." },
              { href: "/casa-perto-do-mar-capao-novo", title: "Casas perto do mar", desc: "Localização privilegiada. Invista em imóvel com vista para o oceano." },
              { href: "/casa-com-patio-capao-novo", title: "Casas com pátio", desc: "Área verde para crianças e pets. Qualidade de vida garantida." },
              { href: "/casa-barata-capao-novo", title: "Casas com melhor custo-benefício", desc: "Oportunidades selecionadas para quem quer investir com inteligência." },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="p-8 border border-outline-variant rounded-xl hover:border-secondary hover:shadow-lg transition-all duration-300 group"
              >
                <h3 className="text-lg font-serif text-primary mb-3 group-hover:text-secondary transition-colors">
                  {item.title} em Capão Novo
                </h3>
                <p className="text-sm text-primary/60 font-sans leading-relaxed mb-4">{item.desc}</p>
                <span className="text-[10px] font-black uppercase tracking-widest text-secondary">Ver opções →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CONTEÚDO SEO PESADO */}
      <section className="py-20 px-6 lg:px-10 bg-surface-container-low/50">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-12">

              <div>
                <h2 className="text-3xl font-serif text-primary mb-6">
                  Por que comprar uma casa em Capão Novo RS?
                </h2>
                <p className="text-primary/70 leading-relaxed mb-6">
                  Capão Novo é um município no litoral norte do Rio Grande do Sul que vive um dos seus melhores momentos de expansão imobiliária. Diferente de destinos mais saturados como Capão da Canoa ou Torres, <strong>comprar uma casa em Capão Novo</strong> ainda representa uma janela de oportunidade com preços competitivos e expectativa de alta valorização.
                </p>
                <p className="text-primary/70 leading-relaxed mb-6">
                  A região oferece uma combinação rara: <em>tranquilidade de interior com infraestrutura de cidade litorânea moderna</em>. Avenidas arborizadas, acesso facilitado pelas rodovias estaduais, praias extensas e menos populosas do que os vizinhos maiores.
                </p>
                <p className="text-primary/70 leading-relaxed">
                  Quem busca <strong>casas à venda em Capão Novo</strong> tem opções para todos os perfis: desde residências de veraneio compactas e financiáveis até luxuosas mansões em condomínio com vista para o mar.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-serif text-primary mb-6">
                  Tipos de casas disponíveis em Capão Novo
                </h2>
                <div className="space-y-6">
                  <div className="p-6 bg-white rounded-xl border-l-4 border-secondary">
                    <h3 className="font-serif text-xl text-primary mb-3">Casas de veraneio em Capão Novo</h3>
                    <p className="text-primary/70 text-sm leading-relaxed">
                      Uma das opções mais procuradas. <strong>Casas de veraneio em Capão Novo</strong> costumam ter 2 a 3 dormitórios, áreas de churrasqueira, pátio e localização a poucos metros da praia. São ótimas tanto para uso próprio quanto para aluguel de temporada com retorno entre 8% e 12% ao ano.
                    </p>
                  </div>
                  <div className="p-6 bg-white rounded-xl border-l-4 border-secondary">
                    <h3 className="font-serif text-xl text-primary mb-3">Casas para morar em Capão Novo</h3>
                    <p className="text-primary/70 text-sm leading-relaxed">
                      O crescimento de moradores fixos em Capão Novo RS impulsionou uma demanda por casas familiares com espaço, segurança e proximidade a comércios e escolas. Encontramos casas de moradia com padrão entre médio e alto que representam excelente custo-benefício comparado a cidades maiores.
                    </p>
                  </div>
                  <div className="p-6 bg-white rounded-xl border-l-4 border-secondary">
                    <h3 className="font-serif text-xl text-primary mb-3">Casas em condomínio fechado em Capão Novo</h3>
                    <p className="text-primary/70 text-sm leading-relaxed">
                      Para quem prioriza segurança e alto padrão, as <strong>casas em condomínio em Capão Novo</strong> são a escolha premium. Com portaria 24h, áreas de lazer completas e projetos arquitetônicos diferenciados, são imóveis com forte apelo de valorização a longo prazo.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-serif text-primary mb-6">
                  Casas em Capão Novo: o que avaliar antes de comprar
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { icon: MapPin, title: "Localização e acesso", desc: "Verifique proximidade com a praia, acesso viário e comércios essenciais." },
                    { icon: Shield, title: "Segurança jurídica", desc: "Matrícula individualizada, IPTU em dia e ausência de pendências judiciais." },
                    { icon: TrendingUp, title: "Potencial de valorização", desc: "Histórico de preços do bairro e tendência de crescimento da região." },
                    { icon: CheckCircle2, title: "Análise estrutural", desc: "Vistoria técnica para garantir integridade da construção." },
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

              {/* LINKAGEM INTERNA */}
              <div className="p-8 bg-primary text-white rounded-2xl">
                <h3 className="text-2xl font-serif mb-6">Explore também</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link href="/apartamentos-capao-novo" className="flex items-center gap-3 text-white/80 hover:text-secondary transition-colors text-sm font-bold">
                    → Apartamentos à venda em Capão Novo
                  </Link>
                  <Link href="/terrenos-capao-novo" className="flex items-center gap-3 text-white/80 hover:text-secondary transition-colors text-sm font-bold">
                    → Terrenos em Capão Novo
                  </Link>
                  <Link href="/imoveis-capao-novo-posto-4" className="flex items-center gap-3 text-white/80 hover:text-secondary transition-colors text-sm font-bold">
                    → Imóveis no Posto 4
                  </Link>
                  <Link href="/imoveis-capao-novo-posto-5" className="flex items-center gap-3 text-white/80 hover:text-secondary transition-colors text-sm font-bold">
                    → Imóveis no Posto 5
                  </Link>
                </div>
              </div>
            </div>

            {/* SIDEBAR FAQ */}
            <div className="lg:col-span-1 space-y-6">
              <div className="p-8 bg-white border border-outline-variant rounded-2xl sticky top-32">
                <h3 className="text-xl font-serif text-primary mb-6">Dúvidas frequentes</h3>
                <div className="space-y-6">
                  {[
                    { q: "Qual o preço médio das casas em Capão Novo RS?", a: "Casas de veraneio partem de R$ 250 mil. Casas em condomínio fechado ou de frente mar podem superar R$ 2 milhões. Nossa consultoria identifica as melhores opções para o seu orçamento." },
                    { q: "É possível financiar uma casa em Capão Novo?", a: "Sim, diversas opções são elegíveis ao financiamento bancário. Auxiliamos na análise de crédito e indicamos as mais favoráveis para financiamento." },
                    { q: "Capão Novo aceita permuta de imóvel?", a: "Vários vendedores da nossa base negociam permuta com imóveis em Porto Alegre e outras regiões. Entre em contato e avaliamos." },
                    { q: "Qual a melhor região para comprar casa em Capão Novo?", a: "Depende do objetivo. Para veraneio, Posto 4 e 5. Para moradia, o centro e as regiões mais novas oferecem excelente custo-benefício." },
                  ].map((item, i) => (
                    <details key={i} className="border-b border-outline-variant pb-4 last:border-0">
                      <summary className="font-bold cursor-pointer text-primary text-sm mb-2">{item.q}</summary>
                      <p className="text-xs text-primary/60 leading-relaxed mt-3 font-sans">{item.a}</p>
                    </details>
                  ))}
                </div>
                <a
                  href={WHATSAPP_MESSAGES.casas}
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
