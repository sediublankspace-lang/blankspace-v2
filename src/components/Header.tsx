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
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? "bg-background/80 backdrop-blur-md border-b border-border/40 shadow-xs" 
          : "bg-background/50 backdrop-blur-xs border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <span className="text-xl font-bold tracking-tight text-foreground flex items-center">
            Blank<span className="text-brand">Space</span>
          </span>
          <div className="size-2 rounded-full bg-brand group-hover:scale-125 transition-transform duration-300" />
        </a>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          {/* Cursuri Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setIsCoursesOpen(true)}
            onMouseLeave={() => setIsCoursesOpen(false)}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2 cursor-pointer">
              Cursuri
              <ChevronDown className={`size-4 transition-transform duration-300 ${isCoursesOpen ? "rotate-180 text-brand" : ""}`} />
            </button>

            {/* Dropdown Menu (Stripe style) */}
            <div className={`absolute top-full -left-20 mt-1 w-80 rounded-xl border border-border/40 bg-popover p-4 shadow-lg transition-all duration-300 origin-top-left ${
              isCoursesOpen 
                ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" 
                : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
            }`}>
              <div className="grid gap-2">
                <div className="px-2 pb-1 text-xs font-semibold text-muted-foreground tracking-wider uppercase">
                  Programe educaționale
                </div>
                {courses.map((course, idx) => (
                  <a 
                    key={idx} 
                    href={course.href} 
                    className="flex flex-col gap-0.5 rounded-lg p-2.5 hover:bg-muted/60 transition-colors group/item"
                    onClick={() => setIsCoursesOpen(false)}
                  >
                    <span className="text-sm font-medium text-foreground group-hover/item:text-brand transition-colors">
                      {course.name}
                    </span>
                    <span className="text-xs text-muted-foreground leading-normal">
                      {course.desc}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <a href="/laborator" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Laborator Digital
          </a>
          <a href="/proiecte" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Proiecte
          </a>
          <a href="/resurse" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Resurse
          </a>
          <a href="/despre" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Despre
          </a>
          <a href="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </a>
        </nav>

        {/* CTA Button Right */}
        <div className="hidden md:flex items-center gap-4">
          <a 
            href="/contact" 
            className="inline-flex h-9 items-center justify-center rounded-lg bg-brand px-4 text-sm font-medium text-white hover:bg-brand/90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-sm shadow-brand/20 group/btn"
          >
            Înscrie-te
            <ArrowRight className="ml-1.5 size-4 group-hover/btn:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          className="flex md:hidden p-2 text-foreground hover:bg-muted/80 rounded-lg transition-colors cursor-pointer"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile Drawer (Overlay) */}
      <div className={`fixed inset-0 top-16 z-40 w-full bg-background/95 backdrop-blur-md md:hidden border-t border-border/40 transition-all duration-300 ${
        isMobileMenuOpen 
          ? "opacity-100 translate-y-0 pointer-events-auto" 
          : "opacity-0 -translate-y-4 pointer-events-none"
      }`}>
        <nav className="flex flex-col p-6 gap-6 h-[calc(100vh-4rem)] overflow-y-auto">
          {/* Mobile Cursuri Expandable */}
          <div className="flex flex-col gap-2">
            <button 
              className="flex items-center justify-between text-base font-semibold text-foreground border-b border-border/20 pb-2 text-left cursor-pointer"
              onClick={() => setIsCoursesOpen(!isCoursesOpen)}
            >
              <span>Cursuri</span>
              <ChevronDown className={`size-5 transition-transform duration-300 ${isCoursesOpen ? "rotate-180 text-brand" : ""}`} />
            </button>
            
            <div className={`flex flex-col gap-1 pl-4 border-l border-border/40 overflow-hidden transition-all duration-300 ${
              isCoursesOpen ? "max-h-[400px] mt-2 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
            }`}>
              {courses.map((course, idx) => (
                <a 
                  key={idx} 
                  href={course.href} 
                  className="py-2 text-sm text-muted-foreground hover:text-brand transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {course.name}
                </a>
              ))}
            </div>
          </div>

          <a 
            href="/laborator" 
            className="text-base font-semibold text-foreground border-b border-border/20 pb-2 transition-colors hover:text-brand"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Laborator Digital
          </a>
          <a 
            href="/proiecte" 
            className="text-base font-semibold text-foreground border-b border-border/20 pb-2 transition-colors hover:text-brand"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Proiecte
          </a>
          <a 
            href="/resurse" 
            className="text-base font-semibold text-foreground border-b border-border/20 pb-2 transition-colors hover:text-brand"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Resurse
          </a>
          <a 
            href="/despre" 
            className="text-base font-semibold text-foreground border-b border-border/20 pb-2 transition-colors hover:text-brand"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Despre
          </a>
          <a 
            href="/contact" 
            className="text-base font-semibold text-foreground border-b border-border/20 pb-2 transition-colors hover:text-brand"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </a>

          <div className="mt-auto pt-6 pb-12">
            <a 
              href="/contact" 
              className="flex w-full h-11 items-center justify-center rounded-lg bg-brand text-sm font-semibold text-white hover:bg-brand/90 transition-all shadow-sm shadow-brand/20"
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
