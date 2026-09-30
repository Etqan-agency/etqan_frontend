import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import InnerPage from "@/components/detail/InnerPage";
import Breadcrumbs from "@/components/detail/Breadcrumbs";
import { getAuthor, type Author } from "@/lib/api";
import { redirectOrNotFound } from "@/lib/redirects";
import { absoluteUrl, jsonLd, pageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { formatDate } from "@/lib/format";
import { isLocale, localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";

export const revalidate = 60;

type Params = { params: Promise<{ locale: string; slug: string }> };

const COPY = {
  en: {
    articles: "Articles",
    noPosts: "No articles published yet.",
    profiles: "Profiles",
    description: (a: Author) => `Articles and insights by ${a.name}${a.role ? `, ${a.role}` : ""} at ETQAN.`,
  },
  ar: {
    articles: "المقالات",
    noPosts: "لا توجد مقالات منشورة بعد.",
    profiles: "الحسابات",
    description: (a: Author) => `مقالات ورؤى بقلم ${a.name}${a.role ? `، ${a.role}` : ""} في إتقان.`,
  },
} as const;

const absolute = (src: string) => (src.startsWith("http") ? src : `${SITE_URL}${src}`);

/** Short, readable label for a profile URL, e.g. "LinkedIn" or "github.com". */
function profileLabel(url: string): string {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    const known: Record<string, string> = {
      "linkedin.com": "LinkedIn", "github.com": "GitHub", "x.com": "X", "twitter.com": "X",
      "behance.net": "Behance", "dribbble.com": "Dribbble", "medium.com": "Medium", "youtube.com": "YouTube",
    };
    return known[host] ?? host;
  } catch {
    return url;
  }
}

const summary = (text: string, max = 160) => {
  const flat = text.replace(/\s+/g, " ").trim();
  return flat.length <= max ? flat : `${flat.slice(0, max - 1).trimEnd()}…`;
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const author = await getAuthor(slug, locale);
  if (!author) return {};
  const path = `/authors/${author.slug}`;
  const meta = pageMetadata({
    locale,
    path,
    title: author.role ? `${author.name} — ${author.role}` : author.name,
    description: author.bio ? summary(author.bio) : COPY[locale].description(author),
    image: author.photo,
    // A profile with nothing published yet is thin content.
    noindex: author.posts.length === 0,
  });
  return { ...meta, openGraph: { ...meta.openGraph, type: "profile" } };
}

export default async function AuthorPage({ params }: Params) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const author = await getAuthor(slug, locale);
  if (!author) return redirectOrNotFound(locale, `/authors/${slug}`);

  const t = getDictionary(locale);
  const b = t.blog;
  const c = COPY[locale];
  const path = `/authors/${author.slug}`;
  const url = absoluteUrl(locale, path);

  const schema = {
    "@type": "ProfilePage",
    url,
    inLanguage: locale,
    mainEntity: {
      "@type": "Person",
      "@id": `${url}#person`,
      name: author.name,
      url,
      ...(author.role ? { jobTitle: author.role } : {}),
      ...(author.photo ? { image: absolute(author.photo) } : {}),
      ...(author.bio ? { description: summary(author.bio, 300) } : {}),
      ...(author.sameAs.length ? { sameAs: author.sameAs } : {}),
      worksFor: { "@id": `${SITE_URL}/#organization` },
    },
    ...(author.posts.length
      ? {
          hasPart: author.posts.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            url: absoluteUrl(locale, `/blog/${p.slug}`),
            datePublished: p.publishedAt,
            author: { "@id": `${url}#person` },
          })),
        }
      : {}),
  };

  return (
    <InnerPage locale={locale} path={path} withContact={false}>
      <section className="px-6 pb-16 pt-16 md:px-10 md:pb-24 md:pt-24">
        <div className="mx-auto max-w-[1600px]">
          <Breadcrumbs
            items={[
              { name: t.detail.home, href: localePath(locale, "/") },
              { name: b.eyebrow, href: localePath(locale, "/blog") },
              { name: author.name, href: localePath(locale, path) },
            ]}
          />
          <div className="mt-12 flex flex-col gap-10 md:flex-row md:items-start">
            {author.photo && (
              <div className="relative aspect-square w-40 flex-none overflow-hidden rounded-sm bg-secondary md:w-56">
                <Image src={author.photo} alt={author.name} fill priority sizes="(min-width:768px) 224px, 160px" className="object-cover" />
              </div>
            )}
            <div className="min-w-0">
              <h1 className="text-5xl font-medium leading-[0.95] tracking-[-0.04em] md:text-7xl">{author.name}</h1>
              {author.role && <p className="mt-5 text-[11px] font-medium uppercase tracking-[0.3em] text-primary">{author.role}</p>}
              {author.bio && (
                <div className="mt-8 max-w-3xl space-y-4 text-lg leading-relaxed text-muted md:text-xl">
                  {author.bio.split(/\n{2,}/).map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              )}
              {author.sameAs.length > 0 && (
                <ul aria-label={c.profiles} className="mt-8 flex flex-wrap gap-3">
                  {author.sameAs.map((href) => (
                    <li key={href}>
                      <a
                        href={href}
                        target="_blank"
                        rel="me noopener noreferrer"
                        className="inline-block rounded-full border border-border px-4 py-2 text-[11px] font-bold uppercase tracking-widest transition-colors hover:border-primary hover:text-primary"
                      >
                        {profileLabel(href)}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-[1600px]">
          <h2 className="mb-10 text-4xl font-medium tracking-[-0.04em] md:text-5xl">{c.articles}</h2>
          {author.posts.length === 0 ? (
            <p className="text-lg text-muted">{c.noPosts}</p>
          ) : (
            <ul className="grid gap-12 md:grid-cols-2 xl:grid-cols-3">
              {author.posts.map((p) => (
                <li key={p.slug}>
                  <Link href={localePath(locale, `/blog/${p.slug}`)} className="group block">
                    {p.cover && (
                      <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-sm bg-secondary">
                        <Image src={p.cover} alt={p.title} fill sizes="(min-width:1280px) 30vw, (min-width:768px) 45vw, 100vw" className="object-cover transition-transform duration-700 ease-premium group-hover:scale-105" />
                      </div>
                    )}
                    <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-muted">
                      <time dateTime={p.publishedAt}>{formatDate(p.publishedAt, locale)}</time>
                    </p>
                    <h3 className="mt-3 text-2xl font-medium tracking-[-0.02em] transition-colors group-hover:text-primary md:text-3xl">{p.title}</h3>
                    {p.excerpt && <p className="mt-3 leading-relaxed text-muted">{p.excerpt}</p>}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <Link href={localePath(locale, "/blog")} className="mt-12 inline-block text-[11px] font-bold uppercase tracking-[0.3em] text-primary hover:underline">
            {b.all} →
          </Link>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
    </InnerPage>
  );
}
