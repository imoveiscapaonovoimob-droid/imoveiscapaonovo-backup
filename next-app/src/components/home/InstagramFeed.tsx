'use client';

import { useEffect } from 'react';
import { Instagram } from 'lucide-react';
import { SOCIAL_LINKS } from '@/lib/constants';

/**
 * Instagram Feed Widget - Editorial Architecture
 * Integrated via Elfsight for a "Curated Portfolio" feel.
 */
export function InstagramFeed() {
  useEffect(() => {
    // Load Elfsight script dynamically
    const scriptId = 'elfsight-platform-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = "https://static.elfsight.com/platform/platform.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section className="py-20 px-6 lg:px-10 bg-white">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-[0.3em] rounded mb-4">
              <Instagram size={12} />
              Instagram
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-primary leading-tight max-w-xl">
              Curadoria <span className="text-secondary italic">Digital</span> & Estilo de Vida
            </h2>
            <p className="text-primary/60 text-lg mt-4 font-sans max-w-2xl">
              Acompanhe @imoveiscapaonovoimob para descobrir as tendências arquitetônicas 
              e as oportunidades mais exclusivas de Capão Novo em tempo real.
            </p>
          </div>
          
          <a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 py-4 border border-primary/10 text-primary text-xs font-bold uppercase tracking-widest rounded-sm hover:border-secondary hover:text-secondary transition-all duration-500 bg-surface-container-low"
          >
            <Instagram size={16} />
            Ver Perfil Completo
          </a>
        </div>

        {/* Elfsight Widget Container */}
        {/* The widget is styled via Elfsight "Custom JS" to match our Navy/Gold palette */}
        <div className="relative rounded-sm overflow-hidden shadow-premium-ambient">
          <div 
            className="elfsight-app-eeefb66e-2545-42e1-8d07-1e082d675eca" 
            data-elfsight-app-lazy 
          />
          
          {/* Subtle architectural grain overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-noise-texture" />
        </div>

        {/* Bottom Detail */}
        <div className="mt-12 text-center">
          <div className="inline-block h-px w-20 bg-secondary/30 mb-4" />
          <p className="text-primary/40 text-[10px] uppercase tracking-[0.4em]">
            Exclusividade Garantida • © 2024
          </p>
        </div>

      </div>
    </section>
  );
}
