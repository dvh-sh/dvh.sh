"use client";

import AboutMe from "@container/Home/AboutMe";
import Positions from "@container/Home/Positions";
import Projects from "@container/Home/Projects";
import Skills from "@container/Home/Skills";

export default function HomePage() {
  return (
    <div className="w-full h-full p-4 sm:p-6 md:pl-72 py-8 bg-base text-text">
      <div className="max-w-4xl mx-auto">
        <AboutMe />
        <Positions />
        <Projects />
        <Skills />
      </div>
    </div>
  );
}

// path: src/app/page.tsx
