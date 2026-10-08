"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

// Fixed page-wide texture: a faint dot grid with a gentle parallax on mouse
// move (fine pointers only, off with reduced motion) and a soft top glow.
export function BlueprintBackdrop() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 20 });
  const sy = useSpring(my, { stiffness: 40, damping: 20 });
  const translateX = useTransform(sx, (v) => v * -1);
  const translateY = useTransform(sy, (v) => v * -1);

  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return;
    function onMove(e: PointerEvent) {
      mx.set((e.clientX / window.innerWidth - 0.5) * 16);
      my.set((e.clientY / window.innerHeight - 0.5) * 16);
    }
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my, reduce]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div className="dot-grid absolute -inset-[4%] opacity-50" style={{ x: translateX, y: translateY }} />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 50% at 50% -10%, var(--glow), transparent)" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 0%, var(--paper) 92%)" }} />
    </div>
  );
}
