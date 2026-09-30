import type { Faq } from "@/lib/data";
import { jsonLd } from "@/lib/seo";

/** Visible FAQ accordion + FAQPage schema (schema only ever mirrors what's on the page). */
export default function Faqs({ heading, faqs }: { heading: string; faqs: Faq[] }) {
  if (!faqs.length) return null;
  const schema = {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };
  return (
    <section className="border-t border-border px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-[1600px] gap-12 md:grid-cols-12">
        <h2 className="text-4xl font-medium leading-[0.95] tracking-[-0.04em] md:col-span-4 md:text-6xl">{heading}</h2>
        <div className="md:col-span-8">
          {faqs.map((f) => (
            <details key={f.question} className="group border-t border-border py-6 last:border-b">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-xl font-medium md:text-2xl">
                {f.question}
                <span aria-hidden className="text-accent transition-transform duration-300 group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 max-w-2xl whitespace-pre-line leading-relaxed text-muted">{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
    </section>
  );
}
