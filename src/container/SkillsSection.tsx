import React from "react";
import SkillIcon from "@component/svg/SkillIcon";
import { Skill } from "@types";
import * as SiIcons from "react-icons/si";

interface SkillsSectionProps {
  title: string;
  skills: Skill[];
  iconSize?: string;
}

const getIcon = (iconName: string) => {
  return SiIcons[iconName as keyof typeof SiIcons];
};

const SkillsSection: React.FC<SkillsSectionProps> = ({
  title,
  skills,
  iconSize = "w-8 sm:w-9 h-8 sm:h-9",
}) => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4 text-subtext0">{title}</h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
        {skills.map((skill, index) => (
          <SkillIcon
            key={index}
            Icon={getIcon(skill.icon)}
            label={skill.label}
            color={skill.color}
            iconSize={iconSize}
          />
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;

// path: src/container/SkillsSection.tsx
