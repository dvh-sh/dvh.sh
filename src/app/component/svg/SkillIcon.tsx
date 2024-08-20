import React from 'react';

const SkillIcon = ({ Icon, label, color }: { Icon: React.ComponentType<any>, label: string, color: string }) => {
    return (
        <div className="group relative">
            <Icon className={`${color} w-10 h-10 hover:scale-110 transition-transform duration-300`} />
            <span className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-xs text-gray-100 bg-gray-700 border border-gray-600 rounded-lg p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                {label}
            </span>
        </div>
    );
};

export default SkillIcon;

// path: src/app/component/SkillIcon.tsx
