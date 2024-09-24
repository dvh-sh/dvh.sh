import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Position } from "@types";
import { motion } from "framer-motion";

const PositionCard: React.FC<Position> = ({
  title,
  shortDescription,
  technologies,
  link,
  positionTitle,
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
      <h4 className="text-2xl font-semibold text-text mb-3 transform skew-x-2">
        {positionTitle}
      </h4>
      <p className="text-text mb-4 text-base font-mono leading-relaxed">
        {shortDescription}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {technologies.map((tech, index) => (
          <motion.span
            key={index}
            className="inline-block bg-surface1 text-subtext0 px-2 py-1 text-sm font-bold uppercase tracking-wide"
            whileHover={{ scale: 1.05, rotate: Math.random() * 5 - 2.5 }}
          >
            {tech}
          </motion.span>
        ))}
      </div>
      <motion.a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-accent hover:underline text-lg font-bold"
        whileHover={{ scale: 1.05, x: 5 }}
      >
        Company Website
        <FaExternalLinkAlt className="ml-2" size={18} />
      </motion.a>
    </motion.div>
  );
};

export default PositionCard;

// path: src/component/card/PositionCard.tsx
