/**
 * @file src/components/chip/TechChip.tsx
 * @author David @dvhsh (https://dvh.sh)
 *
 * @created Wed, Aug 20 2025
 * @updated Mon, May 04 2026
 *
 * @description
 * A component for displaying a technology chip with an icon and name.
 * Rotation/skew is derived deterministically from the slug so SSR + client
 * agree (no hydration mismatch) and the value is stable across re-renders.
 */

"use client";

import { motion } from "motion/react";
import React, { useMemo } from "react";

import { getIcon, getTechBySlug } from "@/utils/tech.utils";

/**
 * @interface TechChipProps
 * @description Props for the TechChip component.
 * @property {string} slug - The slug of the technology to display.
 * @property {string} [className] - Optional additional class names.
 */
interface TechChipProps {
  slug: string;
  className?: string;
}

/**
 * @function hashSlug
 * @description Stable, SSR-safe djb2-style hash so chips get the same wobble
 * on server and client.
 */
const hashSlug = (s: string): number => {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
};

/**
 * @component TechChip
 * @description Renders a stylized chip for a technology, including its icon and name.
 * @param {TechChipProps} { slug, className } - The props for the component.
 * @returns {JSX.Element | null} The rendered tech chip, or null if the tech is not found.
 */
const TechChip: React.FC<TechChipProps> = ({ slug, className = "" }) => {
  const tech = useMemo(() => getTechBySlug(slug), [slug]);
  const Icon = useMemo(
    () => (tech ? getIcon(tech.icon) : null),
    [tech],
  );
  const seed = useMemo(() => hashSlug(slug), [slug]);

  if (!tech || !Icon) return null;

  const randomRotation = (seed % 100) / 100 - 0.5;
  const randomSkew = ((seed >> 2) % 100) / 100 - 0.5;

  return (
    <motion.span
      className={`
        inline-flex items-center ${tech.color} bg-ctp-surface1
        px-3 py-1 text-sm font-bold uppercase tracking-wider
        border-2 border-accent shadow-brutal cursor-default select-none
        ${className}
      `}
      style={{
        transform: `rotate(${randomRotation}deg) skew(${randomSkew}deg)`,
      }}
      whileHover={{
        scale: 1.1,
        rotate: 0,
        transition: { duration: 0.3 },
      }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.span
        className="mr-2"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
      >
        {/* eslint-disable-next-line react-hooks/static-components -- stable lookup from a static icon map in tech.utils */}
        <Icon size={18} />
      </motion.span>
      <span>{tech.title}</span>
    </motion.span>
  );
};

export default TechChip;
