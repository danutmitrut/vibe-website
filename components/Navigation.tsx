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
          <svg className={`transition-all duration-300 ${
            isScrolled ? 'w-8 h-8' : 'w-10 h-10'
          } text-primary`} fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
          </svg>
          <span className={`font-bold transition-all duration-300 ${
            isScrolled ? 'text-xl text-gray-900' : 'text-2xl text-white dark:text-gray-900'
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
              isScrolled ? 'text-gray-900' : 'text-white dark:text-gray-900'
            }`}
          >
            Meniu
          </a>
          <a
            href="/locatie"
            className={`link-underline font-semibold transition-colors ${
              isScrolled ? 'text-gray-900' : 'text-white dark:text-gray-900'
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
          className={`md:hidden ${
            isScrolled ? 'text-gray-900' : 'text-white dark:text-gray-900'
          }`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
