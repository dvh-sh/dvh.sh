import { useEffect, useState } from "react";
import * as SiIcons from "react-icons/si";
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

  const getIcon = (iconName: string) => {
    return SiIcons[iconName as keyof typeof SiIcons];
  };

  if (error) return <div>Error loading skills: {error}</div>;
  if (!skills) return <div>Loading skills...</div>;

  return (
    <section id="skills" className="mb-16">
      <h2 className="text-3xl font-bold mb-4 text-pink">Skills</h2>
      <SkillsSection
        title="Programming Languages"
        skills={skills.programmingLanguages.map((skill) => ({
          ...skill,
          Icon: getIcon(skill.icon),
        }))}
        iconSize="w-10 h-10"
      />
      <SkillsSection
        title="Frameworks & Libraries"
        skills={skills.frameworks.map((skill) => ({
          ...skill,
          Icon: getIcon(skill.icon),
        }))}
        iconSize="w-10 h-10"
      />
      <SkillsSection
        title="Cloud & Databases"
        skills={skills.cloud.map((skill) => ({
          ...skill,
          Icon: getIcon(skill.icon),
        }))}
        iconSize="w-10 h-10"
      />
      <SkillsSection
        title="DevOps & Tools"
        skills={skills.tools.map((skill) => ({
          ...skill,
          Icon: getIcon(skill.icon),
        }))}
        iconSize="w-10 h-10"
      />
    </section>
  );
}

// path: src/component/content/Skills.tsx
