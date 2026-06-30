# Structura Site-ului (SITE_STRUCTURE) - BlankSpace

Acest document definește arhitectura informațională și structura de rutare pentru website-ul BlankSpace.

## 🗺️ Harta Site-ului (Sitemap & Rute)

Astro folosește rutarea bazată pe structura folderului `src/pages/`. Rutele planificate sunt:

| Rută | Fișier Pagina Astro | Descriere | Tip Componentă |
| :--- | :--- | :--- | :--- |
| `/` | `src/pages/index.astro` | Pagina principală (Home) | Hibrid (Astro + React UI) |
| `/servicii` | `src/pages/servicii/index.astro` | Serviciile oferite (Services) | Majoritar Static (Astro) |
| `/servicii/[slug]` | `src/pages/servicii/[slug].astro` | Detalii serviciu individual | Dinamic din Content Collection |
| `/portofoliu` | `src/pages/portofoliu/index.astro` | Studii de caz, proiecte anterioare | Hibrid cu filtre reactive (React) |
| `/portofoliu/[slug]`| `src/pages/portofoliu/[slug].astro`| Detalii proiect / studiu de caz | Dinamic din Content Collection |
| `/despre` | `src/pages/despre.astro` | Echipa, misiune, viziune (About) | Static (Astro) |
| `/contact` | `src/pages/contact.astro` | Formular de contact, detalii, hartă | Interactiv (React Form + Validation) |
| `/blog` | `src/pages/blog/index.astro` | Lista articole (Blog) | Dinamic (Astro) |
| `/blog/[slug]` | `src/pages/blog/[slug].astro` | Articol blog individual | Dinamic (Markdown/MDX) |

---

## 🏛️ Layout-uri Globale (`src/layouts/`)

Toate paginile folosesc layout-ul principal pentru consecvență structurală și stilistică:

1. **`BaseLayout.astro`:**
   - Gestionează tagurile `<head>`, structura HTML (`<!DOCTYPE html>`), setarea temei (dark/light), meta tag-urile dinamice pentru SEO.
   - Încarcă fișierul de stil global `src/styles/global.css`.
   - Conține structura standard de layout: `Header` (Navigation), `main` (conținut), și `Footer`.

---

## 🧩 Structura Componentelor (`src/components/`)

Componentele sunt împărțite în funcție de scopul și tehnologia lor:

### 1. Componente Globale / Structurale (Astro)
- `Header.astro` - Navigația principală cu suport pentru design premium și responsive.
- `Footer.astro` - Secțiunea de subsol cu linkuri utile, copyright și newsletter.
- `ThemeToggle.tsx` - Buton reactiv pentru schimbarea temei (dark/light).

### 2. Componente de Pagina (Section Components)
- **Home:**
  - `Hero.astro` - Prima secțiune cu impact vizual (branding BlankSpace).
  - `Features.astro` - Avantaje competitive.
  - `Stats.astro` - Statistici / cifre cheie în format premium.
  - `RecentWork.astro` - Carusel cu ultimele proiecte din portofoliu.
- **Portofoliu / Servicii:**
  - `PortfolioGrid.tsx` - Filtrare dinamică a proiectelor pe categorii (folosind React).
  - `ContactForm.tsx` - Formular interactiv cu validare (Zod + React Hook Form).

### 3. Componente atomice UI (`src/components/ui/`)
Sunt importate și administrate prin intermediul shadcn/ui. Exemple:
- `button.tsx` (deja instalat)
- `card.tsx`
- `input.tsx`, `textarea.tsx` (pentru contact)
- `dialog.tsx` (pentru ferestre modale)

---

## 📂 Gestionarea Conținutului (`src/content/`)

Conținutul dinamic este organizat prin **Astro Content Collections** cu scheme tipizate prin Zod în `src/content/config.ts`:

- `services/` - Fișiere markdown pentru descrierea serviciilor.
- `portfolio/` - Proiectele realizate (imagini, clienți, tehnologii utilizate).
- `blog/` - Articole informative scrise în Markdown/MDX.
