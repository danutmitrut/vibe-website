/**
 * 📖 ABOUT SECTION - Despre cafenea/poveste
 *
 * Pentru cursanți:
 * - Layout cu 2 coloane: imagine stânga, text dreapta
 * - Pe mobile: stack vertical (imagine deasupra, text dedesubt)
 * - Responsive cu Tailwind (grid + breakpoints)
 */

export default function About() {
  return (
    <section className="py-20 px-6 bg-white/50">
      {/*
        📦 CONTAINER
      */}
      <div className="max-w-7xl mx-auto">
        {/*
          🎯 GRID LAYOUT
          - grid = CSS Grid
          - grid-cols-1 = 1 coloană pe mobile (imagine peste text)
          - md:grid-cols-2 = 2 coloane pe desktop (imagine + text alături)
          - gap-12 = spațiu între coloane (48px)
          - items-center = aliniază vertical la centru
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/*
            🖼️ COLOANA IMAGINE
            - order-2 md:order-1 = pe mobile e a 2-a (după text), pe desktop prima
          */}
          <div className="order-2 md:order-1">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              {/*
                IMAGINE UNSPLASH
                - w=800 = lățime 800px (destul pentru display retina)
                - aspect-video = păstrează ratio 16:9
                - object-cover = cropează imagine să umple containerul
              */}
              <img
                src="https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&auto=format&fit=crop"
                alt="Interior cafenea modern și primitor"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/*
            📝 COLOANA TEXT
            - order-1 md:order-2 = pe mobile e prima, pe desktop a 2-a
          */}
          <div className="order-1 md:order-2">
            {/*
              🏷️ BADGE/TAG
              - inline-block = elementul ocupă doar spațiul necesar
              - px-4 py-2 = padding (16px orizontal, 8px vertical)
            */}
            <div className="inline-block px-4 py-2 bg-secondary/10 text-secondary font-semibold rounded-full mb-4">
              Despre Noi
            </div>

            {/*
              🎯 TITLU
            */}
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Pasiunea pentru cafea,{' '}
              <span className="text-primary">din 2020</span>
            </h2>

            {/*
              📄 PARAGRAFE
              - mb-4 = spațiu între paragrafe (16px)
              - leading-relaxed = line-height mai mare (1.625)
            */}
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

            {/*
              ✅ LISTA BENEFICII
              - space-y-3 = spațiu vertical între elemente (12px)
            */}
            <ul className="space-y-3 mb-8">
              {[
                'Boabe proaspăt prăjite săptămânal',
                'Bariști certificați internațional',
                'Produse locale și sustenabile',
                'WiFi gratuit & loc de muncă',
              ].map((item, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  {/* SVG CHECKMARK */}
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

            {/*
              🔘 CTA BUTTON
              - Link către pagina de rezervări
            */}
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
