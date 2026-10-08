# Shivani Kapase — Portfolio

Personal portfolio of Shivani Kapase, final-year B.E. Computer Engineering student at MES Wadia College of Engineering, Pune.

Built with **Next.js 16** (App Router, Turbopack), **React 19**, **Tailwind CSS 4**, **Framer Motion** and **lucide-react**. One page with a case-study dialog per project, a certificate lightbox, light/dark themes and live GitHub stats.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (also type-checks)
npm run lint
```

## Where the content lives

All text and data is in `src/lib/data/` — components only render it.

| File | What it holds |
|---|---|
| `profile.ts` | Name, headline, summary, links, principles |
| `experience.ts` | Internships (from the latest resume) |
| `education.ts` | B.E., Diploma, SSC |
| `projects.ts` | Featured/other projects with case-study content, plus the "Also on GitHub" list |
| `skills.ts` | Skill categories; the "used in" counts are computed from project stacks and internship tech |
| `certificates.ts` | Certificate archive: title, issuer, date, category, rank (strongest first) |
| `achievements.ts` | Hackathons, leadership, participation, academic record and research |
| `assets.ts` | Paths and pixel sizes of every certificate file, preview and diagram |

### Common updates

- **Add a live demo:** set `live: "https://…"` on the project in `projects.ts`. Until then the card shows "Live demo — coming soon".
- **Replace the resume:** overwrite `public/resume.pdf` and regenerate `public/resume-preview.webp` (page 1 as WebP, about 1100px wide); update its size in `resumeAsset` in `assets.ts`.
- **Add a certificate:**
  1. Put the file in `public/certificates/` with a kebab-case name.
  2. Run `python scripts/certificate_preview.py public/certificates/<file>` (needs `pip install pymupdf pillow`) and paste the printed line into `certificateAssets` in `assets.ts`.
  3. Add an entry to `certificates.ts` (or `achievements.ts` for competitions) with `asset: "<file-name-without-extension>"`.

## Environment variables (optional)

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata, Open Graph and the sitemap. Defaults to `https://shivani-dev-1.netlify.app`. |
| `GITHUB_TOKEN` | Read-only token. Raises the GitHub API rate limit and enables the contribution graph in the GitHub panel. |

GitHub stats are fetched at build time and refreshed daily; if the API is unavailable the panel shows a link to the profile instead.

## Assets

- `public/certificates/` — optimized certificate files (oversized originals were recompressed with their text layers kept) and `previews/` WebP images loaded only when the lightbox opens.
- `public/projects/` — architecture diagrams taken from each project's repository.
- The raw uploads in `/certificates/` are git-ignored: two exceed GitHub's 100 MB file limit.
- `_legacy-site/` — the previous static HTML portfolio, kept for reference (not served).

## Accessibility and motion

Semantic landmarks, a skip link, visible focus states, native `<dialog>` modals with focus handling, and `prefers-reduced-motion` support (Framer Motion is configured with `reducedMotion="user"`; CSS animations are disabled too). Checked with axe-core in both themes.
