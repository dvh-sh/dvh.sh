import React from "react";

interface SkillIconProps {
  Icon: React.ComponentType<any>;
  label: string;
  color: string;
}

const SkillIcon: React.FC<SkillIconProps> = ({ Icon, label, color }) => {
  return (
    <div className="flex items-center space-x-2 bg-surface0 rounded-lg p-2 hover:bg-overlay0 transition-colors duration-300">
      <Icon className={`${color} w-6 h-6`} />
      <span className="text-sm text-text">{label}</span>
    </div>
  );
};

export default SkillIcon;

// path: src/component/svg/SkillIcon.tsx
