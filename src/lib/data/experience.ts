import type { CertificateAssetId } from "@/lib/data/assets";

export type Experience = {
  id: string;
  org: string;
  role: string;
  kind: "Industry internship" | "Research internship";
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  tech: string[];
  outcome?: string;
  certificate?: CertificateAssetId;
};

// From the latest resume (Oct 2026). Metrics are the resume's own figures.
export const experience: Experience[] = [
  {
    id: "sunbeam",
    org: "Sunbeam Infotech Pvt. Ltd.",
    role: "MERN Stack Developer Intern",
    kind: "Industry internship",
    period: "Jan 2026 – Feb 2026",
    location: "Pune, Maharashtra",
    summary:
      "Built a role-based Online Course Portal end to end on the MERN stack during Sunbeam's Industrial Training & Internship Programme.",
    highlights: [
      "Developed an admin dashboard for 50+ courses with recorded-lecture access and progress tracking for 100+ active students.",
      "Designed and normalized MySQL and MongoDB schemas and built 8 RESTful API endpoints, cutting average data-retrieval time by 30% through query and schema optimization.",
      "Implemented JWT authentication with a role-based access control (RBAC) layer and middleware, securing student and admin data across all endpoints.",
      "Built 10 reusable, responsive React components with protected routes, improving page-load performance by 25% across mobile and desktop.",
      "Analysed user-engagement data with Python and Pandas to build course-completion reports and activity dashboards.",
      "Worked in an Agile team of 5 — daily stand-ups, sprint planning, Git-based code reviews and Postman/README API documentation.",
    ],
    tech: ["MongoDB", "Express.js", "React", "Node.js", "MySQL", "JWT", "RBAC", "Python", "Pandas", "Postman"],
    outcome: "Completed the programme with Grade A.",
    certificate: "sunbeam-mern-internship",
  },
  {
    id: "mes-wadia-research",
    org: "MES Wadia College of Engineering",
    role: "Research Intern",
    kind: "Research internship",
    period: "Jan 2026 – Feb 2026",
    location: "Pune, Maharashtra",
    summary: "Research internship under faculty mentorship.",
    highlights: [
      "Conducted a literature review and analysis on the effects of heat stress on the human neuroendocrine system.",
      "Contributed to research analysis, technical documentation, and a research paper submitted by the faculty mentor.",
    ],
    tech: ["Literature review", "Research analysis", "Technical documentation"],
    outcome: "Contributed to a research paper submitted by the faculty mentor.",
  },
  // From the Industrial Internship Completion Certificate dated 01 Sep 2025.
  {
    id: "microdynamic-2025",
    org: "Microdynamic Software Pvt. Ltd.",
    role: "Android Development Intern",
    kind: "Industry internship",
    period: "Jun 2025 – Jul 2025",
    location: "Pune, Maharashtra",
    summary: "Industrial Training & Internship in Android (mobile application) development.",
    highlights: [
      "Hands-on training and project work in Android development (mobile application development).",
      "Completed all assigned tasks within the internship period.",
    ],
    tech: ["Android", "Mobile app development"],
    outcome: "Industrial Internship Completion Certificate issued 1 Sep 2025.",
    certificate: "microdynamic-internship-letter-2025",
  },
  {
    id: "microdynamic",
    org: "Microdynamic Software Pvt. Ltd.",
    role: "Android Development Intern",
    kind: "Industry internship",
    period: "Jun 2023 – Jul 2023",
    location: "Pune, Maharashtra",
    summary: "Six-week Android development internship on a live, client-facing application.",
    highlights: [
      "Developed and tested 3 Android application modules in Java (Android Studio) for a live client-facing app serving 500+ end users, delivered within a 6-week timeline with zero critical defects at launch.",
      "Integrated REST API endpoints for real-time data synchronization between the app and the backend server, reducing data latency by 50%.",
      "Identified and resolved 15 bugs through systematic debugging and code reviews, reducing the crash rate by 40%.",
      "Built Material Design UI components that render consistently across 10+ screen sizes.",
    ],
    tech: ["Java", "Android Studio", "REST APIs", "Material Design"],
    certificate: "microdynamic-internship-2023",
  },
];
