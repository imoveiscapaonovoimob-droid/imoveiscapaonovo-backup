export const WHATSAPP_URL = "https://wa.me/5551992340058";

export const WHATSAPP_MESSAGES = {
  geral: `${WHATSAPP_URL}?text=Olá!%20Vim%20pelo%20site%20e%20gostaria%20de%20mais%20informações.`,
  frentemar: `${WHATSAPP_URL}?text=Olá!%20Tenho%20interesse%20em%20imóveis%20Frente%20Mar%20em%20Capão%20Novo.`,
  oportunidades: `${WHATSAPP_URL}?text=Olá!%20Quero%20conhecer%20as%20melhores%20oportunidades%20de%20imóveis%20em%20Capão%20Novo.`,
  casas: `${WHATSAPP_URL}?text=Olá!%20Tenho%20interesse%20em%20Casas%20em%20Capão%20Novo.`,
  apartamentos: `${WHATSAPP_URL}?text=Olá!%20Tenho%20interesse%20em%20Apartamentos%20em%20Capão%20Novo.`,
  investir: `${WHATSAPP_URL}?text=Olá!%20Quero%20investir%20em%20imóveis%20em%20Capão%20Novo.`,
};

export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/share/1Aq5PBWqPa/",
  instagram: "https://www.instagram.com/imoveiscapaonovors/",
  youtube: "", // adicionar quando disponível
};

// Fonte única de verdade para NAP (Nome/Endereço/Telefone) usado no schema.org
// RealEstateAgent em todas as páginas — mantenha o telefone igual ao WHATSAPP_URL acima.
export const BUSINESS_INFO = {
  legalName: "Imóveis Capão Novo",
  alternateName: "Imobiliária Capão Novo",
  telephone: "+5551992340058",
  url: "https://www.imoveiscapaonovo.com.br",
  image: "https://www.imoveiscapaonovo.com.br/hero.webp",
  description: "Imobiliária especializada em imóveis de alto padrão e terrenos em Capão Novo, litoral norte gaúcho.",
  founder: "Lenine Kerber",
  areaServed: ["Capão Novo", "Capão da Canoa", "Costa Serena", "Velas da Marina", "Terrasul", "Village"],
  address: {
    streetAddress: "Rua das Sempre-Vivas, 3813",
    addressLocality: "Capão da Canoa",
    addressRegion: "RS",
    postalCode: "94696-068",
    addressCountry: "BR",
  },
  geo: {
    latitude: -29.6800775,
    longitude: -49.9883512,
  },
};
