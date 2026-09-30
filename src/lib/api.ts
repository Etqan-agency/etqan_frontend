import type { Locale } from "@/i18n/config";
import {
  GALLERY_ALT_AR, PLATFORM_AR, PROJECTS, PROJECTS_AR, PROJECT_SERVICES, SERVICES, SERVICES_AR, SITE, SITE_AR, canonicalServiceSlug, whatsappLink,
  type Faq, type Project, type Result, type Seo, type Service, type SiteContent,
} from "./data";

/** Public byline of a blog post; `slug` is set when the author has a profile page (/authors/<slug>). */
export type PostAuthor = { name: string; slug?: string; role?: string; photo?: string; bio?: string; sameAs: string[] };

export type Post = {
  slug: string; title: string; excerpt: string; body: string; cover?: string;
  tags: { name: string; slug: string }[];
  /** Author display name (kept as a plain string for simple uses). */
  author?: string;
  byline?: PostAuthor;
  publishedAt?: string; updatedAt?: string; readingMinutes: number; seo?: Seo;
};

export type AuthorPostRef = { slug: string; title: string; excerpt: string; cover?: string; publishedAt?: string };
export type Author = PostAuthor & { slug: string; posts: AuthorPostRef[] };

/** Django API root, e.g. http://localhost:8000/api */
export const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") ?? "";

/**
 * Cache tag on every API request. On-demand revalidation (app/api/revalidate) expires it, so content saved
 * in the dashboard shows up on the next request instead of after the 60-second window.
 */
export const API_CACHE_TAG = "etqan-api";

/** How often (seconds) a page re-reads content edited in the dashboard. */
const REVALIDATE = 60;

type Paginated<T> = { results: T[] };

type ApiSeo = { meta_title?: string; meta_description?: string; og_image?: string | null; noindex?: boolean; canonical_url?: string; updated_at?: string };

// `*_ar` fields are the dashboard's Arabic twins; blank means "not translated yet".
type ApiService = ApiSeo & {
  id: string; slug: string; title: string; short_description: string; long_description?: string;
  features: string[]; image: string | null; order: number;
  title_ar?: string; short_description_ar?: string; long_description_ar?: string; features_ar?: string[];
};
type ApiProject = ApiSeo & {
  id: string; slug: string; title: string; category_display: string; summary: string; description: string;
  cover_image: string | null; cover_width: number | null; cover_height: number | null; tech_stack: string[]; live_url: string;
  title_ar?: string; summary_ar?: string; description_ar?: string; tech_stack_ar?: string[];
  services?: { slug: string }[];
  challenge?: string; solution?: string; architecture?: string; results?: Result[];
  challenge_ar?: string; solution_ar?: string; architecture_ar?: string; results_ar?: Result[];
  industry?: string; industry_ar?: string; country?: string; country_ar?: string;
  duration?: string; duration_ar?: string; year?: number | null;
  testimonial?: { quote: string; author_name: string; author_role?: string; avatar?: string | null } | null;
  ownership?: "etqan" | "team"; contribution?: string; contribution_ar?: string; is_featured?: boolean;
  gallery?: { image: string; caption?: string; caption_ar?: string; width?: number | null; height?: number | null; order?: number }[];
  play_store_url?: string; app_store_url?: string;
};
type ApiAuthor = {
  name: string; slug: string | null; role?: string; photo?: string | null; bio?: string; same_as?: string[];
  name_ar?: string; role_ar?: string; bio_ar?: string;
};
type ApiAuthorDetail = ApiAuthor & {
  slug: string;
  posts: {
    slug: string; title: string; title_ar?: string; excerpt?: string; excerpt_ar?: string;
    cover_image?: string | null; published_at: string | null; has_arabic?: boolean;
  }[];
};
type ApiPost = ApiSeo & {
  slug: string; title: string; excerpt: string; body: string; cover_image: string | null;
  tags: { name: string; slug: string }[]; author: ApiAuthor | null;
  published_at: string | null; updated_at: string;
  title_ar?: string; excerpt_ar?: string; body_ar?: string; meta_title_ar?: string; meta_description_ar?: string;
};
type ApiSettings = {
  hero_subtitle: string; announcement_text: string; company_about: string;
  mission?: string; vision?: string; mission_ar?: string; vision_ar?: string;
  contact_email: string; contact_phone: string; address: string; social_links: Record<string, string>;
  hero_subtitle_ar?: string; announcement_text_ar?: string; company_about_ar?: string; address_ar?: string;
};
type ApiFaq = { question: string; answer: string };

async function get<T>(path: string): Promise<T | null> {
  if (!API_URL) return null;
  try {
    const res = await fetch(`${API_URL}${path}`, { next: { revalidate: REVALIDATE, tags: [API_CACHE_TAG] } });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await res.json()) as T;
  } catch (err) {
    console.warn(`[api] ${path} unavailable, using fallback content:`, (err as Error).message);
    return null;
  }
}

/** First non-empty value — lets Arabic fall back from dashboard → built-in Arabic → English. */
const pick = (...values: (string | undefined | null)[]) => values.find((v) => v && v.trim()) ?? "";
const pickList = <T,>(...lists: (T[] | undefined | null)[]): T[] => lists.find((l) => l && l.length) ?? [];
const lines = (text?: string) => (text ?? "").split("\n").map((l) => l.trim()).filter(Boolean);
const langParam = (locale: Locale, sep: "?" | "&") => (locale === "ar" ? `${sep}lang=ar` : "");

const seoOf = (s: ApiSeo): Seo => ({
  metaTitle: s.meta_title || undefined,
  metaDescription: s.meta_description || undefined,
  ogImage: s.og_image || undefined,
  noindex: s.noindex ?? false,
  canonicalUrl: s.canonical_url || undefined,
});

/* ----------------------------- Services ----------------------------- */

function localizeService(s: Service, locale: Locale): Service {
  if (locale !== "ar") return s;
  const ar = SERVICES_AR[canonicalServiceSlug(s.slug)];
  return ar ? { ...s, ...ar } : s;
}

function mapService(s: ApiService, i: number, locale: Locale): Service {
  const base: Service = {
    id: String(i + 1).padStart(2, "0"),
    slug: s.slug,
    title: s.title,
    description: s.short_description,
    tags: s.features ?? [],
    image: s.image || `/images/services/${canonicalServiceSlug(s.slug)}.webp`,
    longDescription: s.long_description || SERVICES.find((x) => x.slug === canonicalServiceSlug(s.slug))?.longDescription,
    seo: seoOf(s),
    updatedAt: s.updated_at,
  };
  if (locale !== "ar") return base;
  const fallback = localizeService(base, "ar");
  return {
    ...base,
    title: pick(s.title_ar, fallback.title),
    description: pick(s.short_description_ar, fallback.description),
    tags: pickList(s.features_ar, fallback.tags),
    // Never show English body copy on an Arabic page.
    longDescription: pick(s.long_description_ar, fallback.longDescription) || undefined,
  };
}

export async function getServices(locale: Locale = "en"): Promise<Service[]> {
  const data = await get<Paginated<ApiService>>("/services/?page_size=100");
  if (!data?.results.length) return SERVICES.map((s) => localizeService(s, locale));
  return data.results.map((s, i) => mapService(s, i, locale));
}

export async function getService(slug: string, locale: Locale = "en"): Promise<Service | null> {
  if (API_URL) {
    try {
      const res = await fetch(`${API_URL}/services/${encodeURIComponent(slug)}/`, { next: { revalidate: REVALIDATE, tags: [API_CACHE_TAG] } });
      // 404 = renamed or removed: let the caller redirect/404 rather than serving a stale copy.
      if (res.status === 404) return null;
      if (res.ok) {
        const s = (await res.json()) as ApiService;
        const position = (await getServices(locale)).findIndex((x) => x.slug === s.slug);
        return mapService(s, Math.max(position, 0), locale);
      }
    } catch (err) {
      console.warn(`[api] service ${slug} unavailable, using fallback content:`, (err as Error).message);
    }
  }
  const all = await getServices(locale);
  return all.find((s) => s.slug === slug) ?? null;
}

/* ----------------------------- Projects ----------------------------- */

function localizeProject(p: Project, locale: Locale): Project {
  // Fill fields the dashboard hasn't filled yet from the built-in content for the same project.
  const local = PROJECTS.find((x) => x.id === p.id);
  const filled: Project = {
    ...p,
    contribution: p.contribution || local?.contribution,
    technologies: p.technologies?.length ? p.technologies : local?.technologies,
    results: p.results?.length ? p.results : local?.results,
    ownership: p.ownership ?? local?.ownership ?? "etqan",
    gallery: p.gallery?.length
      ? p.gallery
      : local?.gallery?.map((g, i) => ({ ...g, alt: locale === "ar" ? GALLERY_ALT_AR[p.id]?.[i] ?? g.alt : g.alt })),
  };
  const withServices = { ...filled, services: filled.services?.length ? filled.services : PROJECT_SERVICES[p.id] ?? [] };
  if (locale !== "ar") return withServices;
  const ar = PROJECTS_AR[p.id];
  return ar ? { ...withServices, ...ar } : withServices;
}

function mapProject(p: ApiProject, locale: Locale): Project {
  const base: Project = {
    id: p.slug,
    title: p.title,
    category: (p.tech_stack ?? []).join(" · ") || p.category_display,
    platform: p.category_display,
    image: p.cover_image ? { src: p.cover_image, width: p.cover_width ?? 1600, height: p.cover_height ?? 900 } : undefined,
    summary: p.summary,
    features: lines(p.description),
    scope: p.tech_stack ?? [],
    liveUrl: p.live_url || undefined,
    services: p.services?.map((s) => s.slug) ?? [],
    challenge: p.challenge || undefined,
    solution: p.solution || undefined,
    architecture: p.architecture || undefined,
    results: p.results ?? [],
    industry: p.industry || undefined,
    country: p.country || undefined,
    duration: p.duration || undefined,
    year: p.year ?? null,
    testimonial: p.testimonial
      ? { quote: p.testimonial.quote, author: p.testimonial.author_name, role: p.testimonial.author_role, avatar: p.testimonial.avatar ?? undefined }
      : null,
    seo: seoOf(p),
    ownership: p.ownership ?? "etqan",
    contribution: p.contribution || undefined,
    technologies: p.tech_stack ?? [],
    playStoreUrl: p.play_store_url || undefined,
    appStoreUrl: p.app_store_url || undefined,
    featured: p.is_featured ?? false,
    updatedAt: p.updated_at,
    gallery: (p.gallery ?? [])
      .slice()
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map((g, i) => ({
        src: g.image,
        width: g.width ?? 900,
        height: g.height ?? 1600,
        alt:
          (locale === "ar" ? g.caption_ar || GALLERY_ALT_AR[p.slug]?.[i] : g.caption) ||
          `${p.title} — ${i + 1}`,
      })),
  };
  if (locale !== "ar") return localizeProject(base, "en");
  const fallback = localizeProject(base, "ar");
  const tech = p.tech_stack_ar ?? [];
  return {
    ...fallback,
    title: pick(p.title_ar, p.title),
    summary: pick(p.summary_ar, fallback.summary),
    features: p.description_ar?.trim() ? lines(p.description_ar) : fallback.features,
    scope: pickList(tech, fallback.scope),
    category: tech.length ? tech.join(" · ") : fallback.category,
    platform: PLATFORM_AR[p.category_display] ?? fallback.platform,
    contribution: pick(p.contribution_ar, fallback.contribution) || undefined,
    // Long-form case-study text is shown in Arabic only when it has been translated.
    challenge: p.challenge_ar?.trim() || undefined,
    solution: p.solution_ar?.trim() || undefined,
    architecture: p.architecture_ar?.trim() || undefined,
    results: p.results_ar ?? [],
    industry: p.industry_ar || undefined,
    country: p.country_ar || undefined,
    duration: p.duration_ar || undefined,
  };
}

export async function getProjects(locale: Locale = "en"): Promise<Project[]> {
  const data = await get<Paginated<ApiProject>>(`/projects/?page_size=100${langParam(locale, "&")}`);
  if (!data?.results.length) return PROJECTS.map((p) => localizeProject(p, locale));
  // Featured projects lead (dashboard "featured" flag), otherwise keep the dashboard order.
  const mapped = data.results.map((p) => mapProject(p, locale));
  return [...mapped.filter((p) => p.featured), ...mapped.filter((p) => !p.featured)];
}

export async function getProject(slug: string, locale: Locale = "en"): Promise<Project | null> {
  if (API_URL) {
    try {
      const res = await fetch(`${API_URL}/projects/${encodeURIComponent(slug)}/${langParam(locale, "?")}`, { next: { revalidate: REVALIDATE, tags: [API_CACHE_TAG] } });
      // The API is the source of truth: a 404 means the slug is gone (maybe renamed → redirect), so don't
      // fall back to a possibly stale list and serve the old URL as a duplicate page.
      if (res.status === 404) return null;
      if (res.ok) {
        const p = (await res.json()) as ApiProject;
        return mapProject(p, locale);
      }
    } catch (err) {
      console.warn(`[api] project ${slug} unavailable, using fallback content:`, (err as Error).message);
    }
  }
  const all = await getProjects(locale);
  return all.find((p) => p.id === slug) ?? null;
}

/* ------------------------------- FAQs ------------------------------- */

export async function getFaqs(serviceSlug: string, locale: Locale = "en"): Promise<Faq[]> {
  const data = await get<Paginated<ApiFaq> | ApiFaq[]>(
    `/faqs/?service=${encodeURIComponent(serviceSlug)}&page_size=100${langParam(locale, "&")}`,
  );
  const rows = Array.isArray(data) ? data : data?.results ?? [];
  return rows.filter((f) => f.question && f.answer).map((f) => ({ question: f.question, answer: f.answer }));
}

/* ------------------------------- Blog ------------------------------- */

function mapAuthor(a: ApiAuthor, locale: Locale): PostAuthor {
  const ar = locale === "ar";
  return {
    name: (ar ? pick(a.name_ar, a.name) : a.name) || "",
    slug: a.slug || undefined,
    role: (ar ? pick(a.role_ar, a.role) : a.role) || undefined,
    photo: a.photo || undefined,
    // Never show an English bio on an Arabic page.
    bio: (ar ? a.bio_ar?.trim() : a.bio?.trim()) || undefined,
    sameAs: (a.same_as ?? []).filter((u) => /^https?:\/\//.test(u)),
  };
}

const readingMinutes = (text: string) => Math.max(1, Math.round(text.trim().split(/\s+/).length / 200));

function mapPost(p: ApiPost, locale: Locale): Post | null {
  const ar = locale === "ar";
  // An Arabic page only shows a post that has actually been written in Arabic.
  const title = ar ? p.title_ar?.trim() : p.title;
  const body = ar ? p.body_ar?.trim() : p.body;
  if (!title || !body) return null;
  return {
    slug: p.slug,
    title,
    excerpt: (ar ? p.excerpt_ar : p.excerpt) || "",
    body,
    cover: p.cover_image || undefined,
    tags: p.tags ?? [],
    author: p.author ? mapAuthor(p.author, locale).name || undefined : undefined,
    byline: p.author?.name ? mapAuthor(p.author, locale) : undefined,
    publishedAt: p.published_at || undefined,
    updatedAt: p.updated_at,
    readingMinutes: readingMinutes(body),
    seo: {
      metaTitle: (ar ? p.meta_title_ar : p.meta_title) || undefined,
      metaDescription: (ar ? p.meta_description_ar : p.meta_description) || undefined,
      ogImage: p.og_image || undefined,
      noindex: p.noindex ?? false,
    },
  };
}

export async function getPosts(locale: Locale = "en"): Promise<Post[]> {
  const data = await get<Paginated<ApiPost>>("/blog/?page_size=100");
  return (data?.results ?? []).map((p) => mapPost(p, locale)).filter((p): p is Post => p !== null);
}

export async function getPost(slug: string, locale: Locale = "en"): Promise<Post | null> {
  if (!API_URL) return null;
  try {
    const res = await fetch(`${API_URL}/blog/${encodeURIComponent(slug)}/`, { next: { revalidate: REVALIDATE, tags: [API_CACHE_TAG] } });
    if (!res.ok) return null;
    return mapPost((await res.json()) as ApiPost, locale);
  } catch {
    return null;
  }
}

/** An author's profile and published posts; null when the author doesn't exist (or is hidden). */
export async function getAuthor(slug: string, locale: Locale = "en"): Promise<Author | null> {
  const a = await get<ApiAuthorDetail>(`/authors/${encodeURIComponent(slug)}/`);
  if (!a?.slug) return null;
  const ar = locale === "ar";
  const posts = (a.posts ?? [])
    // Arabic pages only link to posts that have actually been written in Arabic.
    .filter((p) => (ar ? p.has_arabic && p.title_ar?.trim() : p.title))
    .map((p) => ({
      slug: p.slug,
      title: (ar ? p.title_ar?.trim() : p.title) || "",
      excerpt: (ar ? p.excerpt_ar : p.excerpt) || "",
      cover: p.cover_image || undefined,
      publishedAt: p.published_at || undefined,
    }));
  return { ...mapAuthor(a, locale), slug: a.slug, posts };
}

/** The blog appears in navigation only once it has enough articles to look alive. */
export const BLOG_MIN_POSTS = 3;
export async function blogIsLive(locale: Locale): Promise<boolean> {
  return (await getPosts(locale)).length >= BLOG_MIN_POSTS;
}

/* ------------------------------- Team ------------------------------- */

export type TeamMember = { name: string; role: string; bio?: string; photo?: string; socials: Record<string, string> };
type ApiTeamMember = { name: string; role: string; role_ar?: string; bio?: string; bio_ar?: string; photo?: string | null; socials?: Record<string, string> };

export async function getTeam(locale: Locale = "en"): Promise<TeamMember[]> {
  const data = await get<Paginated<ApiTeamMember>>("/team/?page_size=100");
  const ar = locale === "ar";
  return (data?.results ?? []).map((m) => ({
    name: m.name,
    role: (ar ? pick(m.role_ar, m.role) : m.role) || "",
    bio: (ar ? m.bio_ar?.trim() : m.bio) || undefined,
    photo: m.photo || undefined,
    socials: m.socials ?? {},
  }));
}

/** Mission & vision from the dashboard (Settings); blank means "use the site's default copy". */
export async function getMissionVision(locale: Locale = "en"): Promise<{ mission?: string; vision?: string }> {
  const s = await get<ApiSettings>("/settings/");
  if (!s) return {};
  const ar = locale === "ar";
  return {
    mission: (ar ? s.mission_ar?.trim() : s.mission?.trim()) || undefined,
    vision: (ar ? s.vision_ar?.trim() : s.vision?.trim()) || undefined,
  };
}

/* ------------------------------- Site ------------------------------- */

/** Display names for social keys entered in the dashboard (e.g. "linkedin" → "LinkedIn"). */
const SOCIAL_LABELS: Record<string, string> = {
  linkedin: "LinkedIn", facebook: "Facebook", instagram: "Instagram", x: "X", twitter: "X", tiktok: "TikTok",
  youtube: "YouTube", behance: "Behance", dribbble: "Dribbble", github: "GitHub", whatsapp: "WhatsApp", snapchat: "Snapchat",
};
const socialLabel = (key: string) => SOCIAL_LABELS[key.trim().toLowerCase()] ?? key.charAt(0).toUpperCase() + key.slice(1);

export async function getSite(locale: Locale = "en"): Promise<SiteContent> {
  const fallback = locale === "ar" ? SITE_AR : SITE;
  const s = await get<ApiSettings>("/settings/");
  if (!s) return fallback;
  const phone = s.contact_phone || SITE.contact.phone;
  const ar = locale === "ar";
  return {
    // Settings loaded: an empty announcement hides the hero badge. Arabic never shows English text:
    // it uses the Arabic announcement, else the built-in Arabic badge (only while an announcement is set).
    badge: ar
      ? (s.announcement_text ?? "").trim() || s.announcement_text_ar?.trim()
        ? pick(s.announcement_text_ar, fallback.badge)
        : ""
      : (s.announcement_text ?? "").trim(),
    subtitle: ar ? pick(s.hero_subtitle_ar, fallback.subtitle) : pick(s.hero_subtitle, fallback.subtitle),
    about: ar ? pick(s.company_about_ar, fallback.about) : pick(s.company_about, fallback.about),
    contact: {
      email: s.contact_email || SITE.contact.email,
      phone,
      whatsapp: whatsappLink(phone),
      address: ar ? pick(s.address_ar, fallback.contact.address) : pick(s.address, fallback.contact.address),
      socials: Object.entries(s.social_links ?? {})
        .filter(([, href]) => href)
        .map(([key, href]) => ({ label: socialLabel(key), href })),
    },
  };
}
