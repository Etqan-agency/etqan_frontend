import type { Metadata } from "next";
import { notFound } from "next/navigation";
import InnerPage from "@/components/detail/InnerPage";
import Breadcrumbs from "@/components/detail/Breadcrumbs";
import Hero from "@/components/Hero";
import Link from "next/link";
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
      {/* Hands video hero with the decorative typing line; the page's real H1, intro and CTAs sit on top of it. */}
      <div className="-mt-20">
        <Hero t={t.hero} id="projects-hero" scrollTarget="#projects-list">
          <h1 className="max-w-4xl text-4xl font-medium leading-[1] tracking-[-0.04em] md:text-6xl">{d.projectsTitle}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">{d.projectsIntro}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-[11px] font-bold tracking-widest">
            <a href="#projects-list" data-cta="projects_hero_view" className="rounded-full bg-foreground px-7 py-4 text-white transition-colors hover:bg-primary">{d.viewProjects}</a>
            <Link href={localePath(locale, "/contact")} data-cta="projects_hero_start" className="rounded-full border border-foreground px-7 py-4 transition-colors hover:border-primary hover:text-primary">{t.nav.cta}</Link>
          </div>
        </Hero>
      </div>
      <div id="projects-list" className="border-t border-border px-6 pt-12 md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <Breadcrumbs items={[{ name: d.home, href: localePath(locale, "/") }, { name: d.projects, href: localePath(locale, "/projects") }]} />
        </div>
      </div>
      {groups.map((g, i) => (
        <section key={g.key} className={`px-6 py-16 md:px-10 md:py-24 ${i > 0 ? "border-t border-border" : ""}`}>
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
