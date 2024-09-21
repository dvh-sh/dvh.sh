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
    <footer className="bg-mantle text-text py-4 mt-8 md:ml-64">
      {" "}
      {/* Added md:ml-64 */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
          <p className="text-sm">
            &copy; {currentYear} dvh.sh. All rights reserved.
          </p>
          <div className="group relative">
            <div className="flex items-center space-x-2 text-subtext0 cursor-pointer">
              <SiNextdotjs size={16} />
              <SiReact size={16} />
              <SiTailwindcss size={16} />
              <span className="text-xs">
                {gitHash ? `#${gitHash}` : "Loading..."}
              </span>
            </div>
            <div className="absolute bottom-full mb-2 right-0 bg-surface0 text-text p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs whitespace-nowrap">
              <p>Built with Next.js, React, and Tailwind CSS</p>
              {gitHash && (
                <a
                  href={`https://github.com/dvh-sh/dvh.sh/commit/${gitHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center mt-1 text-blue hover:text-pink transition-colors duration-200"
                >
                  <SiGithub className="mr-1" /> View commit
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// src: src/container/nav/Footer.tsx
