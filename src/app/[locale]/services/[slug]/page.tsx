import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import InnerPage from "@/components/detail/InnerPage";
import Breadcrumbs from "@/components/detail/Breadcrumbs";
import ProjectCard from "@/components/detail/ProjectCard";
import Faqs from "@/components/detail/Faqs";
import Process from "@/components/Process";
import { getFaqs, getProjects, getService, getServices, getSite } from "@/lib/api";
import { redirectOrNotFound } from "@/lib/redirects";
import { processFor } from "@/lib/data";
import { absoluteUrl, jsonLd, pageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { isLocale, localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";

export const revalidate = 60;

type Params = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) return [];
  return (await getServices(params.locale)).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const s = await getService(slug, locale);
  if (!s) return {};
  return pageMetadata({
    locale,
    path: `/services/${s.slug}`,
    title: s.seo?.metaTitle || s.title,
    description: s.seo?.metaDescription || s.description,
    image: s.seo?.ogImage,
    noindex: s.seo?.noindex,
    canonical: s.seo?.canonicalUrl,
  });
}

const paragraphs = (text?: string) => (text ?? "").split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

export default async function ServicePage({ params }: Params) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const [service, services, projects, faqs, site] = await Promise.all([
    getService(slug, locale), getServices(locale), getProjects(locale), getFaqs(slug, locale), getSite(locale),
  ]);
  if (!service) return redirectOrNotFound(locale, `/services/${slug}`);

  const t = getDictionary(locale);
  const d = t.detail;
  const path = `/services/${service.slug}`;
  const home = localePath(locale, "/");
  const servicesHub = localePath(locale, "/services");
  const related = projects.filter((p) => p.services?.includes(service.slug));
  const others = services.filter((s) => s.slug !== service.slug);
  const body = paragraphs(service.longDescription);

  const schema = {
    "@type": "Service",
    name: service.title,
    description: service.description,
    serviceType: service.title,
    url: absoluteUrl(locale, path),
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: ["EG", "SA", "AE"],
    availableLanguage: ["en", "ar"],
    inLanguage: locale,
  };

  return (
    <InnerPage locale={locale} path={path}>
      {/* Hero */}
      <section className="px-6 pb-16 pt-16 md:px-10 md:pb-24 md:pt-24">
        <div className="mx-auto max-w-[1600px]">
          <Breadcrumbs items={[{ name: d.home, href: home }, { name: d.services, href: servicesHub }, { name: service.title, href: localePath(locale, path) }]} />
          <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-primary">({service.id})</p>
              <h1 className="mt-6 text-5xl font-medium leading-[0.95] tracking-[-0.04em] md:text-8xl">{service.title}</h1>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted md:text-xl">{service.description}</p>
              <div className="mt-10 flex flex-wrap gap-4 text-[11px] font-bold tracking-widest">
                <a href="#contact" data-cta="service_get_proposal" className="rounded-full bg-foreground px-7 py-4 text-white transition-colors hover:bg-primary">{d.getProposal}</a>
                <a href={site.contact.whatsapp} target="_blank" rel="noreferrer" className="rounded-full border border-foreground px-7 py-4 transition-colors hover:border-primary hover:text-primary">{d.whatsapp}</a>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="duotone relative aspect-[4/3] overflow-hidden rounded-sm bg-secondary">
                <Image src={service.image} alt={service.title} fill priority sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview (dashboard long description) */}
      {body.length > 0 && (
        <section className="border-t border-border px-6 py-24 md:px-10 md:py-32">
          <div className="mx-auto grid max-w-[1600px] gap-12 md:grid-cols-12">
            <h2 className="text-[11px] font-medium uppercase tracking-[0.35em] text-muted md:col-span-3">{d.overview}</h2>
            <div className="space-y-6 text-xl leading-relaxed md:col-span-9 md:text-2xl">
              {body.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
            </div>
          </div>
        </section>
      )}

      {/* What's included */}
      {service.tags.length > 0 && (
        <section className="border-t border-border px-6 py-24 md:px-10 md:py-32">
          <div className="mx-auto grid max-w-[1600px] gap-12 md:grid-cols-12">
            <h2 className="text-4xl font-medium leading-[0.95] tracking-[-0.04em] md:col-span-4 md:text-6xl">{d.included}</h2>
            <ul className="grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 md:col-span-8">
              {service.tags.map((tag, i) => (
                <li key={tag} className="flex items-baseline gap-4 bg-background p-8">
                  <span className="text-[11px] font-medium tracking-widest text-primary">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-2xl font-medium tracking-tight">{tag}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Related work */}
      {related.length > 0 && (
        <section className="border-t border-border px-6 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-[1600px]">
            <h2 className="mb-12 text-4xl font-medium leading-[0.95] tracking-[-0.04em] md:text-6xl">{d.relatedWork}</h2>
            <div className="grid gap-8 lg:grid-cols-2">
              {related.map((p) => (
                <ProjectCard key={p.id} project={p} href={localePath(locale, `/projects/${p.id}`)} cta={d.viewCase} badge={p.ownership === "team" ? d.teamBadge : undefined} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Process items={processFor(locale)} t={t.process} />

      <Faqs heading={d.faqs} faqs={faqs} />

      {/* Other services */}
      <section className="border-t border-border px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1600px]">
          <h2 className="mb-10 text-[11px] font-medium uppercase tracking-[0.35em] text-muted">{d.otherServices}</h2>
          <ul>
            {others.map((s) => (
              <li key={s.slug} className="border-t border-border last:border-b">
                <Link href={localePath(locale, `/services/${s.slug}`)} className="group flex items-center justify-between gap-6 py-6 text-3xl font-medium tracking-[-0.03em] transition-colors hover:text-primary md:text-5xl">
                  {s.title}
                  <span aria-hidden className="text-primary transition-transform duration-500 group-hover:translate-x-2 rtl:-scale-x-100 rtl:group-hover:-translate-x-2">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
    </InnerPage>
  );
}
