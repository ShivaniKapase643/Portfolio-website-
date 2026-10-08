import { ArrowUpRight, Download, FileText } from "lucide-react";
import Image from "next/image";
import { buttonClasses } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Container } from "@/components/ui/section-heading";
import { resumeAsset } from "@/lib/data/assets";

export function Resume() {
  return (
    <section id="resume" aria-labelledby="resume-title" className="relative py-24 sm:py-32">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-line bg-paper-raised shadow-lift">
            <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_80%_40%,black,transparent_70%)]" />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(60% 80% at 0% 100%, var(--glow), transparent 60%), radial-gradient(50% 70% at 100% 0%, var(--glow-2), transparent 60%)",
              }}
            />

            <div className="relative grid grid-cols-1 items-center gap-10 p-6 sm:p-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:p-14">
              <div>
                <p className="flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-ink-faint uppercase">
                  <span className="text-accent">08</span>
                  <span className="h-px w-8 bg-line-strong" aria-hidden />
                  Resume
                </p>
                <h2 id="resume-title" className="mt-4 font-display text-4xl leading-[1.05] tracking-tight text-balance sm:text-5xl">
                  Want the complete <span className="text-accent italic">picture?</span>
                </h2>
                <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-soft">
                  Internships, projects, skills, certifications and academics on two pages — the same document recruiters receive.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a href={resumeAsset.file} target="_blank" rel="noopener noreferrer" className={buttonClasses({ size: "lg" })}>
                    <FileText size={17} /> View resume
                    <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                  <a href={resumeAsset.file} download={resumeAsset.downloadName} className={buttonClasses({ variant: "secondary", size: "lg" })}>
                    <Download size={17} /> Download resume
                  </a>
                </div>
                <p className="mt-5 font-mono text-xs text-ink-faint">
                  PDF · {resumeAsset.pages} pages · updated Oct 2026
                </p>
              </div>

              <a
                href={resumeAsset.file}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative mx-auto block w-full max-w-sm lg:max-w-md"
              >
                <span className="sr-only">Open the resume PDF in a new tab</span>
                <div
                  aria-hidden
                  className="absolute -inset-3 rotate-3 rounded-2xl border border-line bg-paper-elevated/60 transition-transform duration-500 group-hover:rotate-6"
                />
                <div className="relative overflow-hidden rounded-xl border border-line-strong bg-white shadow-lift transition-transform duration-500 group-hover:-translate-y-1.5 motion-reduce:group-hover:translate-y-0">
                  <Image
                    src={resumeAsset.preview.src}
                    alt="First page of Shivani Kapase's resume"
                    width={resumeAsset.preview.width}
                    height={resumeAsset.preview.height}
                    sizes="(min-width: 1024px) 448px, (min-width: 640px) 384px, 90vw"
                    className="h-auto w-full"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-paper-raised/90 to-transparent" />
                  <span className="glass absolute bottom-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-line px-3.5 py-1.5 text-xs font-semibold text-ink shadow-soft">
                    Open full PDF <ArrowUpRight size={13} aria-hidden />
                  </span>
                </div>
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
