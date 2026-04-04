import mongoose, { Schema, model, models } from 'mongoose';

export interface IProperty {
  _id: string;
  title: string;
  slug: string;
  description: string;
  call?: string; // Chamada rápida de marketing
  price: number;
  category: 'casa' | 'apartamento' | 'terreno' | 'comercial';
  location: string;
  address: string;
  youtubeId?: string;
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
  createdAt: Date;
  updatedAt: Date;
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
      enum: ['casa', 'apartamento', 'terreno', 'comercial'],
      default: 'casa'
    },
    location: { type: String, default: 'Capão Novo' },
    address: { type: String, required: true },
    youtubeId: { type: String },
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
  },
  { timestamps: true }
);

// Pre-save hook to generate slug IF needed (can also be done in actions)
// PropertySchema.pre('save', function(next) { ... });

export default models.Property || model<IProperty>('Property', PropertySchema);
