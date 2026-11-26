import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import type { Dictionary } from "@/i18n";

/** Homepage "Featured Product": ETQAN's own AI product line, with a link to the projects page. */
export default function FeaturedProduct({ t, href }: { t: Dictionary["product"]; href: string }) {
  return (
    <section id="product" className="border-t border-border px-6 py-24 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-[1520px] gap-16 lg:grid-cols-12 lg:gap-x-16">
        <div className="lg:col-span-5">
          <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-primary">{t.eyebrow}</p>
          <h2 className="mt-6 text-4xl font-medium leading-[0.95] tracking-[-0.04em] sm:text-5xl xl:text-7xl">{t.heading}</h2>
          {t.intro.map((p) => (
            <p key={p} className="mt-6 max-w-lg text-lg leading-relaxed text-muted">{p}</p>
          ))}
        </div>

        <article className="relative overflow-hidden rounded-sm bg-navy p-8 text-white md:p-14 lg:col-span-7">
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-primary/50 blur-3xl" />
            <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-accent/25 blur-3xl" />
          </div>
          <div className="relative">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.3em] text-accent">
              <Sparkles size={14} aria-hidden /> {t.cardLabel}
            </p>
            <h3 className="mt-10 text-3xl font-medium leading-[1.05] tracking-[-0.035em] md:text-5xl">{t.cardTitle}</h3>
            {t.cardText.map((p) => (
              <p key={p} className="mt-6 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">{p}</p>
            ))}
            <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {t.pillars.map((pillar) => (
                <li key={pillar} className="rounded-sm border border-white/10 bg-white/5 px-4 py-3 text-xs font-medium text-white/80">
                  {pillar}
                </li>
              ))}
            </ul>
            <Link
              href={href}
              className="mt-12 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-accent hover:underline"
            >
              {t.cta} <ArrowUpRight size={16} className="rtl:-scale-x-100" aria-hidden />
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
