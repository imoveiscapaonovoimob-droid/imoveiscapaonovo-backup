"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { WHATSAPP_MESSAGES } from "@/lib/constants";
import { TopBar } from "./TopBar";

const NAV_LINKS = [
  { label: "Imóveis", href: "/imoveis-capao-novo" },
  { label: "Casas", href: "/casas-capao-novo" },
  { label: "Apartamentos", href: "/apartamentos-capao-novo" },
  { label: "Condomínios", href: "/imoveis-costa-serena" },
  { label: "Blog", href: "/blog" },
];

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Top Bar — only visible when not scrolled */}
      <div
        className={`transition-all duration-500 overflow-hidden ${
          scrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
        }`}
      >
        <TopBar />
      </div>

      {/* Main Header */}
      <header
        className={`transition-all duration-500 ${
          scrolled
            ? "bg-white shadow-sm border-b border-black/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
          <Link href="/" className="flex flex-col leading-none">
            <span
              className={`text-xl font-serif tracking-tight transition-colors duration-300 ${
                scrolled ? "text-primary" : "text-white"
              }`}
            >
              Imóveis
            </span>
            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-secondary">
              Capão Novo
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-[10px] font-sans font-bold uppercase tracking-[0.25em] transition-colors duration-300 hover:text-secondary ${
                  scrolled ? "text-primary/60" : "text-white/70"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={WHATSAPP_MESSAGES.geral}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 px-6 py-2.5 bg-secondary text-white text-[10px] font-bold uppercase tracking-widest rounded hover:bg-secondary/90 transition-all duration-300 cursor-pointer"
            >
              Fale Conosco
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden p-2 transition-colors duration-300 cursor-pointer ${
              scrolled ? "text-primary" : "text-white"
            }`}
            aria-label="Menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-black/5 shadow-lg px-6 py-6 flex flex-col gap-5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-primary/60 hover:text-secondary transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={WHATSAPP_MESSAGES.geral}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center px-6 py-3 bg-secondary text-white text-[10px] font-bold uppercase tracking-widest rounded transition-all duration-300 cursor-pointer"
            >
              Fale Conosco
            </a>
          </div>
        )}
      </header>
    </div>
  );
};
