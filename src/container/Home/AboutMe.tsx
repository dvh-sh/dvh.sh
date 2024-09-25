import React from "react";

const text = "I'm a self-taught full-stack software engineer with 7+ years of experience, juggling coding with full-time studies. When not immersed in tech, I'm hiking, snapping photos, or tending to plants. I unwind with Tetris, dabble in OSINT and reverse engineering, and have a knack for DevOps and low-level optimization.";

const sentences = text.split(".").filter(sentence => sentence.trim());

export default function AboutMe() {
  return (
    <section id="about" className="mb-16 mt-12 relative overflow-hidden">
      <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-8 text-accent uppercase tracking-tighter transform -skew-x-6">
        Hi, I'm David <span className="inline-block animate-wave pl-4">👋</span>
      </h2>

      <div className="relative z-10 p-2">
        <div className="bg-surface0 p-6 border-4 border-accent shadow-lg transform rotate-1 transition-transform hover:rotate-0 duration-300">
          {sentences.map((sentence, index) => (
            <p
              key={index}
              className="mb-2 last:mb-0 font-mono text-sm"
            >
              {sentence.trim()}
            </p>
          ))}
        </div>
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

// path: src/component/content/AboutMe.tsx
