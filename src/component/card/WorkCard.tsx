import React from "react";

import { FaExternalLinkAlt } from "react-icons/fa";
import { motion } from "framer-motion";

import TechChip from "@component/chip/TechChip";

import { Work } from "@types";

const WorkCard: React.FC<Work> = ({
  title,
  shortDescription,
  technologies,
  link,
  date,
}) => {
  return (
    <motion.div
      className="bg-surface0 p-6 shadow-md hover:shadow-lg transition-shadow duration-300 transform -skew-x-2 border-l-4 border-accent"
      whileHover={{ scale: 1.01, x: 5 }}
    >
      <div className="flex flex-col mb-4">
        <h3 className="text-3xl font-bold text-accent mb-1 uppercase tracking-wide">
          {title}
        </h3>
        <span className="text-lg text-subtext0 font-mono">{date}</span>
      </div>
      <p className="text-text mb-4 text-base font-mono leading-relaxed">
        {shortDescription}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {technologies.map((tech) => (
          <TechChip key={tech} slug={tech} />
        ))}
      </div>
      <motion.a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-accent hover:underline text-lg font-bold"
        whileHover={{ scale: 1.05, x: 5 }}
      >
        Live Demo
        <FaExternalLinkAlt className="ml-2" size={18} />
      </motion.a>
    </motion.div>
  );
};

export default WorkCard;

// path: src/component/card/WorkCard.tsx
