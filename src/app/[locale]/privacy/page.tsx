import type { Metadata } from "next";
import { notFound } from "next/navigation";
import InnerPage from "@/components/detail/InnerPage";
import Breadcrumbs from "@/components/detail/Breadcrumbs";
import { pageMetadata } from "@/lib/seo";
import { isLocale, localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { getLegal, LEGAL_EMAIL, LEGAL_UPDATED_ISO } from "@/i18n/legal";

const PATH = "/privacy";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = getLegal(locale).privacy;
  return pageMetadata({ locale, path: PATH, title: d.metaTitle, description: d.metaDescription, absoluteTitle: true });
}

/** Turn the contact address inside a sentence into a mailto link. */
function withEmail(text: string) {
  const parts = text.split(LEGAL_EMAIL);
  return parts.flatMap((part, i) =>
    i === 0 ? [part] : [<a key={i} href={`mailto:${LEGAL_EMAIL}`} dir="ltr" className="text-primary underline underline-offset-4">{LEGAL_EMAIL}</a>, part],
  );
}

export default async function PrivacyPage({ params }: Params) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const t = getDictionary(locale);
  const legal = getLegal(locale);
  const d = legal.privacy;
  const pg = legal.page;

  return (
    <InnerPage locale={locale} path={PATH} withContact={false}>
      <section className="px-6 pb-16 pt-16 md:px-10 md:pb-20 md:pt-24">
        <div className="mx-auto max-w-[1600px]">
          <Breadcrumbs items={[{ name: t.detail.home, href: localePath(locale, "/") }, { name: d.eyebrow, href: localePath(locale, PATH) }]} />
          <h1 className="mt-12 max-w-5xl text-5xl font-medium leading-[0.95] tracking-[-0.04em] md:text-8xl">{d.h1}</h1>
          <p className="mt-10 max-w-3xl text-lg leading-relaxed text-muted md:text-xl">{d.intro}</p>
          <p className="mt-8 text-[11px] font-medium uppercase tracking-[0.3em] text-muted">
            {pg.lastUpdatedLabel}: <time dateTime={LEGAL_UPDATED_ISO} className="text-foreground">{pg.lastUpdated}</time>
          </p>
          {/* TEMPLATE NOTICE — delete this element once a qualified lawyer has reviewed the page. */}
          <p data-legal-template role="note" className="mt-8 max-w-3xl rounded-sm border border-primary/30 bg-primary/5 px-5 py-4 text-sm leading-relaxed text-foreground">
            {pg.template}
          </p>
        </div>
      </section>

      <section className="border-t border-border px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-12">
          <nav aria-label={pg.contents} className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-32">
              <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-primary">{pg.contents}</p>
              <ol className="mt-6 space-y-3 text-sm">
                {d.sections.map((s, i) => (
                  <li key={s.heading}>
                    <a href={`#s${i + 1}`} className="text-muted transition-colors hover:text-primary">{s.heading}</a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <article className="max-w-3xl lg:col-span-8 lg:col-start-5">
            {d.sections.map((s, i) => (
              <section key={s.heading} id={`s${i + 1}`} className="scroll-mt-28 border-t border-border py-10 first:border-t-0 first:pt-0">
                <h2 className="flex gap-4 text-2xl font-medium tracking-[-0.03em] md:text-3xl">
                  <span aria-hidden className="pt-2 text-[11px] font-medium tracking-widest text-primary">{String(i + 1).padStart(2, "0")}</span>
                  {s.heading}
                </h2>
                <div className="mt-5 space-y-4 leading-relaxed text-muted md:text-lg">
                  {s.paragraphs?.map((p) => <p key={p}>{withEmail(p)}</p>)}
                  {s.list && (
                    <ul className="space-y-2">
                      {s.list.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" />
                          <span>{withEmail(item)}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {s.after?.map((p) => <p key={p}>{withEmail(p)}</p>)}
                </div>
              </section>
            ))}

            <div className="mt-6 rounded-sm bg-secondary p-8 md:p-10">
              <h2 className="text-2xl font-medium tracking-[-0.03em]">{pg.questions}</h2>
              <p className="mt-3 text-muted">{pg.questionsText}</p>
              <a href={`mailto:${LEGAL_EMAIL}`} dir="ltr" className="mt-6 inline-block text-lg font-medium text-primary underline-offset-4 hover:underline">{LEGAL_EMAIL}</a>
            </div>
          </article>
        </div>
      </section>
    </InnerPage>
  );
}
