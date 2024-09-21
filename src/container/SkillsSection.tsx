import React from "react";
import SkillIcon from "@component/svg/SkillIcon";

interface Skill {
  Icon: React.ComponentType<any>;
  label: string;
  color: string;
}

interface SkillsSectionProps {
  title: string;
  skills: Skill[];
  iconSize?: string;
}

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
            Icon={skill.Icon}
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
