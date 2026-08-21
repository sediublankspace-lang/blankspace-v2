import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCoursesOpen,    setIsCoursesOpen]    = useState(false);
  const [isStudioOpen,     setIsStudioOpen]     = useState(false);
  const [scrolled,         setScrolled]         = useState(false);

  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const drawerRef    = useRef<HTMLDivElement>(null);

  // ── Scroll detection for subtle shadow only ──────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Body scroll lock when mobile drawer is open ──────────────────────────
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      const firstLink = drawerRef.current?.querySelector<HTMLElement>("a, button");
      firstLink?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  // ── Escape key closes drawer ──────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMobileMenuOpen]);

  const closeMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    setIsCoursesOpen(false);
    setIsStudioOpen(false);
    setTimeout(() => hamburgerRef.current?.focus(), 50);
  }, []);

  // ── Navigation Data ───────────────────────────────────────────────────────
  const courses = [
    { name: "Curs Design Interior",             href: "/#activitati",              desc: "Planificare spațială, estetică și prezentare de proiect." },
    { name: "Curs Imprimare 3D",                href: "/#activitati",              desc: "De la modelare și slicing până la imprimare și materiale tehnice." },
    { name: "Cursuri competențe digitale ICDL", href: "/#activitati",              desc: "Pregătire pentru certificarea ICDL România, recunoscută internațional." },
    { name: "Pregătire admitere Arhitectură",    href: "/#activitati",              desc: "Desen, perspectivă, compoziție și geometrie spațială." },
    { name: "Centru de testare ICDL",            href: "/cursuri/certificare-icdl", desc: "Sesiuni de testare și certificare ICDL într-un cadru autorizat." },
  ];

  const studioServices = [
    { name: "Scanare 3D",      href: "/studio#scanare-3d",   desc: "Digitalizarea obiectelor fizice pentru reproducere, adaptare sau modelare." },
    { name: "Modelare 3D",     href: "/studio#modelare-3d",  desc: "Design parametric pentru piese, obiecte și machete." },
    { name: "Imprimare 3D",    href: "/studio#imprimare-3d", desc: "FDM și SLA cu filamente tehnice și materiale speciale." },
    { name: "Prototipare",     href: "/studio#prototipare",  desc: "De la concept la prototip funcțional, rapid și iterativ." },
    { name: "Proiecte custom", href: "/studio#custom",       desc: "Colaborăm cu persoane și organizații pe proiecte specifice." },
  ];

  const fontInter   = "'Inter', sans-serif";
  const fontJakarta = "'Plus Jakarta Sans', sans-serif";

  // ── Desktop dropdown panel ────────────────────────────────────────────────
  const DropdownPanel = ({
    id, open, label, items, sectionLabel, onEnter, onLeave,
  }: {
    id: string; open: boolean; label: string; sectionLabel: string;
    items: { name: string; href: string; desc: string }[];
    onEnter: () => void; onLeave: () => void;
  }) => (
    <div className="relative" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <button
        id={`nav-${id}-btn`}
        type="button"
        className="flex items-center gap-1 text-sm font-medium transition-colors py-2 cursor-pointer"
        style={{ fontFamily: fontInter, color: "#111111" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#B8A22A")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#111111")}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={`nav-${id}-dropdown`}
      >
        <span>{label}</span>
        <ChevronDown
          className={`size-4 transition-transform duration-300 ${open ? "rotate-180 text-[#B8A22A]" : "text-[#4B5563]"}`}
        />
      </button>

      <div
        id={`nav-${id}-dropdown`}
        className={`absolute top-full -left-20 mt-1 w-80 rounded-xl p-4 shadow-xl transition-all duration-300 origin-top-left ${
          open
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
        style={{ background: "#FFFFFF", border: "1px solid #D9D6D1", boxShadow: "0 12px 40px rgba(0,0,0,0.08)", zIndex: 9000 }}
        aria-hidden={!open}
      >
        <div className="w-full h-[2px] rounded-full mb-3" style={{ background: "linear-gradient(90deg, #B8A22A, rgba(184,162,42,0.1))" }} />
        <div className="grid gap-1">
          <div className="px-2 pb-2 text-[10px] font-semibold tracking-widest uppercase" style={{ color: "#8A8A8A", fontFamily: fontJakarta }}>
            {sectionLabel}
          </div>
          {items.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              className="flex flex-col gap-0.5 rounded-lg p-2.5 transition-colors"
              style={{ color: "#111111" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#F4F4F4")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              onClick={() => { setIsCoursesOpen(false); setIsStudioOpen(false); }}
            >
              <span className="text-sm font-medium hover:text-[#B8A22A] transition-colors" style={{ color: "inherit", fontFamily: fontJakarta }}>{item.name}</span>
              <span className="text-xs leading-normal" style={{ color: "#4B5563", fontFamily: fontInter }}>{item.desc}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* ── FIXED WHITE HEADER ─────────────────────────────────────────── */}
      <header
        id="main-header"
        className="fixed top-0 left-0 right-0 w-full z-50 transition-shadow duration-200"
        style={{
          background: "#FFFFFF",
          borderBottom: "1px solid #E8E5E0",
          boxShadow: scrolled ? "0 2px 12px rgba(0,0,0,0.06)" : "0 1px 2px rgba(0,0,0,0.02)",
        }}
      >
        <div className="mx-auto max-w-7xl px-6 flex items-center justify-between h-[66px] md:h-[78px]">

          {/* Logo — black/gold wordmark */}
          <a href="/" id="header-logo" className="flex items-center group shrink-0" aria-label="BlankSpace — pagina principală">
            <img
              src="/images/brand/blankspace-logo-dark.svg"
              alt="BlankSpace"
              className="w-[145px] sm:w-[165px] md:w-[180px] h-auto transition-opacity duration-200 group-hover:opacity-85"
              width="180"
              height="60"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Navigare principală">
            <a
              href="/"
              id="nav-home"
              className="text-sm font-medium transition-colors"
              style={{ color: "#111111", fontFamily: fontInter }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#B8A22A")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#111111")}
            >
              Home
            </a>
            <DropdownPanel
              id="cursuri"
              open={isCoursesOpen}
              label="Cursuri"
              sectionLabel="Programe educaționale"
              items={courses}
              onEnter={() => setIsCoursesOpen(true)}
              onLeave={() => setIsCoursesOpen(false)}
            />
            <DropdownPanel
              id="studio"
              open={isStudioOpen}
              label="Studio 3D"
              sectionLabel="Servicii BlankSpace Studio 3D"
              items={studioServices}
              onEnter={() => setIsStudioOpen(true)}
              onLeave={() => setIsStudioOpen(false)}
            />
            <a
              href="/#contact"
              id="nav-contact"
              className="text-sm font-medium transition-colors"
              style={{ color: "#111111", fontFamily: fontInter }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#B8A22A")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#111111")}
            >
              Contact
            </a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center shrink-0">
            <a
              href="/#contact"
              id="header-cta-btn"
              className="inline-flex h-10 items-center justify-center rounded-lg px-5 text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] group/btn"
              style={{ background: "#B8A22A", color: "#111111", boxShadow: "0 2px 12px rgba(184,162,42,0.28)", fontFamily: fontJakarta }}
            >
              Înscrie-te
              <ArrowRight className="ml-1.5 size-4 group-hover/btn:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            ref={hamburgerRef}
            id="mobile-menu-btn"
            type="button"
            className="flex md:hidden p-2 rounded-lg transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8A22A] focus-visible:ring-offset-2"
            style={{ color: "#111111" }}
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Deschide meniul de navigare"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav-drawer"
          >
            <Menu className="size-6" />
          </button>
        </div>
      </header>

      {/* ── MOBILE DRAWER OVERLAY ────────────────────────────────────────── */}

      {/* Semi-transparent backdrop */}
      <div
        id="mobile-nav-backdrop"
        className={`fixed inset-0 z-[9998] md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "rgba(0,0,0,0.50)" }}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Navigation Drawer */}
      <div
        ref={drawerRef}
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Meniu navigare"
        className={`fixed top-0 right-0 z-[9999] md:hidden transition-transform duration-300 ease-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          width: "86vw",
          maxWidth: "360px",
          height: "100dvh",
          background: "rgba(15,15,15,0.97)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow: "-12px 0 60px rgba(0,0,0,0.6)",
          display: "grid",
          gridTemplateRows: "auto minmax(0,1fr) auto",
          overflowX: "hidden",
        }}
      >
        {/* Drawer Header — Light bar with identical black/gold logo */}
        <div
          className="flex items-center justify-between px-5 shrink-0"
          style={{ height: "66px", background: "#FFFFFF", borderBottom: "1px solid #E8E5E0" }}
        >
          <a href="/" onClick={closeMenu} aria-label="BlankSpace — pagina principală">
            <img
              src="/images/brand/blankspace-logo-dark.svg"
              alt="BlankSpace"
              style={{ width: "145px", height: "auto" }}
              width="145"
              height="48"
            />
          </a>
          <button
            id="mobile-menu-close"
            type="button"
            className="flex items-center justify-center rounded-lg p-2 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8A22A]"
            style={{ color: "#111111" }}
            onClick={closeMenu}
            aria-label="Închide meniul"
            onMouseEnter={(e) => (e.currentTarget.style.background = "#F4F4F4")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Drawer Body — Scrollable Navigation */}
        <nav
          className="overflow-y-auto px-3 py-4 flex flex-col"
          aria-label="Meniu mobile"
          style={{ overscrollBehavior: "contain", gap: "2px" }}
        >
          {/* Home */}
          <a
            href="/"
            className="flex items-center rounded-lg px-4 py-3.5 text-[15px] font-medium transition-colors"
            style={{ color: "rgba(240,238,234,0.92)", fontFamily: fontJakarta }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "#F4F4F4"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(240,238,234,0.92)"; }}
            onClick={closeMenu}
          >
            Home
          </a>

          {/* Cursuri accordion */}
          <div>
            <button
              type="button"
              className="flex items-center justify-between w-full rounded-lg px-4 py-3.5 text-[15px] font-medium text-left cursor-pointer transition-colors"
              style={{ color: "rgba(240,238,234,0.92)", fontFamily: fontJakarta, background: "transparent", border: "none" }}
              onClick={() => setIsCoursesOpen(v => !v)}
              aria-expanded={isCoursesOpen}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <span>Cursuri</span>
              <ChevronDown
                className={`size-4 transition-transform duration-300 ${isCoursesOpen ? "rotate-180 text-[#B8A22A]" : "text-white/45"}`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                isCoursesOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div
                className="mx-4 mb-2 flex flex-col"
                style={{ borderLeft: "2px solid rgba(184,162,42,0.45)", paddingLeft: "12px", gap: "1px" }}
              >
                <p className="px-3 pt-2 pb-1.5 text-[10px] font-semibold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.30)", fontFamily: fontJakarta }}>
                  Programe educaționale
                </p>
                {courses.map((c, idx) => (
                  <a
                    key={idx}
                    href={c.href}
                    className="rounded-md px-3 py-2.5 text-sm transition-colors"
                    style={{ color: "rgba(240,238,234,0.75)", fontFamily: fontInter }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#F4F4F4"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(240,238,234,0.75)"; e.currentTarget.style.background = "transparent"; }}
                    onClick={closeMenu}
                  >
                    {c.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Studio 3D accordion */}
          <div>
            <button
              type="button"
              className="flex items-center justify-between w-full rounded-lg px-4 py-3.5 text-[15px] font-medium text-left cursor-pointer transition-colors"
              style={{ color: "rgba(240,238,234,0.92)", fontFamily: fontJakarta, background: "transparent", border: "none" }}
              onClick={() => setIsStudioOpen(v => !v)}
              aria-expanded={isStudioOpen}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <span>Studio 3D</span>
              <ChevronDown
                className={`size-4 transition-transform duration-300 ${isStudioOpen ? "rotate-180 text-[#B8A22A]" : "text-white/45"}`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                isStudioOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div
                className="mx-4 mb-2 flex flex-col"
                style={{ borderLeft: "2px solid rgba(184,162,42,0.45)", paddingLeft: "12px", gap: "1px" }}
              >
                <p className="px-3 pt-2 pb-1.5 text-[10px] font-semibold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.30)", fontFamily: fontJakarta }}>
                  Servicii Studio 3D
                </p>
                {studioServices.map((s, idx) => (
                  <a
                    key={idx}
                    href={s.href}
                    className="rounded-md px-3 py-2.5 text-sm transition-colors"
                    style={{ color: "rgba(240,238,234,0.75)", fontFamily: fontInter }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#F4F4F4"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(240,238,234,0.75)"; e.currentTarget.style.background = "transparent"; }}
                    onClick={closeMenu}
                  >
                    {s.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact */}
          <a
            href="/#contact"
            className="flex items-center rounded-lg px-4 py-3.5 text-[15px] font-medium transition-colors"
            style={{ color: "rgba(240,238,234,0.92)", fontFamily: fontJakarta }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "#F4F4F4"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(240,238,234,0.92)"; }}
            onClick={closeMenu}
          >
            Contact
          </a>
        </nav>

        {/* Drawer Footer — CTA Button */}
        <div
          className="shrink-0 px-4"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: "16px",
            paddingBottom: "max(20px, env(safe-area-inset-bottom, 20px))",
          }}
        >
          <a
            href="/#contact"
            id="mobile-cta-inscrie"
            className="flex w-full min-h-[48px] items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all hover:brightness-105 active:scale-[0.98]"
            style={{ background: "#B8A22A", color: "#111111", boxShadow: "0 4px 20px rgba(184,162,42,0.35)", fontFamily: fontJakarta }}
            onClick={closeMenu}
          >
            Înscrie-te
            <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </>
  );
}
