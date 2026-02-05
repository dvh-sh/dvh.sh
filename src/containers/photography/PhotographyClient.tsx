/**
 * @file src/containers/photography/PhotographyClient.tsx
 * @author David @dvhsh (https://dvh.sh)
 *
 * @created Wed, Aug 20 2025
 * @updated Fri, Aug 23 2025
 *
 * @description
 * Main photography gallery client component.
 * Coordinates filtering, display, and interactions between sub-components.
 * Fixed AnimatePresence mode to prevent disappearing entries.
 */

"use client";

import { AnimatePresence, motion } from "motion/react";
import dynamic from "next/dynamic";
import { useDeferredValue, useMemo, useState } from "react";

import type { Photo } from "@/types/photography";

// Import static components
import TagFilter from "./TagFilter";
import PhotoGridItem from "@/containers/photography/PhotoGridItem";

// Lazy load the CTA section since it's below the fold
const LicensingCTA = dynamic(
  () => import("@/components/photography/LicensingCTA"),
  {
    ssr: false,
    loading: () => <div className="mt-16 h-32 bg-ctp-surface0 animate-pulse" />,
  },
);

interface PhotographyClientProps {
  photos: (Photo & { views: number })[];
}

/**
 * @component PhotographyClient
 * @description Main gallery component that manages state and coordinates sub-components.
 * Uses deferred values for smooth filtering and memoization for performance.
 * @param {PhotographyClientProps} props - The component props.
 * @returns {JSX.Element} The rendered photography gallery.
 */
const PhotographyClient = ({ photos }: PhotographyClientProps) => {
  const [filter, setFilter] = useState<string>("all");
  const [hoveredPhoto, setHoveredPhoto] = useState<string | null>(null);

  // Defer filter for smooth interactions
  const deferredFilter = useDeferredValue(filter);

  const tags = useMemo(() => {
    const tagSet = new Set<string>();
    photos.forEach((photo) => {
      if (photo.tags?.length) {
        photo.tags.forEach((tag) => {
          if (tag?.trim()) {
            tagSet.add(tag);
          }
        });
      }
    });
    return ["all", ...Array.from(tagSet)];
  }, [photos]);

  const filteredPhotos = useMemo(() => {
    if (deferredFilter === "all") return photos;
    return photos.filter(
      (photo) => photo.tags?.length && photo.tags.includes(deferredFilter),
    );
  }, [photos, deferredFilter]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-ctp-base to-ctp-mantle p-4 sm:p-6 md:pl-72">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-8xl font-black text-accent uppercase tracking-tighter transform md:-skew-x-6 mb-4">
            Photography
          </h1>
          <p className="text-ctp-subtext0 font-mono uppercase tracking-wide">
            Wildlife • Landscapes • Street
          </p>
        </motion.div>

        {/* Tag Filter */}
        <TagFilter
          tags={tags}
          activeFilter={filter}
          onFilterChange={setFilter}
        />

        {/* Photo Grid - Fixed AnimatePresence mode */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          <AnimatePresence mode="wait" initial={false}>
            {filteredPhotos.map((photo, index) => (
              <PhotoGridItem
                key={photo.slug}
                photo={photo}
                index={index}
                onHover={setHoveredPhoto}
                isHovered={hoveredPhoto === photo.slug}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Licensing CTA */}
        <LicensingCTA />
      </div>
    </div>
  );
};

export default PhotographyClient;
