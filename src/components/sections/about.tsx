import { Compass, FlaskConical, GraduationCap, Languages, MapPin, PlugZap, ShieldCheck } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Container, SectionHeading } from "@/components/ui/section-heading";
import { profile } from "@/lib/data/profile";

const principleIcons = [FlaskConical, PlugZap, ShieldCheck];

const facts = [
  { label: "Degree", value: "B.E. Computer Engineering — final year" },
  { label: "College", value: "MES Wadia College of Engineering, Pune (SPPU)" },
  { label: "SGPA", value: `${profile.sgpa} / 10` },
  { label: "Graduating", value: profile.graduation },
  { label: "Focus", value: "Full-stack · Data · AI-integrated apps" },
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading
          id="about-title"
          index="01"
          eyebrow="About"
          title={
            <>
              Practical software, built <span className="text-accent italic">end to end.</span>
            </>
          }
        />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <div className="h-full rounded-3xl border border-line bg-paper-raised/70 p-6 sm:p-8">
              <div className="space-y-5 text-[1.05rem] leading-relaxed text-pretty text-ink-soft sm:text-lg">
                {profile.about.map((p, i) => (
                  <p key={i} className={i === 0 ? "text-ink" : undefined}>
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="glass relative h-full overflow-hidden rounded-3xl border border-line p-6 sm:p-7">
              <div aria-hidden className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-[var(--glow)] blur-2xl" />
              <div className="relative">
                <div className="flex items-center gap-2.5">
                  <GraduationCap size={18} className="text-accent" aria-hidden />
                  <h3 className="font-display text-xl">At a glance</h3>
                </div>
                <dl className="mt-5 space-y-3.5">
                  {facts.map((f) => (
                    <div key={f.label} className="grid grid-cols-[6rem_1fr] gap-3 text-sm">
                      <dt className="font-mono text-[11px] tracking-[0.14em] text-ink-faint uppercase">{f.label}</dt>
                      <dd className="text-ink">{f.value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-6 space-y-2 border-t border-line pt-5 text-sm text-ink-soft">
                  <p className="flex items-center gap-2.5">
                    <MapPin size={15} className="shrink-0 text-accent" aria-hidden /> {profile.location}
                  </p>
                  <p className="flex items-center gap-2.5">
                    <Languages size={15} className="shrink-0 text-accent" aria-hidden /> {profile.spokenLanguages.join(" · ")}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <RevealGroup className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
          {profile.principles.map((item, i) => {
            const Icon = principleIcons[i];
            return (
              <RevealItem key={item.title} className="h-full">
                <div className="group h-full rounded-3xl border border-line bg-paper-raised/70 p-6 transition-colors duration-300 hover:border-accent/40">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-paper text-accent transition-transform duration-300 group-hover:-translate-y-0.5">
                    <Icon size={18} aria-hidden />
                  </span>
                  <h3 className="mt-5 font-display text-xl">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.detail}</p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <Reveal className="mt-5">
          <div className="flex flex-col gap-4 rounded-3xl border border-line bg-paper-raised/70 p-6 sm:flex-row sm:items-center sm:p-7">
            <p className="flex shrink-0 items-center gap-2.5 font-mono text-[11px] tracking-[0.18em] text-ink-faint uppercase">
              <Compass size={16} className="text-accent" aria-hidden /> Currently exploring
            </p>
            <ul className="flex flex-wrap gap-2">
              {profile.exploring.map((item) => (
                <li key={item} className="rounded-full border border-line bg-paper/60 px-3.5 py-1.5 text-sm text-ink-soft">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
