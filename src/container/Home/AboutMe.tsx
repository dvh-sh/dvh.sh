import React, { useMemo } from "react";
import { motion } from "framer-motion";

export default function AboutMe() {
  const text = useMemo(
    () =>
      "I'm a self-taught full-stack software engineer with 7+ years of experience, currently balancing coding with full-time studies. Outside of tech, you'll find me hiking trails, capturing moments through photography, or caring for my cacti garden. My downtime is spent playing Chess, Tetris, and various rhythm games, while exploring interests in OSINT, reverse engineering, and the intricacies of DevOps and low-level optimization. As of late, I've also taken up various creatives, such as writing, drawing, piano, and cooking/baking; Although all to a more novice extent.",
    [],
  );

  const sentences = useMemo(
    () => text.split(".").filter((sentence) => sentence.trim()),
    [text],
  );

  return (
    <section id="about" className="mb-16 mt-12 relative overflow-hidden">
      <motion.h2
        className="text-6xl font-black mb-8 text-accent uppercase tracking-tighter transform -skew-x-6"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Hi, I'm David <span className="inline-block animate-wave pl-4">👋</span>
      </motion.h2>

      <div className="relative z-10">
        <motion.div
          className="bg-surface0 p-6 border-4 border-accent shadow-lg transform rotate-1"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {sentences.map((sentence, index) => (
            <motion.p
              key={index}
              className="mb-2 last:mb-0 font-mono text-sm"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.2 }}
            >
              {sentence.trim()}
            </motion.p>
          ))}
        </motion.div>
      </div>

      <div className="absolute top-0 right-0 w-64 h-64 bg-accent opacity-10 rounded-full animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue opacity-10 rounded-full animate-bounce"></div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 goo-animation">
        <div className="goo-circle"></div>
        <div className="goo-circle"></div>
      </div>
    </section>
  );
}

// path: src/container/Home/AboutMe.tsx
