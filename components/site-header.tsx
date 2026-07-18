"use client";

import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Home", id: "home" },
  { label: "Services", id: "services" },
  { label: "Work", id: "work" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
];

export function SiteHeader() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    id: string
  ) => {
    e.preventDefault();
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 md:absolute ${
          scrolled ? "bg-background/80 backdrop-blur-md md:bg-transparent md:backdrop-blur-none" : ""
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "home")}
            className="flex items-center gap-2 text-white"
          >
            <img src="/logo.png" alt="Etqan Agency logo" className="h-8 w-auto" />
          </a>

          <nav
            className={`hidden items-center gap-1 rounded-full border border-white/20 bg-white/10 p-1 backdrop-blur-md transition-opacity duration-200 md:flex ${
              scrolled ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  active === item.id
                    ? "bg-card text-foreground shadow-sm"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {active === item.id && (
                  <span className="size-1.5 rounded-full bg-foreground" />
                )}
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button className="hidden rounded-full px-4 py-2 text-sm font-medium text-white/90 transition-colors hover:text-white sm:block">
              Log In
            </button>
            <button
              onClick={(e) => handleNavClick(e, "contact")}
              className="flex items-center gap-2 rounded-full bg-foreground px-3 py-2 text-sm font-medium text-background transition-transform hover:scale-[1.02] sm:px-4"
            >
              <span className="hidden sm:inline">Start a Project</span>
              <span className="sm:hidden">Contact</span>
              <span className="flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <ArrowRight className="size-3" />
              </span>
            </button>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="flex size-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 md:hidden"
            >
              {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>

        {/* Mobile nav panel */}
        <div
          className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out md:hidden ${
            menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="mx-4 mb-4 flex flex-col gap-1 rounded-2xl border border-white/20 bg-black/40 p-2 backdrop-blur-md">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                  active === item.id
                    ? "bg-card text-foreground shadow-sm"
                    : "text-white/85 hover:bg-white/10 hover:text-white"
                }`}
              >
                {active === item.id && (
                  <span className="size-1.5 rounded-full bg-foreground" />
                )}
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Floating nav pill: takes over once the header nav scrolls out of view */}
      <nav
        className={`fixed inset-x-0 top-4 z-50 hidden justify-center transition-all duration-300 md:flex ${
          scrolled
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-3 opacity-0"
        }`}
      >
        <div className="flex items-center gap-1 rounded-full border border-border bg-card p-1 shadow-lg shadow-black/10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={(e) => handleNavClick(e, item.id)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                active === item.id
                  ? "bg-foreground text-background"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              {active === item.id && (
                <span className="size-1.5 rounded-full bg-primary" />
              )}
              {item.label}
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}
