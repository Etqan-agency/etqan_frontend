import ContactForm, { type ServiceOption } from "./ContactForm";
import type { Contact as ContactInfo } from "@/lib/data";
import type { Dictionary } from "@/i18n";

export default function Contact({
  contact, services, t, form,
}: {
  contact: ContactInfo; services: ServiceOption[]; t: Dictionary["contact"]; form: Dictionary["form"];
}) {
  return (
    <section id="contact" className="relative overflow-hidden bg-navy px-6 py-32 text-white md:py-48">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-40 top-10 h-[480px] w-[480px] animate-pulse rounded-full bg-primary/60 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-[560px] w-[560px] animate-pulse rounded-full bg-accent/30 blur-3xl [animation-delay:1.5s]" />
        <div className="absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-primary/30 blur-3xl [animation-delay:0.75s]" />
      </div>

      <div className="relative flex flex-col items-center text-center">
        <p className="mb-10 text-[11px] font-medium uppercase tracking-[0.35em] text-accent">{t.eyebrow}</p>
        <h2 className="text-[clamp(3rem,11vw,12rem)] font-medium leading-[0.88] tracking-[-0.05em]">
          {t.heading}<br />{t.headingLine2 && <>{t.headingLine2} </>}<span className="text-gradient">{t.headingAccent}</span>
        </h2>
        <p className="mt-8 max-w-md text-sm leading-relaxed text-white/70 md:text-base">
          {t.intro}
        </p>
        <div className="mt-16 w-full max-w-3xl">
          <ContactForm services={services} fallbackEmail={contact.email} t={form} />
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[11px] font-medium uppercase tracking-[0.3em] text-white/70">
          <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="transition-colors hover:text-accent">{t.whatsapp}</a>
          <a href={`tel:${contact.phone.replace(/\s/g, "")}`} dir="ltr" className="transition-colors hover:text-accent">{contact.phone}</a>
          <a href={`mailto:${contact.email}`} className="normal-case tracking-widest transition-colors hover:text-accent">{contact.email}</a>
        </div>
      </div>
    </section>
  );
}
