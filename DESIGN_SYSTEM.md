# Sistemul de Design (DESIGN_SYSTEM) - BlankSpace

Acest document stabilește regulile vizuale, paleta de culori, tipografia și elementele estetice ale brandului **BlankSpace**, folosind capacitățile moderne ale **Tailwind CSS v4** și **shadcn/ui**.

## 🎨 Paleta de Culori (OKLCH Mod)

Folosim sistemul de culori OKLCH pentru gradienți mai naturali și contrast optim în ambele teme (Light și Dark).

### 🌓 Culori Temă (Light / Dark)

| Variabilă CSS | Utilizare | Light Mode | Dark Mode |
| :--- | :--- | :--- | :--- |
| `--background` | Fundal pagină | Alb pur (`oklch(1 0 0)`) | Negru-Slate închis (`oklch(0.145 0 0)`) |
| `--foreground` | Text principal | Slate închis (`oklch(0.145 0 0)`) | Alb-Gri stins (`oklch(0.985 0 0)`) |
| `--primary` | Butoane principale, accente | Jet Black (`oklch(0.205 0 0)`) | Gri metalizat deschis (`oklch(0.922 0 0)`) |
| `--secondary` | Butoane secundare, badge-uri | Gri foarte deschis (`oklch(0.97 0 0)`) | Gri închis (`oklch(0.269 0 0)`) |
| `--muted` | Fundaluri carduri stinse | Gri foarte deschis (`oklch(0.97 0 0)`) | Gri închis (`oklch(0.269 0 0)`) |
| `--muted-foreground` | Text secundar / descrieri | Gri mediu (`oklch(0.556 0 0)`) | Gri deschis-mediu (`oklch(0.708 0 0)`) |
| `--accent` | Hover-uri și elemente active | Gri foarte deschis (`oklch(0.97 0 0)`) | Gri închis (`oklch(0.269 0 0)`) |
| `--border` | Margini, divizori finuți | Gri fin (`oklch(0.922 0 0)`) | Border semi-transparent (`oklch(1 0 0 / 10%)`) |

---

## 🔤 Tipografie

Utilizăm fontul variabil premium **Geist Variable** de la Vercel, optimizat pentru lizibilitate excelentă și aspect geometric minimalist.

- **Font Sans (Body & Interfețe):** `'Geist Variable', sans-serif`
- **Font Heading (Titluri):** De asemenea bazat pe Geist, cu greutăți mai pronunțate (`font-semibold` / `font-bold` sau `tracking-tight`).

### Ierarhie Tipografică

- **H1 (Hero Titles):** `text-4xl md:text-6xl font-bold tracking-tight`
- **H2 (Section Titles):** `text-3xl md:text-4xl font-semibold tracking-tight`
- **H3 (Card Titles):** `text-xl md:text-2xl font-medium`
- **Body Regular:** `text-base font-normal leading-relaxed`
- **Body Small (Muted/Footnotes):** `text-sm text-muted-foreground`

---

## 🛡️ Elemente Estetice Premium (Rich Aesthetics)

Pentru a oferi sentimentul de premium și stadiu de artă, proiectul BlankSpace va implementa:

1. **Glassmorphism (Efecte de sticlă mată):**
   - Folosit pentru Header / Bara de navigație și cardurile plutitoare.
   - Proprietăți Tailwind: `bg-background/80 backdrop-blur-md border-border/50`
2. **Gradienți subtili:**
   - Text cu gradienți pentru accente speciale sau titluri hero: `bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-foreground/60`
3. **Animații și Tranziții:**
   - Schimbări line pentru hover pe butoane: `transition-all duration-300 ease-in-out`
   - Efecte de transformare la hover (scară fină): `hover:scale-[1.02] active:scale-[0.98]`
   - Efecte de pulsație lentă pe decorațiuni sau glow dinamic pe elemente dark.
4. **Borduri fine (Border thinness):**
   - Se va evita negrul pur sau culorile tari pe margini. Marginile vor fi foarte subtile: `border border-border/40`.

---

## 🧩 Componente Reutilizabile (Instrucțiuni Stilizare)

Fiecare componentă shadcn/ui adăugată trebuie să fie personalizată minimal, păstrând linia minimalistă a brandului:
- **Butoane (ui/button.tsx):** Colturi rotunjite moderat (`rounded-lg`), umbră subtilă (`shadow-sm`), font mediu.
- **Carduri:** Fără umbre grele, margini foarte fine, fundal stins.
