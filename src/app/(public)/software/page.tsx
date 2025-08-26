/**
 * @file app/software/page.tsx
 * @author David (https://dvh.sh)
 *
 * @created Wed, Aug 20 2025
 * @updated Mon, Aug 26 2025
 *
 * @description
 * Main page for displaying software projects. Fetches software data from a GitHub repository,
 * displays it categorized, and includes skeleton loaders and animated elements.
 */

"use client";

import { flavors } from "@catppuccin/palette";
import { motion } from "motion/react";
import React, { useEffect, useState, useMemo, useContext } from "react";

import SoftwareCard, {
  SoftwareCardSkeleton,
} from "@/components/card/SoftwareCard";
import { ThemeContext } from "@/providers/ThemeProvider";
import type { Software } from "@/types";

/**
 * @component CategorySkeleton
 * @description Renders a skeleton loader for a software category, used while data is being fetched.
 */
const CategorySkeleton = () => (
  <motion.div
    className="mb-12 md:mb-16"
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
  >
    <div className="h-8 bg-ctp-overlay0 w-48 mb-6 md:mb-8 rounded"></div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {[...Array(6)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <SoftwareCardSkeleton />
        </motion.div>
      ))}
    </div>
  </motion.div>
);

/**
 * @component SoftwarePage
 * @description Main component for the software page. Fetches and displays categorized software
 * information, including loading states and error handling.
 */
const SoftwarePage = () => {
  const [softwareList, setSoftwareList] = useState<Record<
    string,
    Software[]
  > | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useContext(ThemeContext);

  /**
   * @function fetchSoftware
   * @description Asynchronously fetches software data from a GitHub raw content URL.
   * Handles success, error, and loading states.
   */
  useEffect(() => {
    const fetchSoftware = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/dvh-sh/.github/main/portfolio.json",
          { cache: "no-store" },
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = (await response.json()) as {
          software?: Record<string, Software[]>;
        };

        if (
          data &&
          data.software &&
          typeof data.software === "object" &&
          !Array.isArray(data.software)
        ) {
          setSoftwareList(data.software);
        } else {
          throw new Error(
            "Data structure is not as expected (missing software object).",
          );
        }
      } catch (e) {
        console.error("Failed to load software:", e);
        const message =
          e instanceof Error ? e.message : String(e ?? "Unknown error");
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSoftware();
  }, []);

  /**
   * @var renderedSoftwareList
   * @description Memoized React element that renders the categorized software list.
   * Iterates through software categories and displays them using SoftwareCard components.
   */
  const renderedSoftwareList = useMemo(() => {
    if (!softwareList) return null;

    const entries = Object.entries(softwareList) as Array<[string, Software[]]>;
    return entries.map(([category, softwares], index) => {
      const list = Array.isArray(softwares) ? softwares : [];
      return (
        <motion.div
          key={category}
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.2 }}
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-ctp-subtext0 uppercase tracking-wider transform skew-x-12">
            {category}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {list.map((software, i) => (
              <motion.div
                key={`${category}-${software.title}-${i}`}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
              >
                <SoftwareCard {...software} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      );
    });
  }, [softwareList]);

  /**
   * @var accentColors
   * @description Memoized array of accent color names from the Catppuccin palette.
   * Used for dynamic color animations.
   */
  const accentColors = useMemo(() => {
    const currentFlavor = flavors[theme as keyof typeof flavors];
    if (!currentFlavor) return [];
    return Object.keys(currentFlavor.colors).filter(
      (color) => (currentFlavor.colors as any)[color]?.accent === true,
    );
  }, [theme]);

  /**
   * @var titleVariants
   * @description Memoized animation variants for the "Software" title.
   */
  const titleVariants = useMemo(() => {
    const currentFlavor = flavors[theme as keyof typeof flavors];
    if (!currentFlavor || accentColors.length === 0) return undefined;

    const colorValues = accentColors
      .map((color) => (currentFlavor.colors as any)[color]?.hex as string)
      .filter(Boolean);

    if (colorValues.length === 0) return undefined;

    return {
      animate: {
        color: colorValues,
        textShadow: colorValues.map((c) => `0 0 5px ${c}, 0 0 10px ${c}`),
        transition: {
          duration: colorValues.length * 2,
          repeat: Infinity,
          ease: "linear",
        },
      },
    } as const;
  }, [accentColors, theme]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-ctp-base to-ctp-mantle p-4 sm:p-6 md:p-8 md:ml-64 overflow-x-hidden relative">
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          className="text-4xl sm:text-5xl md:text-6xl font-black my-8 py-8 text-accent text-center uppercase tracking-widest transform -skew-x-12"
          animate={titleVariants ? "animate" : undefined}
          variants={titleVariants}
        >
          Software
        </motion.h2>

        {isLoading ? (
          <>
            <CategorySkeleton />
            <CategorySkeleton />
          </>
        ) : error ? (
          <div className="text-accent text-2xl font-bold">
            Error loading software: {error}
          </div>
        ) : (
          renderedSoftwareList
        )}
      </motion.div>
    </div>
  );
};

export default SoftwarePage;
