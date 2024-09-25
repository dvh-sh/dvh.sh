import React from "react";
import { motion } from "framer-motion";

import { getTechBySlug, getIcon } from "@util/tech.util";

interface TechChipProps {
  slug: string;
  className?: string;
}

const TechChip: React.FC<TechChipProps> = ({ slug, className = "" }) => {
  const tech = getTechBySlug(slug);

  if (!tech) return null;

  const Icon = getIcon(tech.icon);

  const randomRotation = Math.random() * 2 - 1;
  const randomSkew = Math.random() * 2 - 1;

  return (
    <motion.span
      className={`
        inline-flex items-center ${tech.color} bg-surface1 
        px-3 py-1 text-sm font-bold uppercase tracking-wider 
        border-2 border-accent shadow-brutal cursor-default select-none
        ${className}
      `}
      style={{
        transform: `rotate(${randomRotation}deg) skew(${randomSkew}deg)`,
      }}
      whileHover={{
        scale: 1.1,
        rotate: 0,
        skew: 0,
        transition: { duration: 0.3 },
      }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.span
        className="mr-2"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
      >
        <Icon size={18} />
      </motion.span>
      <span className="relative">
        <span className="relative z-10">{tech.title}</span>
        <motion.span
          className="absolute inset-0 opacity-20"
          animate={{
            scaleX: [1, 1.05, 1],
            scaleY: [1, 0.95, 1],
          }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />
      </span>
    </motion.span>
  );
};

export default TechChip;

// path: src/component/chip/TechChip.tsx
