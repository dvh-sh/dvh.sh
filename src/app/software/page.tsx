"use client";

import React, { useEffect, useState, useMemo } from "react";
import { flavors } from "@catppuccin/palette";
import { motion } from "framer-motion";

import SoftwareCard, {
  SoftwareCardSkeleton,
} from "@component/card/SoftwareCard";
import { Software } from "@types";

const CategorySkeleton = () => (
  <motion.div
    className="mb-12 md:mb-16"
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
  >
    <div className="h-8 bg-overlay0 w-48 mb-6 md:mb-8 rounded"></div>
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

export default function SoftwarePage() {
  const [softwareList, setSoftwareList] = useState<{
    [key: string]: Software[];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSoftware = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/dvh-sh/.github/main/assets/software.json",
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data && data.software) {
          setSoftwareList(data.software);
        } else {
          throw new Error("Data structure is not as expected");
        }
      } catch (error) {
        setError(error as string);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSoftware();
  }, []);

  const renderedSoftwareList = useMemo(() => {
    if (!softwareList) return null;

    return Object.entries(softwareList).map(([category, softwares], index) => (
      <motion.div
        key={category}
        className="mb-12 md:mb-16"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.2 }}
      >
        <h3 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-subtext0 uppercase tracking-wider transform skew-x-12">
          {category}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {softwares.map((software, index) => (
            <motion.div
              key={software.title}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <SoftwareCard {...software} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    ));
  }, [softwareList]);

  const accentColors = useMemo(() => {
    return Object.keys(flavors.mocha.colors).filter(
      (color) =>
        flavors.mocha.colors[color as keyof typeof flavors.mocha.colors].accent,
    );
  }, []);

  const titleVariants = useMemo(() => {
    const colorValues = accentColors.map(
      (color) =>
        flavors.mocha.colors[color as keyof typeof flavors.mocha.colors].hex,
    );
    return {
      animate: {
        color: colorValues,
        textShadow: colorValues.map(
          (color) => `0 0 5px ${color}, 0 0 10px ${color}`,
        ),
        transition: {
          duration: accentColors.length * 2,
          repeat: Infinity,
          ease: "linear",
        },
      },
    };
  }, [accentColors]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-base to-mantle p-4 sm:p-6 md:p-8 md:ml-64 overflow-x-hidden relative">
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          className="text-4xl sm:text-5xl md:text-6xl font-black my-8 py-8 text-accent text-center uppercase tracking-widest transform -skew-x-12"
          animate="animate"
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
}
