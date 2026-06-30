# Strategia de Conținut (CONTENT) - BlankSpace

Acest document structurează conținutul textual și media pentru website-ul BlankSpace, definind ghidul de ton, mesajele cheie și modelul de conținut pentru colecții.

## 🗣️ Ghidul de Ton (Tone of Voice)

Tonul comunicării pe BlankSpace este:
- **Profesionist & Autoritar:** Transmite încredere, experiență și expertiză tehnică.
- **Minimalist & Clar:** Evită jargonul excesiv și cuvintele de umplutură. Mesajul trebuie să fie direct și de impact.
- **Inovator & Modern:** Reflectă utilizarea tehnologiilor de vârf și a soluțiilor de ultimă generație.

---

## 🔑 Mesaje Cheie pe Pagini

### 1. Pagina Principală (Home)
- **Titlu principal (Hero):** „Ideile tale prind contur în spațiul nostru.” sau „BlankSpace. Spațiul în care tehnologia întâlnește excelența vizuală.”
- **Subtitlu:** „Construim soluții digitale premium, optimizate pentru performanță extremă și design impecabil.”
- **Call-to-Action (CTA):** „Începe un Proiect” (link spre `/contact`) și „Vezi Portofoliul” (link spre `/portofoliu`).

### 2. Pagina Despre (About)
- **Mesaj principal:** „Cine suntem”
- **Misiune:** „Să transformăm complexitatea în simplitate prin cod curat, design elegant și performanță de neegalat.”
- **Valori:** Calitate fără compromis, transparență totală, inovație continuă.

---

## 📂 Modele de Conținut (Content Collections Schemas)

Pentru a asigura integritatea datelor în Astro, vom defini următoarele modele în `src/content/config.ts`:

### A. Colecția `Servicii` (`src/content/services/`)
Fiecare serviciu este descris într-un fișier Markdown cu structura de metadate:
```yaml
title: "Dezvoltare Web Custom"
description: "Aplicații web performante adaptate nevoilor tale de afaceri."
icon: "code"
order: 1
---
# Conținutul detaliat al serviciului
Aici descriem în detaliu procesul de dezvoltare custom...
```

### B. Colecția `Portofoliu` (`src/content/portfolio/`)
Fiecare studiu de caz va conține:
```yaml
title: "Platformă E-Commerce BlankSpace"
client: "Client SRL"
category: "E-Commerce"
launchDate: "2026-05-15"
heroImage: "/images/portfolio/ecommerce.jpg"
tags: ["Next.js", "TailwindCSS", "Stripe"]
featured: true
---
# Despre proiect
Descrierea detaliată a proiectului, provocări, soluția BlankSpace și rezultatele obținute...
```

### C. Colecția `Blog` (`src/content/blog/`)
Articole pentru educația clienților și autoritate în SEO:
```yaml
title: "De ce performanța web este crucială în 2026"
publishDate: "2026-06-30"
author: "Echipa BlankSpace"
description: "Cum afectează timpul de încărcare rata de conversie și clasarea SEO."
image: "/images/blog/performance.jpg"
tags: ["Performanță", "SEO", "Astro"]
draft: false
---
# Conținutul articolului...
```
