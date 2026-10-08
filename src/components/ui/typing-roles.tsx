"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

// Server-renders the first role in full (readable without JS), then cycles.
// The reduced-motion branch only applies after mount so hydration matches.
export function TypingRoles({ roles }: { roles: readonly string[] }) {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [charCount, setCharCount] = useState(roles[0].length);
  const [deleting, setDeleting] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect -- mount flag for SSR-safe branching
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted || reduce) return;
    const current = roles[roleIndex];

    if (!deleting && charCount === current.length) {
      const t = setTimeout(() => setDeleting(true), 1800);
      return () => clearTimeout(t);
    }

    if (deleting && charCount === 0) {
      const t = setTimeout(() => {
        setDeleting(false);
        setRoleIndex((i) => (i + 1) % roles.length);
      }, 280);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => setCharCount((c) => c + (deleting ? -1 : 1)), deleting ? 28 : 55);
    return () => clearTimeout(t);
  }, [mounted, reduce, charCount, deleting, roleIndex, roles]);

  if (mounted && reduce) {
    return <span>{roles.join(" · ")}</span>;
  }

  return (
    <span className="inline-flex items-center">
      <span aria-hidden className="whitespace-nowrap">
        {roles[roleIndex].slice(0, charCount)}
      </span>
      <span aria-hidden className="ml-0.5 inline-block h-[1em] w-[2px] animate-pulse bg-accent" />
      {/* The animated text is decorative; assistive tech gets the full list once. */}
      <span className="sr-only">{roles.join(", ")}</span>
    </span>
  );
}
