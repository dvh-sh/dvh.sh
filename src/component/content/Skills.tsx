import { useEffect, useState } from "react";

import SkillsSection from "@container/SkillsSection";

import { Skill } from "@types";

interface SkillsData {
  programmingLanguages: Skill[];
  frameworks: Skill[];
  tools: Skill[];
  cloud: Skill[];
}

export default function Skills() {
  const [skills, setSkills] = useState<SkillsData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/dvh-sh/.github/refs/heads/main/assets/skills.json",
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.skills) {
          setSkills(data.skills);
        } else {
          throw new Error("Data structure is not as expected");
        }
      })
      .catch((error) => {
        console.error("Error fetching skills:", error);
        setError(error.message);
      });
  }, []);

  if (error) return <div>Error loading skills: {error}</div>;
  if (!skills) return <div>Loading skills...</div>;

  return (
    <section id="skills" className="mb-16">
      <h2 className="text-2xl font-bold mb-6 text-accent">Skills</h2>
      <SkillsSection
        title="Programming Languages"
        skills={skills.programmingLanguages}
      />
      <SkillsSection
        title="Frameworks & Libraries"
        skills={skills.frameworks}
      />
      <SkillsSection title="Cloud & Databases" skills={skills.cloud} />
      <SkillsSection title="DevOps & Tools" skills={skills.tools} />
    </section>
  );
}

// path: src/component/content/Skills.tsx
