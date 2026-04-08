import mongoose, { Schema, model, models } from 'mongoose';

export interface IProperty {
  _id: string;
  title: string;
  slug: string;
  description: string;
  call?: string; // Chamada rápida de marketing
  price: number;
  category: 'casa' | 'apartamento' | 'terreno' | 'comercial' | 'condominio' | 'duplex' | 'jk' | 'sobrado' | 'studio' | 'vivenda';
  location: string;
  address: string;
  youtubeId?: string;
  instagramUrl?: string;
  link360?: string;
  features: {
    bedrooms: number;
    suites: number;
    bathrooms: number;
    parking: number;
    area: number; // m²
  };
  values?: {
    condo?: number;
    iptu?: number;
  };
  buildingInfo?: {
    year?: number;
    floors?: number;
    aptsPerFloor?: number;
    totalApts?: number;
    position?: string;
    view?: string;
    orientation?: string;
    facade?: string;
    opening?: string;
    condition?: string;
    isNeverInhabited?: boolean;
    deliveryDate?: Date;
  };
  amenities: string[];
  images: {
    url: string;
    public_id: string;
    isMain: boolean;
  }[];
  isPublished: boolean;
  isFeatured: boolean; // para Home Page
  
  // Novos Campos (Inteligência Comercial & CRM)
  strategicData?: {
    sellerMotivation?: string; // Ex: Mudança, Investimento, Divórcio
    urgency?: 'Baixa' | 'Média' | 'Alta' | 'Imediata';
    negotiationFlexibility?: string; // Ex: Aceita carro, Aceita imóvel menor
  };
  commercialIntelligence?: {
    commissionPercentage?: number;
    netValueExpected?: number;
    proposalsHistory?: string; // Anotações sobre histórico
  };
  propertyProfile?: {
    classification?: 'Standard' | 'Alto Padrão' | 'Luxo' | 'Investimento' | 'Lançamento';
  };
  advancedLocation?: {
    distanceToSea?: number; // em metros
    proximities?: string[]; // Ex: Supermercado, Farmácia, Praça
  };
  idealCustomerProfile?: string; // Descrição de quem é a "persona" que compra
  documentation?: {
    status?: '100% Regularizado' | 'Em inventário' | 'Falta averbação' | 'Contrato de Compra e Venda';
    details?: string;
  };

  createdAt: Date;
  updatedAt: Date;

  // ── Novos campos UX (Step 2 – Características) ───────────────────────────────────
  areas?: {
    privateArea?: number;
    totalArea?: number;
    terrainArea?: number;
    terrainDimensions?: string;
  };
  garageType?: string[];

  // ── Novos campos UX (Step 3 – Financeiro) ─────────────────────────────────────
  iptuPeriod?: 'Anual' | 'Mensal';
  exclusivity?: boolean;
  paymentMethods?: string[];
  directPaymentTerms?: {
    minEntry?: string;
    maxMonths?: string;
  };
  acceptsExchange?: boolean;
  exchange?: {
    limitPercent?: string;
    assetTypes?: string[];
    regions?: string;
    notes?: string;
  };
  financialStatus?: {
    hasEncumbrance?: boolean;
    balance?: number;
    bank?: string;
  };
}

const PropertySchema = new Schema<IProperty>(
  {
    title: { type: String, required: [true, 'Please provide a title'], trim: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    call: { type: String },
    price: { type: Number, required: true },
    category: {
      type: String,
      required: true,
      enum: ['casa', 'apartamento', 'terreno', 'comercial', 'condominio', 'duplex', 'jk', 'sobrado', 'studio', 'vivenda'],
      default: 'casa'
    },
    location: { type: String, default: 'Capão Novo' },
    address: { type: String, required: true },
    youtubeId: { type: String },
    instagramUrl: { type: String },
    link360: { type: String },
    features: {
      bedrooms: { type: Number, default: 0 },
      suites: { type: Number, default: 0 },
      bathrooms: { type: Number, default: 1 },
      parking: { type: Number, default: 0 },
      area: { type: Number, default: 0 },
    },
    values: {
      condo: { type: Number, default: 0 },
      iptu: { type: Number, default: 0 },
    },
    buildingInfo: {
      year: { type: Number },
      floors: { type: Number },
      aptsPerFloor: { type: Number },
      totalApts: { type: Number },
      position: { type: String },
      view: { type: String },
      orientation: { type: String },
      facade: { type: String },
      opening: { type: String },
      condition: { type: String },
      isNeverInhabited: { type: Boolean, default: false },
      deliveryDate: { type: Date },
    },
    amenities: [{ type: String }],
    images: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
        isMain: { type: Boolean, default: false },
      },
    ],
    isPublished: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },

    // Schema - Novos Campos (Inteligência Comercial & CRM)
    strategicData: {
      sellerMotivation: { type: String },
      urgency: { type: String, enum: ['Baixa', 'Média', 'Alta', 'Imediata'] },
      negotiationFlexibility: { type: String },
    },
    commercialIntelligence: {
      commissionPercentage: { type: Number },
      netValueExpected: { type: Number },
      proposalsHistory: { type: String },
    },
    propertyProfile: {
      classification: { type: String, enum: ['Standard', 'Alto Padrão', 'Luxo', 'Investimento', 'Lançamento'] },
    },
    advancedLocation: {
      distanceToSea: { type: Number },
      proximities: [{ type: String }],
    },
    idealCustomerProfile: { type: String },
    documentation: {
      status: { type: String, enum: ['100% Regularizado', 'Em inventário', 'Falta averbação', 'Contrato de Compra e Venda'] },
      details: { type: String },
    },

    // ── Step 2: Novas dimensões e tags ────────────────────────────────────────────────
    areas: {
      privateArea:       { type: Number },
      totalArea:         { type: Number },
      terrainArea:       { type: Number },
      terrainDimensions: { type: String },
    },
    garageType: [{ type: String }],

    // ── Step 3: Financeiro e Negociação ──────────────────────────────────────────────
    iptuPeriod:    { type: String, enum: ['Anual', 'Mensal'], default: 'Anual' },
    exclusivity:   { type: Boolean, default: false },
    paymentMethods: [{ type: String }],
    directPaymentTerms: {
      minEntry:  { type: String },
      maxMonths: { type: String },
    },
    acceptsExchange: { type: Boolean, default: false },
    exchange: {
      limitPercent: { type: String },
      assetTypes:   [{ type: String }],
      regions:      { type: String },
      notes:        { type: String },
    },
    financialStatus: {
      hasEncumbrance: { type: Boolean, default: false },
      balance:        { type: Number },
      bank:           { type: String },
    },
  },
  { timestamps: true }
);

export default models.Property || model<IProperty>('Property', PropertySchema);
