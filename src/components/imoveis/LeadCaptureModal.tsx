'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, Lock, Send, ShieldCheck, Loader2 } from 'lucide-react';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

type ModalStep = 'contact' | 'verify';

// Máscara visual simples para telefone brasileiro
function formatPhoneDisplay(value: string): string {
  const digits = value.replace(/\D/g, '');
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 11) return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

export function LeadCaptureModal({ isOpen, onClose, onSuccess }: LeadCaptureModalProps) {
  const [step, setStep] = useState<ModalStep>('contact');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Focus no primeiro input ao abrir
  useEffect(() => {
    if (isOpen && step === 'contact') {
      setTimeout(() => nameInputRef.current?.focus(), 150);
    }
  }, [isOpen, step]);

  // Fechar com Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  // Bloquear scroll do body
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handlePhoneChange = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 11) {
      setPhone(digits);
    }
  };

  const handleRequestCode = async () => {
    setError('');

    if (!name.trim()) {
      setError('Informe seu nome.');
      return;
    }
    if (phone.length < 10) {
      setError('Informe um número de WhatsApp válido.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/whatsapp/request-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), phone }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Erro ao enviar código.');
        return;
      }

      setSuccessMsg('Código enviado! Verifique seu WhatsApp.');
      setStep('verify');
      setTimeout(() => otpInputRefs.current[0]?.focus(), 150);
    } catch {
      setError('Erro de conexão. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = useCallback((index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newDigits = [...otpDigits];

    // Cole de 6 dígitos
    if (value.length > 1) {
      const pastedDigits = value.replace(/\D/g, '').slice(0, 6).split('');
      pastedDigits.forEach((d, i) => {
        if (i < 6) newDigits[i] = d;
      });
      setOtpDigits(newDigits);
      const nextFocus = Math.min(pastedDigits.length, 5);
      otpInputRefs.current[nextFocus]?.focus();
      return;
    }

    newDigits[index] = value;
    setOtpDigits(newDigits);

    // Auto-avança para o próximo
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  }, [otpDigits]);

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleValidateCode = async () => {
    setError('');
    const code = otpDigits.join('');

    if (code.length !== 6) {
      setError('Insira os 6 dígitos do código.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/whatsapp/validate-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, code }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Código inválido.');
        setOtpDigits(['', '', '', '', '', '']);
        otpInputRefs.current[0]?.focus();
        return;
      }

      // Salva no localStorage para não pedir novamente em outros imóveis
      localStorage.setItem('lead_whatsapp_verified', 'true');
      localStorage.setItem('lead_name', name.trim());
      localStorage.setItem('lead_phone', phone);

      setSuccessMsg('Acesso liberado!');

      // Delay curto para mostrar feedback visual antes de fechar
      setTimeout(() => {
        onSuccess();
      }, 600);
    } catch {
      setError('Erro de conexão. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop com blur premium */}
      <div className="absolute inset-0 bg-[#001629]/80 backdrop-blur-xl" />

      {/* Modal container */}
      <div
        className="relative w-full max-w-md bg-white shadow-[0_60px_120px_rgba(0,22,41,0.3)] animate-in fade-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar dourada */}
        <div className="h-1.5 bg-gradient-to-r from-[#C9A96E] via-[#E2C992] to-[#C9A96E]" />

        {/* Botão fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#001629]/30 hover:text-[#001629] transition-colors p-1 z-10"
          aria-label="Fechar"
        >
          <X size={20} />
        </button>

        <div className="px-8 py-10 md:px-10 md:py-12">
          {/* Ícone de status */}
          <div className="flex justify-center mb-6">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ${
              step === 'contact'
                ? 'bg-[#001629] text-[#C9A96E]'
                : 'bg-emerald-50 text-emerald-600'
            }`}>
              {step === 'contact' ? <Lock size={28} /> : <ShieldCheck size={28} />}
            </div>
          </div>

          {/* Título dinâmico */}
          <h3 className="text-2xl font-serif text-center text-[#001629] mb-2">
            {step === 'contact' ? 'Galeria Exclusiva' : 'Confirme seu Acesso'}
          </h3>
          <p className="text-center text-sm text-[#001629]/50 mb-8 leading-relaxed">
            {step === 'contact'
              ? 'Insira seus dados para desbloquear todas as fotos deste imóvel.'
              : 'Digite o código de 6 dígitos enviado para seu WhatsApp.'}
          </p>

          {/* ETAPA 1 — Nome e Telefone */}
          {step === 'contact' && (
            <div className="space-y-5">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#001629]/50 mb-2">
                  Seu Nome
                </label>
                <input
                  ref={nameInputRef}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Como podemos chamá-lo?"
                  className="w-full border border-[#001629]/10 bg-[#f9f9f9] px-4 py-3.5 text-sm text-[#001629] placeholder:text-[#001629]/25 focus:outline-none focus:border-[#C9A96E] focus:ring-2 focus:ring-[#C9A96E]/20 transition-all"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#001629]/50 mb-2">
                  WhatsApp
                </label>
                <input
                  type="tel"
                  value={formatPhoneDisplay(phone)}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  placeholder="(00) 00000-0000"
                  className="w-full border border-[#001629]/10 bg-[#f9f9f9] px-4 py-3.5 text-sm text-[#001629] placeholder:text-[#001629]/25 focus:outline-none focus:border-[#C9A96E] focus:ring-2 focus:ring-[#C9A96E]/20 transition-all"
                  disabled={isLoading}
                />
              </div>

              <button
                onClick={handleRequestCode}
                disabled={isLoading}
                className="w-full bg-[#001629] text-white py-4 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[#002B49] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 group"
              >
                {isLoading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <>
                    <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                    Receber Código
                  </>
                )}
              </button>

              <p className="text-center text-[10px] text-[#001629]/30 leading-relaxed">
                Enviaremos um código de acesso via WhatsApp. Seus dados estão seguros.
              </p>
            </div>
          )}

          {/* ETAPA 2 — Código OTP */}
          {step === 'verify' && (
            <div className="space-y-6">
              {/* Inputs OTP de 6 dígitos */}
              <div className="flex justify-center gap-2.5">
                {otpDigits.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => { otpInputRefs.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={i === 0 ? 6 : 1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    className={`w-12 h-14 text-center text-xl font-bold border-2 transition-all duration-200 focus:outline-none bg-[#f9f9f9] ${
                      digit
                        ? 'border-[#C9A96E] text-[#001629]'
                        : 'border-[#001629]/10 text-[#001629]/50'
                    } focus:border-[#C9A96E] focus:ring-2 focus:ring-[#C9A96E]/20`}
                    disabled={isLoading}
                  />
                ))}
              </div>

              <button
                onClick={handleValidateCode}
                disabled={isLoading || otpDigits.join('').length !== 6}
                className="w-full bg-[#C9A96E] text-white py-4 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[#b0904a] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3"
              >
                {isLoading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <>
                    <ShieldCheck size={16} />
                    Validar Acesso
                  </>
                )}
              </button>

              {/* Reenviar código */}
              <button
                onClick={() => {
                  setStep('contact');
                  setOtpDigits(['', '', '', '', '', '']);
                  setError('');
                  setSuccessMsg('');
                }}
                className="w-full text-center text-xs text-[#001629]/40 hover:text-[#C9A96E] transition-colors"
                disabled={isLoading}
              >
                ← Voltar e reenviar código
              </button>
            </div>
          )}

          {/* Mensagens de feedback */}
          {error && (
            <div className="mt-4 bg-red-50 border border-red-100 text-red-600 text-xs px-4 py-3 text-center font-medium animate-in fade-in">
              {error}
            </div>
          )}
          {successMsg && !error && (
            <div className="mt-4 bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs px-4 py-3 text-center font-medium animate-in fade-in">
              {successMsg}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
