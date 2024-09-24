"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import SoftwareCard from "@component/card/SoftwareCard";
import { Software } from "@types";

export default function SoftwarePage() {
  const [softwareList, setSoftwareList] = useState<{
    [key: string]: Software[];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/dvh-sh/.github/main/assets/software.json",
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.software) {
          setSoftwareList(data.software);
        } else {
          throw new Error("Data structure is not as expected");
        }
      })
      .catch((error) => {
        console.error("Error fetching software:", error);
        setError(error.message);
      });
  }, []);

  if (error)
    return (
      <div className="text-accent text-2xl font-bold">
        Error loading software: {error}
      </div>
    );
  if (!softwareList)
    return (
      <div className="text-accent text-2xl font-bold animate-pulse">
        Loading software...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-base to-mantle p-4 sm:p-6 md:ml-64 overflow-hidden">
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-6xl font-black mb-12 text-accent text-center uppercase tracking-widest transform -skew-x-12">
          Software
        </h2>
        {Object.keys(softwareList).map((category, index) => (
          <motion.div
            key={category}
            className="mb-16"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <h3 className="text-4xl font-bold mb-8 text-subtext0 uppercase tracking-wider transform skew-x-12">
              {category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {softwareList[category].map((software, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <SoftwareCard {...software} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 opacity-10"></div>
        <svg
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect
            width="100%"
            height="100%"
            filter="url(#noise)"
            opacity="0.05"
          />
        </svg>
      </div>
    </div>
  );
}

// path: src/app/software/page.tsx
