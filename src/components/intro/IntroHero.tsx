"use client";

import { MotionConfig, motion } from "framer-motion";
import CTAButton from "./CTAButton";
import HeroBadge from "./HeroBadge";
import HeroHeading from "./HeroHeading";
import HeroVideo from "./HeroVideo";
import TrustIndicators from "./TrustIndicators";
import { container, riseUp } from "./motion";
import type { Dictionary } from "@/i18n";

export default function IntroHero({ badge, subtitle, t }: { badge: string; subtitle: string; t: Dictionary["hero"] }) {
  return (
    <MotionConfig reducedMotion="user">
      <section id="top" className="relative overflow-hidden bg-background px-6 pb-20 pt-36 md:pt-40">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto flex max-w-5xl flex-col items-center text-center"
        >
          {badge && <HeroBadge>{badge}</HeroBadge>}
          <HeroHeading line1={t.h1Line1} line2={<>{t.h1Line2} <span className="text-gradient">{t.h1Accent}</span></>} />
          <motion.p
            variants={riseUp}
            className="mt-8 max-w-[700px] text-lg leading-relaxed text-muted md:text-xl"
          >
            {subtitle}
          </motion.p>
          <CTAButton href="#contact">{t.cta}</CTAButton>
          <HeroVideo />
          <TrustIndicators labels={t.trust} />
        </motion.div>
      </section>
    </MotionConfig>
  );
}
