import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import InnerPage from "@/components/detail/InnerPage";
import Breadcrumbs from "@/components/detail/Breadcrumbs";
import { getProject, getProjects, getServices } from "@/lib/api";
import { redirectOrNotFound } from "@/lib/redirects";
import { absoluteUrl, jsonLd, pageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { isLocale, localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";

export const revalidate = 60;

type Params = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) return [];
  return (await getProjects(params.locale)).map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const p = await getProject(slug, locale);
  if (!p) return {};
  const d = getDictionary(locale).detail;
  const kind = p.ownership === "team" ? d.teamBadge : d.etqanProjects;
  return pageMetadata({
    locale,
    path: `/projects/${p.id}`,
    title: p.seo?.metaTitle || `${p.title} — ${p.category.split(" · ")[0]} · ${kind}`,
    description: p.seo?.metaDescription || p.summary,
    image: p.seo?.ogImage || p.image?.src,
    noindex: p.seo?.noindex,
    canonical: p.seo?.canonicalUrl,
  });
}

const paragraphs = (text?: string) => (text ?? "").split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

function TextBlock({ heading, text }: { heading: string; text?: string }) {
  const body = paragraphs(text);
  if (!body.length) return null;
  return (
    <section className="border-t border-border px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-[1600px] gap-10 md:grid-cols-12">
        <h2 className="text-[11px] font-medium uppercase tracking-[0.35em] text-primary md:col-span-3">{heading}</h2>
        <div className="space-y-6 text-xl leading-relaxed md:col-span-8 md:text-2xl">
          {body.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
        </div>
      </div>
    </section>
  );
}

export default async function ProjectPage({ params }: Params) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const [project, projects, services] = await Promise.all([getProject(slug, locale), getProjects(locale), getServices(locale)]);
  if (!project) return redirectOrNotFound(locale, `/projects/${slug}`);

  const d = getDictionary(locale).detail;
  const path = `/projects/${project.id}`;
  const home = localePath(locale, "/");
  const hub = localePath(locale, "/projects");
  const team = project.ownership === "team";
  const portrait = project.image ? project.image.height > project.image.width : false;
  const usedServices = services.filter((s) => project.services?.includes(s.slug));
  const idx = projects.findIndex((p) => p.id === project.id);
  const next = projects.length > 1 ? projects[(idx + 1) % projects.length] : null;
  const tech = project.technologies?.length ? project.technologies : [];

  const facts = [
    { label: d.platform, value: project.platform },
    { label: d.industry, value: project.industry },
    { label: d.country, value: project.country },
    { label: d.year, value: project.year ? String(project.year) : undefined },
    { label: d.duration, value: project.duration },
  ].filter((f) => f.value);

  const schema = {
    "@type": project.platform.match(/iOS|Android/) ? "SoftwareApplication" : "CreativeWork",
    name: project.title,
    description: project.summary,
    url: absoluteUrl(locale, path),
    inLanguage: locale,
    ...(project.image ? { image: project.image.src.startsWith("http") ? project.image.src : `${SITE_URL}${project.image.src}` } : {}),
    ...(project.platform.match(/iOS|Android/) ? { operatingSystem: "iOS, Android", applicationCategory: "MobileApplication" } : {}),
    // Only ETQAN's own projects claim ETQAN as creator; team experience is described, not attributed.
    ...(team ? {} : { creator: { "@id": `${SITE_URL}/#organization` } }),
  };

  return (
    <InnerPage locale={locale} path={path}>
      <section className="px-6 pb-12 pt-16 md:px-10 md:pt-24">
        <div className="mx-auto max-w-[1600px]">
          <Breadcrumbs items={[{ name: d.home, href: home }, { name: d.projects, href: hub }, { name: project.title, href: localePath(locale, path) }]} />
          <div className="mt-12 flex flex-wrap items-center gap-3">
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-muted">{project.category}</p>
            {team && <span className="rounded-full bg-secondary px-3 py-1 text-[10px] font-bold tracking-widest text-primary">{d.teamBadge}</span>}
          </div>
          <h1 className="mt-6 text-6xl font-medium leading-[0.9] tracking-[-0.04em] md:text-[9rem]">{project.title}</h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-2xl">{project.summary}</p>
          {team && <p className="mt-6 max-w-2xl border-s-2 border-accent ps-4 text-sm leading-relaxed text-muted">{d.teamNote}</p>}
          {facts.length > 0 && (
            <dl className="mt-12 grid grid-cols-2 gap-8 border-t border-border pt-8 md:grid-cols-5">
              {facts.map((f) => (
                <div key={f.label}>
                  <dt className="text-[11px] font-medium uppercase tracking-[0.3em] text-muted">{f.label}</dt>
                  <dd className="mt-2 text-xl font-medium">{f.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </section>

      {/* No banner for projects without approved screenshots: a name-only block would just repeat the H1. */}
      <div className="px-4 md:px-10">
        {project.image && (
          <div className={`mx-auto flex max-w-[1600px] justify-center overflow-hidden rounded-2xl ${portrait ? "bg-navy py-12" : "bg-secondary"}`}>
            <Image
              src={project.image.src}
              alt={project.title}
              width={project.image.width}
              height={project.image.height}
              priority
              sizes="(min-width:1600px) 1600px, 100vw"
              className={portrait ? "max-h-[80vh] w-auto rounded-xl" : "h-auto w-full"}
            />
          </div>
        )}
      </div>

      {/* Results: only real, measured numbers, always with their source */}
      {project.results && project.results.length > 0 && (
        <section className="px-6 py-20 md:px-10 md:py-24">
          <dl className="mx-auto grid max-w-[1600px] gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {project.results.map((r) => (
              // A <dl> group may only hold <dt>/<dd>: the label comes first in the markup and is shown under the number.
              <div key={r.label} className="flex flex-col border-t border-border pt-6">
                <dt className="order-2 mt-3 text-base">{r.label}</dt>
                <dd className="order-1 text-gradient text-5xl font-medium tracking-[-0.03em] md:text-7xl" dir="ltr">{r.value}</dd>
                {r.source && <dd className="order-3 mt-1 text-xs text-muted">{r.source}</dd>}
              </div>
            ))}
          </dl>
        </section>
      )}

      <TextBlock heading={d.challenge} text={project.challenge} />
      <TextBlock heading={d.solution} text={project.solution} />

      {project.features.length > 0 && (
        <section className="border-t border-border px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto grid max-w-[1600px] gap-10 md:grid-cols-12">
            <h2 className="text-[11px] font-medium uppercase tracking-[0.35em] text-primary md:col-span-3">{d.built}</h2>
            <ul className="space-y-5 text-xl leading-relaxed md:col-span-8 md:text-2xl">
              {project.features.map((f) => <li key={f} className="flex gap-4"><span className="text-accent">—</span>{f}</li>)}
            </ul>
          </div>
        </section>
      )}

      {project.gallery && project.gallery.length > 0 && (
        <section className="border-t border-border px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-[1600px]">
            <h2 className="mb-10 text-[11px] font-medium uppercase tracking-[0.35em] text-primary">{d.screenshots}</h2>
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {project.gallery.map((g) => (
                <li key={g.src}>
                  <figure className="overflow-hidden rounded-2xl bg-secondary">
                    <Image src={g.src} alt={g.alt} width={g.width} height={g.height} sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 100vw" className="h-auto w-full" />
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <TextBlock heading={d.ourRole} text={project.contribution} />

      {tech.length > 0 && (
        <section className="border-t border-border px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto grid max-w-[1600px] gap-10 md:grid-cols-12">
            <h2 className="text-[11px] font-medium uppercase tracking-[0.35em] text-primary md:col-span-3">{d.technologies}</h2>
            <ul className="flex flex-wrap gap-3 md:col-span-8" dir="ltr">
              {tech.map((x) => <li key={x} className="rounded-full border border-border px-5 py-3 text-base">{x}</li>)}
            </ul>
          </div>
        </section>
      )}

      <TextBlock heading={d.architecture} text={project.architecture} />

      {project.testimonial && (
        <section className="border-t border-border px-6 py-20 md:px-10 md:py-28">
          <figure className="mx-auto max-w-4xl text-center">
            <blockquote className="text-3xl font-medium leading-snug tracking-[-0.02em] md:text-5xl">“{project.testimonial.quote}”</blockquote>
            <figcaption className="mt-8 text-sm text-muted">
              {project.testimonial.author}{project.testimonial.role ? ` — ${project.testimonial.role}` : ""}
            </figcaption>
          </figure>
        </section>
      )}

      <section className="border-t border-border px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-12 md:flex-row md:items-end md:justify-between">
          {usedServices.length > 0 && (
            <div>
              <h2 className="text-[11px] font-medium uppercase tracking-[0.35em] text-muted">{d.servicesUsed}</h2>
              <ul className="mt-6 flex flex-wrap gap-3">
                {usedServices.map((s) => (
                  <li key={s.slug}>
                    <Link href={localePath(locale, `/services/${s.slug}`)} className="inline-block rounded-full border border-border px-5 py-3 text-sm transition-colors hover:border-primary hover:text-primary">
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex flex-wrap gap-4 text-[11px] font-bold tracking-widest">
            {[
              { href: project.liveUrl, label: d.visitSite },
              { href: project.playStoreUrl, label: d.playStore },
              { href: project.appStoreUrl, label: d.appStore },
            ].filter((l) => l.href).map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-3 rounded-full border border-foreground px-6 py-4">
                {l.label}
                <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:rotate-45 rtl:-scale-x-100 rtl:group-hover:-rotate-45" />
              </a>
            ))}
            <a href="#contact" data-cta="project_start_similar" className="rounded-full bg-foreground px-6 py-4 text-white transition-colors hover:bg-primary">{d.startSimilar}</a>
          </div>
        </div>
      </section>

      {next && (
        <Link href={localePath(locale, `/projects/${next.id}`)} className="group block border-t border-border px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto flex max-w-[1600px] items-end justify-between gap-6">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-muted">{d.nextProject}</p>
              <p className="mt-4 text-5xl font-medium tracking-[-0.04em] transition-colors group-hover:text-primary md:text-8xl">{next.title}</p>
            </div>
            <ArrowUpRight size={40} aria-hidden className="text-primary transition-transform duration-500 group-hover:rotate-45 rtl:-scale-x-100 rtl:group-hover:-rotate-45" />
          </div>
        </Link>
      )}

      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
    </InnerPage>
  );
}
