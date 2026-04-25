"use client";

import { useState, useEffect, useRef, type FormEvent } from "react";
import Image from "next/image";
import { X, Send, ChevronDown } from "lucide-react";

/* ────────────────────────────────────────────
   Configuração — substitua pelo número real
   ──────────────────────────────────────────── */
const WHATSAPP_PHONE = "5551992340058";

/* Delay em ms antes do chat abrir automaticamente */
const AUTO_OPEN_DELAY = 30_000;

/* ────────────────────────────────────────────
   Props (extensíveis)
   ──────────────────────────────────────────── */
interface FloatingWhatsAppChatProps {
  /** Número de WhatsApp com DDI (sem "+" ou espaços) */
  phoneNumber?: string;
  /** Delay em ms para auto-abertura (default: 30s) */
  autoOpenDelay?: number;
}

/* ────────────────────────────────────────────
   Componente
   ──────────────────────────────────────────── */
export default function FloatingWhatsAppChat({
  phoneNumber = WHATSAPP_PHONE,
  autoOpenDelay = AUTO_OPEN_DELAY,
}: FloatingWhatsAppChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasBeenOpened, setHasBeenOpened] = useState(false);
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  /* Timer de auto-abertura (30 s após montagem) */
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
      setHasBeenOpened(true);
    }, autoOpenDelay);

    return () => clearTimeout(timer);
  }, [autoOpenDelay]);

  /* Foco no input ao abrir */
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 400);
    }
  }, [isOpen]);

  /* Horário simulado no balão */
  const fakeTime = new Date().toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  /* Submissão → abre wa.me em nova aba */
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = message.trim();
    if (!text) return;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setMessage("");
  };

  const handleOpen = () => {
    setIsOpen(true);
    setHasBeenOpened(true);
  };

  const handleClose = () => setIsOpen(false);

  /* ── Ícone SVG do WhatsApp (reutilizado) ── */
  const WhatsAppIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.570-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );

  return (
    <>
      {/* ═══════════════════════════════════════════
          JANELA DO CHAT
          ═══════════════════════════════════════════ */}
      <div
        className={`
          fixed z-[200] transition-all duration-500 ease-out
          ${isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto scale-100"
            : "opacity-0 translate-y-8 pointer-events-none scale-95"
          }
          /* Desktop */
          bottom-[100px] right-6 md:right-8
          w-[calc(100vw-48px)] max-w-[380px]
          /* Mobile: ajuste de margens */
          sm:w-[380px]
        `}
        style={{ willChange: "transform, opacity" }}
      >
        <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/20 border border-white/10 flex flex-col max-h-[520px]">

          {/* ── CABEÇALHO ── */}
          <div
            className="flex items-center gap-3 px-4 py-3"
            style={{ background: "linear-gradient(135deg, #075E54 0%, #128C7E 100%)" }}
          >
            {/* Foto do corretor */}
            <div className="relative shrink-0">
              <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-white/30 shadow-md">
                <Image
                  src="/images/leninekerber.jpg"
                  alt="Lenine Kerber Corretor"
                  width={44}
                  height={44}
                  className="object-cover w-full h-full"
                />
              </div>
              {/* Indicador online */}
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#25D366] border-2 border-[#075E54] rounded-full" />
            </div>

            {/* Nome e status */}
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm leading-tight truncate">
                Lenine Kerber Corretor
              </p>
              <p className="text-[#25D366] text-xs font-medium flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 bg-[#25D366] rounded-full animate-pulse" />
                Online
              </p>
            </div>

            {/* Botão fechar */}
            <button
              onClick={handleClose}
              className="text-white/70 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10"
              aria-label="Fechar chat"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>

          {/* ── CORPO DO CHAT ── */}
          <div
            className="flex-1 overflow-y-auto px-4 py-4"
            style={{
              backgroundColor: "#E5DDD5",
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c8c3bc' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          >
            {/* Balão de mensagem recebida */}
            <div className="relative max-w-[85%]">
              {/* Pontinha do balão */}
              <div
                className="absolute -left-2 top-0 w-4 h-4"
                style={{
                  background: "#FFFFFF",
                  clipPath: "polygon(100% 0, 100% 100%, 0 0)",
                }}
              />
              <div className="bg-white rounded-lg rounded-tl-none shadow-sm px-3 py-2.5 relative">
                <p className="text-[13.5px] text-gray-800 leading-relaxed">
                  Olá! É uma alegria ter você por aqui. Aqui é o{" "}
                  <strong>Lenine Kerber</strong>, corretor especialista em
                  Capão Novo. Vi que você demonstrou interesse em imóveis na
                  região.
                </p>
                <p className="text-[13.5px] text-gray-800 leading-relaxed mt-2">
                  Posso entender melhor o seu objetivo? Você busca um imóvel
                  para <strong>veraneio</strong>, <strong>moradia</strong> ou{" "}
                  <strong>investimento</strong>?
                </p>
                {/* Horário */}
                <span className="block text-right text-[10px] text-gray-400 mt-1 -mb-0.5">
                  {fakeTime}
                </span>
              </div>
            </div>
          </div>

          {/* ── FORMULÁRIO DE RESPOSTA ── */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 px-3 py-2.5 bg-[#F0F0F0] border-t border-gray-200"
          >
            <input
              ref={inputRef}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="flex-1 h-10 px-4 rounded-full bg-white border border-gray-200 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366]/30 transition-all"
            />
            <button
              type="submit"
              disabled={!message.trim()}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-[#25D366] text-white shadow-md hover:bg-[#1da851] active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#25D366]"
              aria-label="Enviar mensagem"
            >
              <Send className="w-4 h-4 -rotate-0" />
            </button>
          </form>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          BOTÃO FLUTUANTE (visível quando o chat está fechado)
          ═══════════════════════════════════════════ */}
      <button
        onClick={handleOpen}
        className={`
          fixed z-[200] bottom-[100px] right-6 md:right-8
          w-14 h-14 rounded-full
          bg-[#25D366] text-white
          shadow-[0_6px_20px_rgba(37,211,102,0.45)]
          hover:bg-[#1da851] hover:scale-110
          active:scale-95
          transition-all duration-300 ease-out
          flex items-center justify-center
          ${isOpen ? "opacity-0 pointer-events-none scale-75" : "opacity-100 pointer-events-auto scale-100"}
          ${!hasBeenOpened ? "animate-bounce" : ""}
        `}
        aria-label="Abrir chat do WhatsApp"
      >
        <WhatsAppIcon className="w-7 h-7" />
        {/* Badge de notificação */}
        {!hasBeenOpened && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-md animate-pulse">
            1
          </span>
        )}
      </button>
    </>
  );
}
