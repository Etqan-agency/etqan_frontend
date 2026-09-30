import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/data";

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
  const portrait = project.image ? project.image.height > project.image.width : false;
  return (
    <Link href={href} className="group block overflow-hidden rounded-2xl bg-navy text-white">
      <div className="relative aspect-[16/10] overflow-hidden">
        {project.image ? (
          <Image
            src={project.image.src}
            alt={project.title}
            fill
            sizes="(min-width:1024px) 45vw, 100vw"
            className={`transition-transform duration-700 ease-premium group-hover:scale-105 ${portrait ? "object-contain p-6" : "object-cover object-top"}`}
          />
        ) : (
          <ProjectPlaceholder title={project.title} className="absolute inset-0 transition-transform duration-700 ease-premium group-hover:scale-105" />
        )}
        {badge && (
          <span className="absolute start-4 top-4 rounded-full bg-navy/80 px-3 py-1.5 text-[10px] font-bold tracking-widest text-accent backdrop-blur">
            {badge}
          </span>
        )}
      </div>
      <div className="flex items-end justify-between gap-6 p-6 md:p-8">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-accent">{project.category}</p>
          <h3 className="mt-3 text-3xl font-medium tracking-[-0.03em] md:text-4xl">{project.title}</h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">{project.summary}</p>
        </div>
        <span className="flex shrink-0 items-center gap-2 text-[11px] font-bold tracking-widest">
          <span className="sr-only">{cta}</span>
          <ArrowUpRight size={20} aria-hidden className="transition-transform duration-500 ease-premium group-hover:rotate-45 rtl:-scale-x-100 rtl:group-hover:-rotate-45" />
        </span>
      </div>
    </Link>
  );
}
