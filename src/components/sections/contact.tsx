"use client";

import { ArrowUpRight, Check, Copy, Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/social-icons";
import { buttonClasses } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Container, SectionHeading } from "@/components/ui/section-heading";
import { profile } from "@/lib/data/profile";
import { cn } from "@/lib/utils";

const links = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, Icon: Mail },
  { label: "LinkedIn", value: "in/shivani-kapse-54b513309", href: profile.linkedin, Icon: LinkedinIcon },
  { label: "GitHub", value: `@${profile.githubUsername}`, href: profile.github, Icon: GithubIcon },
];

const field =
  "mt-2 w-full rounded-xl border border-line-strong bg-paper/70 px-4 py-3 text-ink placeholder:text-ink-faint outline-none transition-colors focus:border-accent focus-visible:outline-none";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [copied, setCopied] = useState(false);

  // No backend: compose the message in the visitor's email client.
  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const subject = encodeURIComponent(form.subject || `Portfolio enquiry from ${form.name || "a visitor"}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name}\n${form.email}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked; the mailto link still works.
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading
          id="contact-title"
          index="09"
          eyebrow="Contact"
          title={
            <>
              Let&rsquo;s build something <span className="text-accent italic">meaningful.</span>
            </>
          }
          description="I'm looking for internships and full-time roles in software development, full-stack engineering, and data and AI. If you're hiring, or building something worth building, I'd like to hear about it."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          <div className="space-y-3">
            {links.map(({ label, value, href, Icon }) => (
              <Reveal key={label}>
                <a
                  href={href}
                  {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-line bg-paper-raised/70 p-4 transition-colors hover:border-accent/50 sm:p-5"
                >
                  <span className="flex min-w-0 items-center gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-paper text-ink-soft transition-colors group-hover:border-accent/50 group-hover:text-accent">
                      <Icon size={18} />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-mono text-[11px] tracking-[0.16em] text-ink-faint uppercase">{label}</span>
                      <span className="block truncate text-ink">{value}</span>
                    </span>
                  </span>
                  <ArrowUpRight
                    size={17}
                    aria-hidden
                    className="shrink-0 text-ink-faint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                  />
                </a>
              </Reveal>
            ))}

            <Reveal>
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-paper-raised/40 p-4 sm:p-5">
                <p className="flex items-center gap-2.5 text-sm text-ink-soft">
                  <MapPin size={16} className="text-accent" aria-hidden /> {profile.location}
                </p>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex h-9 items-center gap-2 rounded-full border border-line-strong px-3.5 text-[13px] font-semibold text-ink transition-colors hover:border-accent/60 hover:text-accent"
                >
                  {copied ? <Check size={14} aria-hidden /> : <Copy size={14} aria-hidden />}
                  {copied ? "Email copied" : "Copy email"}
                </button>
                <span className="sr-only" aria-live="polite">
                  {copied ? "Email address copied to clipboard" : ""}
                </span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.06}>
            <form onSubmit={handleSubmit} className="glass rounded-3xl border border-line p-5 shadow-soft sm:p-8" aria-describedby="contact-form-note">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="text-sm font-medium text-ink">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    autoComplete="name"
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className={field}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="text-sm font-medium text-ink">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className={field}
                    placeholder="you@company.com"
                  />
                </div>
              </div>
              <div className="mt-5">
                <label htmlFor="contact-subject" className="text-sm font-medium text-ink">
                  Subject <span className="font-normal text-ink-faint">(optional)</span>
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  value={form.subject}
                  onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                  className={field}
                  placeholder="Internship opportunity, project, collaboration…"
                />
              </div>
              <div className="mt-5">
                <label htmlFor="contact-message" className="text-sm font-medium text-ink">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className={cn(field, "resize-y")}
                  placeholder="What would you like to talk about?"
                />
              </div>
              <button type="submit" className={buttonClasses({ size: "lg", className: "mt-6 w-full" })}>
                Send message
                <Send size={16} className="transition-transform group-hover:translate-x-0.5" />
              </button>
              <p id="contact-form-note" className="mt-3 text-center text-xs text-ink-faint">
                Opens your email app with the message filled in — nothing is stored on this site.
              </p>
            </form>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
