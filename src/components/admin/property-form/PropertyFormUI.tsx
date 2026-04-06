'use client';

import React from 'react';

// ── Card Section ─────────────────────────────────────────────────────────────
export const CardSection = ({
  children, className = '',
}: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white border border-[#002B49]/8 shadow-sm shadow-[#002B49]/4 p-8 ${className}`}>
    {children}
  </div>
);

// ── Card Header ───────────────────────────────────────────────────────────────
export const CardHeader = ({
  icon, title, subtitle,
}: { icon: string; title: string; subtitle?: string }) => (
  <div className="mb-8">
    <div className="flex items-center gap-2 mb-1">
      <span className="text-base leading-none">{icon}</span>
      <h4 className="font-noto text-xs uppercase tracking-[0.25em] text-[#002B49]">{title}</h4>
    </div>
    {subtitle && (
      <p className="font-manrope text-[10px] text-[#002B49]/35 tracking-widest uppercase ml-6">{subtitle}</p>
    )}
  </div>
);

// ── Section Divider ───────────────────────────────────────────────────────────
export const SectionDivider = ({ label }: { label?: string }) => (
  <div className="flex items-center gap-4 my-6">
    {label && <span className="font-manrope text-[9px] uppercase tracking-[0.25em] text-[#002B49]/30 whitespace-nowrap">{label}</span>}
    <div className="flex-1 h-px bg-[#002B49]/8" />
  </div>
);

// ── Line Input ────────────────────────────────────────────────────────────────
export const LineInput = ({
  label, value, onChange, placeholder = '', type = 'text', className = '', suffix = '',
}: {
  label: string; value: string | number; onChange: (v: string) => void;
  placeholder?: string; type?: string; className?: string; suffix?: string;
}) => (
  <div className={`flex flex-col gap-1 ${className}`}>
    <label className="font-manrope text-[9px] uppercase tracking-[0.2em] text-[#002B49]/40">{label}</label>
    <div className="flex items-end gap-2 border-b border-[#002B49]/15 focus-within:border-[#775A19] transition-colors duration-300 pb-2">
      <input
        type={type}
        className="flex-1 bg-transparent font-manrope text-sm text-[#002B49] placeholder:text-[#002B49]/20 focus:outline-none"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      {suffix && <span className="font-manrope text-[10px] text-[#002B49]/35 pb-0.5">{suffix}</span>}
    </div>
  </div>
);

// ── Money Input ───────────────────────────────────────────────────────────────
const formatMoney = (v: string) => {
  const num = v.replace(/\D/g, '');
  if (!num) return '';
  return new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(Number(num) / 100);
};

export const MoneyInput = ({
  label, value, onChange, placeholder = '0,00', className = '',
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; className?: string;
}) => (
  <div className={`flex flex-col gap-1 ${className}`}>
    <label className="font-manrope text-[9px] uppercase tracking-[0.2em] text-[#002B49]/40">{label}</label>
    <div className="flex items-end gap-1 border-b border-[#002B49]/15 focus-within:border-[#775A19] transition-colors duration-300 pb-2">
      <span className="font-manrope text-[10px] text-[#002B49]/30 pb-0.5">R$</span>
      <input
        type="text"
        inputMode="numeric"
        className="flex-1 bg-transparent font-manrope text-sm text-[#002B49] placeholder:text-[#002B49]/20 focus:outline-none"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(formatMoney(e.target.value))}
      />
    </div>
  </div>
);

// ── Increment Field ───────────────────────────────────────────────────────────
export const IncrementField = ({
  label, value, onChange, min = 0, max = 30,
}: {
  label: string; value: number; onChange: (v: number) => void; min?: number; max?: number;
}) => (
  <div className="flex flex-col items-center gap-4">
    <label className="font-manrope text-[9px] uppercase tracking-[0.2em] text-[#002B49]/40 text-center leading-relaxed">{label}</label>
    <div className="flex items-center gap-4">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="w-9 h-9 border border-[#002B49]/20 text-[#002B49]/50 hover:border-[#775A19] hover:text-[#775A19] disabled:opacity-20 disabled:cursor-not-allowed transition-all flex items-center justify-center font-manrope text-lg leading-none select-none"
      >−</button>
      <span className="font-noto text-2xl text-[#002B49] w-8 text-center tabular-nums">{value}</span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="w-9 h-9 border border-[#002B49]/20 text-[#002B49]/50 hover:border-[#775A19] hover:text-[#775A19] disabled:opacity-20 disabled:cursor-not-allowed transition-all flex items-center justify-center font-manrope text-lg leading-none select-none"
      >+</button>
    </div>
  </div>
);

// ── Clickable Tag ─────────────────────────────────────────────────────────────
export const ClickableTag = ({
  label, selected, onClick,
}: { label: string; selected: boolean; onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className={`
      px-4 py-2 text-[11px] font-manrope tracking-wider transition-all duration-200 border rounded-none
      ${selected
        ? 'bg-[#001629] text-[#ffdea5] border-[#001629]'
        : 'bg-white text-[#002B49]/55 border-[#002B49]/15 hover:border-[#002B49]/40 hover:text-[#002B49]'
      }
    `}
  >
    {label}
  </button>
);

// ── Tag Group ─────────────────────────────────────────────────────────────────
export const TagGroup = ({
  label, tags, selected, onChange, exclusive = false,
}: {
  label?: string;
  tags: string[];
  selected: string[];
  onChange: (v: string[]) => void;
  exclusive?: boolean; // if true, only one tag can be selected at a time
}) => {
  const toggle = (tag: string) => {
    if (exclusive) {
      onChange(selected.includes(tag) ? [] : [tag]);
    } else {
      onChange(selected.includes(tag) ? selected.filter(t => t !== tag) : [...selected, tag]);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {label && (
        <span className="font-manrope text-[9px] uppercase tracking-[0.2em] text-[#002B49]/40">{label}</span>
      )}
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <ClickableTag
            key={tag}
            label={tag}
            selected={selected.includes(tag)}
            onClick={() => toggle(tag)}
          />
        ))}
      </div>
    </div>
  );
};

// ── Binary Toggle (Sim/Não) ───────────────────────────────────────────────────
export const BinaryToggle = ({
  label, value, onChange, labelTrue = 'Sim', labelFalse = 'Não',
}: {
  label?: string; value: boolean; onChange: (v: boolean) => void;
  labelTrue?: string; labelFalse?: string;
}) => (
  <div className="flex flex-col gap-3">
    {label && (
      <span className="font-manrope text-[9px] uppercase tracking-[0.2em] text-[#002B49]/40">{label}</span>
    )}
    <div className="flex gap-2">
      <button
        type="button"
        onClick={() => onChange(true)}
        className={`px-5 py-2.5 text-[11px] font-manrope tracking-wider border transition-all duration-200 ${
          value ? 'bg-[#001629] text-[#ffdea5] border-[#001629]' : 'bg-white text-[#002B49]/55 border-[#002B49]/15 hover:border-[#002B49]/40'
        }`}
      >{labelTrue}</button>
      <button
        type="button"
        onClick={() => onChange(false)}
        className={`px-5 py-2.5 text-[11px] font-manrope tracking-wider border transition-all duration-200 ${
          !value ? 'bg-[#001629] text-[#ffdea5] border-[#001629]' : 'bg-white text-[#002B49]/55 border-[#002B49]/15 hover:border-[#002B49]/40'
        }`}
      >{labelFalse}</button>
    </div>
  </div>
);

// ── Collapsible Section ───────────────────────────────────────────────────────
export const CollapsibleSection = ({
  open, children,
}: { open: boolean; children: React.ReactNode }) => (
  <div
    className={`overflow-hidden transition-all duration-500 ease-in-out ${
      open ? 'max-h-[1500px] opacity-100' : 'max-h-0 opacity-0'
    }`}
  >
    <div className="pt-6 border-l-2 border-[#775A19]/25 pl-6 space-y-6">
      {children}
    </div>
  </div>
);

// ── Read-only Calculated Value ────────────────────────────────────────────────
export const CalcValue = ({
  label, value,
}: { label: string; value: string }) => (
  <div className="flex flex-col gap-1">
    <label className="font-manrope text-[9px] uppercase tracking-[0.2em] text-[#002B49]/40">{label}</label>
    <div className="pb-2 border-b border-[#002B49]/8">
      <span className="font-noto text-sm text-[#775A19] tracking-wide">{value}</span>
    </div>
  </div>
);

// ── Select Line ───────────────────────────────────────────────────────────────
export const SelectLine = ({
  label, value, onChange, options, placeholder = '— Selecione —', className = '',
}: {
  label: string; value: string; onChange: (v: string) => void;
  options: string[]; placeholder?: string; className?: string;
}) => (
  <div className={`flex flex-col gap-1 ${className}`}>
    <label className="font-manrope text-[9px] uppercase tracking-[0.2em] text-[#002B49]/40">{label}</label>
    <select
      className="bg-transparent border-b border-[#002B49]/15 pb-2 font-manrope text-sm text-[#002B49] focus:outline-none focus:border-[#775A19] transition-colors duration-300 appearance-none cursor-pointer"
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      <option value="">{placeholder}</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
);
