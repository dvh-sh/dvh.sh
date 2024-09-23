import * as SiIcons from "react-icons/si";
import React from "react";

import SkillIcon from "@component/svg/SkillIcon";
import { Skill } from "@types";

interface SkillsSectionProps {
  title: string;
  skills: Skill[];
  iconSize?: string;
}

const getIcon = (iconName: string) => {
  return SiIcons[iconName as keyof typeof SiIcons];
};

const SkillsSection: React.FC<SkillsSectionProps> = ({ title, skills }) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3 text-subtext0">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {skills.map((skill, index) => (
          <SkillIcon
            key={index}
            Icon={getIcon(skill.icon)}
            label={skill.label}
            color={skill.color}
          />
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;

// path: src/container/SkillsSection.tsx
