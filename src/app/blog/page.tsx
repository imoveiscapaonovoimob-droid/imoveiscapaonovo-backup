import { Metadata } from 'next';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/home/Footer";
import { Blog } from "@/components/home/Blog";

export const metadata: Metadata = {
  title: "Blog & Guia Capão Novo | Tudo sobre Litoral",
  description: "Tudo que você precisa saber sobre as melhores localizações, bairros e condomínios da vida litorânea no Guia Capão Novo.",
};

export default function Page() {
  return (
    <main className="min-h-screen">
      <Header />
      <section className="pt-32 pb-8 px-6 lg:px-10 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif text-primary mb-6">
          Guia Oficial Capão Novo
        </h1>
        <article className="prose prose-lg text-secondary/80 max-w-none">
          <p>
            Explore artigos, análises do mercado aquecido do ramo de propriedades de luxo, guias práticos e informações minuciosas que respondem o porquê morar ou investir nas praias de Capão é uma decisão sólida e incomparável.
          </p>
        </article>
      </section>

      <div className="bg-white py-4">
        <Blog />
      </div>

      <Footer />
    </main>
  );
}
