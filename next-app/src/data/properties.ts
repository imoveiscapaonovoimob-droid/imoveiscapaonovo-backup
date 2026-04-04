export interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  beds: string;
  image: string;
  tags: string[];
  description: string;
  features: string[];
  details: {
    area: string;
    suites: number;
    bathrooms: number;
    garage: number;
    iptu: string;
    condo?: string;
  };
  gallery: string[];
}

export const PROPERTIES: Property[] = [
  {
    id: "1",
    title: "Casa de Alto Padrão em Condomínio",
    location: "Village, Capão Novo",
    price: "R$ 4.500.000",
    beds: "5 dormitórios, 4 suítes",
    image: "/imovel1.webp",
    tags: ["Costa Serena", "Luxo"],
    description: "Espetacular residência em condomínio de luxo, com acabamentos de altíssimo padrão e infraestrutura completa de lazer.",
    features: ["Piscina Aquecida", "Espaço Gourmet", "Automação Residencial", "Energia Solar"],
    details: {
      area: "450m²",
      suites: 4,
      bathrooms: 6,
      garage: 4,
      iptu: "R$ 4.500/ano",
      condo: "R$ 1.200/mês",
    },
    gallery: ["/images/prop1.jpg", "/images/prop1_2.jpg", "/images/prop1_3.jpg"],
  },
  {
    id: "2",
    title: "Sobrado em Condomínio Exclusivo",
    location: "Posto 04, Capão Novo",
    price: "R$ 648.000",
    beds: "3 dormitórios, 1 suíte",
    image: "/imovel2.webp",
    tags: ["Alta Procura", "50m do Mar"],
    description: "Lindo sobrado localizado a poucos passos da praia, em uma das regiões mais valorizadas de Capão Novo.",
    features: ["Churrasqueira", "Mobiliado", "Pátio Privativo"],
    details: {
      area: "120m²",
      suites: 1,
      bathrooms: 2,
      garage: 1,
      iptu: "R$ 1.200/ano",
      condo: "R$ 350/mês",
    },
    gallery: ["/images/prop2.jpg", "/images/prop2_2.jpg"],
  },
  {
    id: "3",
    title: "Apartamento Mobiliado com Vista",
    location: "Posto 04, Capão Novo",
    price: "R$ 562.000",
    beds: "3 dormitórios, 1 box",
    image: "/imovel3.webp",
    tags: ["Mobiliado", "100m do Mar"],
    description: "Apartamento pronto para morar, com vista privilegiada e localização estratégica próxima ao comércio local.",
    features: ["Sacada com Churrasqueira", "Elevador", "Box de Estacionamento"],
    details: {
      area: "85m²",
      suites: 0,
      bathrooms: 2,
      garage: 1,
      iptu: "R$ 900/ano",
      condo: "R$ 400/mês",
    },
    gallery: ["/images/prop3.jpg", "/images/prop3_2.jpg"],
  },
  {
    id: "4",
    title: "Sobrado Vista Eterna para o Mar",
    location: "Posto 05, Capão Novo",
    price: "R$ 850.000",
    beds: "4 dormitórios, 1 suíte",
    image: "/images/prop4.jpg",
    tags: ["Frente Mar"],
    description: "Imóvel raridade com vista definitiva para o mar. Amplos espaços internos e excelente orientação solar.",
    features: ["Varanda Panorâmica", "Living 3 Ambientes", "Lareira"],
    details: {
      area: "180m²",
      suites: 1,
      bathrooms: 3,
      garage: 2,
      iptu: "R$ 1.800/ano",
    },
    gallery: ["/images/prop4.jpg", "/images/prop4_2.jpg"],
  },
];
