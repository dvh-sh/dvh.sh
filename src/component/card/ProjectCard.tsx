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
    <div className="bg-surface0 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full relative">
      <div className="absolute top-4 right-4 flex space-x-3">
        {demoLink && (
          <a
            href={demoLink}
            className="text-subtext0 hover:text-pink transition-colors duration-200"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View project demo"
          >
            <FaExternalLinkAlt size={20} />
          </a>
        )}
        {sourceLink && (
          <a
            href={sourceLink}
            className="text-subtext0 hover:text-pink transition-colors duration-200"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View source code"
          >
            <FaGithub size={20} />
          </a>
        )}
      </div>

      <h3 className="text-xl font-semibold mb-3 text-pink pr-16">{title}</h3>
      <p className="text-text mb-4">{description}</p>
      <div className="mt-auto">
        {technologies.map((tech, index) => (
          <span
            key={index}
            className="inline-block bg-surface1 text-subtext0 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 transition-colors duration-200 hover:bg-pink hover:text-base"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;

// path: src/component/ProjectCard.tsx
