import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import IntroHero from "@/components/intro/IntroHero";
import TrustedBrands from "@/components/TrustedBrands";
import WhatWeDo from "@/components/WhatWeDo";
import FeaturedProduct from "@/components/FeaturedProduct";
import FeaturedWork from "@/components/FeaturedWork";
import About from "@/components/About";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { getProjects, getServices, getSite } from "@/lib/api";
import { getNav } from "@/lib/nav";
import { pageMetadata } from "@/lib/seo";
import { dirOf, isLocale, localePath } from "@/i18n/config";
import { getCopy, getProcessCopy, type Dictionary } from "@/i18n";

/**
 * The dashboard's hero title (Settings) laid out like the built-in heading: first line, then the rest with
 * its last word in the accent gradient. A line break in the title chooses where the first line ends.
 */
function heroWithTitle(hero: Dictionary["hero"], title?: string): Dictionary["hero"] {
  if (!title) return hero;
  const rows = title.split(/\r?\n/).map((r) => r.trim()).filter(Boolean);
  const words = (rows.length > 1 ? rows.slice(1).join(" ") : rows[0]).split(/\s+/);
  const accent = words.length > 1 || rows.length > 1 ? words.pop() ?? "" : "";
  return rows.length > 1
    ? { ...hero, h1Line1: rows[0], h1Line2: words.join(" "), h1Accent: accent }
    : { ...hero, h1Line1: words.join(" "), h1Line2: "", h1Accent: accent };
}

// Re-read content edited in the dashboard at most once a minute.
export const revalidate = 60;

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getCopy(locale);
  return pageMetadata({ locale, path: "/", title: t.meta.title, description: t.meta.description, absoluteTitle: true });
}

/**
 * The homepage introduces ETQAN and summarises each area, linking to the full page for it.
 * It keeps a contact form at the bottom: visitors ready to act shouldn't need another click.
 */
export default async function Home({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getCopy(locale);
  const [site, services, projects, nav] = await Promise.all([getSite(locale), getServices(locale), getProjects(locale), getNav(locale, "/")]);

  return (
    <>
      <Navbar contact={site.contact} t={t.nav} {...nav} />
      <main id="main" tabIndex={-1}>
        <IntroHero badge={site.badge} subtitle={site.subtitle} t={heroWithTitle(t.hero, site.heroTitle)} />
        <TrustedBrands heading={t.brands.heading} stackHeading={t.brands.stackHeading} />
        <FeaturedWork projects={projects} t={t.work} projectsPath={localePath(locale, "/projects")} teamBadge={t.detail.teamBadge} viewAll={t.detail.allProjects} dir={dirOf(locale)} />
        <WhatWeDo t={t.whatWeDo} />
        <FeaturedProduct t={t.product} href={localePath(locale, "/projects")} />
        <About text={site.about} t={t.about} href={localePath(locale, "/about")} />
        <Process items={await getProcessCopy(locale)} t={t.process} intro={t.process.intro} />
        <Contact contact={site.contact} services={services.map((s) => ({ slug: s.slug, title: s.title }))} t={t.contact} form={t.form} />
      </main>
      <Footer contact={site.contact} services={services} t={t.footer} nav={nav.links} locale={locale} />
    </>
  );
}
