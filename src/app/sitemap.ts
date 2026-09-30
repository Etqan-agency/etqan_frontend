import type { MetadataRoute } from "next";
import { LOCALES, type Locale } from "@/i18n/config";
import { API_CACHE_TAG, API_URL, BLOG_MIN_POSTS, getPosts, getProjects, getServices } from "@/lib/api";
import { absoluteUrl, isIndexable, NOINDEX_SITE } from "@/lib/seo";

export const revalidate = 3600;

type Entry = { path: string; priority: number; lastModified?: string; locales?: Locale[] };

/**
 * Every indexable page, one entry per language with hreflang alternates. Pages flagged noindex
 * (dashboard) are left out, so the sitemap never advertises a page that asks not to be indexed.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (NOINDEX_SITE) return [];
  const [services, projects, postsEn, postsAr] = await Promise.all([getServices("en"), getProjects("en"), getPosts("en"), getPosts("ar")]);

  const entries: Entry[] = [
    { path: "/", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/projects", priority: 0.8 },
    { path: "/about", priority: 0.7 },
    { path: "/contact", priority: 0.8 },
    { path: "/privacy", priority: 0.3 },
    { path: "/terms", priority: 0.3 },
    ...services.filter((s) => isIndexable(s.seo?.noindex)).map((s) => ({ path: `/services/${s.slug}`, priority: 0.9, lastModified: s.updatedAt })),
    ...projects.filter((p) => isIndexable(p.seo?.noindex)).map((p) => ({ path: `/projects/${p.id}`, priority: 0.7, lastModified: p.updatedAt })),
  ];
  if (postsEn.length >= BLOG_MIN_POSTS || postsAr.length >= BLOG_MIN_POSTS) entries.push({ path: "/blog", priority: 0.6 });

  // Articles exist per language only when written in that language.
  const bySlug = new Map<string, { locales: Locale[]; lastModified?: string }>();
  for (const [locale, posts] of [["en", postsEn], ["ar", postsAr]] as const) {
    for (const p of posts.filter((x) => isIndexable(x.seo?.noindex))) {
      const e = bySlug.get(p.slug) ?? { locales: [], lastModified: p.updatedAt };
      e.locales.push(locale);
      bySlug.set(p.slug, e);
    }
  }
  bySlug.forEach((e, slug) => entries.push({ path: `/blog/${slug}`, priority: 0.6, lastModified: e.lastModified, locales: e.locales }));

  // Author pages (E-E-A-T): the backend lists only active authors with at least one published post.
  for (const a of await getSitemapAuthors()) entries.push({ path: `/authors/${a.slug}`, priority: 0.4, lastModified: a.updated_at });

  return entries.flatMap(({ path, priority, lastModified, locales = [...LOCALES] }) =>
    locales.map((locale) => ({
      url: absoluteUrl(locale, path),
      lastModified: lastModified ? new Date(lastModified) : new Date(),
      changeFrequency: "weekly" as const,
      priority,
      alternates: { languages: Object.fromEntries(locales.map((l) => [l, absoluteUrl(l, path)])) },
    })),
  );
}

async function getSitemapAuthors(): Promise<{ slug: string; updated_at?: string }[]> {
  if (!API_URL) return [];
  try {
    const res = await fetch(`${API_URL}/sitemap/`, { next: { revalidate: 3600, tags: [API_CACHE_TAG] } });
    if (!res.ok) return [];
    const data = (await res.json()) as { authors?: { slug: string; updated_at?: string }[] };
    return data.authors ?? [];
  } catch {
    return [];
  }
}
