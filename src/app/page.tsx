"use client";

import AboutMe from "@component/content/AboutMe";
import Projects from "@component/content/Projects";
import Skills from "@component/content/Skills";

export default function HomePage() {
  return (
    <div className="w-full h-full p-4 sm:p-6 md:pl-72 py-8 bg-base text-text">
      <div className="max-w-4xl mx-auto">
        <AboutMe />
        <Projects />
        <Skills />
      </div>
    </div>
  );
}

// path: src/app/page.tsx
