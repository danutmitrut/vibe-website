/**
 * 🦶 FOOTER - Partea de jos a site-ului
 *
 * Pentru cursanți:
 * - Footer conține: contact, program, social media
 * - Grid layout pentru organizare
 * - Link-uri către rețele sociale
 */

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16 px-6">
      {/*
        📦 CONTAINER PRINCIPAL
      */}
      <div className="max-w-7xl mx-auto">
        {/*
          🎯 GRID 3 COLOANE
          - grid-cols-1 = 1 coloană pe mobile
          - md:grid-cols-3 = 3 coloane pe desktop
          - gap-12 = spațiu între coloane (48px)
        */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/*
            📍 COLOANA 1: CONTACT & LOCAȚIE
          */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              <span className="text-primary">Vibe</span>{' '}
              <span className="text-secondary">Coffee</span>
            </h3>
            <p className="mb-4 leading-relaxed">
              Locul perfect pentru cafeaua ta zilnică și momente de relaxare
            </p>

            {/* ADRESĂ */}
            <div className="space-y-3">
              <div className="flex items-start">
                <svg
                  className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>Str. Cafenelelor nr. 42, București, România</span>
              </div>

              {/* TELEFON */}
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-primary mr-3 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a
                  href="tel:+40123456789"
                  className="hover:text-primary transition-colors"
                >
                  +40 123 456 789
                </a>
              </div>

              {/* EMAIL */}
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-primary mr-3 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href="mailto:hello@vibecoffee.ro"
                  className="hover:text-primary transition-colors"
                >
                  hello@vibecoffee.ro
                </a>
              </div>
            </div>
          </div>

          {/*
            🕐 COLOANA 2: PROGRAM
          */}
          <div>
            <h4 className="text-xl font-semibold text-white mb-4">
              Program Cafenea
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Luni - Vineri</span>
                <span className="text-white font-medium">07:00 - 22:00</span>
              </div>
              <div className="flex justify-between">
                <span>Sâmbătă</span>
                <span className="text-white font-medium">08:00 - 23:00</span>
              </div>
              <div className="flex justify-between">
                <span>Duminică</span>
                <span className="text-white font-medium">08:00 - 21:00</span>
              </div>
            </div>

            {/* INFO EXTRA */}
            <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-sm text-primary-dark">
                ☕ Happy Hour: Luni-Vineri, 15:00-17:00 <br />
                <span className="text-gray-400">20% reducere la toate băuturile!</span>
              </p>
            </div>
          </div>

          {/*
            📱 COLOANA 3: SOCIAL MEDIA
          */}
          <div>
            <h4 className="text-xl font-semibold text-white mb-4">
              Urmărește-ne
            </h4>
            <p className="mb-6">
              Fii la curent cu noutățile, evenimentele și ofertele speciale
            </p>

            {/* SOCIAL LINKS */}
            <div className="flex space-x-4">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-800 hover:bg-primary rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-800 hover:bg-secondary rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* TikTok */}
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-800 hover:bg-primary rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="TikTok"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/*
          📜 FOOTER BOTTOM - Copyright
          - border-t = border top
          - pt-8 = padding-top (32px)
        */}
        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>
            © {new Date().getFullYear()} Vibe Coffee. Toate drepturile rezervate.{' '}
            <span className="text-primary">Made with ❤️ in București</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
