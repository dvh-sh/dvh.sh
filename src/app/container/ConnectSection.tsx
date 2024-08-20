import React from 'react';

const ConnectSection = ({ connections }: { connections: { Icon: React.ComponentType<any>, label: string, link: string, color: string }[] }) => {
    return (
        <div className="flex justify-center space-x-4 sm:space-x-6">
            {connections.map((connection, index) => (
                <a key={index} href={connection.link} target="_blank" className={`fill-slate-400 ${connection.color} hover:text-white hover:scale-110 transition-transform duration-300`} aria-label={`${connection.label} Redirect`}>
                    <connection.Icon className="w-8 sm:w-10 h-8 sm:h-10" />
                </a>
            ))}
        </div>
    );
};

export default ConnectSection;

// path: src/app/container/ConnectSection.tsx
