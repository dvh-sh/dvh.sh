import React, { useState, useCallback, useMemo } from "react";
import { FaExternalLinkAlt, FaCopy } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

import { Software } from "@types";

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
        className="bg-surface0 p-6 shadow-lg flex flex-col h-full relative overflow-hidden"
        whileHover="hover"
        variants={cardVariants}
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink via-mauve to-sapphire" />
        <div className="flex items-center space-x-3 mb-4">
          <h3 className="text-xl font-black text-accent uppercase tracking-wider">
            {title}
          </h3>
          <span className="inline-block bg-surface1 text-subtext0 px-3 py-1 text-sm font-bold transform -skew-x-12">
            {price}
          </span>
        </div>
        <p className="text-text mb-4 flex-grow font-mono text-sm">
          {description}
        </p>
        <div className="flex justify-between items-center mt-auto">
          <div className="text-subtext0 font-bold uppercase">
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
                  className="text-subtext0 hover:text-accent transition-colors duration-200"
                  aria-label="Copy Brew Install Command"
                >
                  <FaCopy size={20} />
                </button>
                <div className="absolute bottom-full mb-2 right-0 bg-surface0 text-text p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs whitespace-nowrap">
                  Copy command
                </div>
              </motion.div>
            )}
            <motion.a
              href={link}
              className="text-subtext0 hover:text-accent transition-colors duration-200"
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
              className="fixed top-4 right-4 bg-surface0 text-text p-3 rounded shadow-lg"
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

export default SoftwareCard;

// path: src/component/SoftwareCard.tsx
