import type { Metadata } from "next";
import { notFound } from "next/navigation";
import InnerPage from "@/components/detail/InnerPage";
import Breadcrumbs from "@/components/detail/Breadcrumbs";
import Hero from "@/components/Hero";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ProjectCard from "@/components/detail/ProjectCard";
import { getProjects } from "@/lib/api";
import { absoluteUrl, jsonLd, pageMetadata } from "@/lib/seo";
import { isLocale, localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";

export const revalidate = 60;

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = getDictionary(locale).detail;
  return pageMetadata({ locale, path: "/projects", title: d.projectsTitle, description: d.projectsIntro });
}

export default async function ProjectsHub({ params }: Params) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const t = getDictionary(locale);
  const d = t.detail;
  const projects = await getProjects(locale);
  // Company work first; team experience is shown separately and labelled as such.
  const groups = [
    { key: "etqan", title: d.etqanProjects, note: undefined, items: projects.filter((p) => p.ownership !== "team") },
    { key: "team", title: d.teamProjects, note: d.teamNote, items: projects.filter((p) => p.ownership === "team") },
  ].filter((g) => g.items.length);

  const schema = {
    "@type": "CollectionPage",
    name: d.projectsTitle,
    url: absoluteUrl(locale, "/projects"),
    inLanguage: locale,
    hasPart: projects.map((p) => ({ "@type": "CreativeWork", name: p.title, url: absoluteUrl(locale, `/projects/${p.id}`) })),
  };

  return (
    <InnerPage locale={locale} path="/projects">
      {/* Robotic-hand video hero laid out as the work index: title and intro bottom-start, a numbered
          list of every project bottom-end, so the hand stays clear in the middle. */}
      <div className="-mt-20">
        <Hero id="projects-hero">
          <div className="mx-auto w-full max-w-[1600px] px-6 pt-28 md:px-10">
            <Breadcrumbs items={[{ name: d.home, href: localePath(locale, "/") }, { name: d.projects, href: localePath(locale, "/projects") }]} />
          </div>
          <div className="mx-auto mt-auto grid w-full max-w-[1600px] grid-cols-[minmax(0,1fr)] gap-12 px-6 pb-12 pt-[45vh] md:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] md:items-end md:gap-16 md:px-10 md:pt-24">
            <div>
              <p className="mb-5 flex items-center gap-2.5 text-[13px] text-foreground/60">
                <span aria-hidden className="h-2 w-2 rounded-full bg-foreground" />
                {d.projects} <span className="tabular-nums">({String(projects.length).padStart(2, "0")})</span>
              </p>
              <h1 className="max-w-3xl text-[clamp(2rem,8vw,4.5rem)] font-light leading-[1] tracking-[-0.03em] md:text-[clamp(2.5rem,5vw,4.5rem)]">{d.projectsTitle}</h1>
              <p className="mt-5 max-w-xl leading-relaxed text-muted md:text-lg">{d.projectsIntro}</p>
              <div className="mt-8 flex flex-wrap gap-3 text-[11px] font-bold tracking-widest">
                <a href="#projects-list" data-cta="projects_hero_view" className="rounded-full bg-foreground px-7 py-4 text-white transition-colors hover:bg-primary">{d.viewProjects}</a>
                <Link href={localePath(locale, "/contact")} data-cta="projects_hero_start" className="rounded-full border border-foreground px-7 py-4 transition-colors hover:border-primary hover:text-primary">{t.nav.cta}</Link>
              </div>
            </div>
            <ol className="border-t border-foreground/15 md:me-16">
              {groups.flatMap((g) => g.items).map((p, i) => (
                <li key={p.id} className="border-b border-foreground/15">
                  <Link href={localePath(locale, `/projects/${p.id}`)} data-cta="projects_hero_index" className="group flex items-center gap-5 py-4 transition-colors hover:text-primary">
                    <span className="w-6 text-[11px] tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-lg font-medium leading-tight tracking-[-0.02em]">{p.title}</span>
                      <span className="mt-1 block truncate text-[11px] uppercase tracking-[0.2em] text-muted">
                        {p.ownership === "team" ? d.teamBadge : p.category}
                      </span>
                    </span>
                    <ArrowUpRight aria-hidden className="h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100" />
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </Hero>
      </div>
      <div id="projects-list" className="scroll-mt-20" />
      {groups.map((g) => (
        <section key={g.key} className="border-t border-border px-6 py-16 md:px-10 md:py-24">
          <div className="mx-auto max-w-[1600px]">
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <h2 className="text-4xl font-medium leading-[0.95] tracking-[-0.04em] md:text-6xl">{g.title}</h2>
              {g.note && <p className="mt-5 leading-relaxed text-muted">{g.note}</p>}
            </div>
            <div className="flex flex-wrap justify-center gap-8">
              {g.items.map((p) => (
                <div key={p.id} className="w-full lg:w-[calc(50%-1rem)]">
                  <ProjectCard
                    project={p}
                    href={localePath(locale, `/projects/${p.id}`)}
                    cta={d.viewCase}
                    badge={p.ownership === "team" ? d.teamBadge : undefined}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
    </InnerPage>
  );
}
