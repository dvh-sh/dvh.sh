import React from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

import { Project } from "@types";

const ProjectCard: React.FC<Project> = ({
  title,
  description,
  technologies,
  demoLink,
  sourceLink,
}) => {
  return (
    <div className="relative bg-surface0 border-4 border-accent p-6 transform rotate-1 hover:rotate-0 transition-all duration-300">
      <h3 className="text-2xl font-bold text-accent mb-4 uppercase tracking-wider">
        {title}
      </h3>

      <p className="text-text mb-6 font-mono">{description}</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {technologies.map((tech, index) => (
          <span
            key={index}
            className="inline-block bg-surface1 text-subtext1 px-3 py-1 text-sm font-bold uppercase tracking-wider transform -skew-x-12"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <a
          href={demoLink}
          className="group flex items-center space-x-2 text-subtext0 hover:text-accent transition-colors duration-200"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View project demo"
        >
          <FaExternalLinkAlt size={20} />
          <span className="font-bold uppercase tracking-wider group-hover:underline">
            Demo
          </span>
        </a>
        <a
          href={sourceLink}
          className="group flex items-center space-x-2 text-subtext0 hover:text-accent transition-colors duration-200"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View source code"
        >
          <FaGithub size={20} />
          <span className="font-bold uppercase tracking-wider group-hover:underline">
            Source
          </span>
        </a>
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-accent to-transparent opacity-10 pointer-events-none" />
    </div>
  );
};

export default ProjectCard;

// path: src/component/ProjectCard.tsx
