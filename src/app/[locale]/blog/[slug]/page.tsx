import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import InnerPage from "@/components/detail/InnerPage";
import Breadcrumbs from "@/components/detail/Breadcrumbs";
import { getPost, getPosts } from "@/lib/api";
import { redirectOrNotFound } from "@/lib/redirects";
import { absoluteUrl, jsonLd, pageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { isLocale, localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { formatDate } from "@/lib/format";

export const revalidate = 60;

type Params = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) return [];
  return (await getPosts(params.locale)).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const post = await getPost(slug, locale);
  if (!post) return {};
  const meta = pageMetadata({
    locale,
    path: `/blog/${post.slug}`,
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    image: post.seo?.ogImage || post.cover,
    noindex: post.seo?.noindex,
    canonical: post.seo?.canonicalUrl,
  });
  return {
    ...meta,
    openGraph: { ...meta.openGraph, type: "article", publishedTime: post.publishedAt, modifiedTime: post.updatedAt, authors: post.byline ? [post.byline.slug ? absoluteUrl(locale, `/authors/${post.byline.slug}`) : post.byline.name] : undefined },
  };
}

export default async function BlogPostPage({ params }: Params) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const [post, all] = await Promise.all([getPost(slug, locale), getPosts(locale)]);
  if (!post) return redirectOrNotFound(locale, `/blog/${slug}`);

  const t = getDictionary(locale);
  const b = t.blog;
  const path = `/blog/${post.slug}`;
  const authorPath = post.byline?.slug ? `/authors/${post.byline.slug}` : undefined;
  const tagSlugs = new Set(post.tags.map((x) => x.slug));
  const related = all
    .filter((p) => p.slug !== post.slug)
    .sort((x, y) => y.tags.filter((g) => tagSlugs.has(g.slug)).length - x.tags.filter((g) => tagSlugs.has(g.slug)).length)
    .slice(0, 3);

  const schema = {
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url: absoluteUrl(locale, path),
    mainEntityOfPage: absoluteUrl(locale, path),
    inLanguage: locale,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    ...(post.cover ? { image: post.cover.startsWith("http") ? post.cover : `${SITE_URL}${post.cover}` } : {}),
    author: post.byline
      ? {
          "@type": "Person",
          name: post.byline.name,
          ...(authorPath ? { url: absoluteUrl(locale, authorPath) } : {}),
          ...(post.byline.sameAs.length ? { sameAs: post.byline.sameAs } : {}),
          ...(post.byline.role ? { jobTitle: post.byline.role } : {}),
          worksFor: { "@id": `${SITE_URL}/#organization` },
        }
      : { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    keywords: post.tags.map((x) => x.name).join(", ") || undefined,
  };

  return (
    <InnerPage locale={locale} path={path}>
      <article>
        <header className="px-6 pb-12 pt-16 md:px-10 md:pt-24">
          <div className="mx-auto max-w-3xl">
            <Breadcrumbs items={[{ name: t.detail.home, href: localePath(locale, "/") }, { name: b.eyebrow, href: localePath(locale, "/blog") }, { name: post.title, href: localePath(locale, path) }]} />
            <p className="mt-12 text-[11px] font-medium uppercase tracking-[0.3em] text-muted">
              {post.tags[0]?.name && <span className="text-primary">{post.tags[0].name} · </span>}
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, locale)}</time> · {post.readingMinutes} {b.minRead}
            </p>
            <h1 className="mt-6 text-4xl font-medium leading-[1.05] tracking-[-0.03em] md:text-6xl">{post.title}</h1>
            {post.excerpt && <p className="mt-6 text-xl leading-relaxed text-muted">{post.excerpt}</p>}
            {post.byline && (
              <p className="mt-6 text-sm">
                {b.by}{" "}
                {authorPath ? (
                  <Link href={localePath(locale, authorPath)} rel="author" className="font-medium underline-offset-4 transition-colors hover:text-primary hover:underline">
                    {post.byline.name}
                  </Link>
                ) : (
                  <span className="font-medium">{post.byline.name}</span>
                )}
                {post.byline.role && <span className="text-muted"> · {post.byline.role}</span>}
              </p>
            )}
          </div>
        </header>
        {post.cover && (
          <div className="px-4 md:px-10">
            <div className="relative mx-auto aspect-[16/9] max-w-5xl overflow-hidden rounded-2xl bg-secondary">
              <Image src={post.cover} alt={post.title} fill priority sizes="(min-width:1024px) 1024px, 100vw" className="object-cover" />
            </div>
          </div>
        )}
        <div className="prose-etqan mx-auto max-w-3xl px-6 py-16 md:py-24">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-border px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-[1600px]">
            <h2 className="mb-10 text-4xl font-medium tracking-[-0.04em] md:text-5xl">{b.related}</h2>
            <ul className="grid gap-10 md:grid-cols-3">
              {related.map((p) => (
                <li key={p.slug}>
                  <Link href={localePath(locale, `/blog/${p.slug}`)} className="group block">
                    <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-muted">{formatDate(p.publishedAt, locale)}</p>
                    <h3 className="mt-3 text-2xl font-medium transition-colors group-hover:text-primary">{p.title}</h3>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
    </InnerPage>
  );
}
