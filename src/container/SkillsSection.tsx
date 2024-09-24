import * as SiIcons from "react-icons/si";
import React from "react";

import { Skill } from "@types";

interface SkillsSectionProps {
  title: string;
  skills: Skill[];
}

const getIcon = (iconName: string) => {
  return SiIcons[iconName as keyof typeof SiIcons];
};

const SkillIcon: React.FC<{ skill: Skill }> = ({ skill }) => {
  const Icon = getIcon(skill.icon);

  return (
    <div className="group relative transform transition-all duration-300 ease-in-out hover:scale-105">
      <div
        className={`
        flex items-center p-2 
        border-2 ${skill.color} bg-surface0
        group-hover:shadow-md
      `}
      >
        <Icon className={`${skill.color} text-2xl mr-2`} />
        <span className="text-xs font-semibold uppercase tracking-wide text-subtext0">
          {skill.label}
        </span>
      </div>
    </div>
  );
};

const SkillsSection: React.FC<SkillsSectionProps> = ({ title, skills }) => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4 text-accent uppercase tracking-wide">
        {title}
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {skills.map((skill, index) => (
          <SkillIcon key={index} skill={skill} />
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;

// path: src/container/SkillsSection.tsx
