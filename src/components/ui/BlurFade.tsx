"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface BlurFadeProps {
  children: React.ReactNode;
  delay?: number;
  yOffset?: number;
  duration?: number;
  className?: string;
}

export function BlurFade({
  children,
  delay = 0,
  yOffset = 8,
  duration = 0.5,
  className = "",
}: BlurFadeProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ y: yOffset, opacity: 0, filter: "blur(6px)" }}
      animate={
        isInView
          ? { y: 0, opacity: 1, filter: "blur(0px)" }
          : { y: yOffset, opacity: 0, filter: "blur(6px)" }
      }
      transition={{ delay: 0.04 + delay, duration, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
