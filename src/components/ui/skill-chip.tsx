"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const TIP_WIDTH = 240;

// A skill with evidence. The "used in" tooltip opens on hover, keyboard focus
// or tap, takes no layout space while closed, and flips to right-aligned near
// the viewport edge so it never causes horizontal overflow.
export function SkillChip({ name, evidence, tipId }: { name: string; evidence: string[]; tipId: string }) {
  const ref = useRef<HTMLLIElement>(null);
  const [open, setOpen] = useState(false);
  const [alignRight, setAlignRight] = useState(false);

  function show() {
    const el = ref.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      setAlignRight(rect.left + TIP_WIDTH > document.documentElement.clientWidth - 12);
    }
    setOpen(true);
  }

  // Touch has no hover-out: close on the next tap elsewhere.
  useEffect(() => {
    if (!open) return;
    function onDown(e: PointerEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  return (
    <li
      ref={ref}
      className="relative"
      onPointerEnter={(e) => e.pointerType === "mouse" && show()}
      onPointerLeave={(e) => e.pointerType === "mouse" && setOpen(false)}
    >
      <button
        type="button"
        aria-describedby={tipId}
        onFocus={show}
        onBlur={() => setOpen(false)}
        onClick={show}
        className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-paper/70 py-1 pr-1 pl-3 text-sm text-ink transition-colors hover:border-accent/60 focus-visible:border-accent"
      >
        {name}
        <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 font-mono text-[10px] text-accent-contrast">
          {evidence.length}
          <span className="sr-only">{evidence.length === 1 ? " use" : " uses"}</span>
        </span>
      </button>
      <span
        role="tooltip"
        id={tipId}
        className={cn(
          "absolute top-full z-20 mt-2 w-max max-w-[min(15rem,calc(100vw-2rem))] rounded-xl border border-line-strong bg-paper-elevated px-3 py-2 text-xs leading-relaxed text-ink-soft shadow-lift",
          alignRight ? "right-0" : "left-0",
          open ? "block" : "hidden"
        )}
      >
        <span className="block font-mono text-[10px] tracking-[0.14em] text-ink-faint uppercase">Used in</span>
        {evidence.join(" · ")}
      </span>
    </li>
  );
}
