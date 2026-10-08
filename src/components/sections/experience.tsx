import { Award, Briefcase, FlaskConical, MapPin } from "lucide-react";
import { ViewCertificateButton } from "@/components/certificates/certificate-viewer";
import { TechBadge } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Container, SectionHeading } from "@/components/ui/section-heading";
import { experience } from "@/lib/data/experience";
import { certificateItemByAsset } from "@/lib/viewer";

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading
          id="experience-title"
          index="02"
          eyebrow="Experience"
          title={
            <>
              Internships in industry <span className="text-ink-soft italic">and research.</span>
            </>
          }
          description="Three industry internships — MERN and two in Android — and a research internship, with certificates you can open alongside each role."
        />

        <ol className="relative space-y-6 before:absolute before:top-2 before:bottom-2 before:left-[19px] before:w-px before:bg-linear-to-b before:from-accent/70 before:via-line-strong before:to-transparent sm:space-y-8 lg:before:left-[calc(16rem+19px)]">
          {experience.map((job, i) => {
            const cert = job.certificate ? certificateItemByAsset(job.certificate) : null;
            const Icon = job.kind === "Research internship" ? FlaskConical : Briefcase;
            return (
              <li key={job.id} className="relative lg:grid lg:grid-cols-[16rem_1fr] lg:gap-0">
                <Reveal className="hidden pt-5 pr-10 text-right lg:block">
                  <p className="font-mono text-sm text-ink">{job.period}</p>
                  <p className="mt-1 text-sm text-ink-faint">{job.kind}</p>
                </Reveal>

                <div className="relative pl-14">
                  <span
                    aria-hidden
                    className="absolute top-4 left-0 flex h-10 w-10 items-center justify-center rounded-full border border-line-strong bg-paper-raised text-accent shadow-soft"
                  >
                    <Icon size={17} />
                  </span>

                  <Reveal delay={i * 0.04}>
                    <article className="group rounded-3xl border border-line bg-paper-raised/70 p-5 transition-colors duration-300 hover:border-accent/40 sm:p-7">
                      <p className="font-mono text-xs text-ink-faint lg:hidden">
                        {job.period} · {job.kind}
                      </p>
                      <h3 className="mt-1 font-display text-2xl leading-tight tracking-tight lg:mt-0">{job.role}</h3>
                      <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[15px]">
                        <span className="font-semibold text-accent">{job.org}</span>
                        <span className="inline-flex items-center gap-1 text-sm text-ink-faint">
                          <MapPin size={13} aria-hidden /> {job.location}
                        </span>
                      </p>
                      <p className="mt-4 leading-relaxed text-ink-soft">{job.summary}</p>

                      <ul className="mt-4 space-y-2.5">
                        {job.highlights.map((h) => (
                          <li key={h} className="flex gap-3 text-sm leading-relaxed text-ink-soft">
                            <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {job.tech.map((t) => (
                          <TechBadge key={t}>{t}</TechBadge>
                        ))}
                      </div>

                      {(job.outcome || cert) && (
                        <div className="mt-6 flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
                          {job.outcome && (
                            <p className="flex items-start gap-2.5 text-sm text-ink">
                              <Award size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                              {job.outcome}
                            </p>
                          )}
                          {cert && (
                            <ViewCertificateButton
                              item={cert}
                              className="inline-flex h-9 shrink-0 items-center gap-2 self-start rounded-full border border-line-strong px-4 text-[13px] font-semibold text-ink transition-colors hover:border-accent/60 hover:text-accent sm:self-auto"
                            >
                              <Award size={14} aria-hidden /> View certificate
                            </ViewCertificateButton>
                          )}
                        </div>
                      )}
                    </article>
                  </Reveal>
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
