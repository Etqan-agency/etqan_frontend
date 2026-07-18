import { Quote } from "lucide-react"
import type { Opinion } from "@/types/api"

export function TestimonialsSection({
  opinions = [],
}: {
  opinions?: Opinion[]
}) {
  if (opinions.length === 0) return null

  return (
    <section className="bg-muted/30 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-foreground shadow-sm">
            <Quote className="size-3.5 text-primary" fill="currentColor" />
            Testimonials
          </span>
          <h2 className="mx-auto mt-5 max-w-2xl text-balance text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
            What our clients say
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {opinions.map((opinion) => (
            <article
              key={opinion.id}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <Quote className="size-6 text-primary/40" fill="currentColor" />
              <p className="mt-4 flex-1 text-pretty text-sm leading-relaxed text-foreground">
                &ldquo;{opinion.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                {opinion.avatar ? (
                  <img
                    src={opinion.avatar}
                    alt={opinion.author_name}
                    className="size-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
                    {opinion.author_name
                      .split(" ")
                      .slice(0, 2)
                      .map((w) => w[0]?.toUpperCase())
                      .join("")}
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {opinion.author_name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {opinion.author_role}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
