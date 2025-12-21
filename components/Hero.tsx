/**
 * 🎯 HERO SECTION - Prima secțiune pe care o vede utilizatorul
 * MODERNIZAT: Full-screen cu animații fade-in
 */

'use client';

import { useEffect, useState } from 'react';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Declanșează animația după mount
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 🎬 BACKGROUND VIDEO - Full Screen Loop */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1920&auto=format&fit=crop"
          className="absolute inset-0 w-full h-full object-cover"
          onLoadedData={(e) => {
            const video = e.currentTarget;
            video.playbackRate = 0.5; // Redare la 50% din viteza normală (ultra-lent, cinematic)
            video.play().catch(error => {
              console.log('Video autoplay prevented:', error);
            });
          }}
        >
          {/* Video local pentru încărcare rapidă și sigură */}
          <source
            src="/hero-coffee.mp4"
            type="video/mp4"
          />
          {/* Fallback pentru browsere vechi */}
          Your browser does not support the video tag.
        </video>
        {/* Overlay semi-transparent pentru contrast */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* 🎨 CONTENT - Direct pe fundal, fără glassmorphism card */}
      <div
        className={`relative z-10 max-w-6xl mx-auto px-6 py-16 md:px-12 text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        {/* 📝 TITLU PRINCIPAL - Mărit la 96px (6rem) */}
        <h1
          className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-6 leading-tight"
          style={{
            textShadow: '0 4px 12px rgba(0,0,0,0.8)',
            animation: isVisible ? 'fadeInUp 1s ease-out' : 'none'
          }}
        >
          Cafeaua ta preferată,{' '}
          <span className="text-secondary block mt-2" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.8)' }}>
            perfect preparată
          </span>
        </h1>

        {/* 📄 SUBTITLU */}
        <p
          className="text-xl md:text-3xl text-white/90 mb-10 max-w-3xl mx-auto font-light leading-relaxed"
          style={{
            textShadow: '0 3px 8px rgba(0,0,0,0.8)',
            animation: isVisible ? 'fadeInUp 1s ease-out 0.2s both' : 'none'
          }}
        >
          Descoperă aromele autentice ale cafelei de specialitate într-un ambient modern și prietenos
        </p>

        {/* 🔘 CTA BUTTONS */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          style={{
            animation: isVisible ? 'fadeInUp 1s ease-out 0.4s both' : 'none'
          }}
        >
          <a
            href="#menu"
            className="px-10 py-5 bg-primary hover:bg-primary-dark text-white text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            Vezi Meniul
          </a>

          <a
            href="/locatie"
            className="px-10 py-5 bg-secondary hover:bg-secondary-dark text-white text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            Vizitează-ne
          </a>
        </div>
      </div>

      {/* ⬇️ SCROLL INDICATOR */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <svg
          className="w-6 h-6 text-white/80"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>

      {/* 🎬 KEYFRAMES pentru animații */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
