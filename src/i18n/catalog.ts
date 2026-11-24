import ar from "./ar";
import en, { type Dictionary } from "./en";
import { getLegal, type LegalStrings } from "./legal";
import { LOCALES, type Locale } from "./config";
import { processFor } from "@/lib/data";
import type { TimelineItem } from "@/components/TimelineLayout";

/**
 * Every piece of built-in UI copy for a locale, as one tree. Its string leaves are addressed by flat dot
 * paths (arrays by index): `hero.h1Line1`, `faqs.items.0.question`, `legal.privacy.sections.2.list.0`,
 * `processSteps.3.title`. The dashboard stores overrides under those keys (`/api/site-copy/`), and
 * `/api/site-copy-catalog` lists them with their default text.
 */
export type CopyTree = Dictionary & { legal: LegalStrings; processSteps: TimelineItem[] };

export type CopyOverrides = Partial<Record<Locale, Record<string, string>>>;

const DICTIONARIES: Record<Locale, Dictionary> = { en, ar };

export const defaultCopy = (locale: Locale): CopyTree => ({
  ...DICTIONARIES[locale],
  legal: getLegal(locale),
  processSteps: processFor(locale),
});

/** Leaves that aren't visible copy (machine values) — never listed and never overridden. */
const NOT_COPY = new Set(["meta.ogLocale"]);

/** `{ flatKey: text }` for every string leaf of `tree`, in document order. */
export function flattenCopy(tree: unknown, prefix = "", out: Record<string, string> = {}): Record<string, string> {
  if (typeof tree === "string") {
    if (prefix && !NOT_COPY.has(prefix)) out[prefix] = tree;
  } else if (Array.isArray(tree)) {
    tree.forEach((v, i) => flattenCopy(v, prefix ? `${prefix}.${i}` : String(i), out));
  } else if (tree && typeof tree === "object") {
    for (const [k, v] of Object.entries(tree)) flattenCopy(v, prefix ? `${prefix}.${k}` : k, out);
  }
  return out;
}

/**
 * A copy of `tree` where each string leaf whose flat key has a non-empty string override is replaced.
 * Unknown keys are ignored, so overrides can never add, remove or reshape anything — only change text.
 */
export function applyCopyOverrides<T>(tree: T, overrides: Record<string, string> | undefined, prefix = ""): T {
  if (!overrides || !Object.keys(overrides).length) return tree;
  if (typeof tree === "string") {
    const v = prefix && !NOT_COPY.has(prefix) ? overrides[prefix] : undefined;
    return (typeof v === "string" && v.trim() ? v : tree) as T;
  }
  if (Array.isArray(tree)) {
    return tree.map((v, i) => applyCopyOverrides(v, overrides, prefix ? `${prefix}.${i}` : String(i))) as T;
  }
  if (tree && typeof tree === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(tree)) out[k] = applyCopyOverrides(v, overrides, prefix ? `${prefix}.${k}` : k);
    return out as T;
  }
  return tree;
}

/** Dashboard labels for the top-level groups, in the order the catalog lists them. */
const SECTION_LABELS: Record<keyof CopyTree, Record<Locale, string>> = {
  meta: { en: "Site title & description (SEO)", ar: "عنوان الموقع ووصفه (SEO)" },
  nav: { en: "Navigation", ar: "القائمة" },
  hero: { en: "Homepage hero", ar: "واجهة الصفحة الرئيسية" },
  brands: { en: "Technology strip", ar: "شريط التقنيات" },
  services: { en: "Homepage services", ar: "الخدمات في الصفحة الرئيسية" },
  work: { en: "Homepage selected work", ar: "الأعمال المختارة في الصفحة الرئيسية" },
  about: { en: "Homepage about", ar: "نبذة في الصفحة الرئيسية" },
  process: { en: "Process section", ar: "قسم طريقة العمل" },
  processSteps: { en: "Process steps", ar: "خطوات العمل" },
  contact: { en: "Contact section", ar: "قسم التواصل" },
  form: { en: "Contact form", ar: "نموذج التواصل" },
  footer: { en: "Footer", ar: "التذييل" },
  contactBar: { en: "Mobile contact bar", ar: "شريط التواصل للجوال" },
  consent: { en: "Cookie banner", ar: "شريط ملفات تعريف الارتباط" },
  aboutPage: { en: "About page", ar: "صفحة من نحن" },
  contactPage: { en: "Contact page", ar: "صفحة التواصل" },
  faqs: { en: "Contact page FAQs (fallback)", ar: "الأسئلة الشائعة في صفحة التواصل (احتياطي)" },
  thankYou: { en: "Thank-you page", ar: "صفحة الشكر" },
  detail: { en: "Services & projects pages", ar: "صفحات الخدمات والمشاريع" },
  blog: { en: "Blog", ar: "المدونة" },
  notFound: { en: "404 page", ar: "صفحة 404" },
  a11y: { en: "Accessibility labels", ar: "تسميات الوصول" },
  legal: { en: "Legal pages & services menu", ar: "الصفحات القانونية وقائمة الخدمات" },
};

export type CatalogSection = { key: string; label: Record<Locale, string>; count: number };
export type Catalog = Record<Locale, Record<string, string>> & { sections: CatalogSection[] };

export function buildCatalog(): Catalog {
  const flat = Object.fromEntries(LOCALES.map((l) => [l, flattenCopy(defaultCopy(l))])) as Record<Locale, Record<string, string>>;
  const topKeys = Object.keys(defaultCopy("en"));
  const ordered = [
    ...(Object.keys(SECTION_LABELS) as string[]).filter((k) => topKeys.includes(k)),
    ...topKeys.filter((k) => !(k in SECTION_LABELS)),
  ];
  const sections = ordered.map((key) => ({
    key,
    label: SECTION_LABELS[key as keyof CopyTree] ?? { en: key, ar: key },
    count: Object.keys(flat.en).filter((k) => k === key || k.startsWith(`${key}.`)).length,
  }));
  return { ...flat, sections };
}
