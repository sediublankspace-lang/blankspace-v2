import React, { useState, useEffect } from "react";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen]       = useState(false);
  const [isStudioOpen,  setIsStudioOpen]         = useState(false);
  const [scrolled,      setScrolled]             = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const courses = [
    { name: "Design Interior",         href: "/cursuri/design-interior",   desc: "Curs practic de planificare spațială, estetică și prezentare de proiect." },
    { name: "Imprimare 3D",            href: "/cursuri/imprimare-3d",       desc: "De la modelare și slicing până la imprimare și materiale tehnice." },
    { name: "Competențe digitale ICDL",href: "/cursuri/icdl",               desc: "Pregătire pentru certificarea ICDL România, recunoscută internațional." },
    { name: "Certificare ICDL",        href: "/cursuri/certificare-icdl",   desc: "Sesiuni de testare și certificare ICDL într-un cadru autorizat." },
  ];

  const studioServices = [
    { name: "Scanare 3D",      href: "/studio#scanare-3d",    desc: "Scanare 3D obiecte – digitalizarea obiectelor fizice pentru reproducere, adaptare sau modelare." },
    { name: "Modelare 3D",     href: "/studio#modelare-3d",   desc: "Design parametric pentru piese, obiecte și machete." },
    { name: "Imprimare 3D",    href: "/studio#imprimare-3d",  desc: "FDM și SLA cu filamente tehnice și materiale speciale." },
    { name: "Prototipare",     href: "/studio#prototipare",   desc: "De la concept la prototip funcțional, rapid și iterativ." },
    { name: "Proiecte custom", href: "/studio#custom",        desc: "Colaborăm cu persoane și organizații pe proiecte specifice." },
  ];

  // Simple nav links (no dropdown)
  const simpleLinks = [
    { label: "Home",    href: "/" },
    { label: "Contact", href: "/#contact" },
  ];

  // Shared style helpers
  const linkColor   = (s: boolean) => s ? "#5A5A5A" : "rgba(244,244,244,0.75)";
  const linkHover   = (s: boolean) => s ? "#111111" : "#F4F4F4";
  const fontInter   = "'Inter', sans-serif";
  const fontJakarta = "'Plus Jakarta Sans', sans-serif";

  // Reusable dropdown panel
  const DropdownPanel = ({
    id, open, label, items, sectionLabel,
    onEnter, onLeave,
  }: {
    id: string; open: boolean; label: string; sectionLabel: string;
    items: { name: string; href: string; desc: string }[];
    onEnter: () => void; onLeave: () => void;
  }) => (
    <div className="relative" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <button
        id={`nav-${id}-btn`}
        className="flex items-center gap-1 text-sm font-medium transition-colors py-2 cursor-pointer"
        style={{ fontFamily: fontInter }}
      >
        <span style={{ color: linkColor(scrolled) }}>{label}</span>
        <ChevronDown
          className={`size-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          style={open ? { color: "#B8A22A" } : { color: linkColor(scrolled) }}
        />
      </button>

      <div
        id={`nav-${id}-dropdown`}
        className={`absolute top-full -left-20 mt-1 w-80 rounded-xl p-4 shadow-xl transition-all duration-300 origin-top-left ${
          open
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
        style={{ background: "#FFFFFF", border: "1px solid #D9D6D1", boxShadow: "0 12px 40px rgba(0,0,0,0.08)" }}
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
              className="flex flex-col gap-0.5 rounded-lg p-2.5 transition-colors group/item"
              style={{ color: "#111111" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#F4F4F4")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              onClick={() => { setIsCoursesOpen(false); setIsStudioOpen(false); }}
            >
              <span className="text-sm font-medium group-hover/item:text-[#B8A22A] transition-colors" style={{ color: "inherit", fontFamily: fontJakarta }}>
                {item.name}
              </span>
              <span className="text-xs leading-normal" style={{ color: "#5A5A5A", fontFamily: fontInter }}>
                {item.desc}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <header
      id="main-header"
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "border-b shadow-sm" : "border-b border-transparent"
      }`}
      style={scrolled
        ? { background: "rgba(245,244,242,0.94)", backdropFilter: "blur(20px)", borderColor: "#D9D6D1" }
        : { background: "rgba(17,17,17,0.0)" }
      }
    >
      {/* Top golden accent — only when scrolled */}
      {scrolled && (
        <div
          className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
          style={{ background: "linear-gradient(90deg, transparent, rgba(184,162,42,0.4), transparent)" }}
        />
      )}

      <div className="mx-auto max-w-7xl px-6 h-12 flex items-center justify-between">

        {/* ── Logo ── */}
        <a href="/" id="header-logo" className="flex items-center gap-2 group">
          <span
            className="text-xl font-bold tracking-tight"
            style={scrolled ? { color: "#111111", fontFamily: fontJakarta } : { color: "#F4F4F4", fontFamily: fontJakarta }}
          >
            Blank<span style={{ color: "#B8A22A" }}>Space</span>
          </span>
          <div
            className="size-1.5 rounded-full group-hover:scale-150 transition-transform duration-300"
            style={{ background: "#B8A22A" }}
          />
        </a>

        {/* ── Desktop Navigation ── */}
        <nav className="hidden md:flex items-center gap-6">

          {/* Home */}
          <a
            href="/"
            id="nav-home"
            className="text-sm font-medium transition-colors"
            style={{ color: linkColor(scrolled), fontFamily: fontInter }}
            onMouseEnter={(e) => (e.currentTarget.style.color = linkHover(scrolled))}
            onMouseLeave={(e) => (e.currentTarget.style.color = linkColor(scrolled))}
          >
            Home
          </a>

          {/* Cursuri dropdown */}
          <DropdownPanel
            id="cursuri"
            open={isCoursesOpen}
            label="Cursuri"
            sectionLabel="Programe educaționale"
            items={courses}
            onEnter={() => setIsCoursesOpen(true)}
            onLeave={() => setIsCoursesOpen(false)}
          />

          {/* Studio dropdown */}
          <DropdownPanel
            id="studio"
            open={isStudioOpen}
            label="Studio 3D"
            sectionLabel="Servicii BlankSpace Studio 3D"
            items={studioServices}
            onEnter={() => setIsStudioOpen(true)}
            onLeave={() => setIsStudioOpen(false)}
          />

          {/* Blog */}
          <a
            href="/blog"
            id="nav-blog"
            className="text-sm font-medium transition-colors"
            style={{ color: linkColor(scrolled), fontFamily: fontInter }}
            onMouseEnter={(e) => (e.currentTarget.style.color = linkHover(scrolled))}
            onMouseLeave={(e) => (e.currentTarget.style.color = linkColor(scrolled))}
          >
            Blog
          </a>

          {/* Contact */}
          <a
            href="/#contact"
            id="nav-contact"
            className="text-sm font-medium transition-colors"
            style={{ color: linkColor(scrolled), fontFamily: fontInter }}
            onMouseEnter={(e) => (e.currentTarget.style.color = linkHover(scrolled))}
            onMouseLeave={(e) => (e.currentTarget.style.color = linkColor(scrolled))}
          >
            Contact
          </a>
        </nav>

        {/* ── CTA Button ── */}
        <div className="hidden md:flex items-center">
          <a
            href="/#contact"
            id="header-cta-btn"
            className="inline-flex h-9 items-center justify-center rounded-lg px-4 text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] group/btn"
            style={{ background: "#B8A22A", color: "#111111", boxShadow: "0 2px 12px rgba(184,162,42,0.28)", fontFamily: fontJakarta }}
          >
            Înscrie-te
            <ArrowRight className="ml-1.5 size-4 group-hover/btn:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* ── Mobile Hamburger ── */}
        <button
          id="mobile-menu-btn"
          className="flex md:hidden p-2 rounded-lg transition-colors cursor-pointer"
          style={{ color: scrolled ? "#111111" : "#F4F4F4" }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* ── Mobile Drawer ── */}
      <div
        id="mobile-menu-drawer"
        className={`fixed inset-0 top-12 z-40 w-full md:hidden transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
        style={{ background: "rgba(246,245,242,0.98)", backdropFilter: "blur(20px)", borderTop: "1px solid #D9D6D1" }}
      >
        <nav className="flex flex-col p-6 gap-5 h-[calc(100vh-3rem)] overflow-y-auto">

          {/* Home */}
          <a
            href="/"
            className="text-base font-semibold pb-3 transition-colors"
            style={{ color: "#111111", borderBottom: "1px solid #D9D6D1", fontFamily: fontJakarta }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#B8A22A")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#111111")}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </a>

          {/* Mobile Cursuri accordion */}
          <div className="flex flex-col gap-2">
            <button
              className="flex items-center justify-between text-base font-semibold pb-3 text-left cursor-pointer"
              style={{ color: "#111111", borderBottom: "1px solid #D9D6D1", fontFamily: fontJakarta }}
              onClick={() => setIsCoursesOpen(!isCoursesOpen)}
            >
              <span>Cursuri</span>
              <ChevronDown
                className={`size-5 transition-transform duration-300 ${isCoursesOpen ? "rotate-180" : ""}`}
                style={isCoursesOpen ? { color: "#B8A22A" } : { color: "#5A5A5A" }}
              />
            </button>
            <div
              className={`flex flex-col gap-1 pl-4 overflow-hidden transition-all duration-300 ${
                isCoursesOpen ? "max-h-[400px] mt-2 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
              }`}
              style={{ borderLeft: "2px solid rgba(184,162,42,0.4)" }}
            >
              {courses.map((c, idx) => (
                <a
                  key={idx}
                  href={c.href}
                  className="py-2 text-sm transition-colors"
                  style={{ color: "#5A5A5A", fontFamily: fontInter }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#B8A22A")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#5A5A5A")}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {c.name}
                </a>
              ))}
            </div>
          </div>

          {/* Mobile Studio accordion */}
          <div className="flex flex-col gap-2">
            <button
              className="flex items-center justify-between text-base font-semibold pb-3 text-left cursor-pointer"
              style={{ color: "#111111", borderBottom: "1px solid #D9D6D1", fontFamily: fontJakarta }}
              onClick={() => setIsStudioOpen(!isStudioOpen)}
            >
              <span>Studio 3D</span>
              <ChevronDown
                className={`size-5 transition-transform duration-300 ${isStudioOpen ? "rotate-180" : ""}`}
                style={isStudioOpen ? { color: "#B8A22A" } : { color: "#5A5A5A" }}
              />
            </button>
            <div
              className={`flex flex-col gap-1 pl-4 overflow-hidden transition-all duration-300 ${
                isStudioOpen ? "max-h-[400px] mt-2 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
              }`}
              style={{ borderLeft: "2px solid rgba(184,162,42,0.4)" }}
            >
              {studioServices.map((s, idx) => (
                <a
                  key={idx}
                  href={s.href}
                  className="py-2 text-sm transition-colors"
                  style={{ color: "#5A5A5A", fontFamily: fontInter }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#B8A22A")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#5A5A5A")}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>


          {/* Contact */}
          <a
            href="/#contact"
            className="text-base font-semibold pb-3 transition-colors"
            style={{ color: "#111111", borderBottom: "1px solid #D9D6D1", fontFamily: fontJakarta }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#B8A22A")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#111111")}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </a>

          {/* Mobile CTA */}
          <div className="mt-auto pt-6 pb-12">
            <a
              href="/#contact"
              className="flex w-full h-11 items-center justify-center rounded-xl text-sm font-semibold transition-all"
              style={{ background: "#B8A22A", color: "#111111", boxShadow: "0 4px 16px rgba(184,162,42,0.3)", fontFamily: fontJakarta }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Înscrie-te
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
