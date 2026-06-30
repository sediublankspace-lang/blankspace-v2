# Proiect: BlankSpace

**BlankSpace** este un website de prezentare profesional, modern și extrem de performant, construit pe o infrastructură modernă. Scopul proiectului este de a oferi o experiență vizuală premium, cu animații fluide, timp de încărcare ultra-rapid și un design curat.

## 🛠️ Stack Tehnologic

- **Framework principal:** [Astro v7+](https://astro.build/) (optimizat pentru viteză și SEO)
- **Motor de randare/interactivitate:** [React v19](https://react.dev/) (pentru componente interactive complexe)
- **Stilizare:** [Tailwind CSS v4](https://tailwindcss.com/) (vite-plugin nativ, CSS-first, performanțe superioare)
- **Componente UI:** [shadcn/ui](https://ui.shadcn.com/) (Radix UI + Lucide Icons)
- **Host / Deployment:** [Cloudflare Pages](https://pages.cloudflare.com/) (folosind adaptorul oficial `@astrojs/cloudflare` pentru SSR/Edge rendering)
- **Managementul conținutului:** Astro Content Collections (markdown cu tipizare puternică prin Zod)

---

## 📂 Structura Proiectului

```
/
├── .vscode/                 # Configurări IDE
├── docs/                    # Documentație de proiect și design
├── public/                  # Documente statice, logo-uri, favicon
├── src/
│   ├── components/          # Componente reutilizabile Astro/React
│   │   └── ui/              # Componente de bază shadcn/ui (button, dialog, etc.)
│   ├── content/             # Conținut administrat (articole, portofoliu, servicii)
│   ├── layouts/             # Layout-uri globale ale paginilor
│   ├── lib/                 # Utilitare și funcții ajutătoare (ex. cn pentru tailwind-merge)
│   ├── pages/               # Paginile fizice (rutarea bazată pe fișiere)
│   └── styles/              # Stile globale (global.css cu variabile Tailwind v4)
├── astro.config.mjs         # Configurarea principală Astro & Vite
├── components.json          # Configurația shadcn/ui
├── package.json             # Dependențe și scripturi npm
├── tsconfig.json            # Configurația TypeScript & path alias (@/*)
└── wrangler.jsonc           # Configurația Cloudflare Pages / Wrangler
```

---

## 🚀 Comenzi Utile

Pentru a rula și dezvolta proiectul local, folosiți următoarele comenzi în terminal:

### Pornire server de dezvoltare
```bash
npm run dev
```

### Verificare tipuri TypeScript și generare scheme Wrangler
```bash
npm run generate-types
```

### Construire proiect pentru producție (Cloudflare Pages)
```bash
npm run build
```

### Previzualizare build local
```bash
npm run preview
```

---

## 📈 Standarde de Calitate

1. **Aesthetics & Premium Design:** Fiecare pagină va folosi animații subtile, o paletă de culori armonioasă pe bază de OKLCH și o tipografie modernă (Geist Variable).
2. **Performanță (Core Web Vitals):** 100/100 pe Mobile & Desktop în PageSpeed Insights.
3. **SEO:** Generare automată de sitemap, meta-taguri complete și structură semantică solidă.
4. **Accesibilitate (A11y):** Conformitate WCAG 2.1 AA prin intermediul componentelor accesibile oferite de Radix UI.
