# Sito Protezione Civile Dipignano — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Sito istituzionale Next.js per il Gruppo Volontari Protezione Civile di Dipignano con 4 pagine (Home, Volontariato, Chi Siamo, Contatti), navbar scroll-aware e hero full-screen con foto.

**Architecture:** App Router Next.js 14. Componenti React separati per Navbar, Hero, QuickAccess, ChiSiamoSection, Footer. Navbar usa IntersectionObserver per transizione trasparente → blu notte. Nessun CMS — contenuti statici hardcoded nei componenti.

**Tech Stack:** Next.js 14, React 18, TypeScript, Tailwind CSS 3, Jest, React Testing Library

---

## File Map

| File | Responsabilità |
|---|---|
| `app/layout.tsx` | Root layout — monta Navbar + Footer, font globals |
| `app/page.tsx` | Home: Hero + QuickAccess + ChiSiamoSection |
| `app/volontariato/page.tsx` | Pagina Volontariato |
| `app/chi-siamo/page.tsx` | Pagina Chi Siamo |
| `app/contatti/page.tsx` | Pagina Contatti con form |
| `app/globals.css` | Tailwind directives + stili base |
| `components/Navbar.tsx` | Navbar con scroll listener |
| `components/Hero.tsx` | Hero full-screen con immagine + overlay |
| `components/QuickAccess.tsx` | Griglia 4 accessi rapidi |
| `components/ChiSiamoSection.tsx` | Sezione 2 colonne testo + foto |
| `components/Footer.tsx` | Footer blu notte |
| `components/ContactForm.tsx` | Form contatti (nome, email, messaggio) |
| `public/images/hero.jpg` | Foto hero (aggiungere manualmente da Facebook) |
| `public/images/chi-siamo.jpg` | Foto sezione chi siamo |
| `tailwind.config.ts` | Colori custom (rosso, blu notte) |
| `__tests__/Navbar.test.tsx` | Test scroll behavior |
| `__tests__/ContactForm.test.tsx` | Test validazione form |

---

## Task 1: Scaffolding progetto Next.js

**Files:**
- Create: `package.json`, `tailwind.config.ts`, `app/globals.css`, `app/layout.tsx`

- [ ] **Step 1: Crea progetto Next.js**

```bash
cd "/Users/lorenzocuria/Projects/protezione civile"
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*"
```

Quando chiede conferma per installare in directory non vuota (ha già `docs/`): digita `y`.

- [ ] **Step 2: Verifica struttura creata**

```bash
ls -la "/Users/lorenzocuria/Projects/protezione civile"
```

Atteso: `app/`, `components/` (vuota), `public/`, `package.json`, `tailwind.config.ts`, `next.config.ts`.

- [ ] **Step 3: Aggiungi colori custom in `tailwind.config.ts`**

Sostituisci il contenuto di `tailwind.config.ts` con:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "pc-red": "#cc2200",
        "pc-navy": "#1a1a2e",
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 4: Aggiorna `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}
```

- [ ] **Step 5: Crea cartelle necessarie**

```bash
mkdir -p "/Users/lorenzocuria/Projects/protezione civile/components"
mkdir -p "/Users/lorenzocuria/Projects/protezione civile/__tests__"
mkdir -p "/Users/lorenzocuria/Projects/protezione civile/public/images"
mkdir -p "/Users/lorenzocuria/Projects/protezione civile/app/volontariato"
mkdir -p "/Users/lorenzocuria/Projects/protezione civile/app/chi-siamo"
mkdir -p "/Users/lorenzocuria/Projects/protezione civile/app/contatti"
```

- [ ] **Step 6: Installa dipendenze test**

```bash
cd "/Users/lorenzocuria/Projects/protezione civile"
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom ts-jest @types/jest
```

- [ ] **Step 7: Configura Jest — crea `jest.config.ts`**

```typescript
import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "./" });

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterFramework: ["<rootDir>/jest.setup.ts"],
};

export default createJestConfig(config);
```

- [ ] **Step 8: Crea `jest.setup.ts`**

```typescript
import "@testing-library/jest-dom";
```

- [ ] **Step 9: Aggiungi script test in `package.json`**

Apri `package.json` e aggiungi in `"scripts"`:

```json
"test": "jest",
"test:watch": "jest --watch"
```

- [ ] **Step 10: Aggiungi immagini placeholder**

Metti due foto (hero.jpg e chi-siamo.jpg) in `public/images/`. Se non hai ancora le foto da Facebook, usa immagini temporanee:

```bash
curl -o "/Users/lorenzocuria/Projects/protezione civile/public/images/hero.jpg" \
  "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1920&q=80"
curl -o "/Users/lorenzocuria/Projects/protezione civile/public/images/chi-siamo.jpg" \
  "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&q=80"
```

Sostituirle con le foto reali di Dipignano quando disponibili.

- [ ] **Step 11: Commit**

```bash
cd "/Users/lorenzocuria/Projects/protezione civile"
git init
git add -A
git commit -m "feat: scaffold Next.js project with Tailwind and Jest"
```

---

## Task 2: Componente Navbar

**Files:**
- Create: `components/Navbar.tsx`
- Test: `__tests__/Navbar.test.tsx`

- [ ] **Step 1: Scrivi test Navbar**

Crea `__tests__/Navbar.test.tsx`:

```typescript
import { render, screen, fireEvent, act } from "@testing-library/react";
import Navbar from "@/components/Navbar";

// Mock next/link
jest.mock("next/link", () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
  MockLink.displayName = "MockLink";
  return MockLink;
});

describe("Navbar", () => {
  beforeEach(() => {
    Object.defineProperty(window, "scrollY", { writable: true, value: 0 });
  });

  it("renders logo and all nav links", () => {
    render(<Navbar />);
    expect(screen.getByText(/PROTEZIONE CIVILE DIPIGNANO/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /volontariato/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /chi siamo/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /contatti/i })).toBeInTheDocument();
  });

  it("starts transparent (no bg-pc-navy class)", () => {
    render(<Navbar />);
    const nav = screen.getByRole("navigation");
    expect(nav.className).not.toMatch(/bg-pc-navy/);
  });

  it("becomes solid after scroll past 80px", () => {
    render(<Navbar />);
    act(() => {
      Object.defineProperty(window, "scrollY", { writable: true, value: 100 });
      window.dispatchEvent(new Event("scroll"));
    });
    const nav = screen.getByRole("navigation");
    expect(nav.className).toMatch(/bg-pc-navy/);
  });
});
```

- [ ] **Step 2: Esegui test — verifica che falliscano**

```bash
cd "/Users/lorenzocuria/Projects/protezione civile"
npx jest __tests__/Navbar.test.tsx --no-coverage
```

Atteso: FAIL — "Cannot find module '@/components/Navbar'"

- [ ] **Step 3: Implementa `components/Navbar.tsx`**

```typescript
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/volontariato", label: "Volontariato" },
  { href: "/chi-siamo", label: "Chi Siamo" },
  { href: "/contatti", label: "Contatti" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-pc-navy shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-white font-bold text-sm flex items-center gap-2">
          <span className="text-xl">🔺</span>
          PROTEZIONE CIVILE DIPIGNANO
        </Link>
        <ul className="hidden md:flex gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-white text-sm hover:text-pc-red transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        {/* Mobile hamburger — solo visual, no JS per ora */}
        <button className="md:hidden text-white text-2xl" aria-label="Menu">
          ☰
        </button>
      </div>
    </nav>
  );
}
```

- [ ] **Step 4: Esegui test — verifica che passino**

```bash
cd "/Users/lorenzocuria/Projects/protezione civile"
npx jest __tests__/Navbar.test.tsx --no-coverage
```

Atteso: PASS (3 tests)

- [ ] **Step 5: Commit**

```bash
git add components/Navbar.tsx __tests__/Navbar.test.tsx
git commit -m "feat: add Navbar component with scroll-aware transparency"
```

---

## Task 3: Componente Hero

**Files:**
- Create: `components/Hero.tsx`

- [ ] **Step 1: Implementa `components/Hero.tsx`**

```typescript
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      {/* Immagine di sfondo */}
      <Image
        src="/images/hero.jpg"
        alt="Protezione Civile Dipignano"
        fill
        className="object-cover"
        priority
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55" />
      {/* Contenuto */}
      <div className="relative z-10 px-6 max-w-3xl">
        <h1 className="text-white text-4xl md:text-6xl font-bold leading-tight drop-shadow-lg">
          Pronti quando serve.<br />Vicini alla comunità.
        </h1>
        <p className="text-white/80 mt-4 text-lg">
          Gruppo Volontari Protezione Civile · Dipignano (CS)
        </p>
        <div className="flex gap-4 justify-center mt-8 flex-wrap">
          <Link
            href="/volontariato"
            className="bg-pc-red text-white font-bold px-8 py-3 rounded hover:bg-red-800 transition-colors"
          >
            DIVENTA VOLONTARIO
          </Link>
          <Link
            href="/chi-siamo"
            className="border border-white text-white font-bold px-8 py-3 rounded hover:bg-white/10 transition-colors"
          >
            CHI SIAMO
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verifica render locale**

```bash
cd "/Users/lorenzocuria/Projects/protezione civile"
npm run dev
```

Apri http://localhost:3000. Atteso: hero full-screen con foto, overlay scuro, testo e CTA centrati.

- [ ] **Step 3: Commit**

```bash
git add components/Hero.tsx
git commit -m "feat: add Hero component with full-screen image and overlay"
```

---

## Task 4: Componente QuickAccess

**Files:**
- Create: `components/QuickAccess.tsx`

- [ ] **Step 1: Implementa `components/QuickAccess.tsx`**

```typescript
import Link from "next/link";

const items = [
  { icon: "🚒", label: "Missione", sub: "Cosa facciamo", href: "/chi-siamo", highlight: false },
  { icon: "📸", label: "Galleria", sub: "Le nostre attività", href: "/chi-siamo#galleria", highlight: false },
  { icon: "📋", label: "Unisciti", sub: "Diventa volontario", href: "/volontariato", highlight: true },
  { icon: "📞", label: "Contatti", sub: "Scrivici", href: "/contatti", highlight: false },
];

export default function QuickAccess() {
  return (
    <section className="grid grid-cols-2 md:grid-cols-4">
      {items.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className={`flex flex-col items-center justify-center py-8 gap-2 transition-opacity hover:opacity-80 ${
            item.highlight ? "bg-pc-red text-white" : "bg-gray-100 text-pc-navy"
          }`}
        >
          <span className="text-3xl">{item.icon}</span>
          <span className="font-bold text-sm">{item.label}</span>
          <span className={`text-xs ${item.highlight ? "text-white/80" : "text-gray-500"}`}>
            {item.sub}
          </span>
        </Link>
      ))}
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/QuickAccess.tsx
git commit -m "feat: add QuickAccess 4-grid component"
```

---

## Task 5: Componente ChiSiamoSection

**Files:**
- Create: `components/ChiSiamoSection.tsx`

- [ ] **Step 1: Implementa `components/ChiSiamoSection.tsx`**

```typescript
import Image from "next/image";
import Link from "next/link";

export default function ChiSiamoSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-pc-red font-bold text-xs tracking-widest uppercase">
            Chi Siamo
          </span>
          <h2 className="text-3xl font-bold text-pc-navy mt-2">
            Il Gruppo di Dipignano
          </h2>
          <p className="text-gray-600 mt-4 leading-relaxed">
            Siamo un gruppo di volontari della Protezione Civile attivo nel comune di
            Dipignano, in provincia di Cosenza. Collaboriamo con le istituzioni locali
            per garantire sicurezza e assistenza alla comunità in situazioni di emergenza
            e durante eventi pubblici.
          </p>
          <p className="text-gray-600 mt-3 leading-relaxed">
            Il nostro impegno nasce dalla passione per il territorio e dalla volontà di
            essere presenti quando la comunità ha più bisogno.
          </p>
          <Link
            href="/chi-siamo"
            className="inline-block mt-6 bg-pc-navy text-white px-6 py-3 rounded hover:bg-blue-950 transition-colors"
          >
            Scopri di più →
          </Link>
        </div>
        <div className="relative h-72 md:h-96 rounded-lg overflow-hidden shadow-lg">
          <Image
            src="/images/chi-siamo.jpg"
            alt="Volontari Protezione Civile Dipignano"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ChiSiamoSection.tsx
git commit -m "feat: add ChiSiamoSection component"
```

---

## Task 6: Componente Footer

**Files:**
- Create: `components/Footer.tsx`

- [ ] **Step 1: Implementa `components/Footer.tsx`**

```typescript
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-pc-navy text-white">
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 font-bold text-sm">
            <span className="text-xl">🔺</span>
            PROTEZIONE CIVILE DIPIGNANO
          </div>
          <p className="text-white/60 text-sm mt-3">
            Gruppo Volontari della Protezione Civile<br />
            Comune di Dipignano (CS)
          </p>
        </div>
        <div>
          <h3 className="font-bold text-sm mb-4">Navigazione</h3>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link href="/volontariato" className="hover:text-white transition-colors">Volontariato</Link></li>
            <li><Link href="/chi-siamo" className="hover:text-white transition-colors">Chi Siamo</Link></li>
            <li><Link href="/contatti" className="hover:text-white transition-colors">Contatti</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-sm mb-4">Contatti</h3>
          <ul className="space-y-2 text-sm text-white/70">
            <li>
              <a
                href="https://www.facebook.com/profile.php?id=61576957454527"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                📘 Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 text-center text-xs text-white/40 py-4">
        © {new Date().getFullYear()} Protezione Civile Dipignano
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Footer.tsx
git commit -m "feat: add Footer component"
```

---

## Task 7: Root Layout e Homepage

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Aggiorna `app/layout.tsx`**

```typescript
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Protezione Civile Dipignano",
  description: "Gruppo Volontari Protezione Civile del Comune di Dipignano (CS)",
  openGraph: {
    title: "Protezione Civile Dipignano",
    description: "Gruppo Volontari Protezione Civile del Comune di Dipignano (CS)",
    locale: "it_IT",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Aggiorna `app/page.tsx`**

```typescript
import Hero from "@/components/Hero";
import QuickAccess from "@/components/QuickAccess";
import ChiSiamoSection from "@/components/ChiSiamoSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickAccess />
      <ChiSiamoSection />
    </>
  );
}
```

- [ ] **Step 3: Verifica homepage completa**

```bash
cd "/Users/lorenzocuria/Projects/protezione civile"
npm run dev
```

Apri http://localhost:3000. Verifica:
- Navbar trasparente sopra la foto hero
- Scroll down: navbar diventa blu notte
- 4 blocchi accessi rapidi sotto hero (Unisciti in rosso)
- Sezione Chi Siamo con testo + foto
- Footer blu notte

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx app/page.tsx
git commit -m "feat: assemble homepage with all sections"
```

---

## Task 8: Pagina Volontariato

**Files:**
- Create: `app/volontariato/page.tsx`

- [ ] **Step 1: Crea `app/volontariato/page.tsx`**

```typescript
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Volontariato — Protezione Civile Dipignano",
  description: "Diventa volontario della Protezione Civile di Dipignano",
};

export default function VolontariatoPage() {
  return (
    <>
      {/* Hero mini */}
      <section className="bg-pc-navy pt-32 pb-16 text-center">
        <h1 className="text-white text-4xl font-bold">Diventa Volontario</h1>
        <p className="text-white/70 mt-3">
          Unisciti al gruppo e aiuta la comunità di Dipignano
        </p>
      </section>

      {/* Contenuto */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-pc-navy mb-6">
            Come diventare volontario
          </h2>
          <div className="space-y-6 text-gray-600 leading-relaxed">
            <div className="flex gap-4">
              <span className="text-pc-red font-bold text-xl">01</span>
              <div>
                <h3 className="font-bold text-pc-navy">Requisiti</h3>
                <p className="mt-1">
                  Avere almeno 18 anni, residenza o domicilio nel comune di Dipignano
                  o nei comuni limitrofi. Nessuna esperienza pregressa necessaria —
                  la formazione è fornita dal gruppo.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-pc-red font-bold text-xl">02</span>
              <div>
                <h3 className="font-bold text-pc-navy">Candidatura</h3>
                <p className="mt-1">
                  Contattaci tramite la pagina{" "}
                  <Link href="/contatti" className="text-pc-red hover:underline">
                    Contatti
                  </Link>{" "}
                  oppure scrivici direttamente su Facebook. Ti risponderemo al più presto.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-pc-red font-bold text-xl">03</span>
              <div>
                <h3 className="font-bold text-pc-navy">Formazione</h3>
                <p className="mt-1">
                  I nuovi volontari partecipano a corsi di formazione base organizzati
                  dalla Protezione Civile della Regione Calabria e da enti accreditati.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 p-6 bg-pc-navy rounded-lg text-center">
            <p className="text-white font-bold text-lg">Pronto ad unirti a noi?</p>
            <p className="text-white/70 mt-2 text-sm">Scrivici subito — risponderemo entro 48 ore</p>
            <Link
              href="/contatti"
              className="inline-block mt-4 bg-pc-red text-white font-bold px-8 py-3 rounded hover:bg-red-800 transition-colors"
            >
              CONTATTACI
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Verifica pagina**

Apri http://localhost:3000/volontariato. Atteso: sezione header blu notte, 3 step numerati, CTA finale.

- [ ] **Step 3: Commit**

```bash
git add app/volontariato/page.tsx
git commit -m "feat: add Volontariato page"
```

---

## Task 9: Pagina Chi Siamo

**Files:**
- Create: `app/chi-siamo/page.tsx`

- [ ] **Step 1: Crea `app/chi-siamo/page.tsx`**

```typescript
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Chi Siamo — Protezione Civile Dipignano",
  description: "Il gruppo volontari della Protezione Civile di Dipignano",
};

export default function ChiSiamoPage() {
  return (
    <>
      {/* Hero mini */}
      <section className="bg-pc-navy pt-32 pb-16 text-center">
        <h1 className="text-white text-4xl font-bold">Chi Siamo</h1>
        <p className="text-white/70 mt-3">
          Il Gruppo Volontari Protezione Civile di Dipignano
        </p>
      </section>

      {/* Storia e missione */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-start">
          <div>
            <span className="text-pc-red font-bold text-xs tracking-widest uppercase">
              La nostra storia
            </span>
            <h2 className="text-3xl font-bold text-pc-navy mt-2">
              Nati per servire la comunità
            </h2>
            <p className="text-gray-600 mt-4 leading-relaxed">
              Il gruppo di Protezione Civile di Dipignano è attivo nel territorio
              comunale con l&apos;obiettivo di supportare le istituzioni locali in situazioni
              di emergenza, prevenzione dei rischi e assistenza alla popolazione.
            </p>
            <p className="text-gray-600 mt-3 leading-relaxed">
              I volontari del gruppo sono formati e operativi per interventi in caso di
              calamità naturali, eventi di pubblica utilità e attività di protezione
              del territorio.
            </p>
            <p className="text-gray-600 mt-3 leading-relaxed">
              Il gruppo opera in coordinamento con la Protezione Civile della Regione
              Calabria e il Dipartimento Nazionale della Protezione Civile.
            </p>
          </div>
          <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/images/chi-siamo.jpg"
              alt="Volontari in attività"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Missione valori */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-pc-navy text-center mb-12">
            I nostri valori
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "🤝", title: "Solidarietà", text: "Siamo presenti per la comunità nei momenti di difficoltà, senza distinzioni." },
              { icon: "⚡", title: "Prontezza", text: "Formazione continua e organizzazione per rispondere rapidamente alle emergenze." },
              { icon: "🏔️", title: "Territorio", text: "Conosciamo il territorio di Dipignano e lavoriamo per proteggerlo." },
            ].map((v) => (
              <div key={v.title} className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="text-4xl">{v.icon}</div>
                <h3 className="font-bold text-pc-navy mt-3">{v.title}</h3>
                <p className="text-gray-600 text-sm mt-2 leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Verifica pagina**

Apri http://localhost:3000/chi-siamo. Atteso: header blu, sezione storia 2 colonne, 3 card valori.

- [ ] **Step 3: Commit**

```bash
git add app/chi-siamo/page.tsx
git commit -m "feat: add Chi Siamo page"
```

---

## Task 10: Componente ContactForm + Pagina Contatti

**Files:**
- Create: `components/ContactForm.tsx`
- Create: `app/contatti/page.tsx`
- Test: `__tests__/ContactForm.test.tsx`

- [ ] **Step 1: Scrivi test ContactForm**

Crea `__tests__/ContactForm.test.tsx`:

```typescript
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from "@/components/ContactForm";

describe("ContactForm", () => {
  it("renders all fields and submit button", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/messaggio/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /invia/i })).toBeInTheDocument();
  });

  it("shows validation errors on empty submit", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.click(screen.getByRole("button", { name: /invia/i }));
    expect(await screen.findByText(/nome obbligatorio/i)).toBeInTheDocument();
    expect(screen.getByText(/email obbligatoria/i)).toBeInTheDocument();
    expect(screen.getByText(/messaggio obbligatorio/i)).toBeInTheDocument();
  });

  it("shows success message after valid submit", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.type(screen.getByLabelText(/nome/i), "Mario Rossi");
    await user.type(screen.getByLabelText(/email/i), "mario@test.it");
    await user.type(screen.getByLabelText(/messaggio/i), "Vorrei diventare volontario");
    await user.click(screen.getByRole("button", { name: /invia/i }));
    expect(await screen.findByText(/messaggio inviato/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Esegui test — verifica che falliscano**

```bash
cd "/Users/lorenzocuria/Projects/protezione civile"
npx jest __tests__/ContactForm.test.tsx --no-coverage
```

Atteso: FAIL — "Cannot find module '@/components/ContactForm'"

- [ ] **Step 3: Implementa `components/ContactForm.tsx`**

```typescript
"use client";

import { useState } from "react";

type FormState = { nome: string; email: string; messaggio: string };
type Errors = Partial<FormState>;

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({ nome: "", email: "", messaggio: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(): Errors {
    const e: Errors = {};
    if (!form.nome.trim()) e.nome = "Nome obbligatorio";
    if (!form.email.trim()) e.email = "Email obbligatoria";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Email non valida";
    if (!form.messaggio.trim()) e.messaggio = "Messaggio obbligatorio";
    return e;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    // In produzione: invia a un API route o servizio email
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <div className="text-4xl">✅</div>
        <h3 className="text-green-800 font-bold mt-3">Messaggio inviato!</h3>
        <p className="text-green-700 text-sm mt-2">
          Ti risponderemo entro 48 ore.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div>
        <label htmlFor="nome" className="block text-sm font-bold text-pc-navy mb-1">
          Nome *
        </label>
        <input
          id="nome"
          type="text"
          value={form.nome}
          onChange={(e) => setForm({ ...form, nome: e.target.value })}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-pc-red"
          placeholder="Il tuo nome"
        />
        {errors.nome && <p className="text-pc-red text-xs mt-1">{errors.nome}</p>}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-bold text-pc-navy mb-1">
          Email *
        </label>
        <input
          id="email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-pc-red"
          placeholder="la-tua@email.it"
        />
        {errors.email && <p className="text-pc-red text-xs mt-1">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="messaggio" className="block text-sm font-bold text-pc-navy mb-1">
          Messaggio *
        </label>
        <textarea
          id="messaggio"
          rows={5}
          value={form.messaggio}
          onChange={(e) => setForm({ ...form, messaggio: e.target.value })}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-pc-red resize-none"
          placeholder="Scrivi il tuo messaggio..."
        />
        {errors.messaggio && <p className="text-pc-red text-xs mt-1">{errors.messaggio}</p>}
      </div>
      <button
        type="submit"
        className="w-full bg-pc-red text-white font-bold py-3 rounded hover:bg-red-800 transition-colors"
      >
        INVIA MESSAGGIO
      </button>
    </form>
  );
}
```

- [ ] **Step 4: Esegui test — verifica che passino**

```bash
cd "/Users/lorenzocuria/Projects/protezione civile"
npx jest __tests__/ContactForm.test.tsx --no-coverage
```

Atteso: PASS (3 tests)

- [ ] **Step 5: Crea `app/contatti/page.tsx`**

```typescript
import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contatti — Protezione Civile Dipignano",
  description: "Contatta il gruppo Protezione Civile di Dipignano",
};

export default function ContattiPage() {
  return (
    <>
      <section className="bg-pc-navy pt-32 pb-16 text-center">
        <h1 className="text-white text-4xl font-bold">Contatti</h1>
        <p className="text-white/70 mt-3">Siamo a tua disposizione</p>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-16">
          {/* Info */}
          <div>
            <h2 className="text-2xl font-bold text-pc-navy mb-6">Dove siamo</h2>
            <ul className="space-y-4 text-gray-600">
              <li className="flex gap-3">
                <span className="text-pc-red text-xl">📍</span>
                <div>
                  <span className="font-bold text-pc-navy block">Sede</span>
                  Comune di Dipignano (CS), Calabria
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-pc-red text-xl">📘</span>
                <div>
                  <span className="font-bold text-pc-navy block">Facebook</span>
                  <a
                    href="https://www.facebook.com/profile.php?id=61576957454527"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pc-red hover:underline"
                  >
                    Protezione Civile Dipignano
                  </a>
                </div>
              </li>
            </ul>
          </div>
          {/* Form */}
          <div>
            <h2 className="text-2xl font-bold text-pc-navy mb-6">Scrivici</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 6: Verifica pagina**

Apri http://localhost:3000/contatti. Verifica: form con validazione, info contatti a sinistra.

- [ ] **Step 7: Esegui tutti i test**

```bash
cd "/Users/lorenzocuria/Projects/protezione civile"
npx jest --no-coverage
```

Atteso: PASS (6 tests totali)

- [ ] **Step 8: Commit**

```bash
git add components/ContactForm.tsx app/contatti/page.tsx __tests__/ContactForm.test.tsx
git commit -m "feat: add ContactForm component and Contatti page"
```

---

## Task 11: Build finale e verifica

**Files:** nessun file nuovo

- [ ] **Step 1: Build di produzione**

```bash
cd "/Users/lorenzocuria/Projects/protezione civile"
npm run build
```

Atteso: build completata senza errori TypeScript o ESLint. Se ci sono warning su immagini (`<img>` vs `next/image`), vanno corretti.

- [ ] **Step 2: Avvia in modalità produzione**

```bash
npm run start
```

Apri http://localhost:3000. Testa tutte e 4 le pagine: Home, Volontariato, Chi Siamo, Contatti.

- [ ] **Step 3: Sostituisci immagini placeholder con foto reali**

Scarica le foto dalla pagina Facebook (https://www.facebook.com/profile.php?id=61576957454527&sk=photos) e sostituisci:
- `public/images/hero.jpg` → foto ad alta risoluzione del gruppo o di un'attività
- `public/images/chi-siamo.jpg` → foto dei volontari

Dopo sostituzione, riavvia dev server e verifica che le immagini si carichino correttamente.

- [ ] **Step 4: Commit finale**

```bash
git add -A
git commit -m "feat: complete site with all 4 pages — ready for deploy"
```

---

## Note Deploy (Vercel — consigliato)

```bash
npm install -g vercel
vercel
```

Segui le istruzioni. Il sito sarà live su `*.vercel.app` in ~2 minuti. Dominio custom configurabile dal dashboard Vercel.
