# 📚 Vibe Coffee - Documentație pentru Cursanți

## 🎯 Scop Proiect

Acesta este primul tău proiect real - un site modern pentru o cafenea, construit cu tehnologii profesionale. Vei învăța:
- ✅ React & Next.js (framework-ul folosit de Netflix, Airbnb)
- ✅ TypeScript (JavaScript cu tipuri - industrie standard)
- ✅ Tailwind CSS (stilizare rapidă și profesională)
- ✅ Responsive Design (funcționează pe telefon, tabletă, desktop)
- ✅ Deployment în producție (site-ul tău live pe internet!)

---

## 📋 Cuprins

1. [Structura Proiectului](#structura-proiectului)
2. [Tehnologii Folosite](#tehnologii-folosite)
3. [Concepte Cheie](#concepte-cheie)
4. [Componentele Site-ului](#componentele-site-ului)
5. [Cum Funcționează Fiecare Componentă](#cum-functioneaza-fiecare-componenta)
6. [Stilizare cu Tailwind CSS](#stilizare-cu-tailwind-css)
7. [Deployment pe Vercel](#deployment-pe-vercel)
8. [Cum să Modifici Site-ul](#cum-sa-modifici-site-ul)

---

## 🗂️ Structura Proiectului

```
vibe-website/
├── app/                      # Folder principal Next.js
│   ├── globals.css          # Stiluri globale (culori, glassmorphism)
│   ├── layout.tsx           # Layout principal (wrapper pentru toate paginile)
│   ├── page.tsx             # Homepage (/)
│   └── locatie/
│       └── page.tsx         # Pagina de locație (/locatie)
├── components/              # Componente reutilizabile
│   ├── Hero.tsx             # Secțiunea hero (prima impresie)
│   ├── Features.tsx         # 3 carduri cu caracteristici
│   ├── Menu.tsx             # Meniul cu 30 produse
│   ├── About.tsx            # Secțiunea despre noi
│   └── Footer.tsx           # Footer cu contact
├── public/                  # Fișiere statice (imagini locale)
├── package.json             # Dependințe proiect
└── tsconfig.json            # Configurare TypeScript
```

**📌 Reține:**
- `app/` = Unde pui paginile site-ului
- `components/` = Bucăți reutilizabile de UI
- `public/` = Imagini și fișiere statice

---

## 🛠️ Tehnologii Folosite

### 1. **Next.js 15** (Framework React)
**Ce face:** Framework modern pentru aplicații web
**De ce e util:**
- Routing automat (app/despre/page.tsx devine /despre)
- Performance excelent (site rapid)
- SEO-friendly (Google te găsește ușor)

**Exemplu simplu:**
```tsx
// app/page.tsx = Homepage (/)
export default function Home() {
  return <h1>Acasă</h1>;
}

// app/despre/page.tsx = Pagina Despre (/despre)
export default function Despre() {
  return <h1>Despre Noi</h1>;
}
```

---

### 2. **TypeScript** (JavaScript + Tipuri)
**Ce face:** JavaScript mai sigur cu verificare de tipuri
**De ce e util:** Prinzi erorile înainte să rulezi codul

**Exemplu:**
```typescript
// ❌ JavaScript normal - eroare la runtime
let pret = "15 lei";
let total = pret + 5; // "15 lei5" (nu ce voiam!)

// ✅ TypeScript - eroare înainte să rulezi
let pret: number = 15;
let total = pret + 5; // 20 (corect!)
```

---

### 3. **Tailwind CSS** (Framework CSS)
**Ce face:** Clase CSS predefinite pentru stilizare rapidă
**De ce e util:** Scrii CSS direct în HTML, fără fișiere separate

**Exemplu:**
```tsx
// Fără Tailwind (CSS clasic)
<style>
  .buton {
    background-color: blue;
    color: white;
    padding: 16px;
    border-radius: 8px;
  }
</style>
<button className="buton">Click</button>

// Cu Tailwind (rapid!)
<button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
  Click
</button>
```

---

### 4. **React Components** (Bucăți reutilizabile)
**Ce face:** Împarte UI-ul în bucăți mici, ușor de înțeles
**De ce e util:** Cod organizat, reutilizabil

**Exemplu:**
```tsx
// Componentă simplă
function Buton({ text }) {
  return <button>{text}</button>;
}

// Folosire
<Buton text="Cumpără" />
<Buton text="Anulează" />
```

---

## 🧠 Concepte Cheie

### 1. **JSX** (JavaScript + HTML)
JSX permite scrierea de HTML direct în JavaScript.

```tsx
// JSX
const element = <h1>Hello, World!</h1>;

// Se transformă în:
const element = React.createElement('h1', null, 'Hello, World!');
```

**Reguli importante:**
- `className` în loc de `class` (class e cuvânt rezervat în JS)
- Închide toate tag-urile (`<img />` nu `<img>`)
- Un singur element părinte (folosește `<>...</>` ca wrapper)

---

### 2. **Props** (Parametri pentru componente)
Props = date transmise către o componentă (ca parametrii unei funcții)

```tsx
// Componentă cu props
function Card({ title, price }) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{price} lei</p>
    </div>
  );
}

// Folosire
<Card title="Espresso" price={12} />
<Card title="Cappuccino" price={16} />
```

---

### 3. **Array.map()** (Generare dinamică de UI)
**Cel mai important pattern în React!** Generezi multiple elemente din date.

```tsx
const produse = [
  { nume: 'Espresso', pret: 12 },
  { nume: 'Latte', pret: 17 },
  { nume: 'Cappuccino', pret: 16 },
];

// Generăm 3 carduri dintr-un array
{produse.map((produs, index) => (
  <Card key={index} title={produs.nume} price={produs.pret} />
))}
```

**⚠️ `key` e obligatoriu!** React are nevoie de un ID unic pentru fiecare element.

---

### 4. **Responsive Design** (Adaptat la toate ecranele)
Tailwind folosește breakpoint-uri pentru design responsive:

```tsx
<h1 className="text-2xl md:text-4xl lg:text-6xl">
  Titlu
</h1>
```

| Breakpoint | Lățime | Dispozitiv |
|------------|--------|------------|
| (fără prefix) | 0px+ | Mobile |
| `sm:` | 640px+ | Telefon mare |
| `md:` | 768px+ | Tabletă |
| `lg:` | 1024px+ | Desktop mic |
| `xl:` | 1280px+ | Desktop mare |

---

## 🏗️ Componentele Site-ului

### 📄 **app/page.tsx** (Homepage)
**Rol:** Pagina principală - combină toate componentele

```tsx
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Menu from '@/components/Menu';
import About from '@/components/About';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Hero />      {/* Secțiune hero */}
      <Features />  {/* 3 carduri */}
      <Menu />      {/* Meniul */}
      <About />     {/* Despre noi */}
      <Footer />    {/* Footer */}
    </>
  );
}
```

**Lecție:** Componenta Home e ca o "bucătărie" - combină ingredientele (componentele) într-un "preparat final" (pagina web).

---

### 🎨 **app/globals.css** (Stiluri globale)
**Rol:** Definește culorile și efectele pentru întreg site-ul

```css
:root {
  --primary: #14B8A6;        /* Teal - culoare principală */
  --secondary: #F97316;      /* Orange - culoare secundară */
  --glass-bg: rgba(255, 255, 255, 0.85); /* Glassmorphism */
}

/* Efect glassmorphism */
.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(10px);   /* Blur fundal */
  border: 1px solid rgba(255, 255, 255, 0.3);
}
```

**Lecție:** CSS variables (variabilele) permit schimbarea culorilor în tot site-ul dintr-un singur loc.

---

## 🔍 Cum Funcționează Fiecare Componentă

### 1️⃣ **Hero.tsx** (Secțiunea Hero)

**Ce face:** Prima impresie - imagine mare de fundal + text + 2 butoane

**Structură:**
```
┌─────────────────────────────────────┐
│   Imagine fundal (cafea)            │
│   ┌─────────────────────────────┐   │
│   │  Card glassmorphism         │   │
│   │  - Titlu mare               │   │
│   │  - Subtitlu                 │   │
│   │  - 2 butoane CTA            │   │
│   └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

**Concepte învățate:**
- Background image cu overlay
- Glassmorphism (fundal blur)
- Butoane interactive cu hover effects
- Text shadows pentru lizibilitate

**Cod simplificat:**
```tsx
<section className="relative min-h-screen">
  {/* Fundal */}
  <div style={{ backgroundImage: 'url(...)' }}>
    <div className="bg-black/60"></div> {/* Overlay întunecat */}
  </div>

  {/* Conținut */}
  <div className="glass">
    <h1>Cafeaua Ta Preferată</h1>
    <p>Descoperă aromele autentice...</p>
    <a href="#menu">Vezi Meniul</a>
    <a href="/locatie">Vizitează-ne</a>
  </div>
</section>
```

---

### 2️⃣ **Features.tsx** (3 Carduri Caracteristici)

**Ce face:** Prezintă 3 avantaje ale cafenelei cu imagini și text

**Pattern important: Array.map()**
```tsx
const features = [
  { icon: '☕', title: 'Cafea de Specialitate', image: '...' },
  { icon: '🥐', title: 'Patiserie Artizanală', image: '...' },
  { icon: '🪴', title: 'Ambient Relaxant', image: '...' },
];

// Generăm 3 carduri automat
{features.map((feature, index) => (
  <div key={index} className="card">
    <img src={feature.image} />
    <div className="icon">{feature.icon}</div>
    <h3>{feature.title}</h3>
  </div>
))}
```

**Lecție:** În loc să scrii 3 carduri manual, folosești `.map()` pentru a le genera dintr-un array. Dacă vrei să adaugi un al 4-lea card, doar adaugi în array!

---

### 3️⃣ **Menu.tsx** (Meniul cu 30 produse)

**Ce face:** Afișează meniul organizat pe 6 categorii

**Structură date:**
```tsx
const menuItems = [
  {
    name: 'Espresso',
    price: 12,
    category: 'Espresso',
    description: 'Shot dublu de espresso intens',
    ingredients: '18g cafea, 36ml extract',
    image: 'https://...',
    vegan: true,
  },
  // ... 29 produse mai multe
];

const categories = ['Espresso', 'Specialty', 'Vegan', 'Cold', 'Alternative', 'Pastry'];
```

**Logică afișare:**
```tsx
// Pentru fiecare categorie
{categories.map((category) => (
  <div>
    <h3>{category === 'Espresso' && '☕ Espresso Classics'}</h3>

    {/* Filtrează produsele din categoria curentă */}
    {menuItems
      .filter((item) => item.category === category)
      .map((item) => (
        <Card
          name={item.name}
          price={item.price}
          description={item.description}
        />
      ))}
  </div>
))}
```

**Lecție:**
1. `.filter()` = selectează doar produsele din categoria dorită
2. `.map()` = afișează fiecare produs ca un card

---

### 4️⃣ **About.tsx** (Despre Noi)

**Ce face:** Prezintă povestea cafenelei într-un grid 2 coloane (imagine + text)

**Layout:**
```
┌──────────────┬──────────────┐
│   Imagine    │    Text      │
│   cafenea    │  - Povestea  │
│              │  - Checkmarks│
│              │  - Buton CTA │
└──────────────┴──────────────┘
```

**Grid Tailwind:**
```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
  {/* Coloana 1: Imagine */}
  <div>
    <img src="..." />
  </div>

  {/* Coloana 2: Text */}
  <div>
    <h2>Povestea Noastră</h2>
    <p>Din 2020, servim cafeaua perfectă...</p>
    <ul>
      <li>✓ Boabe 100% Arabica</li>
      <li>✓ Bariști certificați</li>
    </ul>
  </div>
</div>
```

**Lecție:** Grid-ul se adaptează automat:
- Mobile (< 1024px): 1 coloană (imagine sus, text jos)
- Desktop (≥ 1024px): 2 coloane side-by-side

---

### 5️⃣ **Footer.tsx** (Footer)

**Ce face:** Informații de contact, program, social media

**Layout 3 coloane:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  {/* Coloana 1: Contact */}
  <div>
    <h3>📍 Contact</h3>
    <p>Str. Cafenelelor, Nr. 42</p>
    <p>📞 +40 721 234 567</p>
  </div>

  {/* Coloana 2: Program */}
  <div>
    <h3>⏰ Program</h3>
    <p>Luni-Vineri: 07:00-22:00</p>
  </div>

  {/* Coloana 3: Social Media */}
  <div>
    <h3>📱 Social Media</h3>
    <a href="#">Facebook</a>
    <a href="#">Instagram</a>
  </div>
</div>
```

---

### 6️⃣ **app/locatie/page.tsx** (Pagina Locație)

**Ce face:** Pagină separată cu galerie foto și hartă

**Routing Next.js:**
```
app/
├── page.tsx          → / (homepage)
└── locatie/
    └── page.tsx      → /locatie
```

**Galerie foto cu Grid:**
```tsx
const galleryImages = [
  { url: '...', title: 'Interior elegant' },
  { url: '...', title: 'Zona de lucru' },
  // ... 6 imagini total
];

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {galleryImages.map((image, index) => (
    <div className="card">
      <img src={image.url} />
      <div className="overlay">
        <h3>{image.title}</h3>
      </div>
    </div>
  ))}
</div>
```

**Hover effect:**
```css
.card:hover img {
  transform: scale(1.1);  /* Zoom la hover */
}

.card:hover .overlay {
  opacity: 1;  /* Afișează overlay */
}
```

---

## 🎨 Stilizare cu Tailwind CSS

### Clase Tailwind Frecvente

| Clasă | Ce face | Exemplu |
|-------|---------|---------|
| `flex` | Display flexbox | Container flexibil |
| `grid` | Display grid | Layout în grilă |
| `gap-4` | Spațiu între elemente | 16px (4 × 4px) |
| `px-6` | Padding orizontal | 24px left+right |
| `py-4` | Padding vertical | 16px top+bottom |
| `mb-8` | Margin bottom | 32px jos |
| `text-2xl` | Font size | 24px |
| `font-bold` | Font weight | Greutate 700 |
| `text-primary` | Culoare text | Culoarea primară (teal) |
| `bg-white` | Background | Fundal alb |
| `rounded-lg` | Border radius | Colțuri rotunjite |
| `shadow-xl` | Box shadow | Umbră mare |
| `hover:scale-105` | Transform la hover | Mărește 5% la hover |
| `transition-all` | Tranziții animate | Animații smooth |

### Responsive Design

```tsx
<h1 className="
  text-2xl      {/* Mobile: 24px */}
  md:text-4xl   {/* Tablet: 36px */}
  lg:text-6xl   {/* Desktop: 60px */}
">
  Titlu Responsiv
</h1>
```

### Glassmorphism Custom

```css
.glass {
  background: rgba(255, 255, 255, 0.85);  /* Semi-transparent */
  backdrop-filter: blur(10px);            /* Blur fundal */
  border: 1px solid rgba(255, 255, 255, 0.3);
}
```

---

## 🚀 Deployment pe Vercel

### Pas 1: Pregătire Proiect

```bash
# Verifică că totul funcționează local
npm run dev

# Creează build de producție
npm run build
```

### Pas 2: Push pe GitHub

```bash
git add .
git commit -m "Vibe Coffee - Site gata pentru deployment"
git push origin main
```

### Pas 3: Deploy pe Vercel

1. Mergi pe [vercel.com](https://vercel.com)
2. Sign up cu GitHub
3. Click "New Project"
4. Selectează repository-ul `vibe-website`
5. Click "Deploy"
6. **Gata!** Site-ul e live în ~2 minute

**URL-ul tău:** `https://vibe-website-username.vercel.app`

---

## 🛠️ Cum să Modifici Site-ul

### 1. Schimbă Culorile

**Fișier:** `app/globals.css`

```css
:root {
  --primary: #14B8A6;      /* Schimbă cu orice culoare */
  --secondary: #F97316;    /* Ex: #FF6B6B (roșu) */
}
```

### 2. Adaugă un Produs Nou în Meniu

**Fișier:** `components/Menu.tsx`

```tsx
const menuItems = [
  // ... produse existente
  {
    name: 'Frappé',
    price: 18,
    category: 'Cold',
    description: 'Cafea rece cu gheață zdrobită',
    ingredients: 'Espresso + gheață + lapte',
    image: 'https://images.unsplash.com/photo-...',
    vegan: false,
  },
];
```

### 3. Adaugă o Nouă Pagină

**Creează:** `app/evenimente/page.tsx`

```tsx
export default function Evenimente() {
  return (
    <div>
      <h1>Evenimente</h1>
      <p>Concerte live în fiecare vineri!</p>
    </div>
  );
}
```

**Acum poți accesa:** `/evenimente`

### 4. Schimbă Imaginile

**Opțiuni:**
1. **Unsplash** (gratuit): `https://images.unsplash.com/photo-...`
2. **Imagini proprii:** pune în `public/` → `<img src="/cafea.jpg" />`

---

## ❓ Întrebări Frecvente

### **Q: De ce folosim TypeScript în loc de JavaScript?**
**A:** TypeScript adaugă "tipuri" peste JavaScript, prevenind erori comune:
```typescript
// ❌ JavaScript - eroare runtime
function aduna(a, b) {
  return a + b;
}
aduna(5, "3"); // "53" (string concatenation!)

// ✅ TypeScript - eroare la compilare
function aduna(a: number, b: number): number {
  return a + b;
}
aduna(5, "3"); // EROARE: "3" nu e number!
```

---

### **Q: Ce înseamnă "use client" în Menu.tsx?**
**A:** Next.js are 2 tipuri de componente:
- **Server Components** (default): Rulează pe server → mai rapid
- **Client Components** (`'use client'`): Rulează în browser → pentru interactivitate

Menu.tsx e client component pentru că folosește `onError` (event handler).

---

### **Q: De ce `key={index}` în .map()?**
**A:** React are nevoie de un ID unic pentru a ști ce element s-a schimbat.

```tsx
// ❌ Fără key - React nu știe ce s-a schimbat
{items.map((item) => <Card {...item} />)}

// ✅ Cu key - React știe exact
{items.map((item, index) => <Card key={index} {...item} />)}
```

**Regulă:** Folosește ID unic (ex: `item.id`) dacă ai, altfel `index`.

---

### **Q: Cum funcționează glassmorphism?**
**A:** Combinație de:
1. **Fundal semi-transparent:** `rgba(255, 255, 255, 0.85)`
2. **Blur fundal:** `backdrop-filter: blur(10px)`
3. **Border subtle:** `border: 1px solid rgba(255, 255, 255, 0.3)`

**Rezultat:** Efect de "sticlă mată" peste fundal.

---

## 🎓 Ce Ai Învățat

✅ **React Basics**
- Componente funcționale
- Props și state management
- JSX syntax

✅ **Next.js**
- File-based routing (`app/` folder)
- Server Components vs Client Components
- Image optimization

✅ **TypeScript**
- Tipuri pentru variabile și funcții
- Interface-uri pentru obiecte
- Type safety

✅ **Tailwind CSS**
- Utility-first CSS
- Responsive design
- Custom styles și theme

✅ **Modern Web Development**
- Glassmorphism effects
- Grid și Flexbox layouts
- Image optimization (Unsplash)
- Deployment workflow (Git → Vercel)

---

## 🚀 Next Steps

1. **Personalizează site-ul:**
   - Schimbă culorile
   - Adaugă propriile imagini
   - Modifică textele

2. **Adaugă funcționalități noi:**
   - Formular de contact
   - Sistem de rezervări
   - Blog cu articole

3. **Deploy și share:**
   - Pune site-ul live pe Vercel
   - Share link-ul cu prietenii
   - Adaugă în portofoliu

4. **Învață mai mult:**
   - React hooks (useState, useEffect)
   - API integration
   - Database (Supabase/Firebase)

---

## 📞 Resurse Utile

- **Next.js Docs:** [nextjs.org/docs](https://nextjs.org/docs)
- **Tailwind CSS:** [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **React Tutorial:** [react.dev/learn](https://react.dev/learn)
- **TypeScript Handbook:** [typescriptlang.org/docs](https://www.typescriptlang.org/docs/)
- **Unsplash (imagini gratuite):** [unsplash.com](https://unsplash.com)

---

**🎉 Felicitări! Ai construit primul tău site profesional!**

Continuă să exersezi, să experimentezi și să construiești. Fiecare proiect te face un developer mai bun! 💪

---

*Creat cu ❤️ pentru cursul Vibe Coding*
