"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

// Used by staggered children: no delay key, so the parent's stagger applies.
const variants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

// A variant's own transition overrides the `transition` prop, so the delay
// has to travel through `custom`.
const delayedVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: (delay: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, ease, delay } }),
};

const tagMap = {
  div: motion.div,
  span: motion.span,
  li: motion.li,
  ul: motion.ul,
  section: motion.section,
  article: motion.article,
} as const;

// `data-reveal` lets the <noscript> rule in the root layout un-hide content
// when JavaScript is unavailable (framer-motion server-renders opacity: 0).
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: keyof typeof tagMap;
}) {
  const MotionTag = tagMap[as];
  return (
    <MotionTag
      data-reveal=""
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      variants={delayedVariants}
      custom={delay}
    >
      {children}
    </MotionTag>
  );
}

export function RevealGroup({
  children,
  className,
  stagger = 0.07,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: keyof typeof tagMap;
}) {
  const MotionTag = tagMap[as];
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: keyof typeof tagMap;
}) {
  const MotionTag = tagMap[as];
  return (
    <MotionTag data-reveal="" className={className} variants={variants}>
      {children}
    </MotionTag>
  );
}

export const revealChildVariants: Variants = variants;
