import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

export function SectionHeading({
  id,
  index,
  eyebrow,
  title,
  description,
  aside,
  className,
}: {
  // Used as the section's aria-labelledby target.
  id: string;
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-12 flex flex-col gap-6 sm:mb-16 lg:flex-row lg:items-end lg:justify-between", className)}>
      <div className="max-w-3xl">
        <Reveal>
          <p className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
            <span className="text-accent">{index}</span>
            <span className="h-px w-8 bg-line-strong" aria-hidden />
            <span>{eyebrow}</span>
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2
            id={id}
            className="font-display text-[2.1rem] leading-[1.08] font-medium tracking-tight text-balance sm:text-5xl md:text-[3.4rem]"
          >
            {title}
          </h2>
        </Reveal>
        {description && (
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-soft text-pretty sm:text-lg">{description}</p>
          </Reveal>
        )}
      </div>
      {aside && <Reveal delay={0.12}>{aside}</Reveal>}
    </div>
  );
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}
