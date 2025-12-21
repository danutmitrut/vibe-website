/**
 * 🧭 NAVIGATION - Sticky navigation cu blur effect
 * MODERN: Position fixed, backdrop-filter blur, shrink on scroll
 */

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/85 backdrop-blur-md shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className={`text-2xl transition-all duration-300 ${
            isScrolled ? 'text-3xl' : 'text-4xl'
          }`}>
            ☕
          </span>
          <span className={`font-bold transition-all duration-300 ${
            isScrolled ? 'text-xl text-gray-900' : 'text-2xl text-white'
          }`}
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Vibe Coffee
          </span>
        </Link>

        {/* Menu Links */}
        <div className="hidden md:flex items-center gap-6">
          <a
            href="#menu"
            className={`link-underline font-semibold transition-colors ${
              isScrolled ? 'text-gray-900' : 'text-white'
            }`}
          >
            Meniu
          </a>
          <a
            href="/locatie"
            className={`link-underline font-semibold transition-colors ${
              isScrolled ? 'text-gray-900' : 'text-white'
            }`}
          >
            Locație
          </a>

          {/* DARK MODE TOGGLE */}
          <ThemeToggle />

          <a
            href="/rezervari"
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              isScrolled
                ? 'bg-primary text-white hover:bg-primary-dark'
                : 'bg-white text-primary hover:bg-gray-100'
            }`}
          >
            Rezervă Masă
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden text-2xl ${
            isScrolled ? 'text-gray-900' : 'text-white'
          }`}
        >
          ☰
        </button>
      </div>
    </nav>
  );
}
