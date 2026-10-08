// Source of truth: latest resume (Oct 2026) — /public/resume.pdf.
export const profile = {
  name: "Shivani Kapase",
  fullName: "Shivani Santosh Kapase",
  initials: "SK",
  title: "Final-Year Computer Engineering Student",
  headline: "Building practical software, data-driven solutions & intelligent applications.",
  intro:
    "Final-year Computer Engineering student with hands-on experience across full-stack development, data analytics, Python-based applications and research-oriented projects.",
  availability: "Open to internships & full-time roles",
  // Cycled in the hero after "Open to" — the role families on the resume.
  targetRoles: [
    "Full-Stack Developer roles",
    "Software Developer roles",
    "Data & Analytics roles",
    "AI / ML Engineering roles",
  ],
  location: "Pune, Maharashtra, India",
  email: "shivanikapase755@gmail.com",
  githubUsername: "ShivaniKapase643",
  github: "https://github.com/ShivaniKapase643",
  linkedin: "https://www.linkedin.com/in/shivani-kapse-54b513309",
  college: "MES Wadia College of Engineering, Pune",
  university: "Savitribai Phule Pune University",
  graduation: "May 2027",
  sgpa: "9.6",
  spokenLanguages: ["English", "Hindi (native)", "Marathi (native)"],
  // Tech shown floating around the hero — all used in projects on this page.
  heroTech: ["React", "Next.js", "Node.js", "TypeScript", "Python", "FastAPI", "PostgreSQL", "MongoDB", "Gemini API", "Docker"],
  about: [
    "I'm a final-year B.E. Computer Engineering student at MES Wadia College of Engineering, Pune, with a current SGPA of 9.6/10. I came into the degree through a diploma in Computer Engineering, where I started with Java, C and Android, and I have since moved into full-stack web development, backend APIs and AI-integrated applications.",
    "In industry, I built a role-based MERN course portal during my internship at Sunbeam Infotech, and completed two Android development internships at Microdynamic Software — in 2023, building modules for a client-facing app, and again in 2025. As a research intern at MES Wadia, I worked on a literature review and documentation for a faculty-led research paper.",
    "Outside coursework I build complete systems: a 16-module stadium-operations platform with 400+ automated tests, a retrieval-grounded legal-help assistant in three Indian languages, and hackathon projects, one of which reached the Top 15 of 500+ teams at Pune Agri Hackathon International 2026.",
  ],
  principles: [
    {
      title: "Tested, not just demoed",
      detail:
        "Smart Stadium OS runs 400+ unit and component tests in CI, plus an integration suite against a disposable PostgreSQL 16 container. NyaySathi AI ships 100+ tests in GitHub Actions.",
    },
    {
      title: "Real integrations, honest seams",
      detail:
        "Razorpay signature verification, GPT-4.1 structured reviews, Gemini answers grounded in retrieved sources — and each README states what is simulated, like a mock payment gateway or a rule-based insights engine.",
    },
    {
      title: "Security as a default",
      detail:
        "Refresh-token rotation with reuse detection, RBAC, Zod validation, HMAC-verified webhooks, PII redaction and prompt-injection guards recur across my projects.",
    },
  ],
  exploring: [
    "Retrieval-augmented generation & structured LLM output",
    "Auth and RBAC design for multi-role platforms",
    "Data analysis with Python, Pandas & SQL",
    "Schema design, indexing and query performance",
  ],
} as const;
