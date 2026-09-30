"use client";

import { ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useId, useRef, useState, type FormEvent } from "react";
import { readAttribution, track } from "@/lib/analytics";
import { TURNSTILE_SITE_KEY } from "@/lib/site";
import type { Dictionary } from "@/i18n";

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") ?? "";

// Stored values stay in English so leads are comparable across languages; labels are localized.
const BUDGET_VALUES = ["Under $3,000", "$3,000 – $10,000", "$10,000 – $30,000", "$30,000+", "Not sure yet"];

type Status = { state: "idle" | "sending" } | { state: "error"; message: string };

const field =
  "w-full border-b border-white/20 bg-transparent py-4 text-base text-white placeholder:text-white/65 transition-colors focus:border-accent focus:shadow-[0_1px_0_0_var(--accent)] focus:outline-none";

/** Visually hidden, but it is the field's accessible name — the placeholder alone is not a label. */
const label = "sr-only";

/** Flatten a DRF error body ({field: [msg]} or {detail}) into one line. */
function errorText(data: unknown, fallback: string): string {
  if (!data || typeof data !== "object") return fallback;
  const d = data as Record<string, unknown>;
  if (typeof d.detail === "string") return d.detail;
  return Object.values(d).flat().map(String).join(" ");
}

export type ServiceOption = { slug: string; title: string };

export default function ContactForm({ services, fallbackEmail, t }: { services: ServiceOption[]; fallbackEmail: string; t: Dictionary["form"] }) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const started = useRef(false);
  const id = useId();
  const f = (name: string) => `${id}-${name}`;
  // The only client-side check: an email or a phone number is needed to reply.
  const contactMissing = status.state === "error" && status.message === t.needContact;
  const contactDescribedBy = `${f("hint")}${status.state === "error" ? ` ${f("error")}` : ""}`;

  const onFirstFocus = () => {
    if (started.current) return;
    started.current = true;
    track("contact_form_start", { form_id: "contact", page_type: "home" });
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const values = Object.fromEntries(new FormData(form)) as Record<string, string>;

    if (!values.email?.trim() && !values.phone?.trim()) {
      setStatus({ state: "error", message: t.needContact });
      return;
    }

    const { "cf-turnstile-response": turnstile, project_type: serviceSlug, ...rest } = values;
    // The select's value is the service slug: link the lead to the Service and keep its title as project_type.
    const chosen = services.find((s) => s.slug === serviceSlug);
    const projectType = chosen?.title ?? (serviceSlug ? "Other" : "");
    const filled = Object.fromEntries(Object.entries(rest).filter(([, v]) => v.trim() !== ""));
    const body: Record<string, string> = {
      ...filled,
      ...readAttribution(),
      page_path: window.location.pathname,
      language: document.documentElement.lang || "en",
      subject: `${projectType || "New project"} inquiry from ${values.name}`.slice(0, 200),
    };
    if (projectType) body.project_type = projectType.slice(0, 100);
    if (chosen) body.service = chosen.slug;
    if (turnstile) body.cf_turnstile_response = turnstile;

    setStatus({ state: "sending" });
    track("contact_form_submit", { form_id: "contact" });
    try {
      const post = (payload: Record<string, string>) =>
        fetch(`${API_URL}/contact/`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      let res = await post(body);
      // Never lose a lead over the service link (e.g. offline fallback slugs the API doesn't know): retry without it.
      if (res.status === 400 && body.service) {
        const err = (await res.clone().json().catch(() => null)) as Record<string, unknown> | null;
        if (err && "service" in err) {
          const { service: _drop, ...withoutService } = body;
          void _drop;
          res = await post(withoutService);
        }
      }
      if (!res.ok) {
        track("contact_form_error", { form_id: "contact", status: res.status });
        setStatus({ state: "error", message: errorText(await res.json().catch(() => null), t.generic) });
        return;
      }
      // Primary conversion. No personal data goes to analytics.
      track("generate_lead", {
        form_id: "contact",
        service: chosen?.slug ?? (serviceSlug ? "other" : "unspecified"),
        budget_range: values.budget_range || "unspecified",
        language: body.language,
      });
      form.reset();
      router.push(document.documentElement.lang === "ar" ? "/ar/thank-you" : "/thank-you");
    } catch {
      setStatus({ state: "error", message: t.network.replace("{email}", fallbackEmail) });
    }
  };

  return (
    <form onSubmit={submit} onFocus={onFirstFocus} className="grid w-full gap-x-10 gap-y-2 text-start md:grid-cols-2">
      {TURNSTILE_SITE_KEY && <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />}
      <div>
        <label htmlFor={f("name")} className={label}>{t.name}</label>
        <input id={f("name")} name="name" required maxLength={150} placeholder={t.name} autoComplete="name" className={field} />
      </div>
      <div>
        <label htmlFor={f("company")} className={label}>{t.company}</label>
        <input id={f("company")} name="company" maxLength={150} placeholder={t.company} autoComplete="organization" className={field} />
      </div>
      <div>
        <label htmlFor={f("email")} className={label}>{t.email}</label>
        <input
          id={f("email")} name="email" type="email" placeholder={t.email} autoComplete="email" className={field}
          aria-invalid={contactMissing || undefined} aria-describedby={contactDescribedBy}
        />
      </div>
      <div>
        <label htmlFor={f("phone")} className={label}>{t.phone}</label>
        <input
          id={f("phone")} name="phone" type="tel" dir="ltr" maxLength={40} placeholder={t.phone} autoComplete="tel" className={`${field} rtl:text-right`}
          aria-invalid={contactMissing || undefined} aria-describedby={contactDescribedBy}
        />
      </div>
      <div>
        <label htmlFor={f("project_type")} className={label}>{t.need}</label>
        <select id={f("project_type")} name="project_type" required defaultValue="" className={`${field} appearance-none [&>option]:text-navy`}>
          <option value="" disabled>{t.need}</option>
          {services.map((s) => <option key={s.slug} value={s.slug}>{s.title}</option>)}
          <option value="Other">{t.other}</option>
        </select>
      </div>
      <div>
        <label htmlFor={f("budget_range")} className={label}>{t.budget}</label>
        <select id={f("budget_range")} name="budget_range" defaultValue="" className={`${field} appearance-none [&>option]:text-navy`}>
          <option value="">{t.budget}</option>
          {BUDGET_VALUES.map((v, i) => <option key={v} value={v}>{t.budgets[i] ?? v}</option>)}
        </select>
      </div>
      <div className="md:col-span-2">
        <label htmlFor={f("message")} className={label}>{t.message}</label>
        <textarea
          id={f("message")}
          name="message"
          minLength={10}
          rows={4}
          placeholder={t.message}
          className={`${field} resize-none`}
        />
      </div>
      {/* Honeypot: hidden from people, filled in by bots. The API rejects submissions that include it. */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />
      <p id={f("hint")} className="mt-2 text-xs text-white/70 md:col-span-2">{t.hint}</p>
      <div className="mt-8 flex flex-col items-center gap-4 md:col-span-2">
        {TURNSTILE_SITE_KEY && <div className="cf-turnstile" data-sitekey={TURNSTILE_SITE_KEY} data-theme="dark" />}
        <button
          type="submit"
          data-cta="contact_submit"
          disabled={status.state === "sending"}
          className="group flex items-center gap-3 rounded-full bg-brand-gradient-strong px-10 py-6 text-xs font-bold tracking-widest text-white shadow-[0_20px_60px_-15px_rgba(77,193,227,0.5)] transition-transform duration-500 ease-premium hover:scale-105 disabled:opacity-60 md:px-14 md:py-7 md:text-sm"
        >
          {status.state === "sending" ? t.sending : t.submit}
          <ArrowUpRight size={18} aria-hidden className="transition-transform duration-500 ease-premium group-hover:rotate-45 rtl:-scale-x-100 rtl:group-hover:-rotate-45" />
        </button>
        {/* Always mounted so screen readers reliably announce the message when it appears */}
        <p id={f("error")} role="alert" className="text-sm text-red-300 empty:hidden">{status.state === "error" ? status.message : ""}</p>
      </div>
    </form>
  );
}
