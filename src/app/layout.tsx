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
  title: "Imóveis Capão Novo | Apartamentos e Casas de Luxo no Litoral",
  description: "Encontre seu imóvel ideal em Capão Novo. Apartamentos, casas e terrenos com as melhores condições e localização privilegiada no litoral gaúcho.",
  keywords: ["imóveis capão novo", "apartamentos litoral norte rs", "casas capão da canoa", "imobiliária capão novo", "investimento imobiliário litoral"],
  authors: [{ name: "Imóveis Capão Novo" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  alternates: {
    canonical: "https://imoveiscapaonovo.com.br",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://imoveiscapaonovo.com.br",
    title: "Imóveis Capão Novo | Luxo e Exclusividade no Litoral",
    description: "A melhor seleção de imóveis em Capão Novo. Encontre seu refúgio no litoral gaúcho com especialistas locais.",
    siteName: "Imóveis Capão Novo",
    images: [{
      url: "/hero.webp",
      width: 1200,
      height: 630,
      alt: "Imóveis Capão Novo",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Imóveis Capão Novo | Luxo no Litoral",
    description: "Seleção exclusiva de imóveis em Capão Novo.",
    images: ["/hero.webp"],
  },
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import ScrollTracker from "@/components/analytics/ScrollTracker";

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
        {children}
      </body>
    </html>
  );
}
