"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Eye, Hourglass } from "lucide-react";
import { useMemo, useState } from "react";
import { useCertificateViewer } from "@/components/certificates/certificate-viewer";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Container, SectionHeading } from "@/components/ui/section-heading";
import {
  type Certificate,
  type CertificateCategory,
  certificateCategories,
  sortedCertificates,
  verifiedCertificates,
} from "@/lib/data/certificates";
import { cn } from "@/lib/utils";
import { certificateItem, compact } from "@/lib/viewer";

// Light-theme text uses the 700 shades to keep 4.5:1 contrast on the tints.
const tone: Record<CertificateCategory, string> = {
  internship: "bg-accent-tint text-accent border-accent/30",
  ai: "bg-violet-500/10 text-violet-700 border-violet-500/25 dark:text-violet-300",
  cloud: "bg-sky-500/10 text-sky-800 border-sky-500/25 dark:text-sky-300",
  data: "bg-emerald-500/10 text-emerald-800 border-emerald-500/25 dark:text-emerald-300",
  programming: "bg-amber-500/10 text-amber-800 border-amber-500/25 dark:text-amber-300",
  security: "bg-rose-500/10 text-rose-700 border-rose-500/25 dark:text-rose-300",
  other: "bg-paper text-ink-soft border-line-strong",
};

function IssuerMark({ cert, size = "md" }: { cert: Certificate; size?: "md" | "lg" }) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex shrink-0 items-center justify-center rounded-xl border font-mono font-medium tracking-tight",
        size === "lg" ? "h-12 w-12 text-sm" : "h-10 w-10 text-[11px]",
        tone[cert.category]
      )}
    >
      {cert.mark}
    </span>
  );
}

function CertMeta({ cert }: { cert: Certificate }) {
  return (
    <p className="mt-1 text-sm text-ink-soft">
      {cert.issuer}
      {cert.date && <span className="text-ink-faint"> · {cert.date}</span>}
    </p>
  );
}

function ViewButton({ cert, list, className }: { cert: Certificate; list: Certificate[]; className?: string }) {
  const { open } = useCertificateViewer();
  const item = certificateItem(cert);
  if (!item) {
    // No uploaded document: never render a link that points nowhere.
    return cert.status === "in-progress" ? (
      <span className={cn("inline-flex items-center gap-1.5 text-xs font-medium text-ink-faint", className)}>
        <Hourglass size={13} aria-hidden /> In progress
      </span>
    ) : null;
  }
  return (
    <button
      type="button"
      onClick={() => open(item, compact(list.map(certificateItem)))}
      aria-haspopup="dialog"
      className={cn(
        "inline-flex h-8 items-center gap-1.5 rounded-full border border-line-strong px-3 text-xs font-semibold text-ink transition-colors hover:border-accent/60 hover:text-accent",
        className
      )}
    >
      <Eye size={13} aria-hidden /> View certificate
      <span className="sr-only">: {cert.title}</span>
    </button>
  );
}

function FeaturedCard({ cert, list }: { cert: Certificate; list: Certificate[] }) {
  return (
    <article className="group ring-gradient flex h-full flex-col rounded-3xl border border-line bg-paper-raised/80 p-5 shadow-soft transition-transform duration-300 hover:-translate-y-0.5 sm:p-6">
      <div className="flex items-start gap-4">
        <IssuerMark cert={cert} size="lg" />
        <div className="min-w-0">
          <p className="font-mono text-[10px] tracking-[0.16em] text-ink-faint uppercase">{cert.kind}</p>
          <h4 className="mt-1 font-display text-lg leading-snug">{cert.title}</h4>
          <CertMeta cert={cert} />
        </div>
      </div>
      {cert.detail && <p className="mt-4 text-sm font-semibold text-accent">{cert.detail}</p>}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {cert.skills.map((s) => (
          <span key={s} className="rounded-full bg-paper px-2.5 py-1 text-[11px] text-ink-soft">
            {s}
          </span>
        ))}
      </div>
      <div className="mt-auto pt-5">
        <ViewButton cert={cert} list={list} />
      </div>
    </article>
  );
}

function ArchiveCard({ cert, list }: { cert: Certificate; list: Certificate[] }) {
  return (
    <li className="flex h-full flex-col rounded-2xl border border-line bg-paper-raised/60 p-4 transition-colors hover:border-accent/40">
      <div className="flex items-start gap-3.5">
        <IssuerMark cert={cert} />
        <div className="min-w-0 flex-1">
          <h4 className="text-[15px] leading-snug font-semibold text-ink">{cert.title}</h4>
          <CertMeta cert={cert} />
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 pt-1">
        <span className="text-xs text-ink-faint">{cert.detail ?? cert.skills.slice(0, 2).join(" · ")}</span>
        <ViewButton cert={cert} list={list} />
      </div>
    </li>
  );
}

function CompactRow({ cert, list }: { cert: Certificate; list: Certificate[] }) {
  return (
    <li className="flex items-center justify-between gap-3 py-2.5">
      <span className="min-w-0 text-sm text-ink">{cert.title}</span>
      <ViewButton cert={cert} list={list} className="shrink-0" />
    </li>
  );
}

function CategoryGroup({ id }: { id: CertificateCategory }) {
  const [showTrack, setShowTrack] = useState(false);
  const meta = certificateCategories.find((c) => c.id === id)!;
  const all = sortedCertificates.filter((c) => c.category === id);
  const main = all.filter((c) => !c.track);
  const track = all.filter((c) => c.track === "business");
  const viewable = [...main, ...track];

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-display text-2xl">{meta.label}</h3>
        <p className="text-sm text-ink-faint">{meta.blurb}</p>
      </div>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {main.map((cert) => (
          <ArchiveCard key={cert.id} cert={cert} list={viewable} />
        ))}
      </ul>

      {track.length > 0 && (
        <div className="mt-3 rounded-2xl border border-line bg-paper-raised/40">
          <button
            type="button"
            onClick={() => setShowTrack((v) => !v)}
            aria-expanded={showTrack}
            aria-controls={`${id}-business-track`}
            className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
          >
            <span>
              <span className="block text-sm font-semibold text-ink">
                AWS executive & business learning track — {track.length} more course completions
              </span>
              <span className="block text-xs text-ink-faint">Cloud strategy courses from AWS Training & Certification, Mar 2026</span>
            </span>
            <ChevronDown size={18} aria-hidden className={cn("shrink-0 text-ink-soft transition-transform", showTrack && "rotate-180")} />
          </button>
          <AnimatePresence initial={false}>
            {showTrack && (
              <motion.ul
                id={`${id}-business-track`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 divide-y divide-line overflow-hidden border-t border-line px-4 sm:grid-cols-2 sm:gap-x-8 sm:divide-y-0"
              >
                {track.map((cert) => (
                  <CompactRow key={cert.id} cert={cert} list={viewable} />
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

export function Certifications() {
  // The full archive is opt-in: highlights first, everything else on request.
  const [expanded, setExpanded] = useState(false);
  const [filter, setFilter] = useState<CertificateCategory | "all">("all");
  const featured = useMemo(() => sortedCertificates.filter((c) => c.featured), []);
  const counts = useMemo(() => {
    const map = new Map<CertificateCategory, number>();
    for (const c of verifiedCertificates) map.set(c.category, (map.get(c.category) ?? 0) + 1);
    return map;
  }, []);
  const shownCategories = filter === "all" ? certificateCategories.map((c) => c.id) : [filter];

  return (
    <section id="certifications" aria-labelledby="certifications-title" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading
          id="certifications-title"
          index="05"
          eyebrow="Certifications"
          title={
            <>
              A verified <span className="text-accent italic">achievement archive.</span>
            </>
          }
          description={`${verifiedCertificates.length} certificates across ${counts.size} areas, ordered by relevance to software roles. Every “View certificate” opens the original document.`}
        />

        <h3 className="sr-only">Highlighted certificates</h3>
        <RevealGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
          {featured.map((cert) => (
            <RevealItem key={cert.id} className="h-full">
              <FeaturedCard cert={cert} list={featured} />
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-14">
          <div className="flex flex-col items-start justify-between gap-4 rounded-3xl border border-line bg-paper-raised/50 p-5 sm:flex-row sm:items-center sm:p-6">
            <div>
              <p className="font-mono text-[11px] tracking-[0.2em] text-ink-faint uppercase">Complete archive</p>
              <p className="mt-1.5 text-ink-soft">
                All {verifiedCertificates.length} certificates, grouped by area — internships, AI, cloud, data, programming, security.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              aria-controls="certificate-archive"
              className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full border border-line-strong bg-paper px-5 text-sm font-semibold text-ink transition-colors hover:border-accent/60 hover:text-accent"
            >
              {expanded ? "Hide archive" : `Browse all ${verifiedCertificates.length}`}
              <ChevronDown size={16} aria-hidden className={cn("transition-transform duration-300", expanded && "rotate-180")} />
            </button>
          </div>
        </Reveal>

        {/* Rendered only when opened, so the archive adds nothing to first load. */}
        <div id="certificate-archive" hidden={!expanded}>
          {expanded && (
            <>
              <div className="mt-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <h3 className="font-display text-3xl tracking-tight">Browse by category</h3>
                <div
                  role="group"
                  aria-label="Filter certificates by category"
                  className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
                >
                  {[
                    { id: "all" as const, label: "All", count: verifiedCertificates.length },
                    ...certificateCategories.map((c) => ({ id: c.id, label: c.label, count: counts.get(c.id) ?? 0 })),
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      aria-pressed={filter === tab.id}
                      onClick={() => setFilter(tab.id)}
                      className={cn(
                        "inline-flex h-9 shrink-0 items-center gap-2 rounded-full border px-3.5 text-[13px] font-medium whitespace-nowrap transition-colors",
                        filter === tab.id
                          ? "border-accent bg-accent text-accent-contrast"
                          : "border-line-strong text-ink-soft hover:border-accent/60 hover:text-ink"
                      )}
                    >
                      {tab.label}
                      <span className={cn("font-mono text-[11px]", filter === tab.id ? "text-accent-contrast" : "text-ink-faint")}>
                        {tab.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <p className="sr-only" aria-live="polite">
                {filter === "all"
                  ? `Showing all ${verifiedCertificates.length} certificates`
                  : `Showing ${counts.get(filter) ?? 0} certificates in ${certificateCategories.find((c) => c.id === filter)?.label}`}
              </p>

              <div className="mt-10 space-y-14">
                {shownCategories.map((id) => (
                  <CategoryGroup key={id} id={id} />
                ))}
              </div>
            </>
          )}
        </div>

        <p className="mt-12 text-sm text-ink-faint">
          Hackathon and competition certificates live with the{" "}
          <a href="#achievements" className="inline-flex items-center gap-1 font-semibold text-accent underline-offset-4 hover:underline">
            Achievements <ArrowUpRight size={14} aria-hidden />
          </a>
          .
        </p>
      </Container>
    </section>
  );
}
