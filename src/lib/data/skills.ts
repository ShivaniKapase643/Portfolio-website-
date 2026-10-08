import { experience } from "@/lib/data/experience";
import { moreRepos, projects } from "@/lib/data/projects";

export type Skill = {
  name: string;
  // Stack/tech labels that count as evidence for this skill.
  match?: string[];
  // Evidence that doesn't live in a project stack (courses, internships).
  extra?: string[];
};

export type SkillCategory = {
  id: string;
  title: string;
  blurb: string;
  icon: "code" | "layout" | "server" | "database" | "brain" | "chart" | "cloud" | "test" | "phone";
  skills: Skill[];
};

// Skills listed on the latest resume, plus tools the selected projects use.
export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    title: "Programming languages",
    blurb: "Typed and scripting languages across backend, frontend and data work.",
    icon: "code",
    skills: [
      { name: "Java" },
      { name: "Python" },
      { name: "JavaScript", match: ["Node.js", "React", "React Native"] },
      { name: "TypeScript" },
      { name: "SQL", match: ["PostgreSQL", "MySQL"] },
      { name: "C", extra: ["VJTech Academy course"] },
      { name: "C++", extra: ["VJTech Academy course"] },
      { name: "PHP" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    blurb: "Responsive interfaces, dashboards and accessible UI.",
    icon: "layout",
    skills: [
      { name: "React" },
      { name: "Next.js" },
      { name: "Tailwind CSS" },
      { name: "HTML5", match: ["React", "Next.js"] },
      { name: "CSS3", match: ["React", "Next.js", "Tailwind CSS"] },
      { name: "Bootstrap" },
      { name: "Chart.js" },
    ],
  },
  {
    id: "backend",
    title: "Backend & APIs",
    blurb: "REST and real-time services with auth, validation and RBAC.",
    icon: "server",
    skills: [
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "FastAPI" },
      { name: "Flask" },
      { name: "REST APIs", match: ["Express.js", "FastAPI", "REST APIs"] },
      { name: "WebSockets / Socket.IO", match: ["Socket.IO", "WebSockets"] },
      { name: "JWT & RBAC", match: ["JWT", "RBAC"] },
      { name: "Java Servlets & JSP" },
    ],
  },
  {
    id: "databases",
    title: "Databases & ORMs",
    blurb: "Relational and document stores, schema design and query tuning.",
    icon: "database",
    skills: [
      { name: "PostgreSQL" },
      { name: "MySQL" },
      { name: "MongoDB" },
      { name: "Prisma ORM", match: ["Prisma"] },
      { name: "Redis" },
      { name: "Supabase" },
      { name: "Firebase" },
    ],
  },
  {
    id: "ai",
    title: "AI / ML",
    blurb: "LLM integration, retrieval, NLP and computer vision.",
    icon: "brain",
    skills: [
      { name: "Gemini & OpenAI APIs", match: ["Gemini API", "OpenAI API"] },
      { name: "RAG", match: ["RAG"] },
      { name: "NLP", match: ["NLP", "NLTK", "sentence-transformers"] },
      { name: "scikit-learn" },
      { name: "NLTK" },
      { name: "OpenCV" },
      { name: "MediaPipe" },
      { name: "PyTorch" },
      { name: "CrewAI" },
      { name: "Recommendation systems" },
    ],
  },
  {
    id: "data",
    title: "Data & analytics",
    blurb: "Cleaning, analysing and presenting data with Python.",
    icon: "chart",
    skills: [
      { name: "Pandas" },
      { name: "NumPy" },
      { name: "Data analysis", extra: ["Deloitte Data Analytics job simulation"], match: ["Pandas"] },
      { name: "Streamlit" },
      { name: "Matplotlib" },
      { name: "Jupyter Notebook" },
    ],
  },
  {
    id: "devops",
    title: "Cloud, DevOps & tools",
    blurb: "Version control, CI/CD, containers and deployment.",
    icon: "cloud",
    skills: [
      { name: "Git & GitHub", extra: ["All projects on this page"] },
      { name: "GitHub Actions", match: ["GitHub Actions"] },
      { name: "Docker" },
      { name: "Postman" },
      { name: "Android Studio" },
      // Deployment configs (netlify.toml, render.yaml, vercel.json) live in these repos.
      { name: "Netlify · Render · Vercel", extra: ["Smart Stadium OS", "DRONA AI"] },
      { name: "AWS fundamentals", extra: ["27 AWS Skill Builder course completions"] },
      { name: "Oracle Cloud (OCI)" },
    ],
  },
  {
    id: "testing",
    title: "Testing & practices",
    blurb: "Automated tests, code review and Agile delivery.",
    icon: "test",
    skills: [
      { name: "Vitest" },
      { name: "Supertest" },
      { name: "pytest" },
      { name: "Jest" },
      { name: "Unit & integration testing", match: ["Vitest", "Supertest", "pytest", "Jest"] },
      { name: "Code reviews", extra: ["Sunbeam internship", "Microdynamic internship"] },
      { name: "Agile / Scrum", extra: ["Sunbeam internship"] },
      { name: "OOP · MVC" },
    ],
  },
  {
    id: "mobile",
    title: "Mobile",
    blurb: "Native Android and cross-platform apps.",
    icon: "phone",
    skills: [
      { name: "Android (Java)", match: ["Java", "Android Studio"] },
      { name: "React Native" },
      { name: "Expo" },
    ],
  },
];

const sources = [
  ...projects.map((p) => ({ label: p.name, tech: p.stack })),
  ...moreRepos.map((r) => ({ label: r.name, tech: r.stack })),
  ...experience.map((e) => ({ label: `${e.org.split(" ")[0]} internship`, tech: e.tech })),
];

// Where a skill has actually been used, derived from project stacks and
// internship tech lists so the "used in" labels can't drift from the data.
export function skillEvidence(skill: Skill): string[] {
  const keys = new Set([skill.name, ...(skill.match ?? [])].map((k) => k.toLowerCase()));
  const found = sources
    .filter((s) => s.tech.some((t) => keys.has(t.toLowerCase())))
    .map((s) => s.label);
  return Array.from(new Set([...found, ...(skill.extra ?? [])]));
}
