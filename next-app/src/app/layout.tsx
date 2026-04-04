import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import ScrollTracker from "@/components/analytics/ScrollTracker";

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
  title: "Imóveis em Capão Novo RS: Casas e Terrenos à Venda",
  description: "Casas, apartamentos e terrenos à venda em Capão Novo RS. Curadoria estratégica com análise de valorização. Fale agora e descubra as melhores oportunidades.",
  keywords: [
    "imóveis em capão novo rs",
    "imóveis capão novo",
    "casas à venda capão novo",
    "apartamentos capão novo",
    "terrenos capão novo",
    "capao novo imoveis",
    "imobiliária capão novo",
    "comprar imóvel capão novo",
    "investir litoral norte rs",
  ],
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
    title: "Imóveis em Capão Novo RS: Casas, Apartamentos e Terrenos à Venda",
    description: "Casas, apartamentos e terrenos à venda em Capão Novo RS. Curadoria estratégica com análise de valorização. Fale agora e descubra as melhores oportunidades.",
    siteName: "Imóveis Capão Novo",
    images: [{
      url: "/hero.webp",
      width: 1200,
      height: 630,
      alt: "Imóveis à venda em Capão Novo RS - Casas, Apartamentos e Terrenos",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Imóveis em Capão Novo RS | Casas, Apartamentos e Terrenos",
    description: "Casas, apartamentos e terrenos à venda em Capão Novo RS. Curadoria estratégica com valorização real. Fale com um especialista agora.",
    images: ["/hero.webp"],
  },
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

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
        <Providers>
          <GoogleAnalytics />
          <ScrollTracker />
          {children}
        </Providers>
      </body>
    </html>
  );
}
