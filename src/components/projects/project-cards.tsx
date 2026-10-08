"use client";

import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { GithubIcon } from "@/components/icons/social-icons";
import { LiveDemoLink } from "@/components/projects/live-demo";
import { useProjectDialog } from "@/components/projects/project-dialog";
import { TechBadge } from "@/components/ui/button";
import { ProjectVisual } from "@/components/ui/project-visual";
import type { Project } from "@/lib/data/projects";
import { cn } from "@/lib/utils";

const cardShell =
  "group ring-gradient relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-paper-raised shadow-soft transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:shadow-lift motion-reduce:hover:translate-y-0";

// The project name is a button whose ::after stretches over the whole card,
// so the card is clickable without nesting links inside a link.
function OpenTrigger({ project, className }: { project: Project; className?: string }) {
  const { openProject } = useProjectDialog();
  return (
    <button
      type="button"
      onClick={() => openProject(project.slug)}
      aria-haspopup="dialog"
      className={cn(
        "text-left after:absolute after:inset-0 after:z-0 after:rounded-3xl after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-accent",
        className
      )}
    >
      {project.name}
      <span className="sr-only"> — open case study</span>
    </button>
  );
}

function CodeLink({ project }: { project: Project }) {
  return (
    <a
      href={project.github}
      target="_blank"
      rel="noopener noreferrer"
      className="relative z-10 inline-flex h-9 items-center gap-2 rounded-full border border-line-strong bg-paper/60 px-4 text-[13px] font-semibold text-ink transition-colors hover:border-accent/60 hover:text-accent"
    >
      <GithubIcon size={14} /> View code
      <span className="sr-only"> for {project.name} on GitHub</span>
    </a>
  );
}

export function FeaturedProjectCard({ project, index }: { project: Project; index: number }) {
  const shown = project.stack.slice(0, 6);
  const rest = project.stack.length - shown.length;

  return (
    <article className={cardShell}>
      <ProjectVisual slug={project.slug} name={project.name} category={project.category} flow={project.flow} />

      <div className="flex flex-1 flex-col p-5 sm:p-7">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] tracking-[0.14em] text-ink-faint uppercase">
          <span className="text-accent">{String(index + 1).padStart(2, "0")}</span>
          <span>{project.context}</span>
        </p>

        <h3 className="mt-3 font-display text-[1.7rem] leading-tight font-medium tracking-tight sm:text-3xl">
          <OpenTrigger project={project} className="transition-colors group-hover:text-accent" />
        </h3>
        <p className="mt-3 text-pretty leading-relaxed text-ink-soft">{project.tagline}</p>

        {project.metrics && (
          <dl className="mt-5 grid grid-cols-3 divide-x divide-line rounded-2xl border border-line bg-paper/40">
            {project.metrics.map((m) => (
              <div key={m.label} className="flex flex-col-reverse px-3 py-3 sm:px-4">
                <dt className="mt-0.5 text-[11px] leading-snug text-ink-faint">{m.label}</dt>
                <dd className="font-display text-lg text-ink sm:text-2xl">{m.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <ul className="mt-5 space-y-2">
          {project.features.slice(0, 3).map((f) => (
            <li key={f} className="flex gap-2.5 text-sm leading-relaxed text-ink-soft">
              <Check size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {shown.map((t) => (
            <TechBadge key={t}>{t}</TechBadge>
          ))}
          {rest > 0 && <TechBadge className="text-ink-faint">+{rest}</TechBadge>}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-2.5 pt-7">
          <CodeLink project={project} />
          <LiveDemoLink href={project.live} />
          <span className="ml-auto hidden items-center gap-1.5 text-sm font-semibold text-ink-soft transition-colors group-hover:text-accent sm:inline-flex" aria-hidden>
            Case study
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </article>
  );
}

export function CompactProjectCard({ project }: { project: Project }) {
  return (
    <article className={cardShell}>
      <ProjectVisual slug={project.slug} name={project.name} category={project.category} flow={project.flow} size="sm" />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="font-mono text-[11px] tracking-[0.14em] text-ink-faint uppercase">{project.context}</p>
        <h3 className="mt-2.5 font-display text-2xl leading-tight font-medium tracking-tight">
          <OpenTrigger project={project} className="transition-colors group-hover:text-accent" />
        </h3>
        <p className="mt-2.5 text-sm leading-relaxed text-pretty text-ink-soft">{project.tagline}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 4).map((t) => (
            <TechBadge key={t}>{t}</TechBadge>
          ))}
        </div>
        <div className="mt-auto flex flex-wrap items-center gap-2.5 pt-6">
          <CodeLink project={project} />
          <LiveDemoLink href={project.live} />
          <ArrowUpRight
            size={18}
            aria-hidden
            className="ml-auto text-ink-faint transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
          />
        </div>
      </div>
    </article>
  );
}
