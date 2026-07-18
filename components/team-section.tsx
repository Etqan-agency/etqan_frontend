import { Users } from "lucide-react"
import type { TeamMember } from "@/types/api"

export function TeamSection({ team = [] }: { team?: TeamMember[] }) {
  if (team.length === 0) return null

  return (
    <section id="team" className="bg-background py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-foreground shadow-sm">
            <Users className="size-3.5 text-primary" />
            Our Team
          </span>
          <h2 className="mx-auto mt-5 max-w-2xl text-balance text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
            The people behind the work
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
            A small, senior team that designs, builds and ships every project
            end to end.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <article
              key={member.id}
              className="flex flex-col items-center rounded-2xl border border-border bg-card p-6 text-center shadow-sm"
            >
              {member.photo ? (
                <img
                  src={member.photo}
                  alt={member.name}
                  className="size-20 rounded-full object-cover"
                />
              ) : (
                <div className="flex size-20 items-center justify-center rounded-full bg-primary/15 text-lg font-semibold text-primary">
                  {member.name
                    .split(" ")
                    .slice(0, 2)
                    .map((w) => w[0]?.toUpperCase())
                    .join("")}
                </div>
              )}
              <p className="mt-4 text-sm font-semibold text-foreground">
                {member.name}
              </p>
              <p className="text-xs text-muted-foreground">{member.role}</p>
              {member.bio && (
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  {member.bio}
                </p>
              )}
              {Object.keys(member.socials ?? {}).length > 0 && (
                <div className="mt-4 flex items-center gap-3">
                  {Object.entries(member.socials).map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-medium capitalize text-primary hover:underline"
                    >
                      {platform}
                    </a>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
