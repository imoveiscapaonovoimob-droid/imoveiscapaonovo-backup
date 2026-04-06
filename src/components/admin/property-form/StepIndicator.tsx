'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface StepIndicatorProps {
  currentStep: number;
}

const steps = [
  { id: 1, title: 'Básicas',     subtitle: 'Informações gerais' },
  { id: 2, title: 'Detalhes',   subtitle: 'Vagas e Amenidades' },
  { id: 3, title: 'Estratégia', subtitle: 'Dados Comerciais' },
  { id: 4, title: 'Localização',subtitle: 'Proximidades e Mar' },
  { id: 5, title: 'Perfil',     subtitle: 'Documentação e Perfil' },
  { id: 6, title: 'Publicação', subtitle: 'Mídia e Status' },
];

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="relative mb-12 flex justify-between">
      {/* Background Line */}
      <div className="absolute top-1/2 left-0 h-[1px] w-full bg-[#002B49]/10 -translate-y-1/2" />
      
      {/* Active Line Progress */}
      <motion.div 
        className="absolute top-1/2 left-0 h-[1.5px] bg-[#775A19] -translate-y-1/2 origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: (currentStep - 1) / (steps.length - 1) }}
        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        style={{ width: '100%' }}
      />

      {steps.map((step) => {
        const isActive = currentStep >= step.id;
        const isCurrent = currentStep === step.id;

        return (
          <div key={step.id} className="relative z-10 flex flex-col items-center group">
            {/* Circle */}
            <div 
              className={`
                w-10 h-10 flex items-center justify-center 
                transition-all duration-500 rounded-none border
                ${isActive ? 'bg-[#002B49] border-[#002B49] text-white' : 'bg-white border-[#002B49]/20 text-[#002B49]/40'}
                ${isCurrent ? 'outline outline-4 outline-[#775A19]/10' : ''}
              `}
            >
              <span className="font-manrope text-sm font-light tracking-widest">{step.id}</span>
            </div>

            {/* Labels */}
            <div className="absolute top-12 flex flex-col items-center w-max">
              <span className={`
                font-noto text-xs tracking-[0.15em] uppercase 
                transition-colors duration-500
                ${isActive ? 'text-[#002B49]' : 'text-[#002B49]/30'}
              `}>
                {step.title}
              </span>
              {isCurrent && (
                <motion.span 
                  layoutId="step-subtitle"
                  className="font-manrope text-[10px] text-[#775A19] tracking-wider mt-1 opacity-60"
                >
                  {step.subtitle}
                </motion.span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
