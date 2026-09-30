import type { Metadata } from "next";
import { LOCALES, languageAlternates, localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { SITE_URL } from "./site";

/**
 * Pages are indexable by default now that they carry real copy. A page opts out with the dashboard's
 * "noindex" flag; NEXT_PUBLIC_NOINDEX_SITE=true keeps a whole staging deployment out of search.
 */
export const NOINDEX_SITE = process.env.NEXT_PUBLIC_NOINDEX_SITE === "true";

export const isIndexable = (noindex?: boolean) => !NOINDEX_SITE && !noindex;

export const absoluteUrl = (locale: Locale, path: string) => {
  const p = localePath(locale, path);
  return p === "/" ? SITE_URL : `${SITE_URL}${p}`;
};

export function pageMetadata({
  locale, path, title, description, image, noindex, absoluteTitle, canonical,
}: {
  locale: Locale; path: string; title: string; description: string; image?: string; noindex?: boolean;
  /** Dashboard "canonical URL" override (e.g. a syndicated article); defaults to this page. */
  canonical?: string;
  /** Use the title as-is (no " | ETQAN" suffix) — for titles that already contain the brand. */
  absoluteTitle?: boolean;
}): Metadata {
  const t = getDictionary(locale);
  const index = isIndexable(noindex);
  return {
    metadataBase: new URL(SITE_URL),
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: canonical || localePath(locale, path), languages: languageAlternates(path) },
    openGraph: {
      title,
      description,
      url: localePath(locale, path),
      locale: t.meta.ogLocale,
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => getDictionary(l).meta.ogLocale),
      type: "website",
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: { card: "summary_large_image", title, description, ...(image ? { images: [image] } : {}) },
    robots: { index, follow: true },
  };
}

/** Render a JSON-LD object safely. */
export const jsonLd = (data: unknown) => ({
  __html: JSON.stringify({ "@context": "https://schema.org", ...(data as object) }).replace(/</g, "\\u003c"),
});
