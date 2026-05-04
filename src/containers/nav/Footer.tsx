/**
 * @file src/containers/nav/Footer.tsx
 * @author David @dvhsh (https://dvh.sh)
 *
 * @created Wed, Aug 20 2025
 * @updated Mon, May 04 2026
 *
 * @description
 * The main footer component. Receives the git hash as a prop from the
 * server-side layout (cached 1h) so we don't hit the GitHub API per visitor.
 */

"use client";

import { motion } from "motion/react";
import { SiGithub, SiNextdotjs, SiReact, SiTailwindcss } from "react-icons/si";
import React, { useEffect, useState, useRef } from "react";

interface FooterProps {
  gitHash: string | null;
}

/**
 * @component Footer
 * @description Renders the footer with copyright, location, and a tech-stack popup.
 */
export const Footer: React.FC<FooterProps> = ({ gitHash }) => {
  const currentYear = new Date().getFullYear();
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showPopup) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setShowPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showPopup]);

  return (
    <footer className="print-hidden bg-ctp-mantle text-ctp-text py-3 md:ml-64 relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <p className="text-xs font-mono transform hover:-skew-x-6 transition-transform duration-300">
            &copy; 2024 - {currentYear} dvh.sh | All Rights Reserved
          </p>
          <p className="text-xs font-bold uppercase tracking-wider">
            Hello from ☀️ SoCal
          </p>
          <div className="relative" ref={popupRef}>
            <button
              type="button"
              className="flex items-center space-x-2 text-ctp-subtext0 cursor-pointer bg-ctp-surface0 px-2 py-2 rounded-md hover:bg-ctp-surface1 transition-colors duration-300"
              onClick={() => setShowPopup(!showPopup)}
              aria-label="Built with info"
              aria-expanded={showPopup}
            >
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
            </button>
            {showPopup && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-full right-0 mb-2 bg-ctp-surface0 text-ctp-text p-2 rounded shadow-lg text-xs whitespace-nowrap z-50"
              >
                <p className="font-mono mb-1">
                  Built with Next.js, React, and Tailwind CSS
                </p>
                {gitHash && (
                  <a
                    href={`https://github.com/dvh-sh/dvh.sh/commit/${gitHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center mt-1 text-ctp-blue hover:text-accent transition-colors duration-200 font-bold uppercase tracking-wide"
                  >
                    <SiGithub className="mr-1" /> View commit
                  </a>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-px bg-accent"></div>
      <div className="absolute bottom-0 right-0 w-full h-px bg-ctp-blue"></div>
    </footer>
  );
};
