/**
 * @file src/containers/Home/Skills.tsx
 * @author David @dvhsh (https://dvh.sh)
 *
 * @created Wed, Aug 20 2025
 * @updated Sun, Aug 25 2025
 *
 * @description
 * A container component to display categorized skills.
 */

"use client";

import SkillsSection from "@/containers/SkillsSection";
import type { SkillsData } from "@/types";
import { JSX } from "react";

/**
 * @interface SkillsProps
 * @description Defines the props for the Skills component.
 */
interface SkillsProps {
  data: SkillsData;
}

/**
 * @component Skills
 * @description Renders the main skills section by passing categorized data to SkillsSection.
 * @param {SkillsProps} { data } - The skills data, categorized.
 * @returns {JSX.Element} The rendered skills section.
 */
const Skills = ({ data }: SkillsProps): JSX.Element => {
  return (
    <section id="skills" className="mb-16">
      <h2 className="text-4xl md:text-6xl font-bold mb-6 text-accent">Skills</h2>
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
