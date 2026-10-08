"use client";

import { ArrowUpRight, Check, Info, Users, X } from "lucide-react";
import Image from "next/image";
import { createContext, type ReactNode, useCallback, useContext, useMemo, useState } from "react";
import { GithubIcon } from "@/components/icons/social-icons";
import { LiveDemoLink } from "@/components/projects/live-demo";
import { buttonClasses, TechBadge } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { diagramAssets } from "@/lib/data/assets";
import { getProject, type Project } from "@/lib/data/projects";

type ProjectDialogContext = { openProject: (slug: string) => void };

const Ctx = createContext<ProjectDialogContext | null>(null);

export function useProjectDialog() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useProjectDialog must be used inside ProjectDialogProvider");
  return ctx;
}

export function ProjectDialogProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [slug, setSlug] = useState<string | null>(null);

  const openProject = useCallback((next: string) => {
    setSlug(next);
    setIsOpen(true);
  }, []);
  const value = useMemo(() => ({ openProject }), [openProject]);
  const project = slug ? getProject(slug) : undefined;

  return (
    <Ctx.Provider value={value}>
      {children}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        labelledBy="project-dialog-title"
        className="items-end justify-center sm:items-center sm:p-6"
      >
        {project && <CaseStudy project={project} onClose={() => setIsOpen(false)} />}
      </Dialog>
    </Ctx.Provider>
  );
}

// Lets server-rendered sections open a case study.
export function OpenProjectButton({
  slug,
  className,
  children,
}: {
  slug: string;
  className?: string;
  children: ReactNode;
}) {
  const { openProject } = useProjectDialog();
  return (
    <button type="button" onClick={() => openProject(slug)} aria-haspopup="dialog" className={className}>
      {children}
    </button>
  );
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-line pt-6">
      <h3 className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">{title}</h3>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function CaseStudy({ project, onClose }: { project: Project; onClose: () => void }) {
  const teamRepo = project.team?.repoHost === "teammate";

  return (
    <article className="pointer-events-auto relative flex max-h-[94dvh] w-full max-w-4xl flex-col overflow-hidden rounded-t-3xl border border-line bg-paper-raised shadow-lift sm:max-h-[88dvh] sm:rounded-3xl">
      {/* Header */}
      <header className="relative border-b border-line px-5 pt-5 pb-5 sm:px-8 sm:pt-7">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(80% 120% at 0% 0%, var(--glow), transparent 60%)" }}
        />
        <div className="relative flex items-start gap-4">
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[11px] tracking-[0.18em] text-ink-faint uppercase">{project.category}</p>
            <h2 id="project-dialog-title" className="mt-2 font-display text-3xl leading-tight tracking-tight sm:text-4xl">
              {project.name}
            </h2>
            <p className="mt-3 max-w-2xl text-pretty text-ink-soft">{project.tagline}</p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full border border-line bg-paper/60 px-3 py-1 text-ink-soft">{project.context}</span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent-tint px-3 py-1 text-accent">
                <Users size={12} aria-hidden /> {project.role}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            data-autofocus=""
            aria-label="Close case study"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-paper/60 text-ink-soft transition-colors hover:border-accent/60 hover:text-accent"
          >
            <X size={18} />
          </button>
        </div>
        <div className="relative mt-5 flex flex-wrap gap-3">
          <a href={project.github} target="_blank" rel="noopener noreferrer" className={buttonClasses({ variant: "secondary", size: "sm" })}>
            <GithubIcon size={15} /> View code
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <LiveDemoLink href={project.live} size="sm" />
        </div>
      </header>

      {/* Body */}
      {/* Focusable so keyboard users can scroll it even when it holds no links. */}
      <div
        tabIndex={0}
        role="region"
        aria-label={`${project.name} case study details`}
        className="min-h-0 flex-1 space-y-7 overflow-y-auto overscroll-contain px-5 py-6 focus-visible:outline-offset-[-4px] sm:px-8 sm:py-8"
      >
        {project.metrics && (
          <dl className="grid grid-cols-3 gap-3">
            {project.metrics.map((m) => (
              <div key={m.label} className="flex flex-col-reverse rounded-2xl border border-line bg-paper/50 p-3 sm:p-4">
                <dt className="mt-1 text-[11px] leading-snug text-ink-faint sm:text-xs">{m.label}</dt>
                <dd className="font-display text-xl text-ink sm:text-3xl">{m.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Block title="Problem">
            <p className="leading-relaxed text-ink-soft">{project.problem}</p>
          </Block>
          <Block title="Solution">
            <p className="leading-relaxed text-ink-soft">{project.solution}</p>
          </Block>
        </div>

        <Block title="Key features">
          <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {project.features.map((f) => (
              <li key={f} className="flex gap-2.5 text-sm leading-relaxed text-ink-soft">
                <Check size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </Block>

        <Block title="Architecture">
          <ul className="space-y-2">
            {project.architecture.map((line) => (
              <li key={line} className="flex gap-3 text-sm leading-relaxed text-ink-soft">
                <span className="mt-2 h-1 w-3 shrink-0 rounded-full bg-accent/60" aria-hidden />
                <span>{line}</span>
              </li>
            ))}
          </ul>
          {project.diagrams && (
            <div className="mt-6 grid grid-cols-1 gap-5">
              {project.diagrams.map((d) => {
                const img = diagramAssets[d.asset];
                return (
                  <figure key={d.asset} className="overflow-hidden rounded-2xl border border-line bg-paper">
                    <a href={img.src} target="_blank" rel="noopener noreferrer" className="block">
                      <Image
                        src={img.src}
                        alt={d.alt}
                        width={img.width}
                        height={img.height}
                        sizes="(min-width: 896px) 832px, 100vw"
                        className="h-auto w-full"
                      />
                      <span className="sr-only">Open the full-size diagram in a new tab</span>
                    </a>
                    <figcaption className="flex items-center justify-between gap-3 border-t border-line px-4 py-2.5 font-mono text-[11px] text-ink-faint">
                      {d.caption}
                      <span className="hidden sm:inline">Click to open full size</span>
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          )}
        </Block>

        <Block title="Technologies">
          <div className="flex flex-wrap gap-2">
            {project.stack.map((t) => (
              <TechBadge key={t}>{t}</TechBadge>
            ))}
          </div>
        </Block>

        <Block title="My role">
          <p className="text-sm font-semibold text-ink">{project.role}</p>
          <ul className="mt-3 space-y-2">
            {project.contribution.map((c) => (
              <li key={c} className="flex gap-2.5 text-sm leading-relaxed text-ink-soft">
                <Check size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </Block>

        {(project.notes || teamRepo) && (
          <div className="flex gap-3 rounded-2xl border border-line bg-paper/50 p-4 text-sm leading-relaxed text-ink-soft">
            <Info size={17} className="mt-0.5 shrink-0 text-accent-2" aria-hidden />
            <div className="space-y-1.5">
              <p className="font-mono text-[11px] tracking-[0.16em] text-ink-faint uppercase">Implementation notes</p>
              {project.notes?.map((n) => <p key={n}>{n}</p>)}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
