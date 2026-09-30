"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { useLenis } from "lenis/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import Logo from "./Logo";
import type { Contact } from "@/lib/data";
import type { NavChild, NavLink } from "@/lib/nav";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";

const EASE = [0.16, 1, 0.3, 1] as const;

type MenuStrings = { allServices: string; servicesMenu: string; overview: string };

export default function Navbar({
  contact, t, links, menu, homeHref, contactHref, switchHref, switchLang,
}: {
  contact: Contact; t: Dictionary["nav"]; links: NavLink[]; menu: MenuStrings;
  homeHref: string; contactHref: string; switchHref: string; switchLang: Locale;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const lenis = useLenis(({ scroll }) => setScrolled(scroll > 50));
  const menuId = useId();
  const headerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open, lenis]);

  // While the mobile menu is open it behaves as a modal: the page behind it is inert, Tab cycles through
  // the header controls and the menu, Escape closes it and focus returns to the toggle.
  useEffect(() => {
    if (!open) return;
    const header = headerRef.current;
    const blocked = Array.from(document.body.children).filter(
      (el): el is HTMLElement => el instanceof HTMLElement && el !== header && el !== panelRef.current && !el.contains(header) && !el.hasAttribute("inert"),
    );
    blocked.forEach((el) => el.setAttribute("inert", ""));
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const items = [header, panelRef.current].flatMap((root) =>
        Array.from(root?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []),
      ).filter((el) => el.getClientRects().length > 0);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      const inside = items.includes(document.activeElement as HTMLElement);
      if (e.shiftKey && (document.activeElement === first || !inside)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (document.activeElement === last || !inside)) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      blocked.forEach((el) => el.removeAttribute("inert"));
    };
  }, [open]);

  // Close the mobile menu after navigating.
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => pathname === href || (href !== homeHref && pathname.startsWith(`${href}/`));

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-premium ${
          scrolled || menuOpen || pathname !== homeHref ? "border-b border-border bg-background/80 backdrop-blur-md" : "border-b border-transparent"
        }`}
      >
        <nav aria-label={t.mainAria} className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-6 md:px-10">
          <Link href={homeHref} className="relative z-50 block" aria-label={t.homeAria}>
            <Logo className="h-6 w-auto md:h-7" />
          </Link>

          <ul className="hidden items-center gap-9 lg:flex">
            {links.map((l) => l.children?.length ? (
              <DropdownItem
                key={l.href}
                link={l}
                items={l.children}
                menu={menu}
                active={isActive(l.href)}
                open={menuOpen}
                setOpen={setMenuOpen}
                pathname={pathname}
              />
            ) : (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={`group relative text-xs font-medium uppercase tracking-widest ${isActive(l.href) ? "text-primary" : ""}`}
                >
                  {l.label}
                  <span
                    className={`absolute -bottom-1 start-0 h-px w-full bg-brand-gradient transition-transform duration-500 ease-premium ${
                      isActive(l.href) ? "scale-x-100" : "origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={switchHref}
              hrefLang={switchLang}
              lang={switchLang}
              aria-label={t.switchAria}
              className="text-xs font-medium tracking-widest transition-colors hover:text-primary"
            >
              {t.switchLabel}
            </a>
            <Link
              href={contactHref}
              data-cta="nav_start_project"
              className="hidden rounded-full bg-foreground px-5 py-2.5 text-[11px] font-bold tracking-widest text-white transition-colors duration-500 hover:bg-primary sm:inline-block"
            >
              {t.cta}
            </Link>
            <button
              ref={toggleRef}
              type="button"
              aria-label={open ? t.close : t.open}
              aria-expanded={open}
              aria-controls={open ? menuId : undefined}
              onClick={() => setOpen((v) => !v)}
              className="relative z-50 grid h-10 w-10 place-items-center rounded-full border border-foreground lg:hidden"
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            ref={panelRef}
            id={menuId}
            aria-label={t.menuAria}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-background px-6 pb-24 pt-28 lg:hidden"
          >
            <ul className="space-y-1">
              {[{ label: t.home, href: homeHref } as NavLink, ...links].map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.8, ease: EASE }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    aria-current={pathname === l.href ? "page" : undefined}
                    className={`block text-4xl font-medium leading-[1.2] tracking-tight ${pathname === l.href ? "text-primary" : ""}`}
                  >
                    {l.label}
                  </Link>
                  {l.children?.length ? (
                    <ul className="mb-4 mt-2 space-y-1 border-s border-border ps-5" aria-label={menu.servicesMenu}>
                      {l.children.map((c) => (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            onClick={() => setOpen(false)}
                            aria-current={pathname === c.href ? "page" : undefined}
                            className={`block py-1.5 text-lg leading-snug transition-colors hover:text-primary ${pathname === c.href ? "text-primary" : "text-muted"}`}
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </motion.li>
              ))}
            </ul>
            <div className="mt-10 space-y-4">
              <Link href={contactHref} onClick={() => setOpen(false)} data-cta="menu_start_project" className="inline-block rounded-full bg-foreground px-6 py-4 text-[11px] font-bold tracking-widest text-white">
                {t.cta}
              </Link>
              <p className="text-xs uppercase tracking-widest text-primary">{contact.email}</p>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}

/**
 * Desktop "Services" disclosure menu: a button (aria-expanded) that reveals every service page plus
 * a link to the hub. Opens on click / Enter / Space / ArrowDown, and on hover for mouse users;
 * closes on Escape (focus returns to the button), outside click, focus leaving it, or navigation.
 */
function DropdownItem({
  link, items, menu, active, open, setOpen, pathname,
}: {
  link: NavLink; items: NavChild[]; menu: MenuStrings; active: boolean;
  open: boolean; setOpen: (v: boolean) => void; pathname: string;
}) {
  const id = useId();
  const root = useRef<HTMLLIElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  // True while the menu is open only because the mouse is over it — a click then pins it open
  // instead of toggling it shut under the cursor.
  const hoverOpened = useRef(false);

  useEffect(() => setOpen(false), [pathname, setOpen]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open, setOpen]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const focusFirst = () => requestAnimationFrame(() => root.current?.querySelector<HTMLAnchorElement>("[data-menu-item]")?.focus());

  return (
    <li
      ref={root}
      className="flex h-20 items-center"
      onPointerEnter={(e) => {
        if (e.pointerType !== "mouse") return;
        clearTimeout(closeTimer.current);
        if (!open) {
          hoverOpened.current = true;
          setOpen(true);
        }
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== "mouse") return;
        closeTimer.current = setTimeout(() => {
          if (root.current?.contains(document.activeElement) && !hoverOpened.current) return;
          hoverOpened.current = false;
          setOpen(false);
        }, 180);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          e.preventDefault();
          hoverOpened.current = false;
          setOpen(false);
          button.current?.focus();
        }
      }}
      onBlur={(e) => {
        if (!root.current?.contains(e.relatedTarget as Node | null)) {
          hoverOpened.current = false;
          setOpen(false);
        }
      }}
    >
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => {
          if (open && hoverOpened.current) hoverOpened.current = false;
          else setOpen(!open);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            hoverOpened.current = false;
            setOpen(true);
            focusFirst();
          }
        }}
        className={`group relative flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest ${active || open ? "text-primary" : ""}`}
      >
        {link.label}
        <ChevronDown size={12} aria-hidden className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        <span
          className={`absolute -bottom-1 start-0 h-px w-full bg-brand-gradient transition-transform duration-500 ease-premium ${
            active ? "scale-x-100" : "origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100"
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={id}
            key="panel"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="absolute inset-x-0 top-full border-b border-border bg-background shadow-[0_30px_60px_-30px_rgba(8,20,45,0.25)]"
          >
            <div className="mx-auto grid max-w-[1600px] gap-12 px-6 py-12 md:px-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-primary">{link.label}</p>
                <p className="mt-5 max-w-sm text-2xl font-medium leading-snug tracking-[-0.03em]">{menu.overview}</p>
                <Link
                  href={link.href}
                  data-menu-item
                  aria-current={pathname === link.href ? "page" : undefined}
                  className="mt-8 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-primary hover:underline"
                >
                  {menu.allServices}
                  <span aria-hidden className="inline-block rtl:-scale-x-100">→</span>
                </Link>
              </div>
              <ul className="grid gap-x-10 sm:grid-cols-2 lg:col-span-8">
                {items.map((c, i) => (
                  <li key={c.href} className="border-t border-border">
                    <Link
                      href={c.href}
                      data-menu-item
                      aria-current={pathname === c.href ? "page" : undefined}
                      className="group/item flex gap-5 py-5 focus-visible:outline-offset-4"
                    >
                      <span aria-hidden className="pt-1 text-[11px] font-medium tracking-widest text-primary">{String(i + 1).padStart(2, "0")}</span>
                      <span className="min-w-0">
                        <span className={`block text-lg font-medium tracking-[-0.02em] transition-colors group-hover/item:text-primary ${pathname === c.href ? "text-primary" : ""}`}>
                          {c.label}
                        </span>
                        {c.description && <span className="mt-1 line-clamp-2 block text-sm leading-relaxed text-muted">{c.description}</span>}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
