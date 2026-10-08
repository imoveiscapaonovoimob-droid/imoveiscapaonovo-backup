import React from "react";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/home/Footer";
import { BUSINESS_INFO, WHATSAPP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Política de Privacidade | Imóveis Capão Novo",
  description:
    "Como a Imóveis Capão Novo coleta, usa e protege seus dados pessoais, incluindo o uso de cookies e do Pixel da Meta, conforme a LGPD.",
  alternates: { canonical: `${BUSINESS_INFO.url}/politica-privacidade` },
  robots: "index, follow",
};

const UPDATED_AT = "08 de outubro de 2026";

const SECTIONS: { title: string; body: React.ReactNode }[] = [
  {
    title: "1. Quem somos",
    body: (
      <p>
        A <strong>{BUSINESS_INFO.legalName}</strong>, representada por {BUSINESS_INFO.founder} (CRECI/RS 85784),
        com endereço na {BUSINESS_INFO.address.streetAddress}, {BUSINESS_INFO.address.addressLocality}/
        {BUSINESS_INFO.address.addressRegion}, CEP {BUSINESS_INFO.address.postalCode}, é a controladora dos dados
        pessoais tratados neste site ({BUSINESS_INFO.url}), nos termos da Lei Geral de Proteção de Dados (Lei nº
        13.709/2018 – LGPD).
      </p>
    ),
  },
  {
    title: "2. Dados que coletamos",
    body: (
      <ul className="list-disc pl-6 flex flex-col gap-2">
        <li>
          <strong>Dados que você nos informa:</strong> nome e número de telefone/WhatsApp ao solicitar contato ou
          informações sobre um imóvel, além do conteúdo das mensagens que você nos envia.
        </li>
        <li>
          <strong>Dados de navegação:</strong> endereço IP, tipo de navegador e dispositivo, páginas visitadas,
          origem do acesso e interações com o site (como cliques em botões de WhatsApp), coletados por cookies e
          tecnologias semelhantes.
        </li>
      </ul>
    ),
  },
  {
    title: "3. Para que usamos seus dados",
    body: (
      <ul className="list-disc pl-6 flex flex-col gap-2">
        <li>Responder às suas solicitações e apresentar imóveis compatíveis com o seu interesse;</li>
        <li>Confirmar o seu número de WhatsApp por meio de um código de verificação;</li>
        <li>Entender como o site é usado e melhorar a experiência de navegação;</li>
        <li>Medir e otimizar a publicidade que realizamos em plataformas como Meta (Facebook e Instagram) e Google;</li>
        <li>Cumprir obrigações legais e regulatórias.</li>
      </ul>
    ),
  },
  {
    title: "4. Cookies, Pixel da Meta e ferramentas de análise",
    body: (
      <>
        <p>
          Utilizamos cookies e tecnologias semelhantes para o funcionamento do site e para estatísticas e
          publicidade. Entre elas:
        </p>
        <ul className="list-disc pl-6 flex flex-col gap-2 mt-3">
          <li>
            <strong>Pixel da Meta (Facebook/Instagram):</strong> registra visitas e interações (por exemplo, clique
            em um botão de WhatsApp) para mensurar resultados de anúncios e exibir anúncios relevantes a pessoas com
            perfil semelhante ou que já visitaram o site. Dados são compartilhados com a Meta Platforms, que os
            trata conforme a{" "}
            <a
              href="https://www.facebook.com/privacy/policy/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-secondary"
            >
              política de dados da Meta
            </a>
            .
          </li>
          <li>
            <strong>Google Analytics:</strong> estatísticas agregadas de acesso e comportamento no site.
          </li>
          <li>
            <strong>Vercel Analytics:</strong> métricas de desempenho e audiência do site.
          </li>
        </ul>
        <p className="mt-3">
          Você pode bloquear ou apagar cookies nas configurações do seu navegador e gerenciar as preferências de
          anúncios diretamente nas{" "}
          <a
            href="https://www.facebook.com/adpreferences"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-secondary"
          >
            configurações de anúncios da Meta
          </a>
          . Bloquear cookies pode afetar algumas funcionalidades do site.
        </p>
      </>
    ),
  },
  {
    title: "5. Base legal",
    body: (
      <p>
        Tratamos seus dados com base no seu consentimento, na execução de procedimentos preliminares relacionados a
        um contrato (como a intermediação de compra, venda ou locação de imóvel, a seu pedido), no cumprimento de
        obrigação legal e em nosso legítimo interesse de divulgar e aprimorar nossos serviços, sempre respeitando
        seus direitos e liberdades.
      </p>
    ),
  },
  {
    title: "6. Compartilhamento",
    body: (
      <p>
        Não vendemos seus dados. Podemos compartilhá-los apenas com prestadores que viabilizam o site e o
        atendimento (hospedagem, banco de dados, envio de mensagens por WhatsApp, análise de audiência e
        publicidade, como Meta, Google e Vercel), com proprietários, construtoras e profissionais envolvidos na
        negociação de um imóvel do seu interesse, e com autoridades quando houver obrigação legal. Alguns desses
        prestadores podem armazenar dados fora do Brasil, observadas as garantias previstas na LGPD.
      </p>
    ),
  },
  {
    title: "7. Por quanto tempo guardamos",
    body: (
      <p>
        Mantemos os dados pelo tempo necessário para atender à finalidade para a qual foram coletados, para cumprir
        obrigações legais ou para o exercício regular de direitos. Depois disso, eles são eliminados ou
        anonimizados.
      </p>
    ),
  },
  {
    title: "8. Seus direitos",
    body: (
      <>
        <p>Nos termos da LGPD, você pode, a qualquer momento, solicitar:</p>
        <ul className="list-disc pl-6 flex flex-col gap-2 mt-3">
          <li>confirmação de que tratamos seus dados e acesso a eles;</li>
          <li>correção de dados incompletos, inexatos ou desatualizados;</li>
          <li>anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade;</li>
          <li>portabilidade dos dados;</li>
          <li>informação sobre com quem compartilhamos seus dados;</li>
          <li>revogação do consentimento e oposição ao tratamento.</li>
        </ul>
      </>
    ),
  },
  {
    title: "9. Segurança",
    body: (
      <p>
        Adotamos medidas técnicas e organizacionais razoáveis para proteger seus dados contra acessos não
        autorizados, perda ou alteração. Nenhum sistema é totalmente imune a riscos, mas trabalhamos para
        minimizá-los.
      </p>
    ),
  },
  {
    title: "10. Exclusão de dados",
    body: (
      <p>
        Para solicitar a exclusão dos seus dados pessoais, envie uma mensagem pelo nosso{" "}
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="underline text-secondary">
          WhatsApp
        </a>{" "}
        informando o nome e o telefone usados no contato. Atenderemos o pedido nos prazos legais.
      </p>
    ),
  },
  {
    title: "11. Contato",
    body: (
      <p>
        Dúvidas ou solicitações sobre esta política ou sobre seus dados: WhatsApp{" "}
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="underline text-secondary">
          (51) 99234-0058
        </a>{" "}
        ou presencialmente em {BUSINESS_INFO.address.streetAddress}, {BUSINESS_INFO.address.addressLocality}/
        {BUSINESS_INFO.address.addressRegion}.
      </p>
    ),
  },
  {
    title: "12. Alterações desta política",
    body: (
      <p>
        Podemos atualizar esta política periodicamente. A versão vigente é sempre a publicada nesta página, com a
        data da última atualização indicada abaixo.
      </p>
    ),
  },
];

export default function PoliticaPrivacidadePage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="bg-primary pt-44 pb-20 px-6 lg:px-10">
        <div className="max-w-[900px] mx-auto">
          <span className="text-secondary text-[10px] font-sans font-bold uppercase tracking-[0.4em] mb-4 block">
            Transparência
          </span>
          <h1 className="text-5xl md:text-6xl font-serif text-white leading-tight">Política de Privacidade</h1>
          <p className="text-white/50 mt-4 text-sm">Última atualização: {UPDATED_AT}</p>
        </div>
      </section>

      <section className="py-16 px-6 lg:px-10">
        <div className="max-w-[900px] mx-auto flex flex-col gap-10 text-primary/80 leading-relaxed">
          <p>
            Esta política explica como a {BUSINESS_INFO.legalName} trata dados pessoais ao operar este site, em
            conformidade com a LGPD.
          </p>
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <h2 className="text-2xl font-serif text-primary mb-3">{s.title}</h2>
              {s.body}
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
