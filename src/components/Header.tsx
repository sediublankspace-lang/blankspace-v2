import React, { useState, useEffect } from "react";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const courses = [
    { name: "Design Interior", href: "/cursuri/design-interior", desc: "Planificare spațială, ergonomie și modelare 3D." },
    { name: "Imprimare 3D", href: "/cursuri/imprimare-3d", desc: "Modelare tridimensională și prototipare rapidă." },
    { name: "ECDL", href: "/cursuri/ecdl", desc: "Certificarea standard a competențelor IT." },
    { name: "Design de produs", href: "/cursuri/design-de-produs", desc: "Proiectare de obiect, de la concept la execuție fizică." },
    { name: "Ateliere creative", href: "/cursuri/ateliere-creative", desc: "Electronică practică și meșteșuguri digitale." }
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b shadow-sm"
          : "border-b border-transparent"
      }`}
      style={scrolled
        ? { background: "rgba(245,244,242,0.94)", backdropFilter: "blur(20px)", borderColor: "#D9D6D1" }
        : { background: "rgba(17,17,17,0.0)" }
      }
    >
      {/* Top golden accent — very subtle, only visible when scrolled */}
      {scrolled && (
        <div
          className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
          style={{ background: "linear-gradient(90deg, transparent, rgba(184,162,42,0.4), transparent)" }}
        />
      )}

      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">

        {/* ── Logo ── */}
        <a href="/" id="header-logo" className="flex items-center gap-2 group">
          <span
            className="text-xl font-bold tracking-tight"
            style={scrolled ? { color: "#111111" } : { color: "#F4F4F4" }}
          >
            Blank<span style={{ color: "#B8A22A" }}>Space</span>
          </span>
          <div
            className="size-1.5 rounded-full group-hover:scale-150 transition-transform duration-300"
            style={{ background: "#B8A22A" }}
          />
        </a>

        {/* ── Desktop Navigation ── */}
        <nav className="hidden md:flex items-center gap-8">

          {/* Cursuri Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsCoursesOpen(true)}
            onMouseLeave={() => setIsCoursesOpen(false)}
          >
            <button
              id="nav-cursuri-btn"
              className="flex items-center gap-1 text-sm font-medium transition-colors py-2 cursor-pointer"
              style={scrolled ? { color: "#5A5A5A" } : { color: "rgba(244,244,244,0.75)" }}
            >
              Cursuri
              <ChevronDown
                className={`size-4 transition-transform duration-300 ${isCoursesOpen ? "rotate-180" : ""}`}
                style={isCoursesOpen ? { color: "#B8A22A" } : {}}
              />
            </button>

            {/* Dropdown panel */}
            <div
              id="nav-cursuri-dropdown"
              className={`absolute top-full -left-20 mt-1 w-80 rounded-xl p-4 shadow-xl transition-all duration-300 origin-top-left ${
                isCoursesOpen
                  ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
              }`}
              style={{ background: "#FFFFFF", border: "1px solid #D9D6D1", boxShadow: "0 12px 40px rgba(0,0,0,0.08)" }}
            >
              {/* Top accent */}
              <div className="w-full h-[2px] rounded-full mb-3" style={{ background: "linear-gradient(90deg, #B8A22A, rgba(184,162,42,0.1))" }} />
              <div className="grid gap-1">
                <div className="px-2 pb-2 text-[10px] font-semibold tracking-widest uppercase" style={{ color: "#8A8A8A" }}>
                  Programe educaționale
                </div>
                {courses.map((course, idx) => (
                  <a
                    key={idx}
                    href={course.href}
                    className="flex flex-col gap-0.5 rounded-lg p-2.5 transition-colors group/item"
                    style={{ color: "#111111" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#F4F4F4")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    onClick={() => setIsCoursesOpen(false)}
                  >
                    <span className="text-sm font-medium group-hover/item:text-[#B8A22A] transition-colors" style={{ color: "inherit" }}>
                      {course.name}
                    </span>
                    <span className="text-xs leading-normal" style={{ color: "#5A5A5A" }}>
                      {course.desc}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Nav links */}
          {["Laborator Digital|/laborator", "Proiecte|/proiecte", "Resurse|/resurse", "Despre|/despre", "Contact|/contact"].map((item) => {
            const [label, href] = item.split("|");
            return (
              <a
                key={href}
                href={href}
                className="text-sm font-medium transition-colors"
                style={scrolled ? { color: "#5A5A5A" } : { color: "rgba(244,244,244,0.75)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = scrolled ? "#111111" : "#F4F4F4")}
                onMouseLeave={(e) => (e.currentTarget.style.color = scrolled ? "#5A5A5A" : "rgba(244,244,244,0.75)")}
              >
                {label}
              </a>
            );
          })}
        </nav>

        {/* ── CTA Button ── */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="/contact"
            id="header-cta-btn"
            className="inline-flex h-9 items-center justify-center rounded-lg px-4 text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] group/btn"
            style={{ background: "#B8A22A", color: "#111111", boxShadow: "0 2px 12px rgba(184,162,42,0.28)" }}
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
        className={`fixed inset-0 top-16 z-40 w-full md:hidden transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
        style={{ background: "rgba(246,245,242,0.98)", backdropFilter: "blur(20px)", borderTop: "1px solid #D9D6D1" }}
      >
        <nav className="flex flex-col p-6 gap-5 h-[calc(100vh-4rem)] overflow-y-auto">

          {/* Mobile Cursuri section */}
          <div className="flex flex-col gap-2">
            <button
              className="flex items-center justify-between text-base font-semibold pb-3 text-left cursor-pointer"
              style={{ color: "#111111", borderBottom: "1px solid #D9D6D1" }}
              onClick={() => setIsCoursesOpen(!isCoursesOpen)}
            >
              <span>Cursuri</span>
              <ChevronDown
                className={`size-5 transition-transform duration-300 ${isCoursesOpen ? "rotate-180" : ""}`}
                style={isCoursesOpen ? { color: "#B8A22A" } : { color: "#5A5A5A" }}
              />
            </button>

            <div className={`flex flex-col gap-1 pl-4 overflow-hidden transition-all duration-300 ${
              isCoursesOpen ? "max-h-[400px] mt-2 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
            }`} style={{ borderLeft: "2px solid rgba(184,162,42,0.4)" }}>
              {courses.map((course, idx) => (
                <a
                  key={idx}
                  href={course.href}
                  className="py-2 text-sm transition-colors"
                  style={{ color: "#5A5A5A" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#B8A22A")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#5A5A5A")}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {course.name}
                </a>
              ))}
            </div>
          </div>

          {/* Other nav links */}
          {["Laborator Digital|/laborator", "Proiecte|/proiecte", "Resurse|/resurse", "Despre|/despre", "Contact|/contact"].map((item) => {
            const [label, href] = item.split("|");
            return (
              <a
                key={href}
                href={href}
                className="text-base font-semibold pb-3 transition-colors"
                style={{ color: "#111111", borderBottom: "1px solid #D9D6D1" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#B8A22A")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#111111")}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {label}
              </a>
            );
          })}

          {/* Mobile CTA */}
          <div className="mt-auto pt-6 pb-12">
            <a
              href="/contact"
              className="flex w-full h-11 items-center justify-center rounded-xl text-sm font-semibold transition-all"
              style={{ background: "#B8A22A", color: "#111111", boxShadow: "0 4px 16px rgba(184,162,42,0.3)" }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Înscrie-te acum
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
