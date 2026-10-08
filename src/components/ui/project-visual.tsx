import { cn } from "@/lib/utils";

// Deterministic per-project variation without shipping fake screenshots.
function hashString(input: string) {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// A drawn pipeline of the project's real request/data flow (taken from each
// repository's README/architecture docs). It is labelled as a flow, never as a
// screenshot.
export function ProjectVisual({
  slug,
  name,
  category,
  flow,
  size = "lg",
  className,
}: {
  slug: string;
  name: string;
  category: string;
  flow: string[];
  size?: "lg" | "sm";
  className?: string;
}) {
  const seed = hashString(slug);
  const glowX = 20 + (seed % 60);
  const glowY = 10 + ((seed >> 3) % 40);
  const initials = name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={cn(
        "relative overflow-hidden border-b border-line bg-paper-raised",
        size === "lg" ? "aspect-[16/10] sm:aspect-[16/9]" : "aspect-[16/9]",
        className
      )}
      aria-hidden
    >
      <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]">
        <div className="dot-grid absolute inset-0 opacity-70" />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(60% 70% at ${glowX}% ${glowY}%, var(--glow), transparent 70%), radial-gradient(50% 60% at ${100 - glowX}% 100%, var(--glow-2), transparent 70%)`,
          }}
        />
        <span
          className={cn(
            "absolute -right-2 -bottom-6 font-display leading-none font-semibold text-ink/[0.045] select-none",
            size === "lg" ? "text-[9rem] sm:text-[11rem]" : "text-[7rem]"
          )}
        >
          {initials}
        </span>
      </div>

      <div className="absolute inset-x-4 top-4 flex items-center justify-between font-mono text-[10px] tracking-[0.18em] text-ink-faint uppercase sm:inset-x-5 sm:top-5">
        <span className="truncate">{category}</span>
      </div>

      <div className={cn("absolute inset-x-3 top-1/2 -translate-y-1/2 sm:inset-x-5", size === "lg" && "lg:inset-x-8")}>
        {/* 2×2 grid on phones (numbers carry the order), connected row from sm. */}
        <ol className="grid grid-cols-2 gap-2 sm:flex sm:items-stretch sm:gap-0">
          {flow.map((step, i) => (
            <li key={step} className="flex min-w-0 flex-1 items-center">
              <div
                className={cn(
                  "glass relative flex min-h-11 w-full min-w-0 flex-col justify-center rounded-xl border px-2.5 py-1.5 shadow-soft transition-colors duration-300 sm:min-h-14 sm:px-3 sm:py-2",
                  i === 0
                    ? "border-accent/50"
                    : i === flow.length - 1
                      ? "border-accent-2/40"
                      : "border-line-strong",
                  "group-hover:border-accent/50"
                )}
              >
                <span className="font-mono text-[9px] text-accent sm:text-[10px]">{String(i + 1).padStart(2, "0")}</span>
                <span
                  className={cn(
                    "mt-0.5 font-mono leading-tight text-ink [overflow-wrap:anywhere]",
                    size === "lg" ? "text-[10px] sm:text-xs" : "text-[10px] sm:text-[11px]"
                  )}
                >
                  {step}
                </span>
              </div>
              {i < flow.length - 1 && (
                <svg className="hidden h-2 w-3 shrink-0 text-accent sm:block sm:w-6" viewBox="0 0 24 8" fill="none" preserveAspectRatio="none">
                  <line x1="0" y1="4" x2="24" y2="4" stroke="currentColor" strokeWidth="1.5" className="flow-dash" />
                </svg>
              )}
            </li>
          ))}
        </ol>
      </div>

      <div className="absolute inset-x-4 bottom-3 flex items-center gap-2 font-mono text-[10px] tracking-[0.14em] text-ink-faint uppercase sm:inset-x-5 sm:bottom-4">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        System flow
      </div>
    </div>
  );
}
