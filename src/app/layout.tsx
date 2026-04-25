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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Imóveis Capão Novo",
    "image": "https://imoveiscapaonovo.com.br/hero.webp",
    "@id": "https://imoveiscapaonovo.com.br",
    "url": "https://imoveiscapaonovo.com.br",
    "telephone": "+5551999999999",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. Paraguassu",
      "addressLocality": "Capão da Canoa",
      "addressRegion": "RS",
      "postalCode": "95555-000",
      "addressCountry": "BR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -29.7611,
      "longitude": -50.0125
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
      "closes": "18:00"
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
