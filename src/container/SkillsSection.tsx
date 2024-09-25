import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Tech } from "@types";
import { getTechBySlug, getIcon } from "@util/tech.util";

interface SkillsSectionProps {
  title: string;
  skills: string[];
}

const SkillIcon: React.FC<{ tech: Tech }> = ({ tech }) => {
  const Icon = useMemo(() => getIcon(tech.icon), [tech.icon]);
  const randomRotation = useMemo(() => Math.random() * 2 - 1, []);

  return (
    <motion.div
      className="group relative"
      whileHover={{ scale: 1.05, rotate: 0 }}
      initial={{ rotate: randomRotation }}
    >
      <motion.div
        className="absolute inset-0 bg-accent opacity-20"
        animate={{ rotate: [0, 2, 0, -2, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        style={{ willChange: "transform" }}
      />
      <motion.div
        className={`
          flex items-center p-2 
          border ${tech.color} bg-surface0
          shadow-brutal relative z-10
          before:absolute before:inset-0 before:border before:border-accent before:-m-0.5
          after:absolute after:inset-0 after:border after:border-accent after:-m-1
        `}
        whileHover={{ skew: [0, 5, -5, 0] }}
        transition={{ duration: 0.3 }}
        style={{ willChange: "transform" }}
      >
        <Icon className={`${tech.color} text-2xl mr-2`} />
        <span className="text-xs font-bold uppercase tracking-wide text-subtext0">
          {tech.title}
        </span>
      </motion.div>
    </motion.div>
  );
};

const SkillsSection: React.FC<SkillsSectionProps> = ({ title, skills }) => {
  const skillItems = useMemo(
    () =>
      skills.map((slug) => {
        const tech = getTechBySlug(slug);
        return tech ? (
          <motion.div
            key={slug}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
          >
            <SkillIcon tech={tech} />
          </motion.div>
        ) : null;
      }),
    [skills],
  );

  return (
    <motion.div
      className="mb-8 select-none cursor-default"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h3
        className="text-2xl font-black mb-6 text-accent uppercase tracking-wider transform -skew-x-6"
        whileHover={{ skew: 0 }}
      >
        {title}
      </motion.h3>
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        initial="hidden"
        animate="show"
      >
        {skillItems}
      </motion.div>
    </motion.div>
  );
};

export default SkillsSection;

// path: src/container/SkillsSection.tsx
