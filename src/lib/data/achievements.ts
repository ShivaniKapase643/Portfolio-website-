import type { CertificateAssetId } from "@/lib/data/assets";

export type Achievement = {
  id: string;
  title: string;
  event: string;
  date?: string;
  detail: string;
  stat?: { value: string; label: string };
  asset?: CertificateAssetId;
  credentialId?: string;
  project?: string;
  href?: string;
};

// Headline results — resume (Oct 2026) and the matching certificates.
export const highlightAchievements: Achievement[] = [
  {
    id: "pune-agri-hackathon",
    title: "Top 15 Finalist",
    event: "Pune Agri Hackathon International 2026",
    detail:
      "Reached the Top 15 among 500+ international teams with SmartShetakari, a blockchain-backed milk-traceability app.",
    stat: { value: "Top 15", label: "of 500+ teams" },
    project: "smartshetakari",
  },
  {
    id: "promptwars-top-400",
    title: "Top 400 — Challenge 4 leaderboard",
    event: "PromptWars Virtual 2026 · Google for Developers × Hack2skill",
    date: "Aug 2026",
    detail:
      "Certificate of Achievement for a Top 400 leaderboard position in Challenge 4, building functional Generative AI applications.",
    stat: { value: "Top 400", label: "among 46,000+ participants" },
    asset: "promptwars-top-400",
    credentialId: "2026H2S07PWVCHL4-AT00071",
  },
  {
    id: "national-hackathons",
    title: "National Hackathon Representative",
    event: "Smart India Hackathon 2025 · ISRO Bharatiya Antariksh Hackathon 2025",
    detail:
      "Represented at two national-level hackathons run by the Government of India and the Indian Space Research Organisation.",
    stat: { value: "2", label: "national hackathons" },
  },
  {
    id: "electrovert",
    title: "Finalist — Mock Placement Drive",
    event: "ELECTROVERT 2023-24 · Walchand College of Engineering, Sangli",
    date: "Nov 2023",
    detail: "Finalist in the mock placement drive at ELESA's international-level ELECTROVERT event.",
    stat: { value: "Finalist", label: "placement drive" },
    asset: "electrovert-2023-finalist",
  },
];

export const hackathons: Achievement[] = [
  {
    id: "promptwars-challenge-3",
    title: "Verified Generative AI solution — Challenge 3",
    event: "PromptWars Virtual 2026",
    date: "Aug 2026",
    detail: "Certificate of Appreciation for a verified Generative AI submission.",
    asset: "promptwars-challenge-3",
    credentialId: "2026H2S06PWVCHL3-A01024",
  },
  {
    id: "et-ai-hackathon",
    title: "Team Lead — Team DeepSeek",
    event: "ET AI Hackathon 2.0",
    date: "Jul 2026",
    detail: "Led a 4-member team that built Kavach, a real-time digital-arrest scam shield.",
    project: "kavach",
  },
  {
    id: "far-away-2026",
    title: "Hackathon team member",
    event: "Far Away 2026 Hackathon · Agentic & Autonomous Systems",
    date: "Jun 2026",
    detail: "Built DRONA AI, a multi-agent exam-integrity platform, as a team.",
    project: "drona-ai",
  },
  {
    id: "redrob-challenge",
    title: "Challenge entry",
    event: "RedRob INDIA.RUNS Data & AI Challenge 2026",
    date: "Jul 2026",
    detail: "Built a hybrid semantic + rule-based candidate-ranking engine with fake-profile detection.",
    href: "https://github.com/ShivaniKapase643/TheDataAndAiChallenge",
  },
  {
    id: "triq",
    title: "Certificate of Achievement",
    event: "TRIQ — Think Twice · OutThinkX",
    date: "Jun 2026",
    detail: "Recognised for knowledge and quick thinking in a competitive quiz.",
    asset: "triq-think-twice",
  },
  {
    id: "incepto-23",
    title: "Participant — Code Combat",
    event: "INCEPTO'23 national-level symposium · Government Polytechnic, Karad",
    date: "Feb 2023",
    detail: "Coding competition organised by the Computer Engineering Student Association (COSA).",
    asset: "incepto-2023-code-combat",
  },
];

export const leadership: Achievement[] = [
  {
    id: "technovation-gp-karad",
    title: "Event Coordinator",
    event: "Technovation 2K23 · Government Polytechnic, Karad",
    date: "Feb 2023",
    detail: "Coordinated and took part in the “C Master” event of the state-level technical symposium.",
    asset: "technovation-2k23-gp-karad",
  },
  {
    id: "shekunj",
    title: "Campus Ambassador",
    event: "Shekunj",
    detail: "Student outreach and promotion on campus.",
  },
];

export const participation: Achievement[] = [
  {
    id: "technovation-grwp",
    title: "Quiz (C Programming) — Certificate of Appreciation",
    event: "Technovation 2K23 · Government Residence Women's Polytechnic, Tasgaon",
    date: "2023",
    detail: "",
    asset: "technovation-2k23-grwp-quiz",
  },
  {
    id: "unstop-week-of-wins",
    title: "Week-of-Wins — seven daily challenges",
    event: "Unstop",
    detail: "",
    asset: "unstop-week-of-wins",
  },
  {
    id: "unstop-mock-tests",
    title: "Mock Tests & Interviews",
    event: "Unstop",
    detail: "",
    asset: "unstop-mock-tests-interviews",
  },
  {
    id: "quiz-gwec",
    title: "Quiz Competition",
    event: "Government Women Engineering College, Ajmer",
    detail: "",
    asset: "quiz-competition-gwec-ajmer",
  },
  {
    id: "icat",
    title: "Internship Common Aptitude Test",
    event: "ICAT",
    date: "Jan 2026",
    detail: "",
    asset: "icat-internship-aptitude-test",
  },
];

export const academicHighlights = [
  { value: "9.6", label: "SGPA", detail: "B.E. Computer Engineering · current" },
  { value: "90.41%", label: "Diploma", detail: "Computer Engineering · MSBTE" },
  { value: "92.60%", label: "SSC", detail: "Maharashtra State Board" },
];

export const research = {
  title: "Effects of heat stress on the human neuroendocrine system",
  area: "Interdisciplinary research · human physiology",
  org: "MES Wadia College of Engineering, Pune",
  role: "Research Intern",
  period: "Jan 2026 – Feb 2026",
  methodology: "Literature review and analysis of published work on how heat stress affects the human neuroendocrine system.",
  contributions: ["Literature review & analysis", "Research analysis", "Technical documentation", "Research paper contribution"],
  outcome: "Contributed to a research paper submitted by the faculty mentor.",
  status: "Submitted by faculty mentor",
};
