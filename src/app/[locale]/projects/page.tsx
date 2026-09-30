import type { Metadata } from "next";
import { notFound } from "next/navigation";
import InnerPage from "@/components/detail/InnerPage";
import Breadcrumbs from "@/components/detail/Breadcrumbs";
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
  const d = getDictionary(locale).detail;
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
      <section className="px-6 pb-16 pt-16 md:px-10 md:pt-24">
        <div className="mx-auto max-w-[1600px]">
          <Breadcrumbs items={[{ name: d.home, href: localePath(locale, "/") }, { name: d.projects, href: localePath(locale, "/projects") }]} />
          <h1 className="mt-12 max-w-5xl text-5xl font-medium leading-[0.95] tracking-[-0.04em] md:text-8xl">{d.projectsTitle}</h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">{d.projectsIntro}</p>
        </div>
      </section>
      {groups.map((g) => (
        <section key={g.key} className="border-t border-border px-6 py-16 md:px-10 md:py-24">
          <div className="mx-auto max-w-[1600px]">
            <div className="mb-10 max-w-3xl">
              <h2 className="text-4xl font-medium leading-[0.95] tracking-[-0.04em] md:text-6xl">{g.title}</h2>
              {g.note && <p className="mt-5 leading-relaxed text-muted">{g.note}</p>}
            </div>
            <div className="grid gap-8 lg:grid-cols-2">
              {g.items.map((p) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  href={localePath(locale, `/projects/${p.id}`)}
                  cta={d.viewCase}
                  badge={p.ownership === "team" ? d.teamBadge : undefined}
                />
              ))}
            </div>
          </div>
        </section>
      ))}
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
    </InnerPage>
  );
}
