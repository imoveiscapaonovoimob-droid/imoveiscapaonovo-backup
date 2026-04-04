# 📝 Implementation Plan: Real Estate CMS (Next.js + MongoDB + Cloudinary)

## 🎯 Goal
Create a full-featured real estate management system with:
- Admin Panel (`/admin`) with login.
- Property Management (CRUD) with multiple image uploads.
- Cloudinary optimization and delivery.
- Redis caching for high-traffic pages.
- Database connection pooling for Vercel/Serverless efficiency.

## 🏛️ Tech Stack
- **Framework**: Next.js (App Router)
- **Database**: MongoDB (via Mongoose)
- **Cache**: Redis (via Upstash)
- **Images**: Cloudinary SDK (Server-side) + `next-cloudinary` (Client-side)
- **Auth**: NextAuth.js (Auth.js)
- **Validation**: Zod (Input/Schema validation)

---

## 🏗️ Phase 1: Core Infrastructure (Current)
- [ ] Install dependencies (`mongoose`, `next-auth`, `zod`, `@upstash/redis`).
- [ ] Create **MongoDB Connection Singleton** (Pooling-ready).
- [ ] Configure `NEXTAUTH_SECRET` and Admin credentials in `.env.local`.
- [ ] Create **Property (Imóvel)** and **Category** Mongoose Schemas.

## 🔐 Phase 2: Authentication & Security
- [ ] Implement `src/app/api/auth/[...nextauth]/route.ts`.
- [ ] Create Middleware to protect `/admin/*` routes.
- [ ] Build simple **Login Page** for the admin.

## 🖼️ Phase 3: Property Management (CMS Core)
- [ ] Build **Property Creation Form** with Cloudinary multi-image upload.
- [ ] Implement **Server Actions** for Create/Update/Delete properties.
- [ ] Create **Cloudinary Utility** for auto-responsive image delivery.

## ⚡ Phase 4: Performance & Caching
- [ ] Implement **Redis caching layer** for `getAllProperties` and `getPropertyBySlug`.
- [ ] Add **Revalidation triggers** on property updates (Sync cache/DB).

## 🎨 Phase 5: Dynamic UI & Delivery
- [ ] Update **Home Page** to fetch and display dynamic listings.
- [ ] Create **Category Pages** (Casas, Apartamentos, etc.) from DB.
- [ ] Add **Search & Filter** functionality.

---

## 🛑 Blockers / Notes
- Need MongoDB Atlas connection string.
- Need Upstash Redis token/URL for caching.
