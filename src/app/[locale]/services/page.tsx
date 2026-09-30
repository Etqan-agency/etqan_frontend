import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import InnerPage from "@/components/detail/InnerPage";
import Breadcrumbs from "@/components/detail/Breadcrumbs";
import Hero from "@/components/Hero";
import { getServices } from "@/lib/api";
import { pageMetadata } from "@/lib/seo";
import { isLocale, localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";

export const revalidate = 60;

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = getDictionary(locale).detail;
  return pageMetadata({ locale, path: "/services", title: d.servicesTitle, description: d.servicesIntro });
}

export default async function ServicesHub({ params }: Params) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const t = getDictionary(locale);
  const d = t.detail;
  const services = await getServices(locale);

  return (
    <InnerPage locale={locale} path="/services">
      <div className="-mt-20">
        <Hero t={t.hero} id="services-hero" scrollTarget="#services-list">
          <h1 className="max-w-4xl text-4xl font-medium leading-[1] tracking-[-0.04em] md:text-6xl">{d.servicesTitle}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">{d.servicesIntro}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-[11px] font-bold tracking-widest">
            <Link href={localePath(locale, "/contact")} data-cta="services_hero_start" className="rounded-full bg-foreground px-7 py-4 text-white transition-colors hover:bg-primary">{t.nav.cta}</Link>
            <a href="#services-list" className="rounded-full border border-foreground px-7 py-4 transition-colors hover:border-primary hover:text-primary">{d.learnMore}</a>
          </div>
        </Hero>
      </div>
      <section id="services-list" className="border-t border-border px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto mb-12 max-w-[1600px]">
          <Breadcrumbs items={[{ name: d.home, href: localePath(locale, "/") }, { name: d.services, href: localePath(locale, "/services") }]} />
        </div>
        <ul className="mx-auto grid max-w-[1600px] gap-8 md:grid-cols-2 xl:grid-cols-3">
          {services.map((s) => (
            <li key={s.slug}>
              <Link href={localePath(locale, `/services/${s.slug}`)} className="group block">
                <div className="duotone relative aspect-[4/3] overflow-hidden rounded-sm bg-secondary">
                  <Image src={s.image} alt={s.title} fill sizes="(min-width:1280px) 30vw, (min-width:768px) 45vw, 100vw" className="object-cover transition-transform duration-700 ease-premium group-hover:scale-105" />
                </div>
                <p className="mt-6 text-[11px] font-medium tracking-widest text-primary">{s.id}</p>
                <h2 className="mt-2 text-3xl font-medium tracking-[-0.03em] transition-colors group-hover:text-primary md:text-4xl">{s.title}</h2>
                <p className="mt-3 leading-relaxed text-muted">{s.description}</p>
                <span className="mt-4 inline-block text-[11px] font-bold tracking-widest text-primary">{d.learnMore} →</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </InnerPage>
  );
}
