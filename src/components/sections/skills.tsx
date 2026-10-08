import {
  BrainCircuit,
  ChartColumn,
  Cloud,
  Code2,
  Database,
  FlaskConical,
  LayoutTemplate,
  Server,
  Smartphone,
} from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Container, SectionHeading } from "@/components/ui/section-heading";
import { SkillChip } from "@/components/ui/skill-chip";
import { type SkillCategory, skillCategories, skillEvidence } from "@/lib/data/skills";

const icons: Record<SkillCategory["icon"], typeof Code2> = {
  code: Code2,
  layout: LayoutTemplate,
  server: Server,
  database: Database,
  brain: BrainCircuit,
  chart: ChartColumn,
  cloud: Cloud,
  test: FlaskConical,
  phone: Smartphone,
};

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading
          id="skills-title"
          index="03"
          eyebrow="Skills"
          title={
            <>
              A toolkit backed by <span className="text-accent italic">shipped work.</span>
            </>
          }
          description="No self-rated percentages. The number on a skill is how many of the projects and internships on this page use it — hover or focus it to see where."
          aside={
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-ink-soft" aria-label="Legend">
              <li className="flex items-center gap-2">
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 font-mono text-[10px] text-accent-contrast">3</span>
                Used in projects or internships
              </li>
              <li className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full border border-dashed border-line-strong" />
                Coursework / training
              </li>
            </ul>
          }
        />

        <RevealGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
          {skillCategories.map((cat) => {
            const Icon = icons[cat.icon];
            return (
              <RevealItem key={cat.id} className="relative h-full focus-within:z-10 hover:z-10">
                <div className="group h-full rounded-3xl border border-line bg-paper-raised/70 p-6 transition-colors duration-300 hover:border-accent/40">
                  <div className="flex items-start gap-3.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-paper text-accent">
                      <Icon size={18} aria-hidden />
                    </span>
                    <div>
                      <h3 className="font-display text-xl leading-tight">{cat.title}</h3>
                      <p className="mt-1 text-sm text-ink-soft">{cat.blurb}</p>
                    </div>
                  </div>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {cat.skills.map((skill) => {
                      const evidence = skillEvidence(skill);
                      const tipId = `skill-${cat.id}-${skill.name.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`;
                      return evidence.length > 0 ? (
                        <SkillChip key={skill.name} name={skill.name} evidence={evidence} tipId={tipId} />
                      ) : (
                        <li key={skill.name}>
                          <span className="inline-flex items-center rounded-full border border-dashed border-line-strong px-3 py-1 text-sm text-ink-soft">
                            {skill.name}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <p className="mt-8 text-sm text-ink-faint">
          Spoken languages: English · Hindi (native) · Marathi (native).
        </p>
      </Container>
    </section>
  );
}
