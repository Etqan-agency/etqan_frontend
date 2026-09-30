import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjects, getSite } from "@/lib/api";
import { isLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: getDictionary(locale).thankYou.metaTitle,
    robots: { index: false, follow: true },
    alternates: { canonical: localePath(locale, "/thank-you") },
  };
}

export default async function ThankYou({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale).thankYou;
  const [site, projects] = await Promise.all([getSite(locale), getProjects(locale)]);
  const home = localePath(locale, "/");

  return (
    <main id="main" tabIndex={-1} className="mx-auto flex min-h-screen max-w-4xl flex-col justify-center px-6 py-32">
      <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-primary">{t.eyebrow}</p>
      <h1 className="mt-6 text-5xl font-medium leading-[0.95] tracking-[-0.04em] md:text-7xl">{t.heading}</h1>
      <ol className="mt-14 grid gap-8 md:grid-cols-3">
        {t.steps.map((s, i) => (
          <li key={s.title} className="border-t border-border pt-6">
            <span className="text-[11px] font-medium tracking-widest text-muted">{String(i + 1).padStart(2, "0")}</span>
            <h2 className="mt-3 text-2xl font-medium">{s.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
          </li>
        ))}
      </ol>
      <div className="mt-14 flex flex-wrap gap-4 text-[11px] font-bold tracking-widest">
        <a href={site.contact.whatsapp} target="_blank" rel="noreferrer" data-cta-location="thank_you" className="rounded-full bg-foreground px-6 py-4 text-white hover:bg-primary">
          {t.whatsapp}
        </a>
        <Link href={home} className="rounded-full border border-foreground px-6 py-4">{t.back}</Link>
      </div>
      {projects.length > 0 && (
        <p className="mt-14 text-sm text-muted">
          {t.seeWork}{" "}
          {projects.map((p, i) => (
            <span key={p.id}>
              {i > 0 && " · "}
              <Link href={localePath(locale, `/projects/${p.id}`)} className="text-primary underline underline-offset-4">{p.title}</Link>
            </span>
          ))}
        </p>
      )}
    </main>
  );
}
