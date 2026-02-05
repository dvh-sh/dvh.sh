/**
 * @file src/components/card/UserCard.tsx
 * @author David @dvhsh (https://dvh.sh)
 *
 * @created Wed, Aug 20 2025
 * @updated Mon, Aug 26 2025
 *
 * @description
 * User card component with rotating titles and brutal aesthetics.
 */

"use client";

import Image from "next/image";
import React from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * @component UserCard
 * @description Renders a card with avatar, name, and rotating titles.
 */
export const UserCard = () => {

  return (
    <div className="text-center mb-8">
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

      <motion.h1
        className="text-xl font-black mb-2 text-ctp-text uppercase tracking-widest"
        whileHover={{ skewX: -6 }}
      >
        David Heffler
      </motion.h1>

      <div className="h-6 relative">
        <AnimatePresence mode="wait">
          <motion.p
            key={"title-0"}
            className="text-sm text-ctp-subtext0 font-mono absolute inset-x-0"
            initial={{ y: 20, opacity: 0, rotateX: -90 }}
            animate={{ y: 0, opacity: 1, rotateX: 0 }}
            exit={{ y: -20, opacity: 0, rotateX: 90 }}
            transition={{ duration: 0.3 }}
          >
            Software Engineer
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
};
