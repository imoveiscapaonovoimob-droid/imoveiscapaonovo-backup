import mongoose, { Schema, model, models } from 'mongoose';

/**
 * Lead capturado pelo próprio site (modal de liberação das fotos).
 * É o contato mais qualificado do funil: a pessoa informou nome e telefone
 * e confirmou o código enviado por WhatsApp — ou seja, o número é dela.
 *
 * Guardado aqui para não depender de ninguém ver a conversa no WhatsApp:
 * o CRM consome esta lista depois (ver /api/leads no fluxo de sincronização).
 */
export interface ISiteLead {
  _id: string;
  name: string;
  phone: string;              // só dígitos, como chega da validação
  verified: boolean;          // true quando o código do WhatsApp foi confirmado
  source: string;             // ex.: 'galeria-imovel', 'galeria-condominio'
  propertyId?: string;        // imóvel que a pessoa estava vendo
  propertyTitle?: string;     // título no momento da captura (histórico)
  propertySlug?: string;
  pageUrl?: string;           // página exata de origem
  requestedAt: Date;          // quando pediu o código
  verifiedAt?: Date;          // quando confirmou
  syncedToCrmAt?: Date;       // quando o CRM puxou este lead
  createdAt: Date;
  updatedAt: Date;
}

const SiteLeadSchema = new Schema<ISiteLead>(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, index: true },
    verified: { type: Boolean, default: false, index: true },
    source: { type: String, default: 'galeria-imovel' },
    propertyId: { type: String },
    propertyTitle: { type: String },
    propertySlug: { type: String },
    pageUrl: { type: String },
    requestedAt: { type: Date, default: Date.now },
    verifiedAt: { type: Date },
    syncedToCrmAt: { type: Date },
  },
  { timestamps: true }
);

export default models.SiteLead || model<ISiteLead>('SiteLead', SiteLeadSchema);
