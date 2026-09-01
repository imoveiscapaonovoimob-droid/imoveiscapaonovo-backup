import mongoose, { Schema, model, models } from 'mongoose';

export interface ICondominium {
  _id: string;
  name: string;
  slug: string;
  description: string;
  disposition?: 'vertical' | 'horizontal';
  location: string; // bairro/região (ex.: "Capão Novo", "Posto 4")
  address: string;
  images: {
    url: string;
    public_id: string;
    isMain: boolean;
  }[];
  amenities: string[];
  builder?: string;
  adminCompany?: string;
  builtYear?: string;
  totalArea?: number;
  youtubeId?: string;
  link360?: string;
  isPublished: boolean;
  isFeatured: boolean;
  isLaunch: boolean; // lançamento

  // ── Dados de acesso EXCLUSIVO do corretor ─────────────────────────────────
  // NUNCA selecionado pelas leituras públicas (getPublishedCondominiums,
  // getCondominiumBySlugOrId) — só por ações autenticadas do /admin.
  broker?: {
    concierge?: string; // síndico
    caretaker?: string; // zelador
  };

  createdAt: Date;
  updatedAt: Date;
}

const CondominiumSchema = new Schema<ICondominium>(
  {
    name: { type: String, required: [true, 'Please provide a name'], trim: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, default: '' },
    disposition: { type: String, enum: ['vertical', 'horizontal'] },
    location: { type: String, default: 'Capão Novo' },
    address: { type: String, default: 'A divulgar' },
    images: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
        isMain: { type: Boolean, default: false },
      },
    ],
    amenities: [{ type: String }],
    builder: { type: String },
    adminCompany: { type: String },
    builtYear: { type: String },
    totalArea: { type: Number },
    youtubeId: { type: String },
    link360: { type: String },
    isPublished: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    isLaunch: { type: Boolean, default: false },

    broker: {
      concierge: { type: String },
      caretaker: { type: String },
    },
  },
  { timestamps: true }
);

export default models.Condominium || model<ICondominium>('Condominium', CondominiumSchema);
