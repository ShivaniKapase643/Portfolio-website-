"use client";

import { ArrowRight, Download, Layers, Mail, MessageSquareText, Sparkles, Trophy } from "lucide-react";
import { type CSSProperties, useEffect, useRef } from "react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/social-icons";
import { useProjectDialog } from "@/components/projects/project-dialog";
import { buttonClasses } from "@/components/ui/button";
import { Counter } from "@/components/ui/counter";
import { Magnetic } from "@/components/ui/magnetic";
import { Container } from "@/components/ui/section-heading";
import { TypingRoles } from "@/components/ui/typing-roles";
import { resumeAsset } from "@/lib/data/assets";
import { certificates, verifiedCertificates } from "@/lib/data/certificates";
import { experience } from "@/lib/data/experience";
import { profile } from "@/lib/data/profile";

const awsCourses = certificates.filter((c) => c.asset && c.issuer.startsWith("AWS")).length;

// Every value is computed from the data files or verified against GitHub
// (24 non-empty project repositories as of Oct 2026 → "20+").
const stats = [
  { value: Number(profile.sgpa), decimals: 1, suffix: "", label: "Current SGPA", detail: "B.E. Computer Engineering" },
  { value: 20, decimals: 0, suffix: "+", label: "Projects on GitHub", detail: "Full-stack, AI & data" },
  { value: verifiedCertificates.length, decimals: 0, suffix: "", label: "Certificates", detail: `Incl. ${awsCourses} AWS courses` },
  { value: experience.length, decimals: 0, suffix: "", label: "Internships", detail: "Industry & research" },
];

// Floating tech tags live only in empty bands: above the highlights card from
// 1280px, and in the side margins from 1536px, so they never cover content.
const tagSpots = [
  "hidden xl:block left-[57%] top-[12%]",
  "hidden xl:block left-[79%] top-[15%]",
  "hidden 2xl:block right-[2.5%] top-[40%]",
  "hidden 2xl:block right-[3.5%] top-[60%]",
  "hidden 2xl:block left-[2.5%] top-[64%]",
];

// Entrance animations are CSS (see globals.css) so the copy paints before
// hydration; this sets the per-element delay.
const delay = (seconds: number) => ({ "--d": `${seconds}s` }) as CSSProperties;

function HeroBackdrop() {
  const ref = useRef<HTMLDivElement>(null);

  // Cursor spotlight: updates two CSS variables, no React re-renders.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    function onMove(e: PointerEvent) {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = el!.getBoundingClientRect();
        el!.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        el!.style.setProperty("--my", `${e.clientY - rect.top}px`);
      });
    }
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden [--mx:70%] [--my:30%]">
      <div className="animate-drift absolute -top-40 -left-32 h-[34rem] w-[34rem] rounded-full bg-[var(--glow)] blur-3xl" />
      <div className="animate-drift-slow absolute top-1/3 -right-40 h-[30rem] w-[30rem] rounded-full bg-[var(--glow-2)] blur-3xl" />
      <div className="dot-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,black,transparent)]" />
      {/* Brighter grid revealed around the cursor */}
      <div
        className="absolute inset-0 [background-image:radial-gradient(var(--accent)_1px,transparent_1px)] [background-size:28px_28px] opacity-50"
        style={{
          maskImage: "radial-gradient(220px circle at var(--mx) var(--my), black, transparent)",
          WebkitMaskImage: "radial-gradient(220px circle at var(--mx) var(--my), black, transparent)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-paper" />
    </div>
  );
}

function NameReveal() {
  const words = profile.name.split(" ");
  return (
    <span aria-hidden className="block">
      {words.map((word, wi) => (
        <span key={word} className="mr-[0.22em] inline-block overflow-hidden pb-[0.08em] align-bottom last:mr-0">
          {word.split("").map((ch, ci) => (
            <span key={ci} className="enter-rise inline-block" style={delay(0.05 + wi * 0.16 + ci * 0.028)}>
              {ch}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}

function ProofItem({
  icon: Icon,
  title,
  detail,
  onClick,
  href,
}: {
  icon: typeof Layers;
  title: string;
  detail: string;
  onClick?: () => void;
  href?: string;
}) {
  const body = (
    <>
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-tint text-accent">
        <Icon size={17} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-semibold text-ink">{title}</span>
        <span className="mt-0.5 block text-sm text-ink-soft">{detail}</span>
      </span>
      <ArrowRight size={16} className="mt-1 shrink-0 text-ink-faint transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
    </>
  );
  const cls =
    "group flex w-full items-start gap-3.5 rounded-2xl border border-line bg-paper/50 p-4 text-left transition-colors hover:border-accent/50";
  return href ? (
    <a href={href} className={cls}>
      {body}
    </a>
  ) : (
    <button type="button" onClick={onClick} aria-haspopup="dialog" className={cls}>
      {body}
    </button>
  );
}

export function Hero() {
  const { openProject } = useProjectDialog();

  return (
    <section id="home" aria-labelledby="hero-title" className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-28 pb-10 sm:pt-32">
      <HeroBackdrop />

      <div aria-hidden className="pointer-events-none absolute inset-0">
        {profile.heroTech.slice(0, tagSpots.length).map((tech, i) => (
          <span key={tech} className={`enter-fade absolute ${tagSpots[i]}`} style={delay(0.8 + i * 0.1)}>
            <span
              className="glass block animate-float rounded-full border border-line px-3 py-1.5 font-mono text-[11px] text-ink-soft shadow-soft"
              style={{ animationDelay: `${i * -1.1}s` }}
            >
              {tech}
            </span>
          </span>
        ))}
      </div>

      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.95fr)] lg:gap-10">
          <div>
            <p
              className="enter-up inline-flex items-center gap-2.5 rounded-full border border-line bg-paper-raised/70 px-3.5 py-1.5 text-xs font-medium text-ink-soft backdrop-blur"
              style={delay(0)}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {profile.availability}
            </p>

            <h1 id="hero-title" className="mt-6 font-display text-[3.1rem] leading-[0.98] font-medium tracking-[-0.03em] sm:text-7xl lg:text-[5.4rem]">
              <span className="sr-only">{profile.name}</span>
              <NameReveal />
            </h1>

            <p
              className="enter-up mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[13px] tracking-wide text-accent uppercase sm:text-sm"
              style={delay(0.3)}
            >
              {profile.title}
              <span className="hidden h-1 w-1 rounded-full bg-ink-faint sm:inline-block" aria-hidden />
              <span className="text-ink-faint normal-case">{profile.college}</span>
            </p>

            <p className="enter-up mt-6 max-w-2xl font-display text-2xl leading-snug text-balance text-ink sm:text-[2rem]" style={delay(0.36)}>
              {profile.headline}
            </p>

            <p className="enter-up mt-4 max-w-xl text-base leading-relaxed text-pretty text-ink-soft sm:text-lg" style={delay(0.42)}>
              {profile.intro}
            </p>

            <p className="enter-up mt-5 flex min-h-6 flex-wrap items-center gap-x-2 text-sm text-ink-soft" style={delay(0.48)}>
              <span className="font-mono text-xs tracking-wider text-ink-faint uppercase">Open to</span>
              <span className="font-semibold text-ink">
                <TypingRoles roles={profile.targetRoles} />
              </span>
            </p>

            <div className="enter-up mt-9 flex flex-wrap items-center gap-3" style={delay(0.55)}>
              <Magnetic>
                <a href="#projects" className={buttonClasses({ size: "lg" })}>
                  View projects
                  <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
                </a>
              </Magnetic>
              <a href={resumeAsset.file} download={resumeAsset.downloadName} className={buttonClasses({ variant: "secondary", size: "lg" })}>
                <Download size={16} /> Download resume
              </a>
              <a href="#contact" className={buttonClasses({ variant: "ghost", size: "lg" })}>
                <MessageSquareText size={16} /> Let&rsquo;s connect
              </a>
            </div>

            <ul className="enter-up mt-7 flex items-center gap-2.5" style={delay(0.62)} aria-label="Profiles">
              {[
                { href: profile.github, label: "GitHub profile", Icon: GithubIcon },
                { href: profile.linkedin, label: "LinkedIn profile", Icon: LinkedinIcon },
                { href: `mailto:${profile.email}`, label: "Email Shivani", Icon: Mail },
              ].map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    aria-label={label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-paper-raised/60 text-ink-soft transition-colors hover:border-accent/60 hover:text-accent"
                  >
                    <Icon size={17} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <aside
            aria-label="Highlights"
            className="enter-left glass relative overflow-hidden rounded-3xl border border-line p-5 shadow-lift sm:p-6"
            style={delay(0.4)}
          >
            <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(90% 70% at 100% 0%, var(--glow), transparent 60%)" }} />
            <div className="relative">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[11px] tracking-[0.18em] text-ink-faint uppercase">Proof of work</p>
                <span className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] text-ink-faint">Class of 2027</span>
              </div>

              <ul className="mt-4 space-y-2.5">
                <li>
                  <ProofItem
                    icon={Layers}
                    title="Smart Stadium OS"
                    detail="16 modules · 400+ tests · CI on PostgreSQL"
                    onClick={() => openProject("smart-stadium-os")}
                  />
                </li>
                <li>
                  <ProofItem
                    icon={Sparkles}
                    title="NyaySathi AI"
                    detail="Retrieval-grounded legal help · EN / HI / MR"
                    onClick={() => openProject("nyaysathi-ai")}
                  />
                </li>
                <li>
                  <ProofItem
                    icon={Trophy}
                    title="Top 15 of 500+ teams"
                    detail="Pune Agri Hackathon International 2026 · SmartShetakari"
                    href="#achievements"
                  />
                </li>
              </ul>

              <p className="mt-4 text-xs leading-relaxed text-ink-faint">
                Internships at <span className="text-ink-soft">Sunbeam Infotech</span> (MERN) and{" "}
                <span className="text-ink-soft">Microdynamic Software</span> (Android).
              </p>
            </div>
          </aside>
        </div>

        <dl
          className="enter-fade mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line sm:mt-16 lg:grid-cols-4"
          style={delay(0.6)}
        >
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse bg-paper-raised/80 p-5 backdrop-blur sm:p-6">
              <dt className="mt-1">
                <span className="block text-sm font-semibold text-ink">{s.label}</span>
                <span className="block text-xs text-ink-faint">{s.detail}</span>
              </dt>
              <dd className="font-display text-4xl leading-none text-ink sm:text-5xl">
                <Counter value={s.value} decimals={s.decimals} suffix={s.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </Container>

      <a
        href="#about"
        className="enter-fade relative mx-auto mt-10 hidden flex-col items-center gap-2 text-ink-faint transition-colors hover:text-accent md:flex"
        style={delay(1.1)}
      >
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase">Scroll</span>
        <span className="flex h-9 w-6 justify-center rounded-full border border-line-strong pt-1.5" aria-hidden>
          <span className="scroll-dot block h-2 w-1 rounded-full bg-current" />
        </span>
        <span className="sr-only">Scroll to About</span>
      </a>
    </section>
  );
}
