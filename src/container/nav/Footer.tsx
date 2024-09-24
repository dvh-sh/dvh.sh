"use client";

import React, { useEffect, useState } from "react";
import { SiNextdotjs, SiReact, SiTailwindcss, SiGithub } from "react-icons/si";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [gitHash, setGitHash] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://api.github.com/repos/dvh-sh/dvh.sh/commits/main")
      .then((response) => response.json())
      .then((data) => {
        setGitHash(data.sha.substring(0, 7));
      })
      .catch((error) => console.error("Error fetching Git hash:", error));
  }, []);

  return (
    <footer className="bg-mantle text-text py-3 md:ml-64 relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <p className="text-xs font-mono transform hover:-skew-x-6 transition-transform duration-300">
            &copy; {currentYear} dvh.sh
          </p>
          <p className="text-xs font-bold uppercase tracking-wider">
            Hello from ☀️ SoCal
          </p>
          <div className="group relative">
            <div className="flex items-center space-x-2 text-subtext0 cursor-pointer bg-surface0 p-1 rounded-md hover:bg-surface1 transition-colors duration-300">
              <SiNextdotjs
                size={16}
                className="hover:rotate-180 transition-transform duration-300"
              />
              <SiReact
                size={16}
                className="hover:rotate-180 transition-transform duration-300"
              />
              <SiTailwindcss
                size={16}
                className="hover:rotate-180 transition-transform duration-300"
              />
              <span className="text-xs font-mono">
                {gitHash ? `#${gitHash}` : "..."}
              </span>
            </div>
            <div className="absolute bottom-full right-0 mb-2 bg-surface0 text-text p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs whitespace-nowrap z-50">
              <p className="font-mono mb-1">
                Built with Next.js, React, and Tailwind CSS
              </p>
              {gitHash && (
                <a
                  href={`https://github.com/dvh-sh/dvh.sh/commit/${gitHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center mt-1 text-blue hover:text-accent transition-colors duration-200 font-bold uppercase tracking-wide"
                >
                  <SiGithub className="mr-1" /> View commit
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-accent to-blue opacity-5"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-accent"></div>
      <div className="absolute bottom-0 right-0 w-full h-px bg-blue"></div>
    </footer>
  );
}

// src: src/container/nav/Footer.tsx
