/**
 * @file src/containers/Home/AboutMe.tsx
 * @author David @dvhsh (https://dvh.sh)
 *
 * @created Wed, Aug 20 2025
 * @updated Wed, Aug 20 2025
 *
 * @description
 * The "About Me" section for the homepage.
 */

"use client";

import { motion } from "motion/react";
import React, { JSX, useMemo } from "react";
import { calculateAge } from "@/utils/date.utils";

/**
 * @component AboutMe
 * @description Renders the introductory "About Me" section with animated text and background elements.
 * @returns {JSX.Element} The rendered About Me section.
 */
const AboutMe = (): JSX.Element => {

  const age = useMemo(() => calculateAge(new Date(2006, 3, 3)), []);
  const experience = useMemo(() => age - 11, [age]);

  const text = useMemo(
    () =>
      `I'm a full-stack software engineer and full-time college student based in the Los Angeles Metropolitan Area. With a coding background spanning over ${experience} years, my specialties include backend web development, software architecture, and developer operations.`,
    [experience],
  );

  const sentences = useMemo(
    () => text.split(".").filter((sentence) => sentence.trim()),
    [text],
  );

  return (
    <section id="about" className="mb-16 mt-12 relative">
      <motion.h2
        className="text-4xl md:text-6xl font-black mb-8 text-accent uppercase tracking-tighter transform md:-skew-x-6"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Hi, I'm David <span className="inline-block animate-wave pl-4">👋</span>
      </motion.h2>

      <div className="relative z-10">
        <motion.div
          className="bg-ctp-surface0 p-6 border-4 border-accent shadow-lg transform md:rotate-1"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {sentences.map((sentence, index) => (
            <motion.p
              key={index}
              className="mb-2 last:mb-0 font-mono text-sm text-ctp-text"
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
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-ctp-blue opacity-10 rounded-full animate-bounce"></div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 goo-animation">
        <div className="goo-circle"></div>
        <div className="goo-circle"></div>
      </div>
    </section>
  );
};

export default AboutMe;
