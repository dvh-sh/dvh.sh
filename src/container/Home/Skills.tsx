import SkillsSection from "@container/SkillsSection";
import { SkillsData } from "@types";

interface SkillsProps {
  data: SkillsData;
}

const Skills = ({ data }: SkillsProps) => {
  return (
    <section id="skills" className="mb-16">
      <h2 className="text-6xl font-bold mb-6 text-accent">Skills</h2>
      <SkillsSection
        title="Programming Languages"
        skills={data.programmingLanguages}
      />
      <SkillsSection title="Frameworks & Libraries" skills={data.frameworks} />
      <SkillsSection title="Cloud & Databases" skills={data.cloud} />
      <SkillsSection title="DevOps & Tools" skills={data.tools} />
    </section>
  );
};

export default Skills;

// path: src/container/Home/Skills.tsx
