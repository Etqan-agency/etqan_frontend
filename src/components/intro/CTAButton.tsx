"use client";

import { motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { fadeUp } from "./motion";

export default function CTAButton({ href, children }: { href: string; children: React.ReactNode }) {
  const lenis = useLenis();
  return (
    <motion.a
      variants={fadeUp}
      href={href}
      data-cta="hero_primary"
      onClick={(e) => {
        if (!href.startsWith("#")) return;
        e.preventDefault();
        if (lenis) lenis.scrollTo(href, { offset: -80, duration: 1.6 });
        else document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }}
      whileHover={{ scale: 0.98 }}
      whileTap={{ scale: 0.96 }}
      className="mt-10 inline-flex rounded-xl bg-foreground px-8 py-4 font-medium tracking-tight text-white transition-colors duration-300 hover:bg-primary"
    >
      {children}
    </motion.a>
  );
}
