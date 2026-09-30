import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import { BsCodeSlash, BsGeoAlt, BsPeople, BsTranslate } from "react-icons/bs";
import { fadeUp } from "./motion";

// Facts only — no ratings or client counts until they can be verified. Labels come from the dictionary, in this order.
const ICONS: IconType[] = [BsCodeSlash, BsPeople, BsTranslate, BsGeoAlt];

export default function TrustIndicators({ labels }: { labels: string[] }) {
  const items = labels.map((label, i) => ({ label, icon: ICONS[i % ICONS.length] }));
  return (
    <motion.ul
      variants={fadeUp}
      className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm font-medium text-muted"
    >
      {items.map(({ label, icon: Icon }) => (
        <li key={label} className="flex items-center gap-2">
          <Icon className="text-primary" size={16} aria-hidden />
          {label}
        </li>
      ))}
    </motion.ul>
  );
}
