import React, { useMemo } from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { motion } from "framer-motion";

import TechChip from "@component/chip/TechChip";

import { Project } from "@types";

const ProjectLink: React.FC<{
  href?: string;
  icon: React.ReactNode;
  text: string;
}> = ({ href, icon, text }) => {
  if (!href) return null;

  return (
    <motion.a
      href={href}
      className="group flex items-center space-x-2 text-subtext0 hover:text-accent transition-colors duration-200"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View project ${text.toLowerCase()}`}
      whileHover={{ scale: 1.1, rotate: [-1, 1, -1, 1, 0] }}
      transition={{ duration: 0.3 }}
    >
      {icon}
      <span className="font-bold uppercase tracking-wider group-hover:underline">
        {text}
      </span>
    </motion.a>
  );
};

const ProjectCard: React.FC<Project> = ({
  title,
  description,
  technologies,
  demoLink,
  sourceLink,
}) => {
  const initialRotation = useMemo(() => Math.random() * 2 - 1, []);

  const techChips = useMemo(
    () => technologies.map((tech) => <TechChip key={tech} slug={tech} />),
    [technologies],
  );

  return (
    <motion.div
      className="relative bg-surface0 border-4 border-accent p-6 shadow-brutal overflow-hidden flex flex-col h-full"
      initial={{ rotate: initialRotation }}
      whileHover={{
        rotate: 0,
        scale: 1.02,
        transition: { duration: 0.3 },
      }}
    >
      <h3 className="relative text-3xl font-black text-accent mb-4 uppercase tracking-wider transform -skew-x-6">
        {title}
      </h3>

      <p className="relative text-text mb-6 font-mono text-sm leading-relaxed flex-grow">
        {description}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">{techChips}</div>

      <div className="flex justify-between items-center mt-auto">
        <ProjectLink
          href={demoLink}
          icon={<FaExternalLinkAlt size={20} />}
          text="Demo"
        />
        <ProjectLink
          href={sourceLink}
          icon={<FaGithub size={20} />}
          text="Source"
        />
      </div>

      <motion.div
        className="absolute inset-0 border-4 border-accent opacity-50 pointer-events-none"
        animate={{
          rotate: [0, 2, 0, -2, 0],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        style={{ willChange: "transform" }}
      />
    </motion.div>
  );
};

export default ProjectCard;

// path: src/component/ProjectCard.tsx
