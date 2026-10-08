import { certificateAssets, type CertificateAssetId } from "@/lib/data/assets";

export type CertificateCategory = "internship" | "ai" | "cloud" | "data" | "programming" | "security" | "other";

export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  // Short monogram shown in the card badge.
  mark: string;
  kind: string;
  category: CertificateCategory;
  date?: string;
  skills: string[];
  detail?: string;
  credentialId?: string;
  asset?: CertificateAssetId;
  status?: "in-progress";
  // AWS executive/business courses are grouped behind a disclosure.
  track?: "business";
  featured?: boolean;
  // Lower = stronger. Drives ordering everywhere.
  rank: number;
};

export const certificateCategories: { id: CertificateCategory; label: string; blurb: string }[] = [
  { id: "internship", label: "Internships & training", blurb: "Industry programmes completed with a formal certificate." },
  { id: "ai", label: "AI & generative AI", blurb: "Generative AI programmes and machine-learning coursework." },
  { id: "cloud", label: "Cloud computing", blurb: "AWS Training & Certification course completions and cloud fundamentals." },
  { id: "data", label: "Data & databases", blurb: "Data analysis, SQL and relational databases." },
  { id: "programming", label: "Programming & development", blurb: "Six-month professional language courses from VJTech Academy." },
  { id: "security", label: "Cybersecurity", blurb: "Security fundamentals and practical simulations." },
  { id: "other", label: "Other professional", blurb: "Tools that support technical work." },
];

const aws = "AWS Training & Certification";
const vj = "VJTech Academy";
const iitb = "EduPyramids, SINE · IIT Bombay";

// Titles, issuers and dates are copied from the certificate documents themselves.
export const certificates: Certificate[] = [
  // ── Internships & training ────────────────────────────────────────────────
  {
    id: "sunbeam-mern-internship",
    title: "Industrial Training & Internship Programme — MERN",
    issuer: "Sunbeam Infotech Pvt. Ltd., Pune",
    mark: "SB",
    kind: "Internship certificate",
    category: "internship",
    date: "12 Jan – 12 Feb 2026",
    skills: ["MongoDB", "Express.js", "React", "Node.js"],
    detail: "Evaluated and awarded Grade A",
    asset: "sunbeam-mern-internship",
    featured: true,
    rank: 1,
  },
  {
    id: "microdynamic-internship-letter-2025",
    title: "Industrial Internship Completion Certificate — Android Development",
    issuer: "Microdynamic Software Pvt. Ltd., Pune",
    mark: "MD",
    kind: "Internship certificate",
    category: "internship",
    date: "1 Jun – 30 Jul 2025",
    skills: ["Android", "Mobile app development"],
    asset: "microdynamic-internship-letter-2025",
    featured: true,
    rank: 6,
  },
  {
    id: "microdynamic-internship-2023",
    title: "Certificate of Internship",
    issuer: "Microdynamic Software Pvt. Ltd., Pune",
    mark: "MD",
    kind: "Internship certificate",
    category: "internship",
    date: "8 Jun – 22 Jul 2023",
    skills: ["Android", "Java"],
    asset: "microdynamic-internship-2023",
    rank: 6.5,
  },

  // ── AI & generative AI ───────────────────────────────────────────────────
  {
    id: "outskill-generative-ai-mastermind",
    title: "Generative AI Mastermind",
    issuer: "Outskill",
    mark: "OS",
    kind: "Certificate of completion",
    category: "ai",
    skills: ["Generative AI", "LLM tools"],
    asset: "outskill-generative-ai-mastermind",
    featured: true,
    rank: 2,
  },
  {
    id: "aws-generative-ai-for-executives",
    title: "Generative AI for Executives",
    issuer: aws,
    mark: "AWS",
    kind: "Course completion",
    category: "ai",
    date: "Mar 2026",
    skills: ["Generative AI", "AI adoption"],
    asset: "aws-generative-ai-for-executives",
    rank: 13,
  },
  {
    id: "coursera-ml-specialization",
    title: "Machine Learning Specialization (Andrew Ng)",
    issuer: "Coursera · DeepLearning.AI & Stanford",
    mark: "C",
    kind: "Specialization",
    category: "ai",
    skills: ["Machine learning", "Supervised learning"],
    status: "in-progress",
    rank: 40,
  },
  {
    id: "kaggle-intro-ml",
    title: "Intro to Machine Learning",
    issuer: "Kaggle Learn",
    mark: "K",
    kind: "Course",
    category: "ai",
    skills: ["Machine learning", "Model validation"],
    rank: 41,
  },

  // ── Cloud — AWS core ──────────────────────────────────────────────────────
  {
    id: "aws-cloud-practitioner-essentials",
    title: "AWS Cloud Practitioner Essentials",
    issuer: aws,
    mark: "AWS",
    kind: "Course completion",
    category: "cloud",
    date: "Mar 2026",
    skills: ["Cloud concepts", "Core AWS services", "Pricing & support"],
    asset: "aws-cloud-practitioner-essentials",
    featured: true,
    rank: 3,
  },
  {
    id: "aws-well-architected-foundations",
    title: "AWS Well-Architected Foundations",
    issuer: aws,
    mark: "AWS",
    kind: "Course completion",
    category: "cloud",
    date: "Mar 2026",
    skills: ["Architecture best practices", "Reliability"],
    asset: "aws-well-architected-foundations",
    rank: 7,
  },
  {
    id: "aws-database-offerings",
    title: "AWS Database Offerings",
    issuer: aws,
    mark: "AWS",
    kind: "Course completion",
    category: "cloud",
    date: "Mar 2026",
    skills: ["Managed databases"],
    asset: "aws-database-offerings",
    rank: 14,
  },
  {
    id: "aws-compute-services-overview",
    title: "AWS Compute Services Overview",
    issuer: aws,
    mark: "AWS",
    kind: "Course completion",
    category: "cloud",
    date: "Mar 2026",
    skills: ["Compute services"],
    asset: "aws-compute-services-overview",
    rank: 15,
  },
  {
    id: "aws-foundations-getting-started",
    title: "AWS Foundations: Getting Started with the AWS Cloud Essentials",
    issuer: aws,
    mark: "AWS",
    kind: "Course completion",
    category: "cloud",
    date: "Mar 2026",
    skills: ["Cloud fundamentals"],
    asset: "aws-foundations-getting-started",
    rank: 18,
  },
  {
    id: "aws-shared-responsibility-model",
    title: "AWS Shared Responsibility Model",
    issuer: aws,
    mark: "AWS",
    kind: "Course completion",
    category: "cloud",
    date: "Mar 2026",
    skills: ["Cloud security basics"],
    asset: "aws-shared-responsibility-model",
    rank: 19,
  },
  {
    id: "aws-cloud-adoption-framework",
    title: "Introduction to the AWS Cloud Adoption Framework (CAF)",
    issuer: aws,
    mark: "AWS",
    kind: "Course completion",
    category: "cloud",
    date: "Mar 2026",
    skills: ["Cloud adoption"],
    asset: "aws-cloud-adoption-framework",
    rank: 20,
  },
  {
    id: "aws-billing-cost-management",
    title: "AWS Billing and Cost Management",
    issuer: aws,
    mark: "AWS",
    kind: "Course completion",
    category: "cloud",
    date: "Mar 2026",
    skills: ["Cost management"],
    asset: "aws-billing-cost-management",
    rank: 21,
  },
  {
    id: "aws-job-roles-in-the-cloud",
    title: "Job Roles in the Cloud",
    issuer: aws,
    mark: "AWS",
    kind: "Course completion",
    category: "cloud",
    date: "Mar 2026",
    skills: ["Cloud careers"],
    asset: "aws-job-roles-in-the-cloud",
    rank: 22,
  },
  {
    id: "oracle-oci-foundations",
    title: "Oracle Cloud Infrastructure (OCI) Foundations",
    issuer: "Oracle",
    mark: "OCI",
    kind: "Certification",
    category: "cloud",
    skills: ["Cloud fundamentals", "OCI"],
    rank: 39,
  },

  // ── Cloud — AWS executive & business track ───────────────────────────────
  ...(
    [
      ["aws-decision-maker-learning-plan", "Decision Maker Learning Plan", "Learning plan"],
      ["aws-cloud-essentials-business-leaders", "AWS Cloud Essentials for Business Leaders"],
      ["aws-digital-transformation-executives", "Digital Transformation for Executives"],
      ["aws-data-for-executives", "Data for Executives"],
      ["aws-getting-started-cloud-acquisition", "Getting Started with Cloud Acquisition"],
      ["aws-cloud-for-finance-professionals", "AWS Cloud for Finance Professionals"],
      ["aws-cloud-for-ctos", "Cloud for CTOs"],
      ["aws-cloud-for-cios", "Cloud for CIOs"],
      ["aws-cloud-for-cisos", "Cloud for CISOs"],
      ["aws-cloud-for-ceos", "Cloud for CEOs"],
      ["aws-cloud-for-cfos", "Cloud for CFOs"],
      ["aws-cloud-for-cmos", "Cloud for CMOs"],
      ["aws-cloud-for-chros", "Cloud for CHROs"],
      ["aws-cloud-for-risk-compliance", "Cloud for Risk and Compliance Executives"],
      ["aws-cloud-for-small-business-owners", "Cloud for Small Business Owners"],
    ] as [CertificateAssetId, string, string?][]
  ).map(
    ([id, title, kind], i): Certificate => ({
      id,
      title,
      issuer: aws,
      mark: "AWS",
      kind: kind ?? "Course completion",
      category: "cloud",
      date: "Mar 2026",
      skills: ["Cloud strategy"],
      asset: id,
      track: "business",
      rank: 60 + i,
    })
  ),

  // ── Data & databases ─────────────────────────────────────────────────────
  {
    id: "deloitte-data-analytics-job-simulation",
    title: "Data Analytics Job Simulation",
    issuer: "Deloitte · via Forage",
    mark: "D",
    kind: "Job simulation",
    category: "data",
    date: "Sep 2026",
    skills: ["Data analysis", "Forensic technology"],
    credentialId: "6a9bfdc271585ae064942aca",
    asset: "deloitte-data-analytics-job-simulation",
    featured: true,
    rank: 4,
  },
  {
    id: "iitb-rdbms-postgresql",
    title: "RDBMS PostgreSQL Training",
    issuer: iitb,
    mark: "IITB",
    kind: "Training · online exam",
    category: "data",
    date: "Dec 2025",
    skills: ["PostgreSQL", "RDBMS", "SQL"],
    detail: "Exam score 92.50%",
    asset: "iitb-rdbms-postgresql",
    featured: true,
    rank: 5,
  },
  {
    id: "pod-databases-sql-talk-series",
    title: "Databases & SQL — Expert Talk Series",
    issuer: "Pod.ai",
    mark: "POD",
    kind: "Talk series · 5 sessions",
    category: "data",
    date: "Sep 2026",
    skills: ["SQL queries", "Joins", "Query optimization"],
    asset: "pod-databases-sql-talk-series",
    rank: 16,
  },
  {
    id: "kaggle-pandas",
    title: "Pandas",
    issuer: "Kaggle Learn",
    mark: "K",
    kind: "Course",
    category: "data",
    skills: ["Pandas", "Data wrangling"],
    rank: 42,
  },

  // ── Programming & development ────────────────────────────────────────────
  {
    id: "vjtech-java",
    title: "Java Language",
    issuer: vj,
    mark: "VJ",
    kind: "6-month professional course",
    category: "programming",
    skills: ["Java", "OOP"],
    asset: "vjtech-java",
    rank: 10,
  },
  {
    id: "vjtech-javascript",
    title: "JavaScript Language",
    issuer: vj,
    mark: "VJ",
    kind: "6-month professional course",
    category: "programming",
    skills: ["JavaScript"],
    asset: "vjtech-javascript",
    rank: 11,
  },
  {
    id: "vjtech-data-structures-c",
    title: "Data Structure Using C",
    issuer: vj,
    mark: "VJ",
    kind: "6-month professional course",
    category: "programming",
    skills: ["Data structures", "C"],
    credentialId: "VJTECH-000809",
    asset: "vjtech-data-structures-c",
    rank: 12,
  },
  {
    id: "vjtech-cpp",
    title: "C++ Language",
    issuer: vj,
    mark: "VJ",
    kind: "6-month professional course",
    category: "programming",
    skills: ["C++", "OOP"],
    credentialId: "VJTECH-000163",
    asset: "vjtech-cpp",
    rank: 17,
  },
  {
    id: "vjtech-c",
    title: "C Language",
    issuer: vj,
    mark: "VJ",
    kind: "6-month professional course",
    category: "programming",
    skills: ["C"],
    credentialId: "VJTECH-000134",
    asset: "vjtech-c",
    rank: 17.5,
  },
  {
    id: "vjtech-vbnet",
    title: "VB.NET Language",
    issuer: vj,
    mark: "VJ",
    kind: "6-month professional course",
    category: "programming",
    skills: ["VB.NET"],
    asset: "vjtech-vbnet",
    rank: 23,
  },

  // ── Cybersecurity ────────────────────────────────────────────────────────
  {
    id: "deloitte-cyber-job-simulation",
    title: "Cyber Job Simulation",
    issuer: "Deloitte · via Forage",
    mark: "D",
    kind: "Job simulation",
    category: "security",
    date: "Sep 2026",
    skills: ["Cyber security"],
    credentialId: "6a9bfc8f71585ae06493f06e",
    asset: "deloitte-cyber-job-simulation",
    rank: 8,
  },
  {
    id: "aws-security-fundamentals",
    title: "AWS Security Fundamentals (Second Edition)",
    issuer: aws,
    mark: "AWS",
    kind: "Course completion",
    category: "security",
    date: "Mar 2026",
    skills: ["Cloud security", "Access management"],
    asset: "aws-security-fundamentals",
    rank: 9,
  },
  {
    id: "aws-cloud-security-essentials-executives",
    title: "Cloud Security Essentials for Executives",
    issuer: aws,
    mark: "AWS",
    kind: "Course completion",
    category: "security",
    date: "Mar 2026",
    skills: ["Security strategy"],
    asset: "aws-cloud-security-essentials-executives",
    rank: 24,
  },

  // ── Other professional ───────────────────────────────────────────────────
  {
    id: "iitb-latex",
    title: "LaTeX Training",
    issuer: iitb,
    mark: "IITB",
    kind: "Training · online exam",
    category: "other",
    date: "Dec 2025",
    skills: ["LaTeX", "Technical writing"],
    detail: "Exam score 75.00%",
    asset: "iitb-latex",
    rank: 25,
  },
];

export const sortedCertificates = [...certificates].sort((a, b) => a.rank - b.rank);

// Certificates backed by an uploaded document (what the stats count).
export const verifiedCertificates = certificates.filter((c) => c.asset);

export function certificateFile(c: Pick<Certificate, "asset">) {
  return c.asset ? certificateAssets[c.asset] : undefined;
}
