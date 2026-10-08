import { ArrowUp, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/social-icons";
import { profile } from "@/lib/data/profile";
import { navItems } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-3xl tracking-tight">
              {profile.name}
              <span className="text-accent">.</span>
            </p>
            <p className="mt-2 text-ink-soft">{profile.title}</p>
            <p className="mt-1 text-sm text-ink-faint">
              {profile.college} · {profile.location}
            </p>
            <ul className="mt-6 flex flex-wrap items-center gap-2.5" aria-label="Profiles">
              {[
                { href: profile.github, label: "GitHub", Icon: GithubIcon },
                { href: profile.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
                { href: `mailto:${profile.email}`, label: "Email", Icon: Mail },
              ].map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="inline-flex h-10 items-center gap-2 rounded-full border border-line px-4 text-sm text-ink-soft transition-colors hover:border-accent/60 hover:text-accent"
                  >
                    <Icon size={15} aria-hidden /> {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-2.5 text-sm sm:grid-cols-3">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-ink-soft transition-colors hover:text-accent">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col-reverse gap-4 border-t border-line pt-6 text-sm text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {profile.name}. All rights reserved.
          </p>
          <a href="#home" className="inline-flex items-center gap-2 self-start transition-colors hover:text-accent sm:self-auto">
            Back to top <ArrowUp size={14} aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}
