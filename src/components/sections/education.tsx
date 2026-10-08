import { BookOpen, GraduationCap, School } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Container, SectionHeading } from "@/components/ui/section-heading";
import { education } from "@/lib/data/education";

export function Education() {
  const [degree, ...earlier] = education;
  const earlierIcons = [School, BookOpen];
  const [score, outOf] = degree.score.value.split("/").map((s) => s.trim());

  return (
    <section id="education" aria-labelledby="education-title" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading
          id="education-title"
          index="06"
          eyebrow="Education"
          title={
            <>
              Consistent results, <span className="text-ink-soft italic">from SSC to final year.</span>
            </>
          }
        />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:grid-rows-2">
          <Reveal className="lg:col-span-2 lg:row-span-2">
            <article className="ring-gradient relative h-full overflow-hidden rounded-3xl border border-accent/30 bg-paper-raised p-6 shadow-soft sm:p-9">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{ background: "radial-gradient(70% 80% at 100% 0%, var(--glow), transparent 65%)" }}
              />
              <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:linear-gradient(to_left,black,transparent_60%)]" />
              <div className="relative">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-accent/30 bg-accent-tint text-accent">
                    <GraduationCap size={20} aria-hidden />
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-tint px-3 py-1 text-xs font-semibold text-accent">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                    {degree.status} · {degree.period}
                  </span>
                </div>

                <div className="mt-7 grid grid-cols-1 gap-8 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
                  <div>
                    <h3 className="font-display text-3xl leading-tight tracking-tight sm:text-4xl">
                      {degree.degree}
                      <span className="block text-accent italic">{degree.field}</span>
                    </h3>
                    <p className="mt-4 text-[17px] text-ink">{degree.institution}</p>
                    <p className="mt-1 text-sm text-ink-faint">{degree.board}</p>
                  </div>
                  <div className="sm:text-right">
                    <p className="font-mono text-[11px] tracking-[0.18em] text-ink-faint uppercase">{degree.score.label}</p>
                    <p className="mt-1 font-display text-6xl leading-none tracking-tight text-ink sm:text-7xl">
                      {score}
                      {outOf && <span className="text-3xl text-ink-faint sm:text-4xl"> / {outOf}</span>}
                    </p>
                  </div>
                </div>

                {degree.coursework && (
                  <div className="mt-9 border-t border-line pt-6">
                    <p className="font-mono text-[11px] tracking-[0.18em] text-ink-faint uppercase">Relevant coursework</p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {degree.coursework.map((c) => (
                        <li key={c} className="rounded-full border border-line bg-paper/60 px-3 py-1.5 text-sm text-ink-soft">
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </article>
          </Reveal>

          {earlier.map((e, i) => {
            const Icon = earlierIcons[i];
            return (
              <Reveal key={e.id} delay={0.06 * (i + 1)} className="h-full">
                <article className="flex h-full flex-col rounded-3xl border border-line bg-paper-raised/70 p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-paper text-accent">
                      <Icon size={18} aria-hidden />
                    </span>
                    <span className="font-mono text-xs text-ink-faint">{e.period}</span>
                  </div>
                  <h3 className="mt-5 font-display text-xl leading-snug">
                    {e.degree}
                    {e.field !== e.degree && e.field !== "SSC" && <span className="text-ink-soft"> — {e.field}</span>}
                  </h3>
                  <p className="mt-1.5 text-sm text-ink-soft">{e.institution}</p>
                  <p className="mt-0.5 text-xs text-ink-faint">{e.board}</p>
                  <div className="mt-auto pt-5">
                    <p className="flex items-baseline justify-between gap-3 border-t border-line pt-4 text-sm">
                      <span className="text-ink-faint">{e.score.label}</span>
                      <span className="font-display text-3xl text-ink">{e.score.value}</span>
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
