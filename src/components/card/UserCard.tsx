/**
 * @file src/components/card/UserCard.tsx
 * @author David @dvhsh (https://dvh.sh)
 *
 * @created Wed, Aug 20 2025
 * @updated Mon, May 04 2026
 *
 * @description
 * User card component with avatar, name, and title. Renders inside the
 * sidebar on every public route, so the name uses a non-heading element
 * to keep the per-page <h1> exclusive to actual page content.
 */

"use client";

import Image from "next/image";
import React from "react";
import { motion } from "motion/react";

/**
 * @component UserCard
 * @description Renders a card with avatar, name, and title.
 */
export const UserCard = () => {
  return (
    <div className="text-center mb-4 md:mb-8">
      <motion.div
        className="relative mx-auto mb-4 w-32 h-32"
        whileHover={{ rotate: [0, -5, 5, -5, 5, 0], scale: 1.05 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 bg-accent opacity-30 rounded-full animate-pulse" />
        <Image
          src="https://avatars1.githubusercontent.com/u/175678329?v=4"
          alt="David"
          width={128}
          height={128}
          priority
          className="relative rounded-full border-4 border-accent shadow-brutal"
        />
      </motion.div>

      <motion.p
        className="text-xl font-black mb-2 text-ctp-text uppercase tracking-widest"
        whileHover={{ skewX: -6 }}
      >
        David Heffler
      </motion.p>

      <motion.p
        className="text-sm text-ctp-subtext0 font-mono"
        initial={{ y: 20, opacity: 0, rotateX: -90 }}
        animate={{ y: 0, opacity: 1, rotateX: 0 }}
        transition={{ duration: 0.3 }}
      >
        Software Engineer
      </motion.p>
    </div>
  );
};
