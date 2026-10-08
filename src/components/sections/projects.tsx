import { ArrowUpRight, FolderGit2 } from "lucide-react";
import { GithubIcon } from "@/components/icons/social-icons";
import { CompactProjectCard, FeaturedProjectCard } from "@/components/projects/project-cards";
import { TechBadge } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Container, SectionHeading } from "@/components/ui/section-heading";
import { profile } from "@/lib/data/profile";
import { featuredProjects, moreRepos, otherProjects } from "@/lib/data/projects";
import { getGitHubSummary, type GitHubSummary } from "@/lib/github";

export async function Projects() {
  const github = await getGitHubSummary(profile.githubUsername);

  return (
    <section id="projects" aria-labelledby="projects-title" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading
          id="projects-title"
          index="04"
          eyebrow="Projects"
          title={
            <>
              Systems I&rsquo;ve designed, built <span className="text-ink-soft italic">and tested.</span>
            </>
          }
          description="Selected from my GitHub for depth and real implementation. Each case study is written from the repository's code, README and commit history — including what was a team effort and what is simulated."
        />

        <h3 className="sr-only">Featured projects</h3>
        <RevealGroup className="grid grid-cols-1 gap-6 lg:grid-cols-2" stagger={0.1}>
          {featuredProjects.map((project, i) => (
            <RevealItem key={project.slug} className="h-full">
              <FeaturedProjectCard project={project} index={i} />
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-20 sm:mt-24">
          <Reveal>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-mono text-[11px] tracking-[0.2em] text-ink-faint uppercase">More work</p>
                <h3 className="mt-2 font-display text-3xl tracking-tight sm:text-4xl">Other projects</h3>
              </div>
              <p className="max-w-md text-sm text-ink-soft">
                Hackathon builds and full-stack apps — open any card for the full case study.
              </p>
            </div>
          </Reveal>
          <RevealGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2" stagger={0.08}>
            {otherProjects.map((project) => (
              <RevealItem key={project.slug} className="h-full">
                <CompactProjectCard project={project} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
          <Reveal className="h-full">
            <MoreRepos />
          </Reveal>
          <Reveal delay={0.08} className="h-full">
            <GitHubPanel data={github} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function MoreRepos() {
  return (
    <div className="h-full rounded-3xl border border-line bg-paper-raised/70 p-5 sm:p-7">
      <div className="flex items-center gap-2.5">
        <FolderGit2 size={18} className="text-accent" aria-hidden />
        <h3 className="font-display text-xl">Also on GitHub</h3>
      </div>
      <p className="mt-1.5 text-sm text-ink-soft">Smaller builds across data science, NLP, computer vision and Web3.</p>
      <ul className="mt-5 divide-y divide-line">
        {moreRepos.map((repo) => (
          <li key={repo.name}>
            <a
              href={repo.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 py-3.5 transition-colors"
            >
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-ink transition-colors group-hover:text-accent">{repo.name}</p>
                <p className="mt-0.5 text-sm leading-relaxed text-ink-soft">{repo.description}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {repo.stack.slice(0, 4).map((t) => (
                    <TechBadge key={t}>{t}</TechBadge>
                  ))}
                </div>
              </div>
              <ArrowUpRight
                size={17}
                aria-hidden
                className="mt-1 shrink-0 text-ink-faint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
              />
              <span className="sr-only">(opens GitHub)</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

const dateFormat = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

function GitHubPanel({ data }: { data: GitHubSummary | null }) {
  const maxRepos = data?.languages[0]?.repos ?? 1;

  return (
    <div className="relative h-full overflow-hidden rounded-3xl border border-line bg-paper-raised/70 p-5 sm:p-7">
      <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
      <div className="relative">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <GithubIcon size={18} className="text-accent" />
            <h3 className="font-display text-xl">GitHub activity</h3>
          </div>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-mono text-xs text-ink-soft transition-colors hover:text-accent"
          >
            @{profile.githubUsername}
            <ArrowUpRight size={13} aria-hidden />
          </a>
        </div>

        {data ? (
          <>
            <dl className="mt-6 grid grid-cols-2 gap-3">
              <div className="flex flex-col-reverse rounded-2xl border border-line bg-paper/50 p-4">
                <dt className="mt-1 text-xs text-ink-faint">Public repositories</dt>
                <dd className="font-display text-3xl">{data.publicRepos}</dd>
              </div>
              <div className="flex flex-col-reverse rounded-2xl border border-line bg-paper/50 p-4">
                <dt className="mt-1 text-xs text-ink-faint">
                  {data.contributions ? "Contributions, last year" : "Primary languages"}
                </dt>
                <dd className="font-display text-3xl">{data.contributions ? data.contributions.total : data.languages.length}</dd>
              </div>
            </dl>

            {data.contributions && <ContributionGraph weeks={data.contributions.weeks} />}

            <div className="mt-6">
              <p className="font-mono text-[11px] tracking-[0.16em] text-ink-faint uppercase">Repositories by language</p>
              <ul className="mt-3 space-y-2.5">
                {data.languages.map((l) => (
                  <li key={l.name} className="grid grid-cols-[6.5rem_1fr_auto] items-center gap-3 text-sm">
                    <span className="truncate text-ink-soft">{l.name}</span>
                    <span className="h-1.5 overflow-hidden rounded-full bg-line">
                      <span
                        className="block h-full rounded-full bg-linear-to-r from-accent to-accent-2"
                        style={{ width: `${Math.max(8, (l.repos / maxRepos) * 100)}%` }}
                      />
                    </span>
                    <span className="font-mono text-xs text-ink-faint">{l.repos}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <p className="font-mono text-[11px] tracking-[0.16em] text-ink-faint uppercase">Recently pushed</p>
              <ul className="mt-2.5 space-y-1.5">
                {data.recent.map((r) => (
                  <li key={r.name}>
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-baseline justify-between gap-3 rounded-lg py-1 text-sm transition-colors hover:text-accent"
                    >
                      <span className="truncate font-medium">{r.name}</span>
                      <span className="shrink-0 font-mono text-[11px] text-ink-faint">
                        {dateFormat.format(new Date(r.pushedAt))}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-5 text-[11px] text-ink-faint">Live from the GitHub API · refreshed daily.</p>
          </>
        ) : (
          <div className="mt-6 rounded-2xl border border-dashed border-line-strong p-5 text-sm text-ink-soft">
            Live repository stats are unavailable right now.{" "}
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="font-semibold text-accent underline-offset-4 hover:underline">
              Browse the profile on GitHub
            </a>
            .
          </div>
        )}
      </div>
    </div>
  );
}

function ContributionGraph({ weeks }: { weeks: { date: string; count: number }[][] }) {
  const recent = weeks.slice(-26);
  const max = Math.max(1, ...recent.flat().map((d) => d.count));
  const level = (n: number) => (n === 0 ? 0 : Math.ceil((n / max) * 4));
  const shades = ["bg-line", "bg-accent/25", "bg-accent/45", "bg-accent/70", "bg-accent"];

  return (
    <figure className="mt-6">
      <div className="no-scrollbar flex gap-[3px] overflow-x-auto" role="img" aria-label="Contribution activity over the last 26 weeks">
        {recent.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {week.map((d) => (
              <span key={d.date} className={`h-2.5 w-2.5 rounded-[3px] ${shades[level(d.count)]}`} title={`${d.count} on ${d.date}`} />
            ))}
          </div>
        ))}
      </div>
      <figcaption className="mt-2 font-mono text-[11px] text-ink-faint">Last 26 weeks of contributions</figcaption>
    </figure>
  );
}
