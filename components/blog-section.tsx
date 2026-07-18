import { ArrowRight, Newspaper } from "lucide-react"
import type { BlogPost } from "@/types/api"

function formatDate(iso: string | null) {
  if (!iso) return ""
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export function BlogSection({ posts = [] }: { posts?: BlogPost[] }) {
  if (posts.length === 0) return null

  return (
    <section id="blog" className="bg-background py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-foreground shadow-sm">
            <Newspaper className="size-3.5 text-primary" />
            From the blog
          </span>
          <h2 className="mx-auto mt-5 max-w-2xl text-balance text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Insights from our team
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {posts.map((post) => (
            <article
              key={post.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
            >
              {post.cover_image && (
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={post.cover_image}
                    alt={post.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col p-5">
                {post.tags.length > 0 && (
                  <span className="w-fit rounded-full bg-primary/15 px-2.5 py-0.5 text-[11px] font-medium text-primary">
                    {post.tags[0].name}
                  </span>
                )}
                <p className="mt-3 text-sm font-semibold leading-snug text-foreground">
                  {post.title}
                </p>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>{formatDate(post.published_at)}</span>
                  <span className="flex items-center gap-1 font-medium text-primary">
                    Read <ArrowRight className="size-3" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
