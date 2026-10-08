// Production URL used for canonical links, Open Graph and the sitemap.
// Set NEXT_PUBLIC_SITE_URL when deploying to a different domain; the fallback
// is the portfolio address listed on the resume.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://shivani-dev-1.netlify.app"
).replace(/\/$/, "");

export const siteTitle = "Shivani Kapase | Computer Engineering Student & Developer";

export const siteDescription =
  "Final-year B.E. Computer Engineering student at MES Wadia College of Engineering, Pune (SGPA 9.6/10), with MERN and Android internship experience and full-stack, data and AI projects on GitHub.";

export type NavItem = { id: string; label: string };

// Order matches the page. `primary` items appear in the desktop bar; the rest
// are reachable from the mobile menu and by scrolling.
export const navItems: (NavItem & { primary: boolean })[] = [
  { id: "about", label: "About", primary: true },
  { id: "experience", label: "Experience", primary: true },
  { id: "skills", label: "Skills", primary: true },
  { id: "projects", label: "Projects", primary: true },
  { id: "certifications", label: "Certifications", primary: true },
  { id: "education", label: "Education", primary: true },
  { id: "achievements", label: "Achievements", primary: true },
  { id: "resume", label: "Resume", primary: false },
  { id: "contact", label: "Contact", primary: true },
];
