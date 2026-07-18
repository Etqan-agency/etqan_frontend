"use client"

import { Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react"
import { useState } from "react"
import { apiPost, ApiError } from "@/lib/api"
import type { ContactMessageResponse, SiteSettings } from "@/types/api"

type Status = "idle" | "submitting" | "success" | "error"

export function ContactSection({
  settings,
}: {
  settings?: Pick<SiteSettings, "contact_email" | "contact_phone" | "address">
}) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const reset = () => {
    setName("")
    setEmail("")
    setSubject("")
    setMessage("")
    setStatus("idle")
    setFieldErrors({})
  }

  const contactEmail = settings?.contact_email || "hello@etqanagency.com"
  const contactPhone = settings?.contact_phone || "+20 102 857 7310"
  const address = settings?.address || "6th October, Giza, Egypt"

  const handleSubmit = async () => {
    setStatus("submitting")
    setFieldErrors({})
    try {
      await apiPost<ContactMessageResponse>("/contact/", {
        name,
        email,
        subject,
        message,
      })
      setStatus("success")
    } catch (err) {
      setStatus("error")
      if (err instanceof ApiError) {
        const flat: Record<string, string> = {}
        for (const [key, messages] of Object.entries(err.fieldErrors)) {
          if (Array.isArray(messages)) flat[key] = messages[0]
        }
        setFieldErrors(flat)
      }
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden">
      {/* sky to hills background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, #cfe6f7 0%, #e8f3fb 30%, #f1f8f4 60%, #dff0e4 100%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-4 pb-32 pt-24">
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-foreground shadow-sm">
            <MessageCircle className="size-3.5 text-primary" />
            Contact
          </span>
          <h2 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Contact us
          </h2>
          <div className="mt-5 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-xl bg-primary/15 px-3 py-2 text-sm font-semibold text-primary">
              24h <Send className="size-4" />
            </span>
          </div>
          <p className="mx-auto mt-5 max-w-md text-sm text-muted-foreground">
            Our average response time for new project inquiries like yours.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Left column: promo + contact info */}
          <div className="flex flex-col gap-6">
            <div className="relative aspect-4/3 overflow-hidden rounded-3xl">
              <img
                src="/man-app.png"
                alt="Etqan Agency team ready to discuss your project"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/55 to-transparent" />
              <div className="relative p-7 text-white">
                <span className="flex size-9 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                  <MessageCircle className="size-4" />
                </span>
                <p className="mt-16 max-w-[16rem] text-pretty text-xl font-medium leading-snug">
                  Tell us about your project and we&apos;ll get back to you
                  with next steps
                </p>
              </div>
            </div>

            <div className="flex flex-1 flex-col justify-center rounded-3xl border border-border bg-card p-6">
              <div className="flex flex-col gap-4">
                <ContactInfoRow icon={Mail} label="Email" value={contactEmail} />
                <ContactInfoRow icon={Phone} label="Phone" value={contactPhone} />
                <ContactInfoRow icon={MapPin} label="Office" value={address} />
              </div>
            </div>
          </div>

          {/* Right column: form */}
          <div className="flex flex-col rounded-3xl border border-border bg-card p-6 sm:p-8">
            {status === "success" ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
                <span className="flex size-12 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Send className="size-5" />
                </span>
                <p className="text-xl font-semibold text-foreground">
                  Message sent
                </p>
                <p className="max-w-xs text-sm text-muted-foreground">
                  Thanks for reaching out — our team will get back to you
                  within 24 hours.
                </p>
                <button
                  onClick={reset}
                  className="mt-3 rounded-xl border border-border bg-card px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Full Name"
                    value={name}
                    onChange={setName}
                    placeholder="John Doe"
                    error={fieldErrors.name}
                  />
                  <Field
                    label="Email Address"
                    value={email}
                    onChange={setEmail}
                    placeholder="john@company.com"
                    error={fieldErrors.email}
                  />
                </div>

                <div className="mt-5">
                  <Field
                    label="Subject"
                    value={subject}
                    onChange={setSubject}
                    placeholder="Project inquiry"
                    error={fieldErrors.subject}
                  />
                </div>

                <div className="mt-5 flex flex-1 flex-col">
                  <label className="text-sm text-muted-foreground">Message</label>
                  <div className="mt-2 flex-1 rounded-xl border border-border bg-card px-4 py-3">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us about your project..."
                      className="h-full w-full resize-none bg-transparent text-sm font-medium text-foreground placeholder:font-normal placeholder:text-muted-foreground outline-none"
                    />
                  </div>
                  {fieldErrors.message && (
                    <p className="mt-1 text-xs text-destructive">
                      {fieldErrors.message}
                    </p>
                  )}
                </div>

                <div className="mt-7 rounded-2xl bg-muted/60 p-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    Ready to start your project?
                  </p>
                  <p className="mt-1 text-2xl font-semibold text-foreground">
                    Let&apos;s talk
                  </p>
                  {status === "error" && Object.keys(fieldErrors).length === 0 && (
                    <p className="mt-3 text-xs text-destructive">
                      Something went wrong. Please try again.
                    </p>
                  )}
                  <div className="mt-5 flex items-center justify-center gap-3">
                    <button
                      onClick={handleSubmit}
                      disabled={status === "submitting"}
                      className="flex items-center gap-2 rounded-xl bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-transform hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
                    >
                      {status === "submitting" ? "Sending…" : "Send Message"}{" "}
                      <Send className="size-3.5" />
                    </button>
                    <button
                      onClick={reset}
                      className="rounded-xl border border-border bg-card px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                    >
                      Clear
                    </button>
                  </div>
                </div>

                <p className="mt-5 text-center text-[11px] leading-relaxed text-muted-foreground">
                  By submitting this form, you agree to be contacted by Etqan
                  Agency regarding your inquiry.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  error,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  error?: string
}) {
  return (
    <div>
      <label className="text-sm text-muted-foreground">{label}</label>
      <div className="mt-2 flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm font-medium text-foreground placeholder:font-normal placeholder:text-muted-foreground outline-none"
        />
      </div>
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  )
}

function ContactInfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Mail
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
        <Icon className="size-4" />
      </span>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium text-foreground">{value}</p>
      </div>
    </div>
  )
}
