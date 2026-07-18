"use client"

import { ArrowLeft, ArrowRight } from "lucide-react"
import { useState } from "react"
import type { Project as ApiProject } from "@/types/api"

type DisplayProject =
  | {
      type: "web"
      name: string
      tag: string
      image: string
    }
  | {
      type: "mobile"
      name: string
      tag: string
      image: string
    }

const FALLBACK_PROJECTS: DisplayProject[] = [
  {
    type: "web",
    name: "Original Software",
    tag: "E-commerce Platform",
    image: "/original-software-screenshot.png",
  },
]

function toDisplayProjects(apiProjects: ApiProject[]): DisplayProject[] {
  return apiProjects
    .filter((p) => Boolean(p.cover_image))
    .map((p) => ({
      type: p.category === "mobile" ? "mobile" : "web",
      name: p.title,
      tag: p.client_name || p.summary,
      image: p.cover_image as string,
    }))
}

export function WorkShowcaseSection({
  projects: apiProjects = [],
}: {
  projects?: ApiProject[]
}) {
  const mapped = toDisplayProjects(apiProjects)
  const projects = mapped.length > 0 ? mapped : FALLBACK_PROJECTS

  const [index, setIndex] = useState(0)
  const project = projects[index % projects.length]

  const prev = () => setIndex((i) => (i - 1 + projects.length) % projects.length)
  const next = () => setIndex((i) => (i + 1) % projects.length)

  return (
    <section id="work" className="bg-background py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-foreground shadow-sm">
            Our Work
          </span>
          <h2 className="mx-auto mt-5 max-w-2xl text-balance text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Projects we've brought to life
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
            A look at the web and mobile products our team has designed,
            built, and shipped.
          </p>
        </div>

        <div className="relative mt-14">
          <div className="flex min-h-[420px] items-center justify-center">
            {project.type === "web" ? (
              <MacFrame image={project.image} name={project.name} />
            ) : (
              <PhoneFrame image={project.image} name={project.name} />
            )}
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm font-medium text-foreground">
              {project.name}
            </p>
            <p className="text-xs text-muted-foreground">{project.tag}</p>
          </div>

          {projects.length > 1 && (
            <>
              <button
                onClick={prev}
                aria-label="Previous project"
                className="absolute left-0 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card shadow-sm transition-colors hover:bg-muted"
              >
                <ArrowLeft className="size-4" />
              </button>
              <button
                onClick={next}
                aria-label="Next project"
                className="absolute right-0 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card shadow-sm transition-colors hover:bg-muted"
              >
                <ArrowRight className="size-4" />
              </button>

              <div className="mt-6 flex justify-center gap-2">
                {projects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    aria-label={`Go to project ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      i === index ? "w-6 bg-foreground" : "w-1.5 bg-border"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

function MacFrame({ image, name }: { image: string; name: string }) {
  return (
    <div className="w-full max-w-3xl">
      <div className="rounded-t-xl border border-b-0 border-foreground/15 bg-foreground/95 p-2 shadow-2xl">
        <div className="overflow-hidden rounded-lg bg-background">
          <img
            src={image}
            alt={`${name} website screenshot`}
            className="aspect-[16/10] w-full object-cover object-top"
          />
        </div>
      </div>
      <div className="h-3 rounded-b-2xl bg-gradient-to-b from-foreground/80 to-foreground/60" />
      <div className="mx-auto h-2 w-24 rounded-b-lg bg-foreground/40" />
    </div>
  )
}

function PhoneFrame({ image, name }: { image: string; name: string }) {
  return (
    <div className="w-[260px]">
      <div className="rounded-[2.5rem] border-[6px] border-foreground/90 bg-foreground p-1 shadow-2xl">
        <div className="relative overflow-hidden rounded-[2rem] bg-background">
          <div className="absolute left-1/2 top-0 z-10 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-foreground" />
          <img
            src={image}
            alt={`${name} app screenshot`}
            className="aspect-[9/19.5] w-full object-cover"
          />
        </div>
      </div>
    </div>
  )
}
