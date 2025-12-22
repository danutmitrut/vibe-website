/**
 * 🏠 HOME PAGE - Pagina principală a site-ului
 *
 * Pentru cursanți:
 * - Aceasta este pagina principală (index/root)
 * - În Next.js, app/page.tsx = homepage (/)
 * - Importăm componentele și le afișăm în ordine
 * - Fragment (<></>) = wrapper invizibil (nu adaugă DIV extra în DOM)
 */

// Importăm toate componentele create
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Menu from '@/components/Menu';
import About from '@/components/About';
import Footer from '@/components/Footer';

/**
 * 📄 COMPONENTA HOME
 * - export default = exportul principal al fișierului
 * - Next.js caută automat "export default" în fiecare page.tsx
 */
export default function Home() {
  return (
    <>
      {/*
        🎯 STRUCTURA PAGINII
        Ordinea componentelor:
        0. Navigation (sticky) - Navigare persistentă modernă
        1. Hero (full screen) - Prima impresie
        2. Features (3 carduri) - Ce oferim
        3. Menu (meniu complet cu produse) - Ce vindem
        4. About (poveste + imagine) - Cine suntem
        5. Footer (contact + social) - Info final
      */}

      <Navigation />
      <Hero />
      <Features />
      <Menu />
      <About />
      <Footer />

      {/*
        PENTRU CURSANȚI - Explicații concepte:

        1. COMPONENTE = bucăți reutilizabile de UI
           - <Hero /> = componenta Hero (definită în components/Hero.tsx)
           - Fiecare componentă e ca un "custom HTML tag"

        2. PROPS (deocamdată nu folosim)
           - Props = date pe care le transmiți către componentă
           - Exemplu: <Hero title="Titlu" subtitle="Subtitlu" />
           - În viitor vom învăța să facem componente dinamice cu props

        3. IMPORT/EXPORT
           - import Hero from '@/components/Hero' = aduce componenta
           - @ = alias pentru root folder (configurat în tsconfig.json)
           - export default = face componenta disponibilă pentru import

        4. JSX
           - Acest cod arată ca HTML dar e JSX (JavaScript XML)
           - JSX = sintaxă care permite HTML în JavaScript
           - Compilatorul transformă JSX în JavaScript pur

        5. NEXT.JS ROUTING
           - app/page.tsx = homepage (/)
           - app/despre/page.tsx = /despre
           - app/contact/page.tsx = /contact
           - Routing-ul e automat bazat pe structura folderelor!
      */}
    </>
  );
}
