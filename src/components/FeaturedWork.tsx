"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import type { Project } from "@/lib/data";
import { ProjectPlaceholder } from "@/components/detail/ProjectCard";
import type { Dictionary } from "@/i18n";

function Card({
  project, index, total, progress, href, t, badge,
}: {
  project: Project; index: number; total: number; progress: MotionValue<number>; href: string; t: Dictionary["work"]; badge?: string;
}) {
  // Reduced motion: cards still stack, but without the scroll-driven shrink and dimming. (Same style keys on the
  // server and client — only the output ranges collapse — so hydration never sees a mismatch.)
  const still = useReducedMotion() ?? false;
  const targetScale = still ? 1 : 1 - (total - index - 1) * 0.05;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);
  const brightness = useTransform(progress, [index / total, 1], [1, still ? 1 : 1 - (total - index - 1) * 0.12]);
  const filter = useTransform(brightness, (b) => `brightness(${b})`);
  const portrait = project.image ? project.image.height > project.image.width : false;

  return (
    <div className="sticky top-0 flex h-screen items-center justify-center px-4 md:px-10">
      <motion.article
        style={{ scale, filter, top: index * 24 }}
        className="relative h-[78vh] w-full max-w-[1500px] origin-top overflow-hidden rounded-2xl bg-navy text-white"
      >
        {!project.image ? (
          <ProjectPlaceholder title="" className="absolute inset-0 opacity-60" />
        ) : portrait ? (
          <div className="absolute inset-0 flex items-start justify-center pt-20 md:items-center md:justify-end md:pe-[8%] md:pt-0">
            <div className="pointer-events-none absolute end-0 top-1/2 h-[70vh] w-[70vh] -translate-y-1/2 translate-x-1/4 rtl:-translate-x-1/4 rounded-full bg-primary/60 blur-3xl" aria-hidden />
            <Image
              src={project.image.src}
              alt={project.title}
              width={project.image.width}
              height={project.image.height}
              sizes="(min-width:768px) 40vw, 80vw"
              className="relative h-[34vh] w-auto rounded-xl shadow-2xl md:h-[58vh]"
            />
          </div>
        ) : (
          <Image src={project.image.src} alt={project.title} fill sizes="100vw" className="object-cover object-top" />
        )}
        {portrait ? (
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent md:bg-gradient-to-r md:via-navy/30 rtl:md:bg-gradient-to-l" />
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-navy/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/20 to-transparent rtl:bg-gradient-to-l" />
          </>
        )}
        <div className="relative flex h-full flex-col justify-between p-6 md:p-12">
          <div className="flex items-start justify-between text-[11px] font-medium uppercase tracking-[0.3em]">
            <span dir="ltr">{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
            <span className="flex items-center gap-3">
              {badge && <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold tracking-widest text-accent">{badge}</span>}
              {project.platform}
            </span>
          </div>
          <div className={`flex flex-col gap-8 ${portrait ? "md:w-1/2" : "md:flex-row md:items-end md:justify-between"}`}>
            <div>
              <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.3em] text-accent">{project.category}</p>
              <h3 className="text-5xl font-medium leading-[0.9] tracking-[-0.04em] md:text-[7rem]">{project.title}</h3>
              <p className="mt-6 max-w-lg text-sm leading-relaxed text-white/75 md:text-base">{project.summary}</p>
            </div>
            <Link
              href={href}
              className={`group flex shrink-0 items-center gap-3 self-start rounded-full bg-white px-6 py-4 text-[11px] font-bold tracking-widest text-navy transition-all duration-500 ease-premium hover:scale-105 hover:bg-accent ${portrait ? "" : "md:self-auto"}`}
            >
              {t.viewCase}
              <ArrowUpRight size={16} className="transition-transform duration-500 ease-premium group-hover:rotate-45 rtl:-scale-x-100 rtl:group-hover:-rotate-45" />
            </Link>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default function FeaturedWork({
  projects, t, projectsPath, teamBadge, viewAll,
}: {
  projects: Project[]; t: Dictionary["work"]; projectsPath: string; teamBadge: string; viewAll: string;
}) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ["start start", "end end"] });

  return (
    <section id="work" className="border-t border-border pt-24 md:pt-40">
      <div className="mx-auto mb-12 flex max-w-[1600px] items-end justify-between gap-6 px-6 md:mb-4 md:px-10">
        <h2 className="text-5xl font-medium leading-[0.95] tracking-[-0.04em] md:text-8xl">
          {t.heading[0]}<br />{t.heading[1]}
        </h2>
        <Link href={projectsPath} className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary hover:underline">
          {viewAll} ({String(projects.length).padStart(2, "0")}) →
        </Link>
      </div>

      <div ref={container} className="relative">
        {projects.map((p, i) => (
          <Card
            key={p.id}
            project={p}
            index={i}
            total={projects.length}
            progress={scrollYProgress}
            href={`${projectsPath}/${p.id}`}
            t={t}
            badge={p.ownership === "team" ? teamBadge : undefined}
          />
        ))}
      </div>
    </section>
  );
}
