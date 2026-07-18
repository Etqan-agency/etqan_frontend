"use client"

import { ArrowRight } from "lucide-react"

export function ExpansionSection() {
  return (
    <section className="bg-background px-4 pb-24">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl">
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80"
          alt="Server racks in a modern data center"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#030814]/55" />

        <div className="relative grid min-h-[560px] gap-8 p-8 md:grid-cols-2 md:p-14">
          <div className="flex items-center">
            <h2 className="text-balance text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
              Expansion potential of your digital product
            </h2>
          </div>

          <div className="flex items-end">
            <div className="max-w-xs border-t border-white/20 pt-5">
              <p className="text-pretty text-sm leading-relaxed text-white/80">
                Fast tech progress and rising demand from businesses of every
                size show that we are only at the start of what software can
                do for you.
              </p>
              <button
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="mt-5 flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
              >
                Learn more
                <span className="flex size-5 items-center justify-center rounded-full bg-white/25">
                  <ArrowRight className="size-3" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
