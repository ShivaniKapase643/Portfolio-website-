import type { DiagramAssetId } from "@/lib/data/assets";

export type ProjectDiagram = { asset: DiagramAssetId; alt: string; caption: string };

export type Project = {
  slug: string;
  name: string;
  tier: "featured" | "other";
  category: string;
  tagline: string;
  context: string;
  role: string;
  problem: string;
  solution: string;
  features: string[];
  contribution: string[];
  architecture: string[];
  stack: string[];
  metrics?: { value: string; label: string }[];
  notes?: string[];
  diagrams?: ProjectDiagram[];
  // Card visual: the request/data flow, drawn from the repository's own docs.
  flow: string[];
  github: string;
  // Deployment links are added once confirmed; `null` renders "Live demo — coming soon".
  live: string | null;
  team?: { size?: number; repoHost?: "self" | "teammate" };
};

// Every claim below was checked against the repository's source, README and
// commit history in Oct 2026.
export const projects: Project[] = [
  {
    slug: "smart-stadium-os",
    name: "Smart Stadium OS",
    tier: "featured",
    category: "Full-stack · Real-time operations",
    tagline:
      "An enterprise-style platform that runs large stadium events — ticketing, tournaments, crowd, security and maintenance — from one role-gated command center.",
    context: "Independent project · Jul 2026",
    role: "Solo build — design, backend, frontend, CI",
    metrics: [
      { value: "16", label: "role-gated modules" },
      { value: "400+", label: "automated tests" },
      { value: "49", label: "Prisma models" },
    ],
    problem:
      "Large venues run ticketing, parking, crowd monitoring, security incidents, maintenance and emergency response on disconnected systems, so nobody has one live view of the venue.",
    solution:
      "A React 19 + Express/Prisma platform on PostgreSQL with a real-time Command Center. A background simulator streams crowd density, parking occupancy, equipment health and alerts over Socket.IO, and a rule-based insights engine turns live database state into recommendations.",
    features: [
      "Live Command Center with crowd, parking, equipment and match updates over Socket.IO",
      "QR tickets signed with HMAC-SHA256 and verified with a constant-time comparison",
      "Seat-map booking with conflict detection, a payment flow and refunds",
      "Indoor digital-twin map with a crowd heatmap, plus CSV/PDF report export",
      "JWT refresh-token rotation with reuse detection, RBAC across 10 roles, Zod validation on every write",
    ],
    contribution: [
      "Designed the 49-model Prisma schema and a modular Express API — one folder per domain with routes, service, validation and tests.",
      "Built the React 19 + TypeScript frontend with TanStack Query, React Hook Form + Zod, Recharts and a Leaflet digital twin.",
      "Hardened auth: replaying a revoked refresh token is treated as theft and revokes every session for that account.",
      "Set up GitHub Actions CI — typecheck, lint, unit and integration tests against a disposable PostgreSQL 16 container, then production builds.",
    ],
    architecture: [
      "Frontend: React 19, Vite, TypeScript, Tailwind CSS, TanStack Query, Framer Motion, Recharts, Leaflet + leaflet.heat, Socket.IO client.",
      "Backend: Node.js, Express, TypeScript, Prisma ORM, PostgreSQL, Socket.IO, Swagger/OpenAPI docs.",
      "Request pipeline: Helmet → CORS → rate limiting → JWT auth → RBAC → Zod validation → route handler → centralized error handler.",
      "Background services: live data simulator, self-contained mock payment gateway, rule-based insights engine.",
      "Testing: Vitest, React Testing Library and Supertest — 334 backend unit tests and 103 frontend tests, plus an integration suite.",
    ],
    notes: [
      "Payments use a documented mock gateway, and the “AI Insights” engine is rule-based and statistical rather than LLM-backed — the README calls out both.",
    ],
    diagrams: [
      {
        asset: "stadium-os-architecture",
        alt: "Smart Stadium OS system architecture: React client, Netlify and Render hosting, Express middleware pipeline, 16 feature modules, Socket.IO server, PostgreSQL via Prisma, background simulators and the GitHub Actions pipeline.",
        caption: "System architecture — from the project repository",
      },
      {
        asset: "stadium-os-tech-stack",
        alt: "Smart Stadium OS tech stack grouped into frontend, mapping and real-time, backend, database, auth and security, storage, testing and DevOps.",
        caption: "Tech stack — from the project repository",
      },
    ],
    flow: ["React 19", "Express API", "Prisma", "PostgreSQL"],
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "TanStack Query", "Node.js", "Express.js", "Prisma", "PostgreSQL", "Socket.IO", "Zod", "JWT", "Vitest", "Supertest", "GitHub Actions"],
    github: "https://github.com/ShivaniKapase643/StadiumOS_AI",
    live: null,
    team: { repoHost: "self" },
  },
  {
    slug: "nyaysathi-ai",
    name: "NyaySathi AI",
    tier: "featured",
    category: "AI · Retrieval-augmented generation",
    tagline:
      "A legal-help assistant that answers in plain English, Hindi and Marathi — grounded in cited official sources, and honest when it isn't sure.",
    context: "Independent project · Sep 2026",
    role: "Independent project",
    metrics: [
      { value: "3", label: "languages · EN HI MR" },
      { value: "100+", label: "automated tests" },
      { value: "4", label: "tools in one app" },
    ],
    problem:
      "Legal language is hard to follow and free legal aid is hard to find. Someone facing an eviction notice, a defective product or an RTI request often has nowhere reliable to start.",
    solution:
      "A Next.js app with four tools — cited Q&A, a document simplifier, an RTI / consumer-complaint / legal-notice drafter and a free legal-aid finder. Answers come from BM25 retrieval over a curated corpus of official sources and are streamed from Gemini under a context-only prompt.",
    features: [
      "Cited Q&A: BM25 retrieval → confidence gate → streamed Gemini answer with Act and Section sources",
      "Low-confidence questions skip the LLM and point to free legal-aid helplines instead of guessing",
      "PII redaction (Aadhaar, PAN, phone, email, UPI) before any model call, plus a prompt-injection guard",
      "Per-IP rate limiting and an LRU cache that de-duplicates identical in-flight requests",
      "Voice input, read-aloud, font-size and high-contrast controls",
    ],
    contribution: [
      "Implemented the in-memory BM25 retrieval with a confidence threshold and Devanagari-aware handling for Hindi and Marathi.",
      "Built streaming route handlers with Zod validation, retries with exponential backoff and request timeouts.",
      "Wrote the security layer — redaction, injection guard, rate limiting, upload magic-byte checks and security headers.",
      "Configured CI on GitHub Actions: lint, typecheck, tests and production build.",
    ],
    architecture: [
      "Next.js 14 App Router with route handlers for /api/qa, /api/simplify and /api/draft.",
      "Retrieval: custom BM25 index over a JSON corpus (RTI Act, Consumer Protection Act 2019, tenancy) feeding Gemini 2.0 Flash, streamed token by token.",
      "LLM provider interface with retry and backoff; deterministic templates for document drafting.",
      "TypeScript strict mode, Tailwind CSS, Zod, Vitest + React Testing Library, GitHub Actions.",
    ],
    notes: [
      "The legal corpus is intentionally small and source-verified; questions outside it get a low-confidence response rather than a generated guess.",
    ],
    flow: ["Validate", "Redact PII", "BM25 retrieval", "Gemini stream"],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Gemini API", "RAG", "NLP", "Zod", "Vitest", "GitHub Actions"],
    github: "https://github.com/ShivaniKapase643/NyaySathiAI",
    live: null,
    team: { repoHost: "self" },
  },
  {
    slug: "drona-ai",
    name: "DRONA AI",
    tier: "featured",
    category: "AI · Multi-agent systems",
    tagline:
      "A multi-agent exam-integrity platform that generates a unique paper per student, proctors in the browser and raises explainable real-time alerts.",
    context: "Far Away 2026 Hackathon · Team project",
    role: "Team member — hackathon build",
    metrics: [
      { value: "6", label: "cooperating agents" },
      { value: "2-stage", label: "proctoring pipeline" },
      { value: "300+", label: "tests incl. property-based" },
    ],
    problem:
      "Online exams are easy to game — shared papers, tab-switching, impersonation — and streaming every candidate's video to a cloud model is expensive.",
    solution:
      "Six agents — Guardian, Architect, Sentinel, Analyst, Herald and Auditor — cooperate over an event bus. Proctoring screens frames locally with MediaPipe FaceMesh and escalates a single frame to a cloud vision model only after a debounced local anomaly.",
    features: [
      "Two-stage proctoring: in-browser MediaPipe screening, cloud vision (GPT-4o-mini) only on escalation",
      "A unique, equivalently fair paper per student, seeded with SHA-256(exam + student + nonce)",
      "Explainable fraud scores from tab-switches, paste events, timing and answer similarity",
      "Real-time alerts over authenticated WebSockets to the invigilator console and admin dashboard",
    ],
    // From the resume; the repository's commit history is under a teammate's account.
    contribution: [
      "Contributed to the event-driven FastAPI backend — WebSocket alerting, the two-stage proctoring pipeline and seeded per-student paper generation, secured with JWT, RBAC and bcrypt.",
    ],
    architecture: [
      "Backend: Python 3.11, FastAPI, async WebSockets, SQLAlchemy + Alembic (SQLite locally, PostgreSQL in deployment), JWT (python-jose) + bcrypt.",
      "Agents are decoupled through an in-process event bus; a CrewAI crew definition is loaded only when the optional package is installed.",
      "LLM layer with interchangeable OpenAI and Anthropic clients; vision escalation through OpenAI chat completions.",
      "Frontend: React 18, Vite, TypeScript, Tailwind CSS, Recharts and @mediapipe/tasks-vision.",
      "Tests: pytest + Hypothesis and Vitest + fast-check property tests for escalation gating, RBAC and alert idempotency.",
    ],
    notes: ["Built as a team for the Far Away 2026 hackathon; the repository lives on a teammate's GitHub account."],
    diagrams: [
      {
        asset: "drona-ai-architecture",
        alt: "DRONA AI architecture: student portal, admin dashboard and invigilator console on React; FastAPI gateway with JWT, RBAC, rate limiting and WebSockets; six agents on an event bus; PostgreSQL, OpenAI Vision and an LLM.",
        caption: "Architecture — from the project repository",
      },
      {
        asset: "drona-ai-two-stage-proctoring",
        alt: "Two-stage proctoring: local MediaPipe screening in the browser, escalation of a single frame to cloud vision only after a confirmed anomaly.",
        caption: "Two-stage proctoring pipeline — from the project repository",
      },
    ],
    flow: ["MediaPipe (browser)", "Anomaly gate", "Vision check", "WebSocket alert"],
    stack: ["Python", "FastAPI", "React", "TypeScript", "PostgreSQL", "WebSockets", "MediaPipe", "OpenAI API", "JWT", "pytest"],
    github: "https://github.com/yash306535/DronaAi",
    live: null,
    team: { repoHost: "teammate" },
  },
  {
    slug: "smartshetakari",
    name: "SmartShetakari",
    tier: "featured",
    category: "Blockchain · Mobile · Hackathon",
    tagline:
      "A blockchain-backed milk-traceability app that keeps a tamper-evident record of every dairy batch, from farmer collection to payment.",
    context: "Pune Agri Hackathon International 2026",
    role: "Team member — built the Expo mobile app",
    metrics: [
      { value: "Top 15", label: "of 500+ teams" },
      { value: "3", label: "chatbot languages" },
      { value: "SHA-256", label: "batch ledger" },
    ],
    problem:
      "Dairy supply chains are opaque: farmers, collection centres and buyers share no tamper-proof record of batch quality, quantity or payment.",
    solution:
      "A React Native (Expo) app over a FastAPI + MongoDB backend. Each batch is hashed with SHA-256 into a ledger and can be registered on a Solidity BatchRegistry contract for on-chain verification, alongside quality status, payments and a multilingual farming chatbot.",
    features: [
      "Batch hashes stored in a MongoDB ledger, with optional registration on a Solidity smart contract",
      "Role-based farmer and admin apps with dashboards, analytics and drawer navigation",
      "Quality status (pure / suspicious / adulterated) recorded with each batch",
      "Farming chatbot in English, Hindi and Marathi with speech input and read-aloud",
    ],
    contribution: [
      "Built the Expo Router mobile frontend: login and registration, role-based admin and farmer dashboards, drawer navigation, a toast system and the multilingual chatbot screen.",
    ],
    architecture: [
      "Mobile: React Native + Expo Router, react-native-chart-kit, AsyncStorage, expo-speech.",
      "Backend: FastAPI with MongoDB (Motor/PyMongo) across 20 route modules — batches, farmers, payments, QR, analytics, alerts and more.",
      "Blockchain: Solidity BatchRegistry contract (Hardhat) with a web3.py integration; SHA-256 hash ledger in MongoDB.",
    ],
    notes: [
      "Built by a hackathon team: teammates owned the FastAPI backend and smart-contract integration; my code is in the mobile app. The quality check is rule-based, and the QR screen simulates a scan for the demo.",
    ],
    flow: ["Collection", "Quality check", "SHA-256 ledger", "Smart contract"],
    stack: ["React Native", "Expo", "FastAPI", "Python", "MongoDB", "Solidity", "Hardhat"],
    github: "https://github.com/ShivaniKapase643/SmartShetakari",
    live: null,
    team: { repoHost: "self" },
  },
  {
    slug: "nayara-one",
    name: "Nayara One",
    tier: "other",
    category: "Full-stack · Payments",
    tagline:
      "A fuel-station and EV-charging platform: a React Native consumer app, a React admin dashboard and a layered Express/Prisma API.",
    context: "Independent project · Jul 2026",
    role: "Solo build",
    problem:
      "Fuel retailers need one digital layer for station lookup, EV charging, payments, loyalty and fleet spend controls.",
    solution:
      "Three codebases on one API with Route → Controller → Service → Repository layers over a 27-model Prisma schema on MySQL, with Razorpay payments, OTP login and a tiered rewards engine.",
    features: [
      "Razorpay orders with HMAC-SHA256 signature verification inside Prisma transactions",
      "Tiered loyalty engine (Bronze → Platinum) with atomic point updates",
      "Per-driver daily and monthly fleet spend limits",
      "OTP login — hashed and rate-limited, sent through Twilio in production",
    ],
    contribution: [
      "Designed the schema and layered API, built the Expo mobile app and the React + Vite admin dashboard, and set up Docker Compose and GitHub Actions CI.",
    ],
    architecture: [
      "Backend: Node.js, Express, TypeScript, Prisma, MySQL; Helmet, rate limiting, Swagger docs; Razorpay, Firebase Admin, Cloudinary and Twilio configured through environment variables.",
      "Mobile: React Native + Expo, React Navigation, camera QR scanning and maps.",
      "Admin web: React, Vite, Tailwind CSS and Recharts.",
    ],
    diagrams: [
      {
        asset: "nayara-architecture",
        alt: "Nayara One architecture: React Native app and React admin dashboard calling an Express gateway with security middleware, feature modules in route-controller-service-repository layers, MySQL via Prisma, and external services.",
        caption: "System architecture — from the project repository",
      },
      {
        asset: "nayara-er-diagram",
        alt: "Nayara One entity-relationship diagram across auth, station, payment, rewards, fleet and admin domains.",
        caption: "Entity-relationship diagram — from the project repository",
      },
    ],
    flow: ["Expo app", "Express API", "Prisma", "MySQL"],
    stack: ["React Native", "Expo", "React", "Node.js", "Express.js", "TypeScript", "Prisma", "MySQL", "Razorpay", "Firebase", "Docker", "Jest", "GitHub Actions"],
    github: "https://github.com/ShivaniKapase643/Nayara",
    live: null,
    team: { repoHost: "self" },
  },
  {
    slug: "kavach",
    name: "Kavach",
    tier: "other",
    category: "AI · Real-time safety",
    tagline:
      "A browser-based guardian that transcribes a call live and interrupts “digital arrest” scams the moment the risk score crosses a threshold.",
    context: "ET AI Hackathon 2.0 · Team DeepSeek",
    role: "Team lead — 4-member team",
    problem:
      "Digital-arrest scammers impersonate police or CBI on a call and extract money before the victim can think; existing defences act only after the call ends.",
    solution:
      "Audio is chunked in the browser, transcribed with ElevenLabs speech-to-text and scored by Gemini against the five-stage scam script in strict JSON. When the risk reaches 75, a full-screen warning and a spoken alert fire.",
    features: [
      "Live Guardian console with a risk gauge, five-stage rail, transcript and red-flag cards",
      "Triage tool for suspicious SMS, screenshots and recordings in seven Indian languages",
      "Gemini 2.5 Flash with fallback to 2.0 Flash; every API key stays server-side",
      "Spoken warning through ElevenLabs text-to-speech and a one-tap route to the 1930 helpline",
    ],
    contribution: [
      "Led the team and built the Next.js app — server-side route handlers for transcription, classification, interruption and triage, the risk engine and the real-time UI.",
    ],
    architecture: [
      "Next.js 14 App Router + TypeScript; route handlers /api/transcribe, /api/classify, /api/interrupt and /api/triage.",
      "Google Gemini for classification (strict JSON); ElevenLabs scribe_v1 speech-to-text and eleven_flash_v2_5 text-to-speech.",
      "Tailwind CSS and Framer Motion for the console UI.",
    ],
    diagrams: [
      {
        asset: "kavach-architecture",
        alt: "Kavach architecture: browser audio capture and Guardian UI, Next.js server route handlers, and external ElevenLabs and Gemini APIs, with an alert path above a risk score of 75.",
        caption: "System architecture — from the project repository",
      },
      {
        asset: "kavach-flow",
        alt: "Kavach live call flow in four steps: listen, transcribe, classify, interrupt.",
        caption: "Live call flow — from the project repository",
      },
    ],
    flow: ["Mic chunks", "Speech-to-text", "Gemini risk score", "Interrupt"],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Gemini API", "ElevenLabs", "Framer Motion"],
    github: "https://github.com/ShivaniKapase643/Kavach_DeepSeek_ET_AI_Hackathon",
    live: null,
    team: { size: 4, repoHost: "self" },
  },
  {
    slug: "smarthire-ai",
    name: "SmartHire AI",
    tier: "other",
    category: "AI · Full-stack (MERN)",
    tagline:
      "A placement-preparation platform with Gemini-driven mock interviews, ATS-style resume analysis and job tracking.",
    context: "Team TwinTech · 2-member team",
    role: "Co-developer",
    problem: "Placement preparation is scattered across mock-interview apps, resume checkers and spreadsheets.",
    solution:
      "A React + Redux frontend over a Node/Express + MongoDB API with seven Gemini-backed functions: question generation, answer evaluation, resume analysis, resume-to-JD matching, career and job recommendations, and interview feedback.",
    features: [
      "AI mock interviews with answer evaluation and structured feedback",
      "Resume analysis and resume-to-job-description matching from PDF/DOCX uploads",
      "Job tracker and real-time dashboards over Socket.IO",
      "JWT and Google sign-in, Helmet, rate limiting and Joi validation",
    ],
    contribution: [
      "Co-built with a teammate; authored the initial Express API, Gemini service layer and React frontend.",
    ],
    architecture: [
      "Frontend: React 18, Vite, Redux Toolkit, Tailwind CSS, Chart.js/Recharts, Socket.IO client.",
      "Backend: Node.js, Express, MongoDB/Mongoose, JWT + Passport (Google OAuth), Winston logging.",
      "AI: Google Gemini through a dedicated service module.",
    ],
    flow: ["React", "Express API", "Gemini", "MongoDB"],
    stack: ["React", "Redux Toolkit", "Node.js", "Express.js", "MongoDB", "Socket.IO", "Gemini API", "JWT", "Chart.js"],
    github: "https://github.com/ShivaniKapase643/HireProAi",
    live: null,
    team: { size: 2, repoHost: "self" },
  },
  {
    slug: "reviewai",
    name: "ReviewAI",
    tier: "other",
    category: "AI · Developer tooling",
    tagline:
      "A GitHub-integrated reviewer that analyses pull-request diffs with GPT-4.1 and posts inline review comments back to the PR.",
    context: "Hackathon project · May 2026",
    role: "Primary developer",
    problem:
      "First-pass review — obvious bugs, security issues, missing tests — takes time reviewers could spend on design feedback.",
    solution:
      "A FastAPI service receives HMAC-verified GitHub webhooks, fetches the diff, asks GPT-4.1 for a structured JSON review across six issue categories, stores it, and posts inline comments through the GitHub Reviews API, with a Next.js dashboard.",
    features: [
      "Webhook → diff → GPT-4.1 → inline PR comments, end to end",
      "Six issue categories — security, bug, performance, clean code, best practice, testing — with severity and fixes",
      "“Explain like a senior engineer” follow-up explanations",
      "Next.js analytics dashboard",
    ],
    contribution: [
      "Built the FastAPI backend (GitHub service, AI review service, orchestration) and the Next.js dashboard; a teammate fixed the deployment configuration.",
    ],
    architecture: [
      "FastAPI with service classes for the GitHub REST API and OpenAI; JSON-mode responses at low temperature for parseable output.",
      "Async SQLAlchemy with SQLite for persistence.",
      "Next.js + Tailwind CSS dashboard.",
    ],
    flow: ["Webhook", "Fetch diff", "GPT-4.1 review", "Inline comments"],
    stack: ["Python", "FastAPI", "OpenAI API", "SQLAlchemy", "Next.js", "Tailwind CSS"],
    github: "https://github.com/ShivaniKapase643/ai-pr-reviewer",
    live: null,
    team: { repoHost: "self" },
  },
];

// Smaller public repositories, linked without case studies.
export type RepoLink = { name: string; description: string; stack: string[]; href: string };

export const moreRepos: RepoLink[] = [
  {
    name: "Candidate Ranking Engine",
    description: "Hybrid semantic + rule-based candidate ranking with fake-profile detection — RedRob INDIA.RUNS Data & AI Challenge 2026.",
    stack: ["Python", "sentence-transformers", "Pandas", "Gradio"],
    href: "https://github.com/ShivaniKapase643/TheDataAndAiChallenge",
  },
  {
    name: "TweetSense",
    description: "Tweet sentiment analysis comparing Logistic Regression, Naive Bayes and Linear SVM, with an interactive dashboard.",
    stack: ["Python", "scikit-learn", "NLTK", "Streamlit"],
    href: "https://github.com/ShivaniKapase643/TweetSenseSentimentAnalysis",
  },
  {
    name: "Titanic Survival Prediction",
    description: "Exploratory analysis and a Logistic Regression vs Decision Tree comparison in a notebook, with a small prediction app.",
    stack: ["Python", "Pandas", "NumPy", "scikit-learn", "Matplotlib", "Jupyter Notebook", "Streamlit"],
    href: "https://github.com/ShivaniKapase643/Titanic-Survival-Prediction",
  },
  {
    name: "ImageGuard",
    description: "Digital image forensics — error level analysis, noise residuals, EXIF inspection and PDF reports.",
    stack: ["Python", "OpenCV", "Streamlit"],
    href: "https://github.com/ShivaniKapase643/ImageForensic",
  },
  {
    name: "GreenChain",
    description: "Logistics emissions tracking with a Gemini-powered fleet copilot.",
    stack: ["FastAPI", "Gemini API", "Supabase", "React"],
    href: "https://github.com/ShivaniKapase643/GreenChain",
  },
  {
    name: "AI Podcast Generator",
    description: "Scheduled pipeline: news scraping, GPT-4o scripting, ElevenLabs audio and emailed episodes.",
    stack: ["Node.js", "OpenAI API", "React"],
    href: "https://github.com/ShivaniKapase643/Ai_Podcast_Generator",
  },
  {
    name: "CharityChain",
    description: "Ethereum-backed donation records with Solidity/OpenZeppelin contracts and MetaMask.",
    stack: ["Solidity", "Hardhat", "React", "Express.js"],
    href: "https://github.com/ShivaniKapase643/CharityChain",
  },
];

export const featuredProjects = projects.filter((p) => p.tier === "featured");
export const otherProjects = projects.filter((p) => p.tier === "other");

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
