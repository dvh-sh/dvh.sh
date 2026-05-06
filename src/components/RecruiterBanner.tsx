/**
 * @file src/components/RecruiterBanner.tsx
 * @author David @dvhsh (https://dvh.sh)
 *
 * @created Mon, Aug 26 2025
 * @updated Mon, May 04 2026
 *
 * @description
 * Subtle banner to direct recruiters to resume page, dismissible.
 */

"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FaFileAlt, FaTimes } from "react-icons/fa";
import Link from "next/link";

/**
 * @component RecruiterBanner
 * @description Shows a dismissible banner for recruiters on first visit.
 */
export const RecruiterBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("recruiterBannerDismissed");
    const lastDismiss = localStorage.getItem("recruiterBannerDismissTime");

    // Show again after 7 days
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

    if (!dismissed || (lastDismiss && parseInt(lastDismiss) < weekAgo)) {
      setTimeout(() => setIsVisible(true), 2000); // Show after 2s
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("recruiterBannerDismissed", "true");
    localStorage.setItem("recruiterBannerDismissTime", Date.now().toString());
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="print-hidden fixed bottom-4 right-4 z-50 max-w-sm"
          initial={{ x: 400, rotate: 5 }}
          animate={{ x: 0, rotate: 0 }}
          exit={{ x: 400, rotate: -5 }}
          transition={{ type: "spring", damping: 20 }}
        >
          <motion.div
            className="bg-ctp-surface0 border-4 border-accent p-4 shadow-brutal relative"
            whileHover={{ rotate: -1, scale: 1.02 }}
          >
            {/* Close button */}
            <button
              onClick={handleDismiss}
              className="absolute -top-2 -right-2 bg-accent text-ctp-base p-2 shadow-brutal hover:scale-110 transition-transform"
              aria-label="Dismiss"
            >
              <FaTimes size={14} />
            </button>

            <div className="flex items-start gap-3">
              <FaFileAlt className="text-accent text-2xl flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-black text-accent uppercase tracking-wider text-sm mb-1">
                  Looking for a developer?
                </h3>
                <p className="text-xs text-ctp-text mb-3 font-mono">
                  See my experience, skills, and contact info.
                </p>
                <Link
                  href="/resume"
                  className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider
                           bg-accent text-ctp-base px-3 py-2 hover:opacity-90 transition-opacity
                           shadow-brutal border-2 border-ctp-base"
                  onClick={handleDismiss}
                >
                  <FaFileAlt size={12} />
                  View Resume
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
