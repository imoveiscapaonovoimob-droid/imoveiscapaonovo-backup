"use client";

import { useState, useEffect } from "react";
import { Link2, Check, Share2 } from "lucide-react";

interface ShareButtonsProps {
  title: string;
  description?: string;
  url?: string;
  layout?: "row" | "grid";
}

interface Network {
  id: string;
  label: string;
  color: string;
  hoverColor: string;
  buildUrl: (url: string, title: string, description: string) => string;
  Icon: React.FC<{ size?: number }>;
}

/* ── Inline SVG icons ────────────────────────────────────────────── */
const WhatsAppIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.526 5.845L.057 23.686a.5.5 0 0 0 .612.612l5.841-1.469A11.942 11.942 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.887 0-3.656-.493-5.193-1.358l-.371-.214-3.846.967.985-3.763-.237-.388A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
  </svg>
);

const FacebookIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const XIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const TelegramIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.306.033-.14.086-.218.62-.314 1.026-.456 1.96-2.413 8.46-2.413 8.46s-.148.427-.44.44c-.302.012-.498-.21-.498-.21l-1.94-1.83-.81-.773s2.38-2.066 3.438-3.065c.44-.414.247-.634-.247-.376-1.23.647-3.72 2.282-4.948 3.077-.39.25-.724.34-1.03.332-.6-.015-1.188-.224-1.188-.224s-.43-.145-.83-.376c-.399-.23.01-.434.01-.434l1.74-.723s5.56-2.372 7.14-3.054c1.578-.68 2.215-.454 2.087.166z" />
  </svg>
);

/** Gradient Instagram icon (official brand colors) */
const InstagramIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);

/* ── Network config ──────────────────────────────────────────────── */
const NETWORKS: Network[] = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    color: "text-[#25D366]",
    hoverColor: "hover:bg-[#25D366]",
    Icon: WhatsAppIcon,
    buildUrl: (url, title) =>
      `https://wa.me/?text=${encodeURIComponent(`${title}\n\n${url}`)}`,
  },
  {
    id: "facebook",
    label: "Facebook",
    color: "text-[#1877F2]",
    hoverColor: "hover:bg-[#1877F2]",
    Icon: FacebookIcon,
    buildUrl: (url) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    id: "twitter",
    label: "X / Twitter",
    color: "text-[#000000]",
    hoverColor: "hover:bg-[#000000]",
    Icon: XIcon,
    buildUrl: (url, title) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}&via=ImoveisCapaoNovo`,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    color: "text-[#0A66C2]",
    hoverColor: "hover:bg-[#0A66C2]",
    Icon: LinkedInIcon,
    buildUrl: (url, title, description) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description)}`,
  },
  {
    id: "telegram",
    label: "Telegram",
    color: "text-[#26A5E4]",
    hoverColor: "hover:bg-[#26A5E4]",
    Icon: TelegramIcon,
    buildUrl: (url, title) =>
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
];

/* ── Component ───────────────────────────────────────────────────── */
export function ShareButtons({
  title,
  description = "",
  url,
  layout = "row",
}: ShareButtonsProps) {
  const [pageUrl, setPageUrl] = useState(url ?? "");
  const [copied, setCopied] = useState(false);
  const [igCopied, setIgCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);
  const [nativeShared, setNativeShared] = useState(false);

  useEffect(() => {
    if (!url) setPageUrl(window.location.href);
    // Web Share API is available in modern mobile browsers
    setCanNativeShare(typeof navigator !== "undefined" && !!navigator.share);
  }, [url]);

  /** Standard copy-link */
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch { /* silent */ }
  };

  /**
   * Instagram — two strategies:
   * 1. Mobile: Web Share API → opens native share sheet → user picks Instagram
   * 2. Desktop: copy link + tooltip instructing to paste in Stories/bio
   */
  const handleInstagram = async () => {
    if (canNativeShare) {
      try {
        await navigator.share({ title, text: description, url: pageUrl });
        setNativeShared(true);
        setTimeout(() => setNativeShared(false), 2500);
      } catch { /* user cancelled */ }
    } else {
      // Desktop fallback: copy the link
      try {
        await navigator.clipboard.writeText(pageUrl);
        setIgCopied(true);
        setTimeout(() => setIgCopied(false), 4000);
      } catch { /* silent */ }
    }
  };

  const handleShare = (network: Network) => {
    const shareUrl = network.buildUrl(pageUrl, title, description);
    window.open(shareUrl, "_blank", "noopener,noreferrer,width=640,height=480");
  };

  const btnBase =
    "group flex items-center gap-2.5 border border-outline-variant px-4 py-2.5 text-[9px] font-sans font-bold uppercase tracking-[0.25em] text-primary/60 hover:text-white hover:border-transparent transition-all duration-300 cursor-pointer";

  return (
    <div className="my-10 py-8 border-t border-b border-outline-variant">
      <p className="text-[9px] font-sans font-black tracking-[0.4em] uppercase text-primary/40 mb-5">
        Compartilhar este artigo
      </p>

      <div
        className={
          layout === "grid"
            ? "grid grid-cols-3 gap-3"
            : "flex flex-wrap items-center gap-3"
        }
      >
        {/* Standard networks */}
        {NETWORKS.map((network) => (
          <button
            key={network.id}
            onClick={() => handleShare(network)}
            title={`Compartilhar no ${network.label}`}
            aria-label={`Compartilhar no ${network.label}`}
            className={`${btnBase} ${network.color} ${network.hoverColor}`}
          >
            <network.Icon size={15} />
            <span className="hidden sm:inline">{network.label}</span>
          </button>
        ))}

        {/* ── Instagram ─────────────────────────────────────── */}
        <div className="relative">
          <button
            onClick={handleInstagram}
            title={
              canNativeShare
                ? "Compartilhar no Instagram"
                : "Copiar link para colar no Instagram"
            }
            aria-label="Compartilhar no Instagram"
            className={`
              ${btnBase}
              ${
                igCopied || nativeShared
                  ? "border-[#E1306C] bg-[#E1306C] text-white"
                  : "text-[#E1306C] hover:bg-[#E1306C]"
              }
            `}
          >
            {igCopied || nativeShared ? (
              <>
                <Check size={15} />
                <span className="hidden sm:inline">
                  {nativeShared ? "Compartilhado!" : "Copiado!"}
                </span>
              </>
            ) : (
              <>
                <InstagramIcon size={15} />
                <span className="hidden sm:inline">Instagram</span>
              </>
            )}
          </button>

          {/* Desktop tooltip — explains how to use the link on Instagram */}
          {igCopied && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 bg-primary text-white text-[9px] font-sans leading-relaxed px-3 py-2.5 z-10 pointer-events-none">
              <p className="font-black tracking-widest uppercase mb-1">Instagram</p>
              <p className="text-white/70 normal-case tracking-normal">
                Link copiado! Cole nos seus Stories, bio ou DMs para compartilhar.
              </p>
              {/* Arrow */}
              <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-primary" />
            </div>
          )}
        </div>

        {/* ── Web Share API (mobile "Mais apps") ────────────── */}
        {canNativeShare && (
          <button
            onClick={async () => {
              try {
                await navigator.share({ title, text: description, url: pageUrl });
              } catch { /* user cancelled */ }
            }}
            title="Compartilhar via outros aplicativos"
            aria-label="Mais opções de compartilhamento"
            className={`${btnBase} text-primary/40 hover:bg-primary/80`}
          >
            <Share2 size={15} />
            <span className="hidden sm:inline">Mais apps</span>
          </button>
        )}

        {/* ── Copy link ─────────────────────────────────────── */}
        <button
          onClick={handleCopy}
          title="Copiar link do artigo"
          aria-label="Copiar link do artigo"
          className={`
            group flex items-center gap-2.5 border px-4 py-2.5
            text-[9px] font-sans font-bold uppercase tracking-[0.25em]
            transition-all duration-300 cursor-pointer
            ${
              copied
                ? "border-secondary bg-secondary text-white"
                : "border-outline-variant text-primary/60 hover:border-secondary hover:text-secondary"
            }
          `}
        >
          {copied ? (
            <>
              <Check size={15} />
              <span className="hidden sm:inline">Copiado!</span>
            </>
          ) : (
            <>
              <Link2 size={15} />
              <span className="hidden sm:inline">Copiar link</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
