import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import IntroHero from "@/components/intro/IntroHero";
import TrustedBrands from "@/components/TrustedBrands";
import Services from "@/components/Services";
import FeaturedWork from "@/components/FeaturedWork";
import About from "@/components/About";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { getProjects, getServices, getSite } from "@/lib/api";
import { processFor } from "@/lib/data";
import { getNav } from "@/lib/nav";
import { pageMetadata } from "@/lib/seo";
import { isLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n";

// Re-read content edited in the dashboard at most once a minute.
export const revalidate = 60;

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return pageMetadata({ locale, path: "/", title: t.meta.title, description: t.meta.description, absoluteTitle: true });
}

/**
 * The homepage introduces ETQAN and summarises each area, linking to the full page for it.
 * It keeps a contact form at the bottom: visitors ready to act shouldn't need another click.
 */
export default async function Home({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  const [site, services, projects, nav] = await Promise.all([getSite(locale), getServices(locale), getProjects(locale), getNav(locale, "/")]);

  return (
    <>
      <Navbar contact={site.contact} t={t.nav} {...nav} />
      <main id="main" tabIndex={-1}>
        <IntroHero badge={site.badge} subtitle={site.subtitle} t={t.hero} />
        <TrustedBrands heading={t.brands.heading} />
        <Services services={services} t={t.services} servicesPath={localePath(locale, "/services")} learnMore={t.detail.learnMore} />
        <FeaturedWork projects={projects} t={t.work} projectsPath={localePath(locale, "/projects")} teamBadge={t.detail.teamBadge} viewAll={t.detail.allProjects} />
        <About text={site.about} t={t.about} href={localePath(locale, "/about")} />
        <Process items={processFor(locale)} t={t.process} />
        <Contact contact={site.contact} services={services.map((s) => ({ slug: s.slug, title: s.title }))} t={t.contact} form={t.form} />
      </main>
      <Footer contact={site.contact} services={services} t={t.footer} nav={nav.links} locale={locale} />
    </>
  );
}
