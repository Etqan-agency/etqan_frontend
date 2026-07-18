const columns = [
  {
    title: "Services",
    links: ["Web Development", "Mobile Apps", "System Integration", "Cloud", "DevOps"],
  },
  {
    title: "Company",
    links: ["About", "Work", "Careers", "Press", "Contact"],
  },
  {
    title: "Resources",
    links: ["Help Center", "Guides", "API", "Status", "Security"],
  },
]

export function SiteFooter() {
  return (
    <footer className="bg-background px-4 pb-8">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl text-white">
        <img
          src="/footer-image.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#030814]/70" />

        <div className="relative px-4 py-16 md:px-14">
          <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
            <div>
              <a href="#" className="flex items-center gap-2">
                <img
                  src="/tab-logo.png"
                  alt="Etqan Agency logo"
                  className="size-7"
                />
                <span className="text-lg font-semibold tracking-tight">
                  Etqan Agency
                </span>
              </a>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
                Full-service software company providing end-to-end digital
                solutions, including web and mobile development, system
                integration, and custom software tailored to business needs.
              </p>
            </div>

            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-semibold">{col.title}</h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-white/60 transition-colors hover:text-white"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/20 pt-6 text-sm text-white/50 sm:flex-row">
            <p>© {new Date().getFullYear()} Etqan Agency. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="transition-colors hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="transition-colors hover:text-white">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
