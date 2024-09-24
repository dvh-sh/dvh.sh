import React from "react";
import { motion } from "framer-motion";

export default function AboutMe() {
  const text =
    "I'm a self-taught full-stack software engineer with 7+ years of experience, juggling coding with full-time studies. When not immersed in tech, I'm hiking, snapping photos, or tending to plants. I unwind with Tetris, dabble in OSINT and reverse engineering, and have a knack for DevOps and low-level optimization.";

  return (
    <section id="about" className="mb-16 mt-8 relative overflow-hidden">
      <motion.h2
        className="text-6xl font-black mb-8 text-accent uppercase tracking-tighter transform -skew-x-6"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Hi, I'm David <span className="inline-block animate-spin-slow">👋</span>
      </motion.h2>

      <div className="relative z-10">
        <motion.div
          className="bg-surface0 p-6 border-4 border-accent shadow-lg transform rotate-1"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {text.split(".").map((sentence, index) => (
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

      <svg
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
          </filter>
        </defs>
        <g filter="url(#goo)">
          <circle cx="50%" cy="50%" r="40" fill="rgba(255,255,255,0.05)">
            <animate
              attributeName="cx"
              from="50%"
              to="50%"
              values="50%;65%;35%;50%"
              dur="10s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="cy"
              from="50%"
              to="50%"
              values="50%;35%;65%;50%"
              dur="10s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="50%" cy="50%" r="40" fill="rgba(255,255,255,0.05)">
            <animate
              attributeName="cx"
              from="50%"
              to="50%"
              values="50%;35%;65%;50%"
              dur="10s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="cy"
              from="50%"
              to="50%"
              values="50%;65%;35%;50%"
              dur="10s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </svg>
    </section>
  );
}

// path: src/component/content/AboutMe.tsx
