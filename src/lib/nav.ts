import { blogIsLive, getServices } from "./api";
import { localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { getLegal } from "@/i18n/legal";

export type NavChild = { label: string; href: string; description: string };
/** A main-menu link. `children` turns it into a menu (desktop dropdown, nested list on mobile). */
export type NavLink = { label: string; href: string; children?: NavChild[] };

/**
 * Main navigation for a locale. Blog is listed only once it has enough published articles
 * (an empty blog in the menu reads as an abandoned site). Services carries every service page,
 * so visitors can jump straight to the one they need from anywhere.
 */
export async function getNav(locale: Locale, path: string) {
  const t = getDictionary(locale).nav;
  const menu = getLegal(locale).menu;
  const p = (x: string) => localePath(locale, x);
  const [showBlog, services] = await Promise.all([blogIsLive(locale), getServices(locale)]);
  const links: NavLink[] = [
    { label: t.about, href: p("/about") },
    {
      label: t.services,
      href: p("/services"),
      children: services.map((s) => ({ label: s.title, href: p(`/services/${s.slug}`), description: s.description })),
    },
    { label: t.projects, href: p("/projects") },
    ...(showBlog ? [{ label: t.blog, href: p("/blog") }] : []),
    { label: t.contact, href: p("/contact") },
  ];
  const other: Locale = locale === "ar" ? "en" : "ar";
  return {
    links,
    showBlog,
    menu,
    homeHref: p("/"),
    contactHref: p("/contact"),
    switchHref: localePath(other, path),
    switchLang: other,
  };
}
