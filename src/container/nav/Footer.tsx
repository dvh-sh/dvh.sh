"use client";

import React, { useEffect, useState, useRef } from "react";
import { SiNextdotjs, SiReact, SiTailwindcss, SiGithub } from "react-icons/si";

function FooterContent() {
  const currentYear = new Date().getFullYear();
  const [gitHash, setGitHash] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("https://api.github.com/repos/dvh-sh/dvh.sh/commits/main")
      .then((response) => response.json())
      .then((data) => {
        setGitHash(data.sha.substring(0, 7));
      })
      .catch((error) => console.error("Error fetching Git hash:", error));
  }, []);

  useEffect(() => {
    if (showPopup && popupRef.current) {
      const rect = popupRef.current.getBoundingClientRect();
      const viewportWidth =
        window.innerWidth || document.documentElement.clientWidth;

      if (rect.right > viewportWidth) {
        popupRef.current.style.right = "0";
        popupRef.current.style.left = "auto";
      } else {
        popupRef.current.style.right = "auto";
        popupRef.current.style.left = "0";
      }
    }
  }, [showPopup]);

  return (
    <footer className="bg-mantle text-text py-3 md:ml-64 relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <p className="text-xs font-mono transform hover:-skew-x-6 transition-transform duration-300">
            &copy; 2024 - {currentYear} dvh.sh | All Rights Reserved 
          </p>
          <p className="text-xs font-bold uppercase tracking-wider">
            Hello from ☀️ SoCal
          </p>
          <div className="relative">
            <div
              className="flex items-center space-x-2 text-subtext0 cursor-pointer bg-surface0 p-1 rounded-md hover:bg-surface1 transition-colors duration-300"
              onClick={() => setShowPopup(!showPopup)}
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
            </div>
            {showPopup && (
              <div
                ref={popupRef}
                className="absolute bottom-full mb-2 bg-surface0 text-text p-2 rounded shadow-lg text-xs whitespace-nowrap z-50"
                style={{ minWidth: "200px", maxWidth: "90vw" }}
              >
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
            )}
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-accent to-blue opacity-5"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-accent"></div>
      <div className="absolute bottom-0 right-0 w-full h-px bg-blue"></div>
    </footer>
  );
}

export function Footer() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <footer className="bg-mantle text-text py-3 md:ml-64 relative"></footer>
    );
  }

  return <FooterContent />;
}

// src: src/container/nav/Footer.tsx
