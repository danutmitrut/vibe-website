# 🚀 Ghid Deployment - Vibe Coffee Website

## 📋 Cuprins
1. [Pre-requisite](#pre-requisite)
2. [Setup Local](#setup-local)
3. [Deployment pe Vercel](#deployment-pe-vercel)
4. [Configurare Domeniu Custom](#configurare-domeniu-custom)
5. [Troubleshooting](#troubleshooting)

---

## ✅ Pre-requisite

Înainte de deployment, asigură-te că ai:

- [ ] **Node.js** instalat (versiunea 18+)
- [ ] **Git** instalat
- [ ] **Cont GitHub** (gratuit)
- [ ] **Cont Vercel** (gratuit - sign up cu GitHub)

### Verificare versiuni:
```bash
node --version   # Trebuie să fie v18.0.0 sau mai nou
npm --version    # Trebuie să fie 9.0.0 sau mai nou
git --version    # Orice versiune recentă
```

---

## 💻 Setup Local

### 1. Clonează proiectul (dacă nu l-ai deja)

```bash
# Clonează repository-ul
git clone https://github.com/username/vibe-website.git
cd vibe-website
```

### 2. Instalează dependințele

```bash
npm install
```

**Așteptări:** Instalarea durează ~1-2 minute. Vei vedea:
```
added 234 packages, and audited 235 packages in 47s
```

### 3. Rulează local pentru testare

```bash
npm run dev
```

**Output așteptat:**
```
  ▲ Next.js 15.0.0
  - Local:        http://localhost:3000
  - Network:      http://192.168.1.100:3000

 ✓ Ready in 2.3s
```

**Testare:** Deschide [http://localhost:3000](http://localhost:3000) în browser

### 4. Build de producție (test local)

```bash
npm run build
```

**Output așteptat:**
```
Route (app)                              Size     First Load JS
┌ ○ /                                    5.2 kB         95.8 kB
├ ○ /locatie                             3.8 kB         94.4 kB
└ ○ /_not-found                          871 B          91.5 kB

○  (Static)  prerendered as static content

✓ Compiled successfully
```

**⚠️ Dacă vezi erori aici, NU deployment până le rezolvi!**

---

## 🚀 Deployment pe Vercel

### Pas 1: Pregătire Git Repository

#### A. Inițializează Git (dacă nu e deja)

```bash
git init
git add .
git commit -m "Initial commit - Vibe Coffee website ready for deployment"
```

#### B. Creează repository pe GitHub

1. Mergi pe [github.com/new](https://github.com/new)
2. Nume repository: `vibe-website`
3. Descriere: "Modern coffee shop website built with Next.js"
4. Vizibilitate: **Public** (pentru Vercel gratuit)
5. **NU** adăuga README, .gitignore sau license (le ai deja)
6. Click **"Create repository"**

#### C. Push codul pe GitHub

```bash
# Adaugă remote origin (înlocuiește USERNAME cu al tău)
git remote add origin https://github.com/USERNAME/vibe-website.git

# Push
git branch -M main
git push -u origin main
```

**Verificare:** Accesează `https://github.com/USERNAME/vibe-website` - vezi codul tău!

---

### Pas 2: Connect Vercel cu GitHub

1. **Mergi pe [vercel.com](https://vercel.com)**
2. Click **"Sign Up"** (dacă nu ai cont)
3. Selectează **"Continue with GitHub"**
4. Autorizează Vercel să acceseze GitHub-ul tău

---

### Pas 3: Import Project

1. În dashboard Vercel, click **"Add New Project"**
2. Selectează **"Import Git Repository"**
3. Găsește `vibe-website` în listă
4. Click **"Import"**

---

### Pas 4: Configure Project

**Framework Preset:** Next.js (detectat automat ✓)

**Root Directory:** `./` (default - lasă așa)

**Build Command:** `npm run build` (default ✓)

**Output Directory:** `.next` (default ✓)

**Environment Variables:** NONE (nu avem secrete)

**💡 Nu modifica nimic!** Setările default sunt perfecte.

---

### Pas 5: Deploy!

1. Click **"Deploy"**
2. Așteptare ~2-3 minute
3. **Deployment în progres:**
   ```
   Building... ████████████ 100%
   Deploying... ████████████ 100%
   ```

4. **Success!** Vei vedea:
   ```
   🎉 Congratulations! Your project is live!
   https://vibe-website-username.vercel.app
   ```

---

### Pas 6: Verificare Deployment

**Click pe URL-ul generat** → Site-ul tău e LIVE! 🎉

**Testează:**
- [ ] Homepage se încarcă corect
- [ ] Meniul afișează toate produsele
- [ ] Imaginile se încarcă
- [ ] Butonul "Vizitează-ne" duce la `/locatie`
- [ ] Pagina locație funcționează
- [ ] Design responsive pe telefon (F12 → Toggle device toolbar)

---

## 🌐 Configurare Domeniu Custom (Opțional)

### Dacă ai un domeniu propriu (ex: vibecoffee.ro)

1. În Vercel Dashboard → **Settings** → **Domains**
2. Click **"Add Domain"**
3. Introdu: `vibecoffee.ro`
4. Urmează instrucțiunile pentru configurare DNS

**Configurare DNS la provider-ul de domenii:**

| Type | Name | Value |
|------|------|-------|
| A | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

**Propagare:** 24-48 ore (de obicei ~2 ore)

---

## 🔄 Update-uri Viitoare

### Workflow simplu:

```bash
# 1. Faci modificări în cod
# 2. Testezi local
npm run dev

# 3. Commit & push
git add .
git commit -m "Update: [descriere schimbări]"
git push

# 4. Vercel deployment AUTOMAT! 🎉
# (în ~1 minut site-ul e updated)
```

**⚡ Auto-deployment** = orice push pe `main` → deploy automat!

---

## 🐛 Troubleshooting

### Eroare: "Build failed"

**Cauză:** Erori în cod (TypeScript, import greșit, etc.)

**Soluție:**
```bash
# Rulează local pentru a vedea eroarea
npm run build

# Rezolvă eroarea, apoi:
git add .
git commit -m "Fix build error"
git push
```

---

### Eroare: "Module not found"

**Cauză:** Dependință lipsă în `package.json`

**Soluție:**
```bash
# Reinstalează dependințele
rm -rf node_modules package-lock.json
npm install

# Commit updated package-lock.json
git add package-lock.json
git commit -m "Update dependencies"
git push
```

---

### Imaginile nu se încarcă

**Cauză:** URL-uri Unsplash blocate sau greșite

**Soluție:**
1. Verifică URL-ul în browser
2. Înlocuiește cu altă imagine Unsplash
3. Sau mută imaginile în `public/` folder

---

### Site-ul e lent

**Optimizări:**

1. **Comprimă imaginile:**
   - Folosește Unsplash cu `?w=800` (nu `?w=2000`)
   - Sau optimizează cu [tinypng.com](https://tinypng.com)

2. **Lazy loading imagini:**
   ```tsx
   <img src="..." loading="lazy" />
   ```

3. **Next.js Image component:**
   ```tsx
   import Image from 'next/image';

   <Image
     src="/cafea.jpg"
     width={800}
     height={600}
     alt="Cafea"
   />
   ```

---

### "This site can't be reached"

**Cauze posibile:**

1. **Deployment în curs** → Așteaptă 2-3 minute
2. **Domeniu configurat greșit** → Verifică DNS settings
3. **Vercel down** (rar) → Check [status.vercel.com](https://status.vercel.com)

---

## 📊 Monitorizare & Analytics

### Vercel Analytics (Gratuit!)

1. În Vercel Dashboard → **Analytics**
2. Enable Analytics
3. Adaugă snippet în `app/layout.tsx`:

```tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

**Acum vezi:**
- Vizitatori unici
- Page views
- Top pages
- Devices (mobile vs desktop)

---

## 🔒 Securitate & Best Practices

### 1. Environment Variables

**NU pune niciodată API keys în cod!** Folosește `.env.local`:

```bash
# .env.local (nu se push pe GitHub!)
NEXT_PUBLIC_API_KEY=your_api_key_here
```

**În Vercel:**
Settings → Environment Variables → Add

---

### 2. .gitignore

Asigură-te că `.env.local` e în `.gitignore`:

```
# .gitignore
.env.local
.env*.local
node_modules/
.next/
```

---

### 3. HTTPS

**Vercel oferă HTTPS gratuit automat!** ✓

Toate site-urile sunt:
- `https://` (nu `http://`)
- SSL certificate automat
- Renew automat

---

## 📈 Performance Tips

### 1. Next.js Image Optimization

```tsx
import Image from 'next/image';

// ✅ Optimizat automat
<Image
  src="/hero.jpg"
  width={1920}
  height={1080}
  priority  // Pentru hero image
/>

// ❌ NU optimizat
<img src="/hero.jpg" />
```

---

### 2. Font Optimization

**Deja implementat cu Geist fonts!**

```tsx
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({ subsets: ["latin"] });
```

---

### 3. Code Splitting

**Next.js face automat!** Fiecare pagină = bundle separat.

---

## 🎉 Success Checklist

- [ ] Build local merge (`npm run build`)
- [ ] Cod pushed pe GitHub
- [ ] Deployment Vercel reușit
- [ ] Site-ul funcționează (`https://vibe-website-username.vercel.app`)
- [ ] Toate paginile se încarcă
- [ ] Imaginile sunt vizibile
- [ ] Design responsive pe mobile
- [ ] Performance OK (< 3s load time)

---

## 📞 Support

**Dacă întâmpini probleme:**

1. **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
2. **Next.js Docs:** [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)
3. **Vercel Support:** [vercel.com/support](https://vercel.com/support)

---

**🚀 Site-ul tău e acum LIVE și accesibil din orice colț al lumii!**

Share link-ul cu prietenii, adaugă în CV/portofoliu, și fii mândru de munca ta! 💪

---

*Ghid creat pentru cursul Vibe Coding* ☕
