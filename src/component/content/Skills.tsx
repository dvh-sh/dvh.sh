import { useEffect, useState } from "react";
import * as SiIcons from "react-icons/si";
import SkillsSection from "@container/SkillsSection";

interface Skill {
  icon: string;
  label: string;
  color: string;
}

interface SkillsData {
  programmingLanguages: Skill[];
  frameworks: Skill[];
  tools: Skill[];
  cloud: Skill[];
}

export default function Skills() {
  const [skills, setSkills] = useState<SkillsData | null>(null);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/dvh-sh/.github/refs/heads/main/assets/skills.json",
    )
      .then((response) => response.json())
      .then((data) => setSkills(data.skills));
  }, []);

  const getIcon = (iconName: string) => {
    return SiIcons[iconName as keyof typeof SiIcons];
  };

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
