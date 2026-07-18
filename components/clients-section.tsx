import type { Client } from "@/types/api"

export function ClientsSection({ clients = [] }: { clients?: Client[] }) {
  if (clients.length === 0) return null

  return (
    <section className="bg-background py-16">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-center text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Trusted by teams building the future
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {clients.map((client) => {
            const content = client.logo ? (
              <img
                src={client.logo}
                alt={client.name}
                className="h-10 w-auto rounded-lg object-contain grayscale transition-all hover:grayscale-0"
              />
            ) : (
              <span className="text-sm font-semibold text-muted-foreground">
                {client.name}
              </span>
            )

            return client.website ? (
              <a
                key={client.id}
                href={client.website}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center"
              >
                {content}
              </a>
            ) : (
              <div key={client.id} className="flex items-center justify-center">
                {content}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
