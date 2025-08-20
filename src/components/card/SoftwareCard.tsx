/**
 * @file src/components/card/SoftwareCard.tsx
 * @author David @dvhsh (https://dvh.sh)
 *
 * @created Wed, Aug 20 2025
 * @updated Wed, Aug 20 2025
 *
 * @description
 * A card component for displaying a piece of software.
 */

import { AnimatePresence, motion } from "motion/react";
import { FaCopy, FaExternalLinkAlt } from "react-icons/fa";
import React, { useState, useCallback, useMemo } from "react";

import type { Software } from "@/types/software";

/**
 * @component SoftwareCard
 * @description Renders a card for a single piece of software, including price, OS, and install commands.
 * @param {Software} props - The software data to display.
 * @returns {JSX.Element} The rendered software card.
 */
const SoftwareCard: React.FC<Software> = React.memo(
  ({ title, description, link, price, brewInstall, operatingSystem }) => {
    const [showToast, setShowToast] = useState(false);

    const copyToClipboard = useCallback((text: string) => {
      navigator.clipboard.writeText(text);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }, []);

    const cardVariants = useMemo(
      () => ({
        hover: {
          rotate: [-1, 1, -1],
          scale: 1.02,
          transition: {
            rotate: { repeat: Infinity, duration: 1 },
            scale: { duration: 0.3 },
          },
        },
      }),
      [],
    );

    return (
      <motion.div
        className="bg-ctp-surface0 p-6 shadow-lg flex flex-col h-full relative overflow-hidden"
        whileHover="hover"
        variants={cardVariants}
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-ctp-pink via-ctp-mauve to-ctp-sapphire" />
        <div className="flex items-center space-x-3 mb-4">
          <h3 className="text-xl font-black text-accent uppercase tracking-wider">
            {title}
          </h3>
          <span className="inline-block bg-ctp-surface1 text-ctp-subtext0 px-3 py-1 text-sm font-bold transform -skew-x-12">
            {price}
          </span>
        </div>
        <p className="text-ctp-text mb-4 flex-grow font-mono text-sm">
          {description}
        </p>
        <div className="flex justify-between items-center mt-auto">
          <div className="text-ctp-subtext0 font-bold uppercase">
            {operatingSystem}
          </div>
          <div className="flex space-x-3 relative">
            {brewInstall && (
              <motion.div
                className="group relative"
                whileHover={{ scale: 1.2 }}
              >
                <button
                  onClick={() => copyToClipboard(brewInstall)}
                  className="text-ctp-subtext0 hover:text-accent transition-colors duration-200"
                  aria-label="Copy Brew Install Command"
                >
                  <FaCopy size={20} />
                </button>
                <div className="absolute bottom-full mb-2 right-0 bg-ctp-surface0 text-ctp-text p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs whitespace-nowrap">
                  Copy command
                </div>
              </motion.div>
            )}
            <motion.a
              href={link}
              className="text-ctp-subtext0 hover:text-accent transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View software"
              whileHover={{ scale: 1.2, rotate: 180 }}
            >
              <FaExternalLinkAlt size={20} />
            </motion.a>
          </div>
        </div>
        <AnimatePresence>
          {showToast && (
            <motion.div
              className="fixed top-4 right-4 bg-ctp-surface0 text-ctp-text p-3 rounded shadow-lg"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
            >
              Copied to clipboard!
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  },
);

/**
 * @component SoftwareCardSkeleton
 * @description Renders a skeleton loader for the SoftwareCard component.
 */
export const SoftwareCardSkeleton = () => (
  <div className="bg-ctp-surface0 p-6 rounded-lg shadow-lg animate-pulse h-[200px] flex flex-col">
    <div className="h-6 bg-ctp-overlay0 rounded w-3/4 mb-4"></div>
    <div className="h-4 bg-ctp-overlay0 rounded w-full mb-2"></div>
    <div className="h-4 bg-ctp-overlay0 rounded w-5/6 mb-4"></div>
    <div className="mt-auto flex space-x-2">
      <div className="h-8 w-8 bg-ctp-overlay0 rounded"></div>
      <div className="h-8 w-8 bg-ctp-overlay0 rounded"></div>
    </div>
  </div>
);

export default SoftwareCard;
