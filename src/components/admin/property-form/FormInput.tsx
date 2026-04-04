'use client';

import React from 'react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  className?: string; // Add className prop
}

export default function FormInput({ label, error, className, ...props }: FormInputProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="font-noto text-xs uppercase tracking-[0.15em] text-[#002B49]/60">
        {label}
      </label>
      <input
        className={`
          bg-[#F9FCFF] border-b-[1px] border-[#002B49]/10 p-3 
          font-manrope text-sm text-[#002B49] focus:outline-none 
          focus:border-[#775A19] transition-all duration-300
          placeholder:text-[#002B49]/20 tracking-wider
          ${error ? 'border-[#ff4d4d]' : ''}
        `}
        {...props}
      />
      {error && <span className="text-[10px] text-[#ff4d4d] uppercase tracking-widest">{error}</span>}
    </div>
  );
}
