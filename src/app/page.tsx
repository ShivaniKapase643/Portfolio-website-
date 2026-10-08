import { About } from "@/components/sections/about";
import { Achievements } from "@/components/sections/achievements";
import { Certifications } from "@/components/sections/certifications";
import { Contact } from "@/components/sections/contact";
import { Education } from "@/components/sections/education";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Resume } from "@/components/sections/resume";
import { Skills } from "@/components/sections/skills";
import { profile } from "@/lib/data/profile";
import { siteUrl } from "@/lib/site";

// Re-render at most daily so the live GitHub stats stay fresh.
export const revalidate = 86400;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: siteUrl,
  jobTitle: profile.title,
  email: `mailto:${profile.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pune",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  affiliation: {
    "@type": "CollegeOrUniversity",
    name: "Modern Education Society's Wadia College of Engineering, Pune",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Government Residence Women's Polytechnic, Tasgaon",
  },
  sameAs: [profile.github, profile.linkedin],
  knowsAbout: ["Full-stack development", "React", "Next.js", "Node.js", "Python", "FastAPI", "PostgreSQL", "Data analysis", "Generative AI"],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Certifications />
      <Education />
      <Achievements />
      <Resume />
      <Contact />
    </>
  );
}
