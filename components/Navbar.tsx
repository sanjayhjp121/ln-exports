"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Collections", href: "/products" },
  { label: "Heritage", href: "/#heritage" },
  { label: "Sourcing", href: "/#sourcing" },
  { label: "Export Services", href: "/#logistics" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#fbf9f8]/80 backdrop-blur-xl border-b border-stone-200/20">
      <div className="flex justify-between items-center px-8 md:px-16 py-6 max-w-[1920px] mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="LN Exports"
            width={90}
            height={90}
            className="h-14 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center space-x-12">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                i === 0
                  ? "text-primary border-b border-primary pb-1 font-medium font-headline tracking-wide uppercase text-sm"
                  : "text-stone-600 font-medium font-headline tracking-wide uppercase text-sm hover:text-primary transition-colors duration-300"
              }
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div className="hidden md:flex items-center space-x-5">
          <button
            aria-label="Search"
            className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
          >
            search
          </button>
          <Link
            href="/products"
            className="flex items-center gap-2 bg-primary text-on-primary px-5 py-2 rounded-[0.125rem] font-bold uppercase tracking-widest text-[10px] hover:bg-primary-container transition-colors"
          >
            <span className="material-symbols-outlined text-base">menu_book</span>
            Catalog
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-on-surface-variant p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined">
            {menuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#fbf9f8]/95 backdrop-blur-xl border-t border-stone-200/20 px-8 py-6 space-y-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block text-stone-600 font-headline tracking-wide uppercase text-sm hover:text-primary transition-colors py-1"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/products"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 bg-primary text-on-primary px-5 py-2.5 rounded-[0.125rem] font-bold uppercase tracking-widest text-[10px] w-fit"
          >
            <span className="material-symbols-outlined text-base">menu_book</span>
            Catalog
          </Link>
        </div>
      )}
    </nav>
  );
}
