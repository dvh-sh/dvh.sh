import React from "react";

interface Connection {
  Icon  : React.ComponentType<any>;
  label : string;
  link  : string;
  color : string;
}

interface ConnectSectionProps {
  connections : Connection[];
  iconSize?   : string;
}

const ConnectSection: React.FC<ConnectSectionProps> = ({
  connections,
  iconSize = "w-6 sm:w-8 h-6 sm:h-8",
}) => {
  return (
    <>
      <h2 className="text-subtext1 text-md sm:text-lg font-semibold mb-3">
        Connect with Me
      </h2>
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
    </>
  );
};

export default ConnectSection;

// path: src/app/container/ConnectSection.tsx
