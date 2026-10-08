export type Education = {
  id: string;
  degree: string;
  field: string;
  institution: string;
  board: string;
  period: string;
  status?: string;
  score: { label: string; value: string };
  coursework?: string[];
  current?: boolean;
};

export const education: Education[] = [
  {
    id: "be",
    degree: "Bachelor of Engineering",
    field: "Computer Engineering",
    institution: "Modern Education Society's Wadia College of Engineering, Pune",
    board: "Savitribai Phule Pune University (SPPU)",
    period: "Aug 2024 – May 2027 (expected)",
    status: "Final year",
    score: { label: "SGPA", value: "9.6 / 10" },
    // Listed on the Jul 2026 resume.
    coursework: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "Database Management Systems",
      "Operating Systems",
      "Computer Networks",
    ],
    current: true,
  },
  {
    id: "diploma",
    degree: "Diploma",
    field: "Computer Engineering",
    institution: "Government Residence Women's Polytechnic, Tasgaon",
    board: "MSBTE",
    period: "Aug 2021 – Jun 2024",
    score: { label: "Percentage", value: "90.41%" },
  },
  {
    id: "ssc",
    degree: "Secondary School Certificate",
    field: "SSC",
    institution: "Siddheshwar High School, Pimprad",
    board: "Maharashtra State Board",
    period: "Jun 2021",
    score: { label: "Percentage", value: "92.60%" },
  },
];
