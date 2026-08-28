import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Imóveis Capão Novo RS | Casas e Apartamentos à Venda",
  description: "Encontre imóveis à venda em Capão Novo RS. Casas, apartamentos e terrenos selecionados. Veja as melhores oportunidades no litoral.",
  keywords: ["imóveis capão novo", "apartamentos litoral norte rs", "casas capão da canoa", "imobiliária capão novo", "investimento imobiliário litoral"],
  authors: [{ name: "Imóveis Capão Novo" }],
  viewport: "width=device-width, initial-scale=1.0",
  robots: "index, follow",
  alternates: {
    canonical: "https://www.imoveiscapaonovo.com.br/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://www.imoveiscapaonovo.com.br/",
    title: "Imóveis Capão Novo RS | Casas e Apartamentos à Venda",
    description: "Encontre imóveis à venda em Capão Novo RS. Casas, apartamentos e terrenos selecionados. Veja as melhores oportunidades no litoral.",
    siteName: "Imóveis Capão Novo",
    images: [{
      url: "/hero.webp",
      width: 1200,
      height: 630,
      alt: "Casa à venda em Capão Novo com pátio e churrasqueira",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Imóveis Capão Novo RS | Casas e Apartamentos à Venda",
    description: "Encontre imóveis à venda em Capão Novo RS. Casas, apartamentos e terrenos selecionados. Veja as melhores oportunidades no litoral.",
    images: ["/hero.webp"],
  },
};

import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import ScrollTracker from "@/components/analytics/ScrollTracker";
import FloatingWhatsAppChat from "@/components/shared/FloatingWhatsAppChat";

import AuthProvider from "@/components/providers/AuthProvider";
import { BUSINESS_INFO, SOCIAL_LINKS } from "@/lib/constants";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": BUSINESS_INFO.legalName,
    "image": BUSINESS_INFO.image,
    "description": BUSINESS_INFO.description,
    "@id": BUSINESS_INFO.url,
    "url": BUSINESS_INFO.url,
    "telephone": BUSINESS_INFO.telephone,
    "founder": {
      "@type": "Person",
      "name": BUSINESS_INFO.founder
    },
    "areaServed": BUSINESS_INFO.areaServed,
    "sameAs": [SOCIAL_LINKS.facebook, SOCIAL_LINKS.instagram].filter(Boolean),
    "address": {
      "@type": "PostalAddress",
      ...BUSINESS_INFO.address
    },
    "geo": {
      "@type": "GeoCoordinates",
      ...BUSINESS_INFO.geo
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "20:00"
    }
  };

  return (
    <html lang="pt-BR" className={`${playfair.variable} ${inter.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased font-sans">
        <GoogleAnalytics />
        <ScrollTracker />
        <AuthProvider>
          {children}
        </AuthProvider>
        <FloatingWhatsAppChat />
      </body>
    </html>
  );
}
