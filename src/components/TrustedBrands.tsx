import type { IconType } from "react-icons";
import { RiGrokAiFill, RiOpenaiFill } from "react-icons/ri";
import {
  SiAnthropic, SiClaude, SiDeepseek, SiDjango, SiDocker, SiElevenlabs, SiFigma, SiFirebase, SiFlutter,
  SiGithubcopilot, SiGooglegemini, SiHuggingface, SiLangchain, SiMeta, SiMistralai, SiNextdotjs, SiNodedotjs,
  SiNvidia, SiOllama, SiPerplexity, SiPostgresql, SiQwen, SiReact, SiReplicate, SiTailwindcss, SiTypescript,
} from "react-icons/si";
import { Sparkles } from "lucide-react";

type Item = { name: string; icon: IconType };

/** AI models, platforms and generative tools. Add or remove entries here to customise the strip. */
const AI_TOOLS: Item[] = [
  { name: "OpenAI", icon: RiOpenaiFill },
  { name: "Anthropic", icon: SiAnthropic },
  { name: "Claude", icon: SiClaude },
  { name: "DeepSeek", icon: SiDeepseek },
  { name: "Gemini", icon: SiGooglegemini },
  { name: "Llama", icon: SiMeta },
  { name: "Mistral AI", icon: SiMistralai },
  { name: "Grok", icon: RiGrokAiFill },
  { name: "Qwen", icon: SiQwen },
  { name: "Hugging Face", icon: SiHuggingface },
  { name: "LangChain", icon: SiLangchain },
  { name: "Ollama", icon: SiOllama },
  { name: "Perplexity", icon: SiPerplexity },
  { name: "GitHub Copilot", icon: SiGithubcopilot },
  { name: "ElevenLabs", icon: SiElevenlabs },
  { name: "Midjourney", icon: Sparkles as IconType },
  { name: "Stable Diffusion", icon: Sparkles as IconType },
  { name: "Replicate", icon: SiReplicate },
  { name: "NVIDIA", icon: SiNvidia },
];

const STACK: Item[] = [
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
];

function Marquee({ items, reverse = false }: { items: Item[]; reverse?: boolean }) {
  return (
    <div dir="ltr" className="marquee-track relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent md:w-48" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent md:w-48" />
      <div className={`marquee-inner flex w-max ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}>
        {[0, 1].map((dup) => (
          <ul key={dup} aria-hidden={dup === 1} className="flex shrink-0 items-center">
            {items.map(({ name, icon: Icon }) => (
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
  );
}

export default function TrustedBrands({ heading, stackHeading }: { heading: string; stackHeading: string }) {
  return (
    <section id="brands" className="border-t border-border py-16 md:py-20">
      <h2 className="mb-12 px-6 text-center text-[11px] font-medium uppercase tracking-[0.35em] text-muted">{heading}</h2>
      <Marquee items={AI_TOOLS} />
      <h2 className="mb-10 mt-16 px-6 text-center text-[11px] font-medium uppercase tracking-[0.35em] text-muted">{stackHeading}</h2>
      <Marquee items={STACK} reverse />
    </section>
  );
}
