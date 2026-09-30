import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { notFound } from "next/navigation";
import InnerPage from "@/components/detail/InnerPage";
import Breadcrumbs from "@/components/detail/Breadcrumbs";
import Faqs from "@/components/detail/Faqs";
import ContactForm from "@/components/ContactForm";
import { getServices, getSite } from "@/lib/api";
import { absoluteUrl, jsonLd, pageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { isLocale, localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";

export const revalidate = 60;

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const c = getDictionary(locale).contactPage;
  return pageMetadata({ locale, path: "/contact", title: c.metaTitle, description: c.metaDescription, absoluteTitle: true });
}

const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=6th+of+October+City,+Giza,+Egypt";

export default async function ContactPage({ params }: Params) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const t = getDictionary(locale);
  const c = t.contactPage;
  const [site, services] = await Promise.all([getSite(locale), getServices(locale)]);
  const { contact } = site;

  const channels = [
    { icon: MessageCircle, label: c.whatsapp, value: c.whatsappCta, href: contact.whatsapp, external: true, ltr: false },
    { icon: Phone, label: c.phone, value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, "")}`, external: false, ltr: true },
    { icon: Mail, label: c.email, value: contact.email, href: `mailto:${contact.email}`, external: false, ltr: true },
    { icon: MapPin, label: c.location, value: contact.address, href: MAPS_URL, external: true, ltr: false, extra: c.mapLink },
    { icon: Clock, label: c.hours, value: t.footer.hours, href: undefined, external: false, ltr: false },
  ];

  const schema = {
    "@type": "ContactPage",
    name: c.metaTitle,
    url: absoluteUrl(locale, "/contact"),
    inLanguage: locale,
    about: { "@id": `${SITE_URL}/#business` },
  };

  return (
    <InnerPage locale={locale} path="/contact" withContact={false}>
      <section className="px-6 pb-16 pt-16 md:px-10 md:pt-24">
        <div className="mx-auto max-w-[1600px]">
          <Breadcrumbs items={[{ name: t.detail.home, href: localePath(locale, "/") }, { name: c.eyebrow, href: localePath(locale, "/contact") }]} />
          <h1 className="mt-12 max-w-4xl text-5xl font-medium leading-[0.95] tracking-[-0.04em] md:text-8xl">{c.h1}</h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">{c.intro}</p>
        </div>
      </section>

      <section className="px-4 pb-24 md:px-10">
        <div className="mx-auto grid max-w-[1600px] gap-8 lg:grid-cols-12">
          {/* Channels */}
          <ul className="space-y-px self-start overflow-hidden rounded-2xl border border-border bg-border lg:col-span-4">
            {channels.map(({ icon: Icon, label, value, href, external, ltr, extra }) => (
              <li key={label} className="flex gap-4 bg-background p-6">
                <Icon size={20} className="mt-1 shrink-0 text-primary" aria-hidden />
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-muted">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                      dir={ltr ? "ltr" : undefined}
                      data-cta-location="contact_page"
                      className="mt-1 inline-block text-lg font-medium transition-colors hover:text-primary"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="mt-1 text-lg font-medium">{value}</p>
                  )}
                  {extra && <a href={href} target="_blank" rel="noreferrer" className="mt-1 block text-xs text-primary hover:underline">{extra} →</a>}
                </div>
              </li>
            ))}
            {contact.socials.length > 0 && (
              <li className="bg-background p-6">
                <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-muted">{c.social}</p>
                <ul className="mt-3 flex flex-wrap gap-3">
                  {contact.socials.map((s) => (
                    <li key={s.label}>
                      <a href={s.href} target="_blank" rel="noreferrer me" className="inline-block rounded-full border border-border px-4 py-2 text-sm transition-colors hover:border-primary hover:text-primary">
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            )}
          </ul>

          {/* Form */}
          <div className="rounded-2xl bg-navy p-6 text-white md:p-12 lg:col-span-8">
            <h2 className="text-3xl font-medium tracking-[-0.03em] md:text-5xl">{c.formTitle}</h2>
            <div className="mt-8">
              <ContactForm services={services.map((s) => ({ slug: s.slug, title: s.title }))} fallbackEmail={contact.email} t={t.form} />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1600px]">
          <h2 className="mb-12 text-[11px] font-medium uppercase tracking-[0.35em] text-primary">{c.next}</h2>
          <ol className="grid gap-8 md:grid-cols-3">
            {t.thankYou.steps.map((s, i) => (
              <li key={s.title} className="border-t border-border pt-6">
                <span className="text-[11px] font-medium tracking-widest text-muted">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-2xl font-medium">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Faqs heading={t.faqs.title} faqs={t.faqs.items} />

      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
    </InnerPage>
  );
}
