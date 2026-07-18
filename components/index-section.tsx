"use client"

import { ArrowRight, Zap } from "lucide-react"
import type { Service, SiteSettingsStats } from "@/types/api"

const FALLBACK_TAGS = ["Web", "Mobile", "Cloud", "APIs", "DevOps", "QA"]

export function IndexSection({
  services = [],
  stats = {},
}: {
  services?: Service[]
  stats?: SiteSettingsStats
}) {
  const tags =
    services.length > 0 ? services.map((s) => s.title) : FALLBACK_TAGS
  const projectsCompleted = stats.projects ?? 120
  const industriesServed = stats.clients ?? 15

  return (
    <section id="about" className="bg-background py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex justify-center">
          <span className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-foreground shadow-sm">
            <Zap className="size-3.5 text-primary" fill="currentColor" />
            How we work
          </span>
        </div>

        <h2 className="mx-auto mt-6 max-w-2xl text-balance text-center text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
          The best teams have been{" "}
          <span className="rounded bg-primary/20 px-1 text-primary">
            seeking approaches
          </span>{" "}
          to software delivery for decades.
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {/* Dark card */}
          <article className="relative flex min-h-[280px] flex-col justify-between overflow-hidden rounded-2xl bg-[#0b1530] p-5 text-white">
            <div className="absolute right-5 top-5 text-white/20" aria-hidden>
              <ArrowRight className="size-8 -rotate-45" />
            </div>
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-foreground">
                Process ✦
              </span>
              <p className="mt-6 max-w-xs text-pretty text-base font-medium leading-snug">
                Analyzing your <span className="text-white/45">requirements</span>{" "}
                <span className="text-white/45">reveals the truth</span> that
                the right architecture provides the best growth for your
                product.
              </p>
              <button
                onClick={() =>
                  document
                    .getElementById("services")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="mt-5 flex items-center gap-2 rounded-full bg-primary px-3.5 py-2 text-xs font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
              >
                Learn more
                <span className="flex size-4 items-center justify-center rounded-full bg-white/25">
                  <ArrowRight className="size-2.5" />
                </span>
              </button>
            </div>
            <div className="mt-6 -mb-1 flex items-center gap-3 opacity-95">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/20 px-2.5 py-0.5 text-[11px] font-medium text-white/80"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>

          {/* Photo card */}
          <article className="relative min-h-[280px] overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80"
              alt="Client reviewing a project delivered by Etqan Agency"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0b1530]/85 via-[#0b1530]/30 to-transparent" />
            <div className="relative flex h-full flex-col justify-between p-5 text-white">
              <div>
                <p className="text-sm font-medium">Client Portal</p>
                <p className="text-[11px] text-white/70">Enterprise SaaS</p>
              </div>
              <div>
                <p className="text-[11px] text-white/70">Projects completed</p>
                <p className="text-2xl font-semibold">
                  {projectsCompleted}
                  <span className="text-white/60">+</span>
                </p>
                <p className="mt-1 text-base font-medium text-white/85">
                  {industriesServed}{" "}
                  <span className="align-top text-[11px] font-normal text-white/70">
                    industries served
                  </span>
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
