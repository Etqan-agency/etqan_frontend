import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import InnerPage from "@/components/detail/InnerPage";
import Breadcrumbs from "@/components/detail/Breadcrumbs";
import Process from "@/components/Process";
import { getMissionVision, getTeam } from "@/lib/api";
import { processFor } from "@/lib/data";
import { absoluteUrl, jsonLd, pageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { isLocale, localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";

export const revalidate = 60;

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const a = getDictionary(locale).aboutPage;
  return pageMetadata({ locale, path: "/about", title: a.metaTitle, description: a.metaDescription, absoluteTitle: true });
}

export default async function AboutPage({ params }: Params) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const t = getDictionary(locale);
  const a = t.aboutPage;
  const [team, mv] = await Promise.all([getTeam(locale), getMissionVision(locale)]);
  const p = (x: string) => localePath(locale, x);

  const schema = {
    "@type": "AboutPage",
    name: a.metaTitle,
    url: absoluteUrl(locale, "/about"),
    inLanguage: locale,
    about: { "@id": `${SITE_URL}/#organization` },
  };

  return (
    <InnerPage locale={locale} path="/about" withContact={false}>
      {/* Hero */}
      <section className="px-6 pb-20 pt-16 md:px-10 md:pb-28 md:pt-24">
        <div className="mx-auto max-w-[1600px]">
          <Breadcrumbs items={[{ name: t.detail.home, href: p("/") }, { name: a.eyebrow, href: p("/about") }]} />
          <h1 className="mt-12 max-w-5xl text-5xl font-medium leading-[0.95] tracking-[-0.04em] md:text-8xl">{a.h1}</h1>
          <p className="mt-10 max-w-3xl text-xl leading-relaxed text-muted md:text-2xl">{a.intro}</p>
        </div>
      </section>

      {/* Who we are */}
      <section className="border-t border-border px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-[1600px] gap-10 md:grid-cols-12">
          <h2 className="text-[11px] font-medium uppercase tracking-[0.35em] text-primary md:col-span-3">{a.whoTitle}</h2>
          <p className="text-[clamp(1.6rem,3vw,3rem)] font-medium leading-[1.15] tracking-[-0.03em] md:col-span-9">{a.whoText}</p>
        </div>
      </section>

      {/* What we do */}
      <section className="border-t border-border px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1600px]">
          <h2 className="mb-14 text-4xl font-medium leading-[0.95] tracking-[-0.04em] md:text-6xl">{a.whatTitle}</h2>
          <div className="grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-3">
            {a.capabilities.map((c, i) => (
              <div key={c.title} className="bg-background p-8 md:p-10">
                <span className="text-[11px] font-medium tracking-widest text-primary">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-3xl font-medium tracking-[-0.03em]">{c.title}</h3>
                <p className="mt-4 leading-relaxed text-muted">{c.text}</p>
              </div>
            ))}
          </div>
          <Link href={p("/services")} className="mt-10 inline-block text-[11px] font-bold uppercase tracking-[0.3em] text-primary hover:underline">
            {t.nav.services} →
          </Link>
        </div>
      </section>

      {/* Approach */}
      <Process items={processFor(locale)} t={{ ...t.process, heading: [a.approachTitle, ""] }} />

      {/* Why ETQAN */}
      <section className="border-t border-border px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1600px]">
          <h2 className="mb-14 text-4xl font-medium leading-[0.95] tracking-[-0.04em] md:text-6xl">{a.whyTitle}</h2>
          <ul className="grid gap-10 md:grid-cols-2">
            {a.why.map((w) => (
              <li key={w.title} className="border-t border-border pt-6">
                <h3 className="text-2xl font-medium tracking-tight md:text-3xl">{w.title}</h3>
                <p className="mt-3 max-w-xl leading-relaxed text-muted">{w.text}</p>
              </li>
            ))}
          </ul>
          <Link href={p("/projects")} className="mt-12 inline-block text-[11px] font-bold uppercase tracking-[0.3em] text-primary hover:underline">
            {t.detail.allProjects} →
          </Link>
        </div>
      </section>

      {/* Mission & vision (dashboard Settings override the default copy) */}
      <section className="bg-navy px-6 py-24 text-white md:px-10 md:py-32">
        <div className="mx-auto grid max-w-[1600px] gap-16 md:grid-cols-2">
          {[
            { title: a.missionTitle, text: mv.mission ?? a.mission },
            { title: a.visionTitle, text: mv.vision ?? a.vision },
          ].map((x) => (
            <div key={x.title}>
              <h2 className="text-[11px] font-medium uppercase tracking-[0.35em] text-accent">{x.title}</h2>
              <p className="mt-6 text-2xl font-medium leading-snug tracking-[-0.02em] md:text-4xl">{x.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team (only when members are added in the dashboard) */}
      {team.length > 0 && (
        <section className="border-t border-border px-6 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-[1600px]">
            <h2 className="mb-14 text-4xl font-medium leading-[0.95] tracking-[-0.04em] md:text-6xl">{a.teamTitle}</h2>
            <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((m) => (
                <li key={m.name}>
                  <div className="relative aspect-square overflow-hidden rounded-sm bg-secondary">
                    {m.photo && <Image src={m.photo} alt={m.name} fill sizes="(min-width:1024px) 22vw, 50vw" className="object-cover" />}
                  </div>
                  <h3 className="mt-4 text-xl font-medium">{m.name}</h3>
                  <p className="text-sm text-muted">{m.role}</p>
                  {m.bio && <p className="mt-2 text-sm leading-relaxed text-muted">{m.bio}</p>}
                  {Object.keys(m.socials).length > 0 && (
                    <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs">
                      {Object.entries(m.socials).filter(([, href]) => /^https?:\/\//.test(href)).map(([label, href]) => (
                        <li key={label}>
                          <a href={href} target="_blank" rel="noreferrer me" className="text-primary underline underline-offset-4">
                            {label.charAt(0).toUpperCase() + label.slice(1)}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="border-t border-border px-6 py-24 text-center md:px-10 md:py-32">
        <h2 className="text-4xl font-medium tracking-[-0.04em] md:text-7xl">{a.ctaTitle}</h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted">{a.ctaText}</p>
        <Link href={p("/contact")} data-cta="about_start_project" className="mt-10 inline-block rounded-full bg-foreground px-8 py-5 text-[11px] font-bold tracking-widest text-white transition-colors hover:bg-primary">
          {t.nav.cta}
        </Link>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
    </InnerPage>
  );
}
