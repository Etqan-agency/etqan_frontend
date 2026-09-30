export const LOCALES = ["en", "ar"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export const isLocale = (v: string): v is Locale => (LOCALES as readonly string[]).includes(v);

export const dirOf = (locale: Locale) => (locale === "ar" ? "rtl" : "ltr");

/** Public URL of a path in a locale. English lives at the root, Arabic under /ar. */
export function localePath(locale: Locale, path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) return clean;
  return clean === "/" ? `/${locale}` : `/${locale}${clean}`;
}

/** hreflang map for a path, for `alternates.languages`. */
export function languageAlternates(path = "/") {
  return {
    en: localePath("en", path),
    ar: localePath("ar", path),
    "x-default": localePath("en", path),
  };
}
