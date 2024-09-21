import React from "react";

interface Connection {
  Icon: React.ComponentType<any>;
  label: string;
  link: string;
  color: string;
}

interface ConnectSectionProps {
  connections: Connection[];
  iconSize?: string;
}

const ConnectSection: React.FC<ConnectSectionProps> = ({
  connections,
  iconSize = "w-6 sm:w-8 h-6 sm:h-8",
}) => {
  return (
    <div className="mt-auto pt-4">
      {" "}
      {/* Added margin-top auto and padding-top */}
      <div className="flex justify-center space-x-4 sm:space-x-6">
        {connections.map((connection, index) => (
          <a
            key={index}
            href={connection.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`fill-overlay0 ${connection.color} hover:text-text hover:scale-110 transition-transform duration-300`}
            aria-label={`${connection.label} Redirect`}
          >
            <connection.Icon className={iconSize} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default ConnectSection;

// path: src/container/ConnectSection.tsx
