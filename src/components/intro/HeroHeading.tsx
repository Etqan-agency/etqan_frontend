import { motion } from "framer-motion";
import { riseUp } from "./motion";

export default function HeroHeading({ line1, line2 }: { line1: string; line2: React.ReactNode }) {
  return (
    <motion.h1
      variants={riseUp}
      className="mt-8 font-editorial text-[44px] font-medium leading-[1.05] tracking-[-0.04em] text-foreground sm:text-[56px] md:text-[72px] lg:text-[96px]"
    >
      {line1}{" "}
      <br />
      {line2}
    </motion.h1>
  );
}
