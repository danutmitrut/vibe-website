/**
 * 🎯 HERO SECTION - Prima secțiune pe care o vede utilizatorul
 *
 * Pentru cursanți:
 * - Acesta este un React Component (o funcție care returnează HTML/JSX)
 * - JSX = JavaScript + XML (HTML în JavaScript)
 * - className = cum adaugăm CSS în React (în loc de "class")
 * - Tailwind CSS = framework CSS cu clase predefinite
 */

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/*
        🖼️ BACKGROUND IMAGE
        - Folosim Unsplash pentru imagini gratuite, HD
        - ?w=1920 = lățime 1920px pentru calitate bună
        - ?auto=format = Unsplash optimizează automat imaginea
      */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1920&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay întunecat pentru ca textul să fie vizibil */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/*
        🪟 GLASSMORPHISM CARD
        - glass = clasa custom din globals.css (backdrop-filter blur)
        - relative z-10 = pune cardul deasupra imaginii de fundal
        - max-w-4xl = lățime maximă pentru lizibilitate
        - mx-auto = centrat orizontal (margin auto left+right)
        - px-6 = padding orizontal (24px)
      */}
      <div className="glass relative z-10 max-w-4xl mx-auto px-6 py-16 md:px-12 md:py-20 rounded-3xl text-center">
        {/*
          📝 TITLU PRINCIPAL
          - text-5xl = font foarte mare (48px)
          - md:text-7xl = pe ecrane medii/mari (768px+) devine 72px
          - font-bold = greutate font 700
          - text-white = text alb (vizibil pe fundal întunecat)
          - mb-6 = margin-bottom 24px
        */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Cafeaua Ta Preferată,{' '}
          <span className="text-secondary">Perfect Preparată</span>
        </h1>

        {/*
          📄 SUBTITLU
          - text-xl = font 20px
          - md:text-2xl = pe desktop 24px
          - text-gray-100 = alb cu ușoară transparență
          - mb-8 = spațiu sub paragraf
        */}
        <p className="text-xl md:text-2xl text-gray-100 mb-8 max-w-2xl mx-auto">
          Descoperă aromele autentice ale cafelei de specialitate într-un ambient modern și prietenos
        </p>

        {/*
          🔘 CTA BUTTONS (Call-to-Action)
          - flex = display flex pentru alinierea butoanelor
          - flex-col = vertical pe mobile
          - sm:flex-row = orizontal pe ecrane mici+ (640px+)
          - gap-4 = spațiu între butoane (16px)
        */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* Buton Principal - Teal */}
          <a
            href="#menu"
            className="px-8 py-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            Vezi Meniul
          </a>

          {/* Buton Secundar - Orange */}
          <a
            href="#contact"
            className="px-8 py-4 bg-secondary hover:bg-secondary-dark text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            Vizitează-ne
          </a>
        </div>
      </div>

      {/*
        ⬇️ SCROLL INDICATOR
        - absolute bottom-8 = fixat la 32px de jos
        - animate-bounce = animație CSS predefinită Tailwind (mișcare sus-jos)
      */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <svg
          className="w-6 h-6 text-white"
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
    </section>
  );
}
