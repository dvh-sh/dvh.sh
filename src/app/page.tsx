"use client";

import { useEffect, useState } from "react";

import AboutMe from "@container/Home/AboutMe";
import Positions from "@container/Home/Positions";
import Projects from "@container/Home/Projects";
import Skills from "@container/Home/Skills";

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div
      className={`w-full min-h-screen bg-base text-text transition-all duration-300 ease-in-out ${isLoaded ? "md:pl-64" : "pl-0"}`}
    >
      <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
        <AboutMe />
        <Positions />
        <Projects />
        <Skills />
      </div>
    </div>
  );
}
