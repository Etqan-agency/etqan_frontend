import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import InnerPage from "@/components/detail/InnerPage";
import Breadcrumbs from "@/components/detail/Breadcrumbs";
import { BLOG_MIN_POSTS, getPosts } from "@/lib/api";
import { absoluteUrl, jsonLd, pageMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/format";
import { isLocale, localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";

export const revalidate = 60;

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const b = getDictionary(locale).blog;
  const posts = await getPosts(locale);
  // A near-empty blog index shouldn't be indexed; each article is indexable on its own.
  return pageMetadata({ locale, path: "/blog", title: b.metaTitle, description: b.metaDescription, absoluteTitle: true, noindex: posts.length < BLOG_MIN_POSTS });
}

export default async function BlogIndex({ params }: Params) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const t = getDictionary(locale);
  const b = t.blog;
  const posts = await getPosts(locale);

  const schema = {
    "@type": "Blog",
    name: b.metaTitle,
    url: absoluteUrl(locale, "/blog"),
    inLanguage: locale,
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: absoluteUrl(locale, `/blog/${p.slug}`),
      datePublished: p.publishedAt,
      ...(p.byline
        ? { author: { "@type": "Person", name: p.byline.name, ...(p.byline.slug ? { url: absoluteUrl(locale, `/authors/${p.byline.slug}`) } : {}) } }
        : {}),
    })),
  };

  return (
    <InnerPage locale={locale} path="/blog">
      <section className="px-6 pb-16 pt-16 md:px-10 md:pt-24">
        <div className="mx-auto max-w-[1600px]">
          <Breadcrumbs items={[{ name: t.detail.home, href: localePath(locale, "/") }, { name: b.eyebrow, href: localePath(locale, "/blog") }]} />
          <h1 className="mt-12 max-w-5xl text-5xl font-medium leading-[0.95] tracking-[-0.04em] md:text-8xl">{b.h1}</h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">{b.intro}</p>
        </div>
      </section>
      <section className="border-t border-border px-6 py-16 md:px-10 md:py-24">
        {posts.length === 0 ? (
          <p className="mx-auto max-w-[1600px] text-lg text-muted">{b.empty}</p>
        ) : (
          <ul className="mx-auto grid max-w-[1600px] gap-12 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link href={localePath(locale, `/blog/${p.slug}`)} className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-secondary">
                    {p.cover && <Image src={p.cover} alt={p.title} fill sizes="(min-width:1280px) 30vw, (min-width:768px) 45vw, 100vw" className="object-cover transition-transform duration-700 ease-premium group-hover:scale-105" />}
                  </div>
                  <p className="mt-5 text-[11px] font-medium uppercase tracking-[0.3em] text-muted">
                    {p.tags[0]?.name && <span className="text-primary">{p.tags[0].name} · </span>}
                    {formatDate(p.publishedAt, locale)} · {p.readingMinutes} {b.minRead}
                  </p>
                  <h2 className="mt-3 text-2xl font-medium tracking-[-0.02em] transition-colors group-hover:text-primary md:text-3xl">{p.title}</h2>
                  {p.excerpt && <p className="mt-3 leading-relaxed text-muted">{p.excerpt}</p>}
                </Link>
                {p.byline && (
                  <p className="mt-4 text-sm text-muted">
                    {b.by}{" "}
                    {p.byline.slug ? (
                      <Link href={localePath(locale, `/authors/${p.byline.slug}`)} rel="author" className="font-medium text-foreground transition-colors hover:text-primary">
                        {p.byline.name}
                      </Link>
                    ) : (
                      <span className="font-medium text-foreground">{p.byline.name}</span>
                    )}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
    </InnerPage>
  );
}
