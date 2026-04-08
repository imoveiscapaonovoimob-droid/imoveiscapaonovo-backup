'use client';

import React, { useState } from 'react';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import { Play, Instagram } from 'lucide-react';

// ── Helpers ────────────────────────────────────────────────────────────────────

/**
 * Extracts the YouTube video ID from any common URL format:
 *  - https://www.youtube.com/watch?v=jNQXAC9IVRw
 *  - https://youtu.be/jNQXAC9IVRw
 *  - https://www.youtube.com/embed/jNQXAC9IVRw
 *  - jNQXAC9IVRw  (raw ID)
 */
function extractYouTubeId(input: string): string | null {
  if (!input) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([A-Za-z0-9_-]{11})/,
    /^([A-Za-z0-9_-]{11})$/,
  ];
  for (const re of patterns) {
    const match = input.match(re);
    if (match) return match[1];
  }
  return null;
}

/**
 * Normalises an Instagram URL to the /embed variant.
 * Accepts:
 *  - https://www.instagram.com/p/CODE/
 *  - https://www.instagram.com/reel/CODE/
 *  - https://www.instagram.com/tv/CODE/
 */
function extractInstagramEmbedUrl(input: string): string | null {
  if (!input) return null;
  const match = input.match(/instagram\.com\/(p|reel|tv)\/([A-Za-z0-9_-]+)/);
  if (match) {
    return `https://www.instagram.com/${match[1]}/${match[2]}/embed`;
  }
  return null;
}

type MediaType = 'youtube' | 'instagram' | null;

function detectMediaType(youtubeInput?: string, instagramInput?: string): MediaType {
  if (youtubeInput && extractYouTubeId(youtubeInput)) return 'youtube';
  if (instagramInput && extractInstagramEmbedUrl(instagramInput)) return 'instagram';
  return null;
}

// ── Component Props ────────────────────────────────────────────────────────────

interface VideoEmbedProps {
  /** Raw YouTube URL or ID (e.g. "jNQXAC9IVRw" or full watch URL) */
  youtubeUrl?: string;
  /** Raw Instagram post/reel/tv URL */
  instagramUrl?: string;
  title?: string;
}

// ── Component ──────────────────────────────────────────────────────────────────

export function VideoEmbed({ youtubeUrl, instagramUrl, title = 'Vídeo do Imóvel' }: VideoEmbedProps) {
  const [activeTab, setActiveTab] = useState<'youtube' | 'instagram'>(() => {
    if (youtubeUrl && extractYouTubeId(youtubeUrl)) return 'youtube';
    return 'instagram';
  });

  const ytId = youtubeUrl ? extractYouTubeId(youtubeUrl) : null;
  const igUrl = instagramUrl ? extractInstagramEmbedUrl(instagramUrl) : null;

  const hasBoth = !!ytId && !!igUrl;
  const hasYt = !!ytId;
  const hasIg = !!igUrl;

  if (!hasYt && !hasIg) return null;

  return (
    <section className="space-y-8">
      {/* Section header */}
      <div className="flex items-end justify-between">
        <h3 className="text-3xl font-serif text-[#001629]">
          Tour <span className="italic text-accent">em Vídeo</span>
        </h3>

        {/* Tabs — only shown when both exist */}
        {hasBoth && (
          <div className="flex gap-1 bg-[#001629]/5 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('youtube')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-[10px] font-black uppercase tracking-widest transition-all duration-200 ${
                activeTab === 'youtube'
                  ? 'bg-[#001629] text-white shadow'
                  : 'text-[#001629]/50 hover:text-[#001629]'
              }`}
            >
              <Play size={12} fill="currentColor" />
              YouTube
            </button>
            <button
              onClick={() => setActiveTab('instagram')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-[10px] font-black uppercase tracking-widest transition-all duration-200 ${
                activeTab === 'instagram'
                  ? 'bg-[#001629] text-white shadow'
                  : 'text-[#001629]/50 hover:text-[#001629]'
              }`}
            >
              <Instagram size={12} />
              Instagram
            </button>
          </div>
        )}
      </div>

      {/* YouTube Player (lazy via LiteYouTubeEmbed) */}
      {hasYt && (!hasBoth || activeTab === 'youtube') && (
        <div className="w-full overflow-hidden rounded-2xl shadow-[0_20px_60px_rgba(0,22,41,0.12)] border border-[#001629]/5">
          <LiteYouTubeEmbed
            id={ytId!}
            title={title}
            poster="maxresdefault"
            wrapperClass="yt-lite rounded-2xl"
          />
        </div>
      )}

      {/* Instagram Embed (plain iframe — avoids hydration conflicts) */}
      {hasIg && (!hasBoth || activeTab === 'instagram') && (
        <div className="flex justify-center">
          <div className="w-full max-w-[500px] overflow-hidden rounded-2xl shadow-[0_20px_60px_rgba(0,22,41,0.12)] border border-[#001629]/5 bg-white">
            <iframe
              src={igUrl!}
              title={title}
              className="w-full"
              style={{ height: 540, border: 'none' }}
              loading="lazy"
              allowFullScreen
              scrolling="no"
            />
          </div>
        </div>
      )}
    </section>
  );
}
