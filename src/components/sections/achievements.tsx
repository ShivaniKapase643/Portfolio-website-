import { ArrowRight, ArrowUpRight, Award, FileSearch, GraduationCap, Medal, Microscope, Trophy, Users } from "lucide-react";
import { ViewCertificateButton } from "@/components/certificates/certificate-viewer";
import { OpenProjectButton } from "@/components/projects/project-dialog";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Container, SectionHeading } from "@/components/ui/section-heading";
import {
  academicHighlights,
  type Achievement,
  hackathons,
  highlightAchievements,
  leadership,
  participation,
  research,
} from "@/lib/data/achievements";
import { getProject } from "@/lib/data/projects";
import { cn } from "@/lib/utils";
import { achievementItem } from "@/lib/viewer";

const chip =
  "relative z-10 inline-flex h-8 items-center gap-1.5 rounded-full border border-line-strong px-3 text-xs font-semibold text-ink transition-colors hover:border-accent/60 hover:text-accent";

function Actions({ a }: { a: Achievement }) {
  const item = achievementItem(a);
  const project = a.project ? getProject(a.project) : undefined;
  if (!item && !project && !a.href) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {item && (
        <ViewCertificateButton item={item} group="achievements" className={chip}>
          <Award size={13} aria-hidden /> Certificate
          <span className="sr-only">: {a.title}</span>
        </ViewCertificateButton>
      )}
      {project && (
        <OpenProjectButton slug={project.slug} className={chip}>
          {project.name}
          <ArrowRight size={13} aria-hidden />
        </OpenProjectButton>
      )}
      {a.href && (
        <a href={a.href} target="_blank" rel="noopener noreferrer" className={chip}>
          Repository <ArrowUpRight size={13} aria-hidden />
        </a>
      )}
    </div>
  );
}

function ListItem({ a, icon: Icon }: { a: Achievement; icon: typeof Trophy }) {
  return (
    <li className="flex gap-4 py-5 first:pt-0 last:pb-0">
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-line bg-paper text-accent">
        <Icon size={16} aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        <p className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
          <span className="font-semibold text-ink">{a.title}</span>
          {a.date && <span className="font-mono text-xs text-ink-faint">{a.date}</span>}
        </p>
        <p className="mt-0.5 text-sm text-accent">{a.event}</p>
        {a.detail && <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{a.detail}</p>}
        <div className="mt-3">
          <Actions a={a} />
        </div>
      </div>
    </li>
  );
}

export function Achievements() {
  return (
    <section id="achievements" aria-labelledby="achievements-title" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading
          id="achievements-title"
          index="07"
          eyebrow="Research & achievements"
          title={
            <>
              Results under <span className="text-accent italic">real competition.</span>
            </>
          }
          description="International and national hackathons, placement-drive finals, leadership roles and a research internship — with the certificate attached wherever one was issued."
        />

        {/* Headline results */}
        <RevealGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.07}>
          {highlightAchievements.map((a, i) => (
            <RevealItem key={a.id} className="h-full">
              <article
                className={cn(
                  "ring-gradient relative flex h-full flex-col overflow-hidden rounded-3xl border bg-paper-raised/80 p-6 shadow-soft",
                  i === 0 ? "border-accent/35" : "border-line"
                )}
              >
                {i === 0 && (
                  <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(90% 70% at 100% 0%, var(--glow), transparent 65%)" }} />
                )}
                <div className="relative flex h-full flex-col">
                  {a.stat && (
                    <p>
                      <span className="block font-display text-4xl leading-none tracking-tight text-ink">{a.stat.value}</span>
                      <span className="mt-1.5 block font-mono text-[11px] tracking-[0.12em] text-ink-faint uppercase">{a.stat.label}</span>
                    </p>
                  )}
                  <h3 className="mt-6 font-display text-lg leading-snug">{a.title}</h3>
                  <p className="mt-1 text-sm text-accent">{a.event}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{a.detail}</p>
                  <div className="mt-auto pt-5">
                    <Actions a={a} />
                  </div>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Research + academics */}
        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <article aria-labelledby="research-title" className="h-full rounded-3xl border border-line bg-paper-raised/70 p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.18em] text-accent uppercase">
                  <Microscope size={16} aria-hidden /> Research
                </p>
                <span className="rounded-full border border-line px-3 py-1 text-xs text-ink-soft">{research.status}</span>
              </div>
              <h3 id="research-title" className="mt-4 font-display text-2xl leading-snug tracking-tight sm:text-3xl">
                {research.title}
              </h3>
              <p className="mt-2 text-sm text-ink-soft">
                {research.role} · {research.org} · <span className="font-mono text-xs">{research.period}</span>
              </p>
              <dl className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div>
                  <dt className="font-mono text-[11px] tracking-[0.16em] text-ink-faint uppercase">Area</dt>
                  <dd className="mt-1.5 text-sm text-ink">{research.area}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] tracking-[0.16em] text-ink-faint uppercase">Methodology</dt>
                  <dd className="mt-1.5 text-sm text-ink">{research.methodology}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] tracking-[0.16em] text-ink-faint uppercase">Outcome</dt>
                  <dd className="mt-1.5 text-sm text-ink">{research.outcome}</dd>
                </div>
              </dl>
              <ul className="mt-6 flex flex-wrap gap-2">
                {research.contributions.map((c) => (
                  <li key={c} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper/60 px-3 py-1.5 text-xs text-ink-soft">
                    <FileSearch size={12} className="text-accent" aria-hidden /> {c}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>

          <Reveal delay={0.06} className="h-full">
            <article aria-labelledby="academics-title" className="h-full rounded-3xl border border-line bg-paper-raised/70 p-6 sm:p-7">
              <p className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.18em] text-accent uppercase">
                <GraduationCap size={16} aria-hidden /> <span id="academics-title">Academic record</span>
              </p>
              <ul className="mt-5 divide-y divide-line">
                {academicHighlights.map((h) => (
                  <li key={h.label} className="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0">
                    <span>
                      <span className="block font-semibold text-ink">{h.label}</span>
                      <span className="block text-xs text-ink-faint">{h.detail}</span>
                    </span>
                    <span className="font-display text-3xl text-ink">{h.value}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>

        {/* Hackathons, leadership, participation */}
        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <Reveal>
            <div className="h-full rounded-3xl border border-line bg-paper-raised/70 p-6 sm:p-8">
              <h3 className="flex items-center gap-2.5 font-display text-2xl">
                <Trophy size={19} className="text-accent" aria-hidden /> Hackathons & competitions
              </h3>
              <ul className="mt-6 divide-y divide-line">
                {hackathons.map((a) => (
                  <ListItem key={a.id} a={a} icon={Medal} />
                ))}
              </ul>
            </div>
          </Reveal>

          <div className="space-y-5">
            <Reveal delay={0.06}>
              <div className="rounded-3xl border border-line bg-paper-raised/70 p-6 sm:p-7">
                <h3 className="flex items-center gap-2.5 font-display text-2xl">
                  <Users size={19} className="text-accent" aria-hidden /> Leadership
                </h3>
                <ul className="mt-6 divide-y divide-line">
                  {leadership.map((a) => (
                    <ListItem key={a.id} a={a} icon={Users} />
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-line bg-paper-raised/70 p-6 sm:p-7">
                <h3 className="font-display text-xl">Participation</h3>
                <p className="mt-1 text-sm text-ink-soft">Quizzes, aptitude tests and challenge series.</p>
                <ul className="mt-4 space-y-2">
                  {participation.map((a) => {
                    const item = achievementItem(a);
                    return (
                      <li key={a.id} className="flex items-center justify-between gap-3 rounded-xl border border-line bg-paper/40 px-3.5 py-2.5">
                        <span className="min-w-0">
                          <span className="line-clamp-2 block text-sm text-ink">{a.title}</span>
                          <span className="line-clamp-2 block text-xs text-ink-faint">
                            {a.event}
                            {a.date && ` · ${a.date}`}
                          </span>
                        </span>
                        {item && (
                          <ViewCertificateButton
                            item={item}
                            group="achievements"
                            className="shrink-0 rounded-full p-2 text-ink-soft transition-colors hover:bg-accent-tint hover:text-accent"
                          >
                            <Award size={15} aria-hidden />
                            <span className="sr-only">View certificate: {a.title}</span>
                          </ViewCertificateButton>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
