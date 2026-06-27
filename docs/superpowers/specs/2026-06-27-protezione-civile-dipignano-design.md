# Design: Sito Web Protezione Civile Dipignano

**Data:** 2026-06-27  
**Stack:** Next.js + React  
**Riferimento:** https://www.protezionecivilecalabria.it/

---

## Obiettivo

Sito istituzionale per il Gruppo Volontari Protezione Civile di Dipignano (CS). Presenta il gruppo alla comunità, incoraggia il volontariato e fornisce informazioni di contatto.

---

## Navigazione

Menu principale con 4 voci:
- **Home**
- **Volontariato**
- **Chi Siamo**
- **Contatti**

---

## Design System

| Elemento | Valore |
|---|---|
| Colore primario | `#cc2200` (rosso protezione civile) |
| Colore navbar (post-scroll) | `#1a1a2e` (blu notte) |
| Navbar iniziale | Trasparente |
| Font | Sistema (sans-serif) — decidere in implementazione |
| Hero background | Foto reale (da Facebook) con overlay scuro |

---

## Pagine

### Home (`/`)

1. **Navbar** — trasparente al caricamento, diventa `#1a1a2e` solida dopo 80px di scroll. Logo + voci menu a destra. Su mobile: hamburger menu.

2. **Hero** — full-screen (100vh). Background: foto del gruppo/attività con overlay `rgba(0,0,0,0.5)`. Centrato verticalmente:
   - Titolo grande: *"Pronti quando serve. Vicini alla comunità."*
   - Sottotitolo: *"Gruppo Volontari Protezione Civile · Dipignano (CS)"*
   - Due CTA: `DIVENTA VOLONTARIO` (rosso pieno) + `CHI SIAMO` (outline bianco)

3. **4 accessi rapidi** — griglia 4 colonne sotto l'hero:
   - 🚒 Missione → ancora alla sezione Chi Siamo
   - 📸 Galleria → pagina o sezione galleria
   - 📋 Unisciti → pagina Volontariato (sfondo rosso, evidenziato)
   - 📞 Contatti → pagina Contatti

4. **Sezione Chi Siamo** — due colonne: testo a sinistra, foto a destra.
   - Testo: presentazione breve del gruppo
   - CTA: "Scopri di più →" → link a `/chi-siamo`

5. **Footer** — sfondo `#1a1a2e`, logo + link Facebook + email

---

### Volontariato (`/volontariato`)

Pagina dedicata a chi vuole unirsi al gruppo:
- Come diventare volontario (requisiti, iter)
- Modulo di contatto o link al form ufficiale
- Foto attività dai social

### Chi Siamo (`/chi-siamo`)

- Storia e missione del gruppo
- Foto dei volontari / attività
- Eventuali loghi/affiliazioni (DPC, Regione Calabria)

### Contatti (`/contatti`)

- Email / telefono
- Indirizzo sede (se disponibile)
- Form di contatto semplice (nome, email, messaggio)
- Link Facebook

---

## Foto

Fonte: pagina Facebook https://www.facebook.com/profile.php?id=61576957454527  
Le immagini vengono scaricate manualmente e inserite in `/public/images/`.  
Hero: foto ad alta risoluzione del gruppo o di un'attività sul campo.

---

## Stack Tecnico

- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS
- **Animazioni:** scroll-based per navbar (vanilla JS / IntersectionObserver)
- **Deploy:** Vercel (consigliato) o hosting statico
- **Immagini:** `next/image` con ottimizzazione automatica

---

## Struttura File

```
/app
  /page.tsx              # Home
  /volontariato/page.tsx
  /chi-siamo/page.tsx
  /contatti/page.tsx
  /layout.tsx            # Navbar + Footer condivisi
/components
  /Navbar.tsx
  /Hero.tsx
  /QuickAccess.tsx
  /ChiSiamoSection.tsx
  /Footer.tsx
/public/images/          # Foto da Facebook
```

---

## Fuori Scope

- CMS / gestione contenuti dinamica
- Mappa allerta meteo
- Area riservata volontari
- Multilingua
