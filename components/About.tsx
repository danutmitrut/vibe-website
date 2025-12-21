/**
 * 📖 ABOUT SECTION - Cu scroll animations
 * MODERNIZAT: Intersection Observer + Parallax effect
 */

'use client';

import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation';
import { useEffect, useState } from 'react';

export default function About() {
  const { elementRef, isVisible } = useScrollAnimation(0.2);
  const [parallaxOffset, setParallaxOffset] = useState(0);

  // Efect parallax pe imagine
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const element = elementRef.current;
      if (element) {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + scrolled;
        const offset = (scrolled - elementTop) * 0.3; // Factor de parallax
        setParallaxOffset(offset);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [elementRef]);

  return (
    <section className="py-20 px-6 bg-white/50" ref={elementRef}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* IMAGINE - Slide in from left + Parallax */}
          <div
            className={`order-2 md:order-1 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-500">
              <img
                src="https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&auto=format&fit=crop"
                alt="Interior cafenea modern și primitor"
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                style={{
                  transform: `translateY(${parallaxOffset}px)`,
                  transition: 'transform 0.1s ease-out'
                }}
              />
            </div>
          </div>

          {/* TEXT - Slide in from right */}
          <div
            className={`order-1 md:order-2 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <div className="inline-block px-4 py-2 bg-secondary/10 text-secondary font-semibold rounded-full mb-4">
              Despre Noi
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Pasiunea pentru cafea,{' '}
              <span className="text-primary">din 2020</span>
            </h2>

            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Vibe Coffee a început din dorința de a aduce experiența autentică
              a cafelei de specialitate în inima orașului. Fiecare ceașcă este
              pregătită cu grijă de bariștii noștri experimentați.
            </p>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Colaborăm direct cu plantații din America de Sud și Africa,
              selectând doar cele mai bune boabe, prăjite la perfecție pentru a
              scoate în evidență notele unice de aromă.
            </p>

            {/* LISTA cu stagger animation */}
            <ul className="space-y-3 mb-8">
              {[
                'Boabe proaspăt prăjite săptămânal',
                'Bariști certificați internațional',
                'Produse locale și sustenabile',
                'WiFi gratuit & loc de muncă',
              ].map((item, index) => (
                <li
                  key={index}
                  className={`flex items-center text-gray-700 transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                  }`}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <svg
                    className="w-5 h-5 text-primary mr-3 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            <a
              href="/rezervari"
              className="inline-block px-8 py-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              Programează o Vizită
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
