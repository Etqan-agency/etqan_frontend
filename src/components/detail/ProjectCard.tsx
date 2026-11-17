import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/data";
import { picturesFor } from "@/lib/projectPictures";

/** Branded stand-in for projects without approved screenshots. */
export function ProjectPlaceholder({ title, className = "" }: { title: string; className?: string }) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden bg-brand-gradient ${className}`} aria-hidden>
      <div className="absolute -end-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
      <span className="relative text-5xl font-medium tracking-[-0.04em] text-white/90 md:text-7xl">{title}</span>
    </div>
  );
}

export default function ProjectCard({ project, href, cta, badge }: { project: Project; href: string; cta: string; badge?: string }) {
  const { wide, panel } = picturesFor(project);
  return (
    <Link href={href} className="group flex h-full w-full flex-col overflow-hidden rounded-2xl bg-navy text-white">
      <div className="relative aspect-[16/10] shrink-0 overflow-hidden">
        {wide ? (
          <Image
            src={wide.src}
            alt={project.title}
            fill
            sizes="(min-width:1024px) 45vw, 100vw"
            className="object-cover object-top transition-transform duration-700 ease-premium group-hover:scale-105"
          />
        ) : panel.length ? (
          <>
            {/* Square or tall pictures (app screens, logos) sit whole on a branded stage instead of being cropped. */}
            <div className="absolute inset-0 bg-[radial-gradient(110%_100%_at_50%_100%,var(--primary)_0%,var(--navy)_70%)]" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-2/3 w-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-3xl" aria-hidden />
            <div className="absolute inset-[9%] flex items-center justify-center gap-[4%] transition-transform duration-700 ease-premium group-hover:scale-105">
              {panel.map((pic, k) => (
                <Image
                  key={pic.src}
                  src={pic.src}
                  alt={k === 0 ? project.title : ""}
                  width={pic.width}
                  height={pic.height}
                  sizes="(min-width:1024px) 20vw, 45vw"
                  className="h-auto max-h-full w-auto min-w-0 max-w-[46%] rounded-2xl object-contain shadow-[0_20px_50px_rgba(0,0,0,0.45)] ring-1 ring-white/15"
                />
              ))}
            </div>
          </>
        ) : (
          <ProjectPlaceholder title={project.title} className="absolute inset-0 transition-transform duration-700 ease-premium group-hover:scale-105" />
        )}
        {badge && (
          <span className="absolute start-4 top-4 rounded-full border border-accent/40 bg-navy/80 px-3 py-1.5 text-[10px] font-bold tracking-widest text-accent backdrop-blur">
            {badge}
          </span>
        )}
      </div>
      <div className="flex flex-1 items-end justify-between gap-6 p-6 md:p-8">
        <div className="min-w-0">
          <p className="truncate text-[11px] font-medium uppercase tracking-[0.3em] text-accent">{project.category}</p>
          <h3 className="mt-3 truncate text-3xl font-medium tracking-[-0.03em] md:text-4xl">{project.title}</h3>
          <p className="mt-3 line-clamp-2 min-h-[2lh] max-w-md text-sm leading-relaxed text-white/70">{project.summary}</p>
        </div>
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/20 transition-colors duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-navy">
          <span className="sr-only">{cta}</span>
          <ArrowUpRight size={18} aria-hidden className="transition-transform duration-500 ease-premium group-hover:rotate-45 rtl:-scale-x-100 rtl:group-hover:-rotate-45" />
        </span>
      </div>
    </Link>
  );
}
