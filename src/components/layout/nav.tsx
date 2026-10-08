"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Download, FileText, Menu, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/social-icons";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { resumeAsset } from "@/lib/data/assets";
import { profile } from "@/lib/data/profile";
import { navItems } from "@/lib/site";
import { cn } from "@/lib/utils";

const sectionIds = ["home", ...navItems.map((n) => n.id)];

// The active section is the last one whose top has crossed 35% of the viewport.
function useActiveSection() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    let frame = 0;
    function update() {
      const line = window.innerHeight * 0.35;
      let current = "home";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      // At the very bottom the last section can't reach the line.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = sectionIds[sectionIds.length - 1];
      }
      setActive(current);
    }
    function onScroll() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return active;
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  const close = useCallback((restoreFocus = false) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close(true);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  const primary = navItems.filter((n) => n.primary);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled || open ? "glass border-b border-line" : "border-b border-transparent"
      )}
    >
      <nav aria-label="Primary" className={cn("mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 transition-[padding] duration-300 sm:px-6 lg:px-8", scrolled ? "py-2.5" : "py-4")}>
        <a href="#home" className="group flex items-center gap-2.5" aria-label={`${profile.name} — back to top`}>
          <span
            className={cn(
              "flex items-center justify-center rounded-xl border border-line-strong bg-paper-raised font-mono text-sm font-medium transition-all duration-300 group-hover:border-accent/60",
              scrolled ? "h-9 w-9" : "h-10 w-10"
            )}
          >
            SK<span className="text-accent">.</span>
          </span>
          <span className="hidden text-sm leading-tight whitespace-nowrap sm:block">
            <span className="block font-semibold text-ink">{profile.name}</span>
            <span className="block text-xs text-ink-faint">B.E. Computer · Class of 2027</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 xl:flex">
          {primary.map((link) => (
            <li key={link.id} className="relative">
              <a
                href={`#${link.id}`}
                aria-current={active === link.id ? "location" : undefined}
                className={cn(
                  "relative z-10 block rounded-full px-3 py-2 text-[13.5px] font-medium transition-colors",
                  active === link.id ? "text-ink" : "text-ink-soft hover:text-ink"
                )}
              >
                {link.label}
              </a>
              {active === link.id && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-full border border-line-strong bg-paper-elevated/80"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="#resume"
            aria-current={active === "resume" ? "location" : undefined}
            className={cn(
              "hidden h-9 items-center gap-1.5 rounded-full px-4 text-[13px] font-semibold transition-colors sm:inline-flex",
              active === "resume" ? "bg-accent-strong text-accent-contrast" : "bg-accent text-accent-contrast hover:bg-accent-strong"
            )}
          >
            <FileText size={14} aria-hidden /> Resume
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-accent/60 xl:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu-scrim"
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => close()}
            className="fixed inset-0 top-full -z-10 h-dvh bg-[rgb(5_6_9/0.55)] backdrop-blur-[2px] xl:hidden"
          />
        )}
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-line xl:hidden"
          >
            <div className="mx-auto max-h-[calc(100dvh-4.5rem)] max-w-6xl overflow-y-auto px-4 pt-3 pb-6 sm:px-6">
              <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                {[{ id: "home", label: "Home" }, ...navItems].map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => {
                        // The browser drops the fragment scroll while the menu
                        // collapses, so close first and scroll explicitly.
                        const target = document.getElementById(link.id);
                        if (!target) return close();
                        e.preventDefault();
                        close();
                        requestAnimationFrame(() => {
                          const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
                          target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
                          history.pushState(null, "", `#${link.id}`);
                        });
                      }}
                      aria-current={active === link.id ? "location" : undefined}
                      className={cn(
                        "flex items-center justify-between rounded-xl px-3 py-3 text-base font-medium transition-colors",
                        active === link.id ? "bg-paper-elevated text-ink" : "text-ink-soft hover:bg-paper-elevated/60 hover:text-ink"
                      )}
                    >
                      {link.label}
                      {active === link.id && <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-line pt-4">
                <a
                  href={resumeAsset.file}
                  download={resumeAsset.downloadName}
                  className="inline-flex h-10 items-center gap-2 rounded-full bg-accent px-4 text-sm font-semibold text-accent-contrast"
                >
                  <Download size={15} aria-hidden /> Download resume
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-soft"
                >
                  <GithubIcon size={16} />
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-soft"
                >
                  <LinkedinIcon size={16} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
