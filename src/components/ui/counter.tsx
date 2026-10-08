"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function Counter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1.4,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- jump straight to the final value
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, reduce, value, duration]);

  const formatted = display.toFixed(decimals);

  return (
    <span ref={ref} className="font-feature-tab">
      {/* Screen readers (and no-JS visitors, via the layout's <noscript> rule)
          get the final value rather than intermediate frames. */}
      <span aria-hidden data-counter-anim="">
        {prefix}
        {formatted}
        {suffix}
      </span>
      <span className="sr-only" data-counter-final="">
        {prefix}
        {value.toFixed(decimals)}
        {suffix}
      </span>
    </span>
  );
}
