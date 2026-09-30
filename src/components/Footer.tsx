import Link from "next/link";
import Logo from "./Logo";
import type { Contact, Service } from "@/lib/data";
import type { NavLink } from "@/lib/nav";
import type { Dictionary } from "@/i18n";
import { localePath, type Locale } from "@/i18n/config";
import { getLegal } from "@/i18n/legal";
import { getDictionary } from "@/i18n";
import MotionToggle from "./MotionToggle";

const heading = "text-[10px] font-medium uppercase tracking-[0.3em] text-white/60";
const link = "text-xs text-white/80 transition-colors duration-300 hover:text-accent";

export default function Footer({
  contact, services, t, nav, locale,
}: {
  contact: Contact; services: Pick<Service, "slug" | "title">[]; t: Dictionary["footer"]; nav: NavLink[]; locale: Locale;
}) {
  const legal = getLegal(locale).footer;
  const a11y = getDictionary(locale).a11y;
  return (
    <footer className="border-t border-white/10 bg-navy px-6 pb-24 pt-20 text-white md:px-10 md:pb-10">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-12">
          <div className="col-span-2 md:col-span-4">
            <Logo variant="white" className="h-7 w-auto" />
            <p className="mt-6 max-w-xs text-xs leading-relaxed text-white/60">{t.tagline}</p>
            <a href={`mailto:${contact.email}`} className="mt-8 inline-block text-sm font-medium text-accent underline-offset-4 hover:underline">
              {contact.email}
            </a>
          </div>

          <nav aria-label={t.company} className="md:col-span-2">
            <p className={heading}>{t.company}</p>
            <ul className="mt-5 space-y-3">
              {nav.map((l) => <li key={l.href}><Link href={l.href} className={link}>{l.label}</Link></li>)}
            </ul>
          </nav>

          <nav aria-label={t.services} className="md:col-span-3">
            <p className={heading}>{t.services}</p>
            <ul className="mt-5 space-y-3">
              {services.map((s) => (
                <li key={s.slug}><Link href={localePath(locale, `/services/${s.slug}`)} className={link}>{s.title}</Link></li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2 md:col-span-3">
            <p className={heading}>{t.touch}</p>
            <ul className="mt-5 space-y-3 text-xs leading-relaxed text-white/80">
              <li><a href={`tel:${contact.phone.replace(/\s/g, "")}`} dir="ltr" className={link}>{contact.phone}</a></li>
              <li><a href={contact.whatsapp} target="_blank" rel="noreferrer" className={link}>{t.whatsapp}</a></li>
              <li>{contact.address}</li>
              <li>{t.hours}</li>
            </ul>
            {contact.socials.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                {contact.socials.map((s) => (
                  <li key={s.label}><a href={s.href} target="_blank" rel="noreferrer me" className={link}>{s.label}</a></li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="mt-20 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-white/10 pt-8 text-[10px] uppercase tracking-[0.3em] text-white/60">
          <p>© {new Date().getFullYear()} ETQAN. {t.rights}</p>
          <nav aria-label={legal.legalAria}>
            <ul className="flex gap-6">
              <li><Link href={localePath(locale, "/privacy")} className="text-white/80 transition-colors duration-300 hover:text-accent">{legal.privacy}</Link></li>
              <li><Link href={localePath(locale, "/terms")} className="text-white/80 transition-colors duration-300 hover:text-accent">{legal.terms}</Link></li>
              <li><MotionToggle pauseLabel={a11y.pauseMotion} playLabel={a11y.playMotion} /></li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
