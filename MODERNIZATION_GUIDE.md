# 📚 Ghid de Modernizare - Vibe Coffee Website

## Introducere

Acest document documentează procesul complet de modernizare a site-ului **Vibe Coffee** de la un design static simplu la o aplicație web modernă, interactivă, cu animații avansate și dark mode funcțional.

**Stack tehnologic:**
- **Next.js 16** (App Router) - Framework React pentru producție
- **React 19** - Library UI declarativ
- **TypeScript** - Type safety și IntelliSense
- **Tailwind CSS v4** - Utility-first CSS framework
- **Lenis** - Smooth scrolling library

---

## 📋 Cuprins

1. [Smooth Scrolling cu Lenis](#1-smooth-scrolling-cu-lenis)
2. [Scroll Animations cu Intersection Observer](#2-scroll-animations-cu-intersection-observer)
3. [Parallax Effects](#3-parallax-effects)
4. [Bento Grid Layout](#4-bento-grid-layout)
5. [Dark Mode Implementation](#5-dark-mode-implementation)
6. [Glassmorphism Design](#6-glassmorphism-design)
7. [Menu Interactiv cu Tab Navigation](#7-menu-interactiv-cu-tab-navigation)
8. [Chat Widget cu AI Integration](#8-chat-widget-cu-ai-integration)
9. [Optimizări de Performanță](#9-optimizări-de-performanță)

---

## 1. Smooth Scrolling cu Lenis

### Ce este Lenis?

Lenis este o bibliotecă JavaScript care oferă smooth scrolling nativ, elimină "jerk-ul" la scroll și creează o experiență de navigare fluidă similar cu site-urile premium (Apple, Awwwards).

### Implementare

**Fișier:** `components/SmoothScroll.tsx`

```typescript
'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll() {
  useEffect(() => {
    // Inițializează Lenis
    const lenis = new Lenis({
      duration: 1.2,              // Durata animației de scroll (secunde)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
      orientation: 'vertical',     // Direcția scroll-ului
      gestureOrientation: 'vertical',
      smoothWheel: true,           // Smooth pe mouse wheel
      wheelMultiplier: 1,          // Sensibilitate mouse
      touchMultiplier: 2,          // Sensibilitate touch
      infinite: false,             // Nu permite scroll infinit
    });

    // RAF (Request Animation Frame) pentru smooth scrolling
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup la unmount
    return () => {
      lenis.destroy();
    };
  }, []);

  return null; // Nu renderează nimic în DOM
}
```

### Concepte Cheie

**1. Request Animation Frame (RAF)**
- Browser API care execută funcții înainte de următorul repaint
- Sincronizează animațiile cu refresh rate-ul ecranului (60fps)
- Mai eficient decât `setInterval` sau `setTimeout`

**2. Easing Functions**
- Controlează accelerația/decelerația animațiilor
- `Math.pow(2, -10 * t)` creează o curbă exponențială de ease-out
- Scroll-ul începe rapid și se oprește smooth

**3. Touch vs Wheel Multiplier**
- `wheelMultiplier: 1` - Sensibilitate normală pentru mouse
- `touchMultiplier: 2` - Scroll mai sensibil pe dispozitive touch

### Integrare în Next.js

**Fișier:** `app/layout.tsx`

```typescript
import SmoothScroll from '@/components/SmoothScroll';

export default function RootLayout({ children }) {
  return (
    <html lang="ro" className="lenis">
      <body>
        <SmoothScroll /> {/* Componenta nu renderează nimic vizual */}
        {children}
      </body>
    </html>
  );
}
```

**CSS Configuration:** `app/globals.css`

```css
/* Dezactivează smooth scroll nativ pentru a permite Lenis să preia controlul */
html.lenis {
  height: auto;
}

html.lenis-smooth {
  scroll-behavior: auto; /* Dezactivează smooth scroll nativ */
}
```

---

## 2. Scroll Animations cu Intersection Observer

### Ce este Intersection Observer?

API nativ al browser-ului care detectează când un element devine vizibil în viewport. Mult mai eficient decât event listeners pe scroll.

### Custom Hook: useScrollAnimation

**Fișier:** `lib/hooks/useScrollAnimation.ts`

```typescript
'use client';

import { useEffect, useRef, useState } from 'react';

export function useScrollAnimation(threshold: number = 0.1) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Setează isVisible = true când elementul devine vizibil
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold, // Procentul din element care trebuie să fie vizibil (0.1 = 10%)
        rootMargin: '0px', // Offset de la marginea viewport-ului
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    // Cleanup: oprește observarea la unmount
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold]);

  return { elementRef, isVisible };
}
```

### Utilizare în Componente

**Exemplu:** `components/Features.tsx`

```typescript
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation';

export default function Features() {
  const { elementRef, isVisible } = useScrollAnimation(0.15);

  return (
    <section ref={elementRef}>
      <div
        className={`transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        {/* Conținut care apare cu fade-in + slide-up */}
      </div>
    </section>
  );
}
```

### Concepte Cheie

**1. Threshold (Prag de Vizibilitate)**
- `0.0` = trigger când primul pixel devine vizibil
- `0.5` = trigger când 50% din element e vizibil
- `1.0` = trigger când 100% din element e vizibil

**2. rootMargin (Offset)**
- Similar cu CSS margin
- `rootMargin: '100px'` - trigger cu 100px înainte ca elementul să intre în viewport
- Util pentru pre-loading sau animații anticipate

**3. Fade-in + Slide-up Animation**
```css
/* Stare inițială (invizibil) */
opacity-0 translate-y-12

/* Stare finală (vizibil) */
opacity-100 translate-y-0

/* Tranziție */
transition-all duration-1000
```

---

## 3. Parallax Effects

### Ce este Parallax?

Efect vizual unde elementele de background se mișcă mai lent decât elementele de foreground, creând o iluzie de depth/profunzime.

### Implementare în Features Section

**Fișier:** `components/Features.tsx`

```typescript
'use client';

import { useEffect, useState } from 'react';

export default function Features() {
  const { elementRef, isVisible } = useScrollAnimation(0.15);
  const [parallaxOffsets, setParallaxOffsets] = useState([0, 0, 0]);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY; // Poziția curentă de scroll
      const element = elementRef.current;

      if (element) {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + scrolled; // Poziția absolută a elementului
        const baseOffset = scrolled - elementTop; // Diferența dintre scroll și element

        // Offset-uri diferite pentru fiecare card (parallax multi-layer)
        setParallaxOffsets([
          baseOffset * 0.2,  // Card mare - se mișcă mai lent (20% din scroll)
          baseOffset * 0.15, // Card mic 1 - și mai lent (15%)
          baseOffset * 0.25  // Card mic 2 - puțin mai rapid (25%)
        ]);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [elementRef]);

  return (
    <section ref={elementRef}>
      {/* Card cu parallax */}
      <img
        src={features[0].image}
        style={{
          transform: `translateY(${parallaxOffsets[0]}px) scale(1.1)`,
          transition: 'transform 0.1s ease-out'
        }}
      />
    </section>
  );
}
```

### Matematica Parallax

**Formula:**
```
offsetFinal = (scrollPosition - elementTopPosition) * parallaxFactor
```

**Factori de Parallax:**
- `0.0` = Elementul nu se mișcă deloc (fixed)
- `0.5` = Elementul se mișcă la jumătate din viteza scroll-ului
- `1.0` = Elementul se mișcă la aceeași viteză cu scroll-ul
- `>1.0` = Elementul se mișcă mai rapid decât scroll-ul

**Multi-layer Parallax:**
```typescript
// Layer 1 (background) - cel mai lent
baseOffset * 0.15

// Layer 2 (middleground)
baseOffset * 0.2

// Layer 3 (foreground) - cel mai rapid
baseOffset * 0.25
```

### Optimizare Performanță

**1. Throttling cu transition CSS**
```css
transition: transform 0.1s ease-out;
```
- Smoothing între frame-uri
- Reduce jitter-ul

**2. GPU Acceleration**
```css
transform: translateY() scale();
/* Folosește translate3d pentru GPU acceleration */
transform: translate3d(0, ${offset}px, 0);
```

---

## 4. Bento Grid Layout

### Ce este Bento Grid?

Layout asimetric inspirat de designul Apple, unde card-uri de dimensiuni diferite creează o compoziție vizuală dinamică.

### Structură Grid

**Fișier:** `components/Features.tsx`

```typescript
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-auto md:h-[600px]">
  {/* 🔲 CARD MARE - Ocupă întreaga coloană stângă */}
  <div className="features-card rounded-3xl overflow-hidden shadow-lg">
    {/* Card mare cu imagine + text */}
  </div>

  {/* 📦 CONTAINER DREAPTA - 2 carduri stivuite */}
  <div className="flex flex-col gap-6">
    {/* 🔳 CARD MIC 1 - Sus dreapta */}
    <div className="features-card rounded-3xl flex-1">
      {/* Card mic 1 */}
    </div>

    {/* 🔳 CARD MIC 2 - Jos dreapta */}
    <div className="features-card rounded-3xl flex-1">
      {/* Card mic 2 */}
    </div>
  </div>
</div>
```

### Layout Breakdown

**Desktop (md:):**
```
┌─────────────┬─────────────┐
│             │   Card 2    │
│   Card 1    ├─────────────┤
│   (mare)    │   Card 3    │
└─────────────┴─────────────┘
```

**Mobile:**
```
┌─────────────┐
│   Card 1    │
├─────────────┤
│   Card 2    │
├─────────────┤
│   Card 3    │
└─────────────┘
```

### CSS Grid Explained

```css
/* Container principal */
.grid {
  display: grid;
  grid-template-columns: 1fr;        /* Mobile: 1 coloană */
  gap: 1.5rem;                       /* Spațiu între card-uri */
  height: auto;                      /* Mobile: înălțime auto */
}

/* Desktop breakpoint */
@media (min-width: 768px) {
  .grid {
    grid-template-columns: 1fr 1fr;  /* Desktop: 2 coloane egale */
    height: 600px;                   /* Desktop: înălțime fixă */
  }
}

/* Coloana dreaptă - flexbox pentru stivuire */
.flex-col {
  display: flex;
  flex-direction: column;            /* Stivuire verticală */
  gap: 1.5rem;
}

/* Card-urile mici ocupă spațiu egal */
.flex-1 {
  flex: 1 1 0%;  /* Grow, shrink, basis */
}
```

### Culori Pastel cu Background Inline

```typescript
const features = [
  {
    color: '#F5E6D3', // Bej cald
    // ...
  },
  {
    color: '#FFF8E7', // Crem
    // ...
  },
  {
    color: '#D4A574', // Maro deschis
    // ...
  },
];

// Aplicare în JSX
<div style={{ backgroundColor: features[0].color }}>
```

**De ce inline styles?**
- Permite culori dinamice din JavaScript
- Mai ușor de modificat decât CSS classes
- Poate fi suprascris cu CSS pentru dark mode

---

## 5. Dark Mode Implementation

### Problema Inițială

**Tailwind CSS v4** folosește implicit **media query strategy** pentru dark mode:
```css
/* Detecție automată din OS settings */
@media (prefers-color-scheme: dark) {
  .dark\:bg-gray-900 { background-color: #111827; }
}
```

**Problema:** Dark mode se activa automat pe baza preferințelor OS, nu a toggle-ului utilizatorului.

### Soluția: Class Strategy

**Fișier:** `app/globals.css`

```css
@import "tailwindcss";

/* 🌙 DARK MODE - Class Strategy (not media query) */
@variant dark (&:where(.dark, .dark *));
```

**Ce face:**
- `@variant dark` definește când se activează `dark:` variants
- `&:where(.dark, .dark *)` = activează când există clasa `.dark` pe `<html>` sau pe părinți
- **NU** mai folosește `@media (prefers-color-scheme: dark)`

### Theme Toggle Component

**Fișier:** `components/ThemeToggle.tsx`

```typescript
'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');

    // DOAR folosește savedTheme, NU detecta automat OS dark mode
    const shouldBeDark = savedTheme === 'dark';
    setIsDark(shouldBeDark);

    if (shouldBeDark) {
      // Dual system: data-theme + dark class
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.classList.add('dark');
    } else {
      // Cleanup explicit pentru light mode
      document.documentElement.removeAttribute('data-theme');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    if (newTheme) {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return <div className="w-14 h-8" />; // Placeholder cu aceeași dimensiune
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-8 bg-gray-300 dark:bg-gray-700 rounded-full p-1 transition-colors duration-300"
      aria-label="Toggle dark mode"
    >
      <div
        className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 flex items-center justify-center ${
          isDark ? 'translate-x-6' : 'translate-x-0'
        }`}
      >
        {isDark ? <span className="text-xs">🌙</span> : <span className="text-xs">☀️</span>}
      </div>
    </button>
  );
}
```

### Dual Theme System Explained

**De ce folosim AMBELE?**

1. **`data-theme="dark"`** - Pentru custom CSS variables și attribute selectors
   ```css
   [data-theme='dark'] body {
     background: linear-gradient(135deg, #1A1A1A 0%, #0A0A0A 100%);
   }
   ```

2. **`.dark` class** - Pentru Tailwind CSS `dark:` variants
   ```html
   <div className="bg-white dark:bg-gray-900">
   ```

**Sincronizare:**
```typescript
// Ambele se setează/șterg împreună
document.documentElement.setAttribute('data-theme', 'dark');
document.documentElement.classList.add('dark');
```

### CSS Variables pentru Dark Mode

**Fișier:** `app/globals.css`

```css
:root {
  /* Light Mode */
  --background: #FAFAFA;
  --foreground: #1F2937;
  --glass-bg: rgba(255, 255, 255, 0.85);
  --glass-border: rgba(255, 255, 255, 0.3);
}

[data-theme='dark'] {
  /* Dark Mode */
  --background: #1A1A1A;
  --foreground: #F5F5F5;
  --glass-bg: rgba(26, 26, 26, 0.85);
  --glass-border: rgba(255, 255, 255, 0.1);
}

/* Aplicare în componente */
body {
  background: var(--background);
  color: var(--foreground);
}
```

### Features Cards Dark Mode Override

**Problema:** Inline styles nu pot fi suprascrise de Tailwind `dark:`

**Soluție:** CSS cu `!important`

```css
/* Dark mode pentru Features cards - suprascrie inline styles */
[data-theme='dark'] .features-card {
  background-color: #374151 !important; /* gray-700 */
}
```

```typescript
// În Features.tsx
<div
  className="features-card"
  style={{ backgroundColor: features[0].color }} // Light mode: #F5E6D3
>
  {/* Dark mode: CSS override la #374151 */}
</div>
```

### Hydration Mismatch Prevention

**Problema:** Server renderează light mode, client poate avea dark mode salvat în localStorage.

**Soluție:** Placeholder până la mount

```typescript
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true); // Setează după first render
}, []);

if (!mounted) {
  // Placeholder cu dimensiuni fixe pentru a evita layout shift
  return <div className="w-14 h-8" />;
}
```

### localStorage Persistence

```typescript
// Salvează preferința
localStorage.setItem('theme', 'dark');

// Citește la mount
const savedTheme = localStorage.getItem('theme');

// Validare
const shouldBeDark = savedTheme === 'dark';
```

**De ce nu folosim OS detection?**
```typescript
// ❌ NU facem asta:
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// ✅ Folosim doar savedTheme:
const shouldBeDark = savedTheme === 'dark';
```

---

## 6. Glassmorphism Design

### Ce este Glassmorphism?

Stil de design care imită sticla mată (frosted glass) cu:
- Background blur (backdrop-filter)
- Semi-transparență
- Border subtil

### CSS Implementation

**Fișier:** `app/globals.css`

```css
.glass {
  background: var(--glass-bg);           /* Semi-transparent background */
  backdrop-filter: blur(10px);           /* Blur-ul de sub element */
  -webkit-backdrop-filter: blur(10px);   /* Safari support */
  border: 1px solid var(--glass-border); /* Border subtil */
}

.glass-hover {
  transition: all 0.3s ease;
}

.glass-hover:hover {
  background: rgba(255, 255, 255, 0.95); /* Mai opac la hover */
  transform: translateY(-4px);           /* Lift effect */
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

/* Dark mode pentru glass */
[data-theme='dark'] .glass-hover:hover {
  background: rgba(55, 65, 81, 0.95) !important; /* gray-700 */
}
```

### Utilizare în Menu Cards

```typescript
<div className="glass glass-hover rounded-2xl overflow-hidden">
  {/* Card content */}
</div>
```

### Browser Support

**backdrop-filter:**
- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Necesită prefix `-webkit-`

```css
backdrop-filter: blur(10px);
-webkit-backdrop-filter: blur(10px); /* Safari */
```

---

## 7. Menu Interactiv cu Tab Navigation

### Active Tab Tracking

**Fișier:** `components/Menu.tsx`

```typescript
const [activeCategory, setActiveCategory] = useState<string>('Espresso');

const categories = ['Espresso', 'Specialty', 'Vegan', 'Cold', 'Alternative', 'Pastry'];

const scrollToCategory = (category: string) => {
  setActiveCategory(category);
  const element = document.getElementById(`category-${category}`);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};
```

### Scroll Spy cu Intersection Observer

```typescript
useEffect(() => {
  const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px', // Trigger când categoria e la mijlocul ecranului
    threshold: 0
  };

  const observerCallback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const category = entry.target.id.replace('category-', '');
        setActiveCategory(category);
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  categories.forEach(category => {
    const element = document.getElementById(`category-${category}`);
    if (element) observer.observe(element);
  });

  return () => observer.disconnect();
}, []);
```

### Tab Styling cu Conditional Classes

```typescript
<button
  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
    activeCategory === category
      ? 'bg-primary text-white shadow-lg scale-105'      // Active state
      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
  }`}
>
  {categoryLabels[category]}
</button>
```

### Scroll Offset pentru Fixed Header

```typescript
<div id={`category-${category}`} className="scroll-mt-48">
  {/* scroll-mt-48 = margin-top: 12rem (192px) */}
  {/* Previne categoria să fie ascunsă sub header la scroll */}
</div>
```

---

## 8. Chat Widget cu AI Integration

### OpenAI API Integration

**Fișier:** `app/api/chat/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'Ești asistentul virtual al cafenelei Vibe Coffee. Răspunde politicos și util la întrebări despre meniu, program, locație.'
        },
        {
          role: 'user',
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 150,
    });

    const reply = completion.choices[0].message.content;
    return NextResponse.json({ reply });

  } catch (error) {
    console.error('OpenAI API Error:', error);
    return NextResponse.json(
      { error: 'Eroare la procesarea mesajului' },
      { status: 500 }
    );
  }
}
```

### Chat Widget UI

**Fișier:** `components/ChatWidget.tsx`

```typescript
const [messages, setMessages] = useState<Message[]>([
  {
    id: 1,
    sender: 'bot',
    text: 'Bună! 👋 Sunt asistentul Vibe Coffee. Cu ce te pot ajuta?',
    quickReplies: ['📋 Meniu', '📍 Locație', '🕐 Program']
  }
]);

const handleSendMessage = async () => {
  if (!inputValue.trim()) return;

  // Adaugă mesajul utilizatorului
  const userMessage: Message = {
    id: Date.now(),
    sender: 'user',
    text: inputValue,
  };
  setMessages(prev => [...prev, userMessage]);
  setInputValue('');
  setIsTyping(true);

  try {
    // Apel API
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: inputValue }),
    });

    const data = await response.json();

    // Adaugă răspunsul bot-ului
    const botMessage: Message = {
      id: Date.now() + 1,
      sender: 'bot',
      text: data.reply || 'Ne pare rău, nu am putut procesa mesajul.',
    };
    setMessages(prev => [...prev, botMessage]);

  } catch (error) {
    console.error('Chat Error:', error);
  } finally {
    setIsTyping(false);
  }
};
```

### Quick Replies

```typescript
const handleQuickReply = (reply: string) => {
  setInputValue(reply);
  handleSendMessage();
};

// În JSX
{message.quickReplies && (
  <div className="flex flex-wrap gap-2">
    {message.quickReplies.map((reply, index) => (
      <button
        key={index}
        onClick={() => handleQuickReply(reply)}
        className="px-4 py-2 bg-white dark:bg-gray-700 border-2 border-primary rounded-full"
      >
        {reply}
      </button>
    ))}
  </div>
)}
```

### Auto-scroll la Mesaje Noi

```typescript
const messagesEndRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
}, [messages]);

// În JSX
<div ref={messagesEndRef} />
```

---

## 9. Optimizări de Performanță

### 1. Image Optimization

**Next.js Image Component:**
```typescript
import Image from 'next/image';

<Image
  src="/hero-coffee.jpg"
  alt="Cafea specialitate"
  width={800}
  height={600}
  priority // Pentru hero images
  quality={85}
  placeholder="blur"
/>
```

**Lazy Loading pentru imagini Unsplash:**
```typescript
<img
  src="https://images.unsplash.com/photo-...?w=800&auto=format&fit=crop"
  loading="lazy"
  onError={(e) => {
    e.currentTarget.style.display = 'none';
  }}
/>
```

### 2. Code Splitting

**Dynamic Imports:**
```typescript
import dynamic from 'next/dynamic';

const ChatWidget = dynamic(() => import('@/components/ChatWidget'), {
  loading: () => <div>Loading...</div>,
  ssr: false // Disable server-side rendering
});
```

### 3. CSS Optimization

**Critical CSS Inline:**
```typescript
// In layout.tsx
import '@/app/globals.css'; // Automatic critical CSS extraction
```

**Tailwind Purge:**
```typescript
// tailwind.config.ts
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
};
```

### 4. Debounce/Throttle pentru Events

**Scroll Event Throttling:**
```typescript
import { useEffect, useState } from 'react';

function useThrottle(value: number, delay: number) {
  const [throttledValue, setThrottledValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setThrottledValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return throttledValue;
}

// Utilizare
const scrollY = useThrottle(window.scrollY, 100);
```

### 5. React Performance Hooks

**useMemo pentru calcule costisitoare:**
```typescript
const filteredItems = useMemo(() => {
  return menuItems.filter(item => item.category === activeCategory);
}, [activeCategory, menuItems]);
```

**useCallback pentru funcții în dependencies:**
```typescript
const handleScroll = useCallback(() => {
  const offset = window.scrollY * 0.2;
  setParallaxOffset(offset);
}, []);

useEffect(() => {
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, [handleScroll]);
```

---

## 🎯 Rezultate Finale

### Performance Metrics

**Lighthouse Score:**
- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

**Core Web Vitals:**
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

### Features Implementate

✅ Smooth scrolling cu Lenis
✅ Scroll animations cu Intersection Observer
✅ Parallax effects multi-layer
✅ Bento grid responsive layout
✅ Dark mode cu class strategy
✅ Glassmorphism design
✅ Menu interactiv cu tab navigation
✅ Chat widget cu OpenAI integration
✅ Performance optimizations

### Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## 📚 Resurse Suplimentare

### Documentație Oficială
- [Next.js App Router](https://nextjs.org/docs/app)
- [React Hooks](https://react.dev/reference/react)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Lenis Smooth Scroll](https://github.com/studio-freight/lenis)
- [OpenAI API](https://platform.openai.com/docs/api-reference)

### Tutorial Videos
- [Intersection Observer API](https://www.youtube.com/watch?v=T8EYosX4NOo)
- [CSS Grid Layout](https://cssgrid.io/)
- [Glassmorphism Tutorial](https://hype4.academy/tools/glassmorphism-generator)

### Design Inspiration
- [Awwwards](https://www.awwwards.com/)
- [Dribbble Coffee Shop Designs](https://dribbble.com/tags/coffee-shop)
- [Apple Design Language](https://developer.apple.com/design/)

---

## 🤝 Contributing

Acest proiect este educațional. Pentru sugestii sau îmbunătățiri:

1. Fork repository-ul
2. Creează un branch nou (`git checkout -b feature/improvement`)
3. Commit modificările (`git commit -m 'Add improvement'`)
4. Push la branch (`git push origin feature/improvement`)
5. Deschide un Pull Request

---

**Creat cu ☕ și ❤️ pentru cursanții Vibe Coffee Academy**

*Ultima actualizare: Decembrie 2025*
