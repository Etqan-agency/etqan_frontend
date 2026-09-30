import type { IconType } from "react-icons";
import {
  SiDjango, SiDocker, SiFigma, SiFirebase, SiFlutter, SiGoogleads, SiMeta,
  SiNextdotjs, SiNodedotjs, SiPostgresql, SiReact, SiTailwindcss, SiTypescript,
} from "react-icons/si";

const STACK: { name: string; icon: IconType }[] = [
  { name: "Next.js", icon: SiNextdotjs },
  { name: "React", icon: SiReact },
  { name: "Flutter", icon: SiFlutter },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Django", icon: SiDjango },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "Firebase", icon: SiFirebase },
  { name: "Docker", icon: SiDocker },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "Figma", icon: SiFigma },
  { name: "Google Ads", icon: SiGoogleads },
  { name: "Meta Ads", icon: SiMeta },
];

export default function TrustedBrands({ heading }: { heading: string }) {
  return (
    <section id="brands" className="border-t border-border py-16 md:py-20">
      <h2 className="mb-12 text-center text-[11px] font-medium uppercase tracking-[0.35em] text-muted">
        {heading}
      </h2>
      <div dir="ltr" className="marquee-track relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent md:w-48" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent md:w-48" />
        <div className="marquee-inner flex w-max animate-marquee">
          {[0, 1].map((dup) => (
            <ul key={dup} aria-hidden={dup === 1} className="flex shrink-0 items-center">
              {STACK.map(({ name, icon: Icon }) => (
                <li
                  key={name}
                  className="flex items-center gap-3 px-10 opacity-50 transition-all duration-500 hover:text-primary hover:opacity-100 md:px-14"
                >
                  <Icon size={24} aria-hidden />
                  <span className="text-xl font-bold tracking-tight md:text-2xl">{name}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
