import { ArrowUpRight, Clock3 } from "lucide-react";
import { buttonClasses } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Renders a real link once a deployment URL is set in the project data;
// until then, a non-interactive "coming soon" label (never a dead link).
export function LiveDemoLink({
  href,
  size = "sm",
  className,
}: {
  href: string | null;
  size?: "sm" | "md";
  className?: string;
}) {
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClasses({ variant: "primary", size, className: cn("relative z-10", className) })}
      >
        Live demo
        <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    );
  }
  return (
    <span
      className={cn(
        "relative z-10 inline-flex shrink-0 items-center gap-2 rounded-full border border-dashed border-line-strong px-4 text-[13px] whitespace-nowrap text-ink-faint",
        size === "sm" ? "h-9" : "h-11",
        className
      )}
    >
      <Clock3 size={14} aria-hidden />
      Live demo — coming soon
    </span>
  );
}
