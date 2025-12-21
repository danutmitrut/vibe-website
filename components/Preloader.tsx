/**
 * ⏳ PRELOADER - Animație de încărcare cu logo Vibe Coffee
 * MODERN: Fade out elegant când pagina se încarcă
 */

'use client';

import { useEffect, useState } from 'react';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Ascunde preloader-ul după ce pagina s-a încărcat
    const handleLoad = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 800); // Delay mic pentru experiență mai smooth
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-primary via-primary-dark to-secondary transition-opacity duration-700 ${
        isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="text-center">
        {/* LOGO ANIMAT */}
        <div className="relative">
          {/* Cerc pulsant în spate */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-white/20 rounded-full animate-ping"></div>
          </div>

          {/* Logo principal */}
          <div className="relative z-10 animate-bounce-slow">
            <div className="text-8xl mb-4 filter drop-shadow-2xl">☕</div>
            <h1
              className="text-5xl font-bold text-white mb-2"
              style={{ fontFamily: 'var(--font-playfair)', textShadow: '0 4px 12px rgba(0,0,0,0.3)' }}
            >
              Vibe Coffee
            </h1>
            <p className="text-white/90 text-lg font-light">Se încarcă...</p>
          </div>
        </div>

        {/* LOADING BAR */}
        <div className="mt-12 w-64 mx-auto">
          <div className="h-1 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full animate-loading-bar"></div>
          </div>
        </div>
      </div>

      {/* KEYFRAMES pentru animații custom */}
      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes loading-bar {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-loading-bar {
          animation: loading-bar 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
