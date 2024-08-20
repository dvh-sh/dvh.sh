import React from 'react';

import SkillIcon from '@component/svg/SkillIcon';

const SkillsSection = ({ title, skills }: { title: string, skills: { Icon: React.ComponentType<any>, label: string, color: string }[] }) => {
    return (
        <>
            <h2 className="text-white text-xl font-semibold mb-4">{title}</h2>
            <div className="flex justify-center space-x-6 mb-6">
        {skills.map((skill, index) => (
                <SkillIcon key={index} Icon={skill.Icon} label={skill.label} color={skill.color} />
))}
    </div>
    </>
);
};

export default SkillsSection;

// path: src/app/container/SkillsSection.tsx
