import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

// Shared look for <a> and <button> call-to-actions.
export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
} = {}) {
  return cn(
    "group inline-flex shrink-0 select-none items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap",
    "transition-[background-color,border-color,color,box-shadow,transform] duration-200 active:scale-[0.98]",
    size === "sm" && "h-9 px-4 text-[13px]",
    size === "md" && "h-11 px-5 text-sm",
    size === "lg" && "h-12 px-6 text-[15px]",
    variant === "primary" &&
      "bg-accent text-accent-contrast shadow-[0_10px_30px_-12px_var(--glow)] hover:bg-accent-strong",
    variant === "secondary" &&
      "border border-line-strong bg-paper-raised/60 text-ink hover:border-accent/60 hover:text-accent",
    variant === "ghost" && "text-ink-soft hover:text-accent",
    className
  );
}

export function TechBadge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-line bg-paper/60 px-2.5 py-1 font-mono text-[11px] leading-none text-ink-soft",
        className
      )}
    >
      {children}
    </span>
  );
}
