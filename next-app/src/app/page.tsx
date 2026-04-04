import React from "react";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/home/Hero";
import { PropertyGrid } from "@/components/home/PropertyGrid";
import { ProfileSearch } from "@/components/home/ProfileSearch";
import { Guide } from "@/components/home/Guide";
import { Blog } from "@/components/home/Blog";
import { CTA } from "@/components/home/CTA";
import { Footer } from "@/components/home/Footer";

import { MarketStats } from "@/components/home/MarketStats";
import { ComparisonTable } from "@/components/home/ComparisonTable";
import { InvestmentInsights } from "@/components/home/InvestmentInsights";
import { SEOBlock } from "@/components/home/SEOBlock";
import { InstagramFeed } from "@/components/home/InstagramFeed";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <PropertyGrid />
      <MarketStats />
      <ProfileSearch />
      <SEOBlock />
      <ComparisonTable />
      <Guide />
      <Blog />
      <InvestmentInsights />
      <InstagramFeed />
      <CTA />
      <Footer />
    </main>
  );
}
