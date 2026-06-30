# Strategia SEO (SEO) - BlankSpace

Acest document definește bunele practici, configurările tehnice și structura de metadate necesare pentru a asigura o indexare organică excelentă pe motoarele de căutare pentru BlankSpace.

## 🛠️ SEO Tehnic (Configurări)

1. **Sitemap:**
   - Vom folosi pachetul `@astrojs/sitemap` pentru a genera automat sitemap.xml la fiecare build.
   - Sitemap-ul va fi configurat în `astro.config.mjs` cu URL-ul de producție.
2. **Robots.txt:**
   - Un fișier `public/robots.txt` curat care direcționează motoarele de căutare către sitemap și blochează accesul în directoarele de administrare sau pagini neesențiale.
   - Structura:
     ```text
     User-agent: *
     Allow: /
     Sitemap: https://blankspace.ro/sitemap-index.xml
     ```
3. **Canonical URLs:**
   - Fiecare pagină va include un link canonical unic pentru a evita conținutul duplicat.
   - Exemplu: `<link rel="canonical" href={Astro.url.href} />`.

---

## 🏷️ Structura Metadatelor Globale

Layout-ul principal (`BaseLayout.astro`) va primi proprietăți (props) dinamice pentru a configura meta-tag-urile fiecărei pagini în `<head>`:

### Tag-uri HTML Obligatorii:
- **Title Tag:** Dinamic, format `[Titlu Pagină] | BlankSpace` (maxim 60 de caractere).
- **Meta Description:** Rezumat atractiv al paginii (150-160 de caractere).
- **Meta Robots:** Implicit `index, follow`, cu opțiunea de a deveni `noindex, nofollow` pe paginile de mulțumire sau formulare intermediare.

### Open Graph (Social Media Cards - Facebook, LinkedIn):
- `og:type` - `"website"` sau `"article"` (pentru blog).
- `og:url` - URL-ul canonical al paginii curente.
- `og:title` - Titlul paginii.
- `og:description` - Descrierea paginii.
- `og:image` - Imaginea reprezentativă (cardul social - dimensiune recomandată 1200x630px).

### Twitter Cards:
- `twitter:card` - `"summary_large_image"`
- `twitter:title`, `twitter:description`, `twitter:image` - Mapate din variabilele de mai sus.

---

## 🏛️ Ierarhia Semantică HTML5

Pentru a asigura o indexare corectă a importanței conținutului, structura de tag-uri a fiecărei pagini va respecta cu strictețe:

1. **Un singur tag `<h1>` per pagină:** Reprezintă titlul principal al paginii (ex: Titlul articolului sau Titlul principal Hero).
2. **Heading-uri secundare (`<h2>`):** Folosite pentru titlurile secțiunilor principale ale paginii (ex. „Serviciile Noastre”, „De Ce BlankSpace?”).
3. **Heading-uri terțiare (`<h3>`):** Folosite în interiorul secțiunilor, pentru titlurile cardurilor sau subsecțiunilor.
4. **Tag-uri semantice HTML5:**
   - `<header>` pentru zona de navigare superioară.
   - `<main>` pentru conținutul unic al paginii.
   - `<section>` pentru delimitarea secțiunilor logice de conținut.
   - `<footer>` pentru zona de subsol.

---

## 🚀 Optimizare Viteză & Performanță (Core Web Vitals)

Viteza de încărcare are impact direct asupra poziționării în motoarele de căutare. Proiectul va include:
- **Optimizare Imagini:** Utilizarea componentei `<Image />` din `astro:assets` pentru redimensionare automată, compresie modernă (AVIF/WebP) și specificare explicită a dimensiunilor (`width` și `height`) pentru prevenirea CLS (Cumulative Layout Shift).
- **Font-Display Optional/Swap:** Asigurarea încărcării rapide a textului prin Geist Variable font-swap.
- **Limitarea JS pe client:** Folosirea directivei `client:*` în Astro doar când este absolut necesar (de exemplu pe formularul de contact sau pe filtrele reactive).
