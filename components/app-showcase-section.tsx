"use client"

import { ArrowRight, Smartphone } from "lucide-react"

export function AppShowcaseSection() {
  return (
    <section id="services" className="relative overflow-hidden bg-background pb-24 pt-16">
      {/* provided circuit background */}
      <img
        src="/second-section-bg.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 select-none object-contain"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <h2 className="mx-auto max-w-2xl text-balance text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl">
          A clear path through the complicated{" "}
          <span className="text-muted-foreground">world of</span>{" "}
          mobile development
        </h2>
        <p className="mx-auto mt-6 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
          We design and build native and cross-platform apps that don't
          require special knowledge to use, accessible to anyone.
        </p>
        <div className="mt-7 flex justify-center">
          <button
            onClick={() =>
              document
                .getElementById("services")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-transform hover:scale-[1.02]"
          >
            Learn more
            <span className="flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <ArrowRight className="size-3" />
            </span>
          </button>
        </div>
      </div>

      {/* Phone */}
      <div className="relative z-10 mx-auto mt-14 w-[280px] px-4">
        <div className="rounded-[2.5rem] border-[6px] border-foreground/90 bg-foreground p-1 shadow-2xl">
          <div className="relative overflow-hidden rounded-[2rem] bg-background">
            {/* app bar */}
            <div className="relative z-10 flex items-center justify-center gap-1.5 pt-4 text-foreground">
              <Smartphone className="size-3.5 text-primary" />
              <span className="text-xs font-semibold tracking-wide">
                Etqan App
              </span>
            </div>

            <div className="relative m-3 h-[440px] overflow-hidden rounded-2xl">
              <img
                src="/man-app.png"
                alt="Client using an app built by Etqan Agency"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/10 to-foreground/70" />
              <div className="relative flex h-full flex-col justify-between p-4 text-white">
                <div>
                  <p className="text-sm font-semibold">Project Dashboard</p>
                  <p className="text-[10px] text-white/70">Sprint 12</p>
                  <p className="mt-6 text-[10px] text-white/70">
                    Deployment status
                  </p>
                  <p className="text-2xl font-semibold">
                    100<span className="text-white/60">%</span>
                  </p>
                </div>

                <div className="flex justify-center gap-1 rounded-full bg-white/15 p-1 backdrop-blur">
                  <span className="rounded-full bg-white/80 px-4 py-1 text-[11px] font-medium text-foreground">
                    Overview
                  </span>
                  <span className="rounded-full px-4 py-1 text-[11px] font-medium text-white/80">
                    Details
                  </span>
                </div>

                <p className="text-center text-[10px] text-white/75">
                  Accessible, reliable software tailored to your business.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
