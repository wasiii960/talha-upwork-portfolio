"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function ParallaxOrbs() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const y1 = useTransform(scrollYProgress, [0, 1], [-70, 70]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -90]);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <motion.div
        style={{ y: y1 }}
        className="absolute -left-24 top-10 size-72 rounded-full bg-[radial-gradient(closest-side,rgba(59,130,246,0.14),transparent)] blur-2xl"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute -right-20 bottom-0 size-80 rounded-full bg-[radial-gradient(closest-side,rgba(56,189,248,0.12),transparent)] blur-2xl"
      />
    </div>
  );
}
