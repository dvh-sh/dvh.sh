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

import { motion } from "motion/react";
import dynamic from "next/dynamic";
import { useDeferredValue, useMemo, useState } from "react";

import type { Photo, TagDictionary } from "@/types/photography";

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
  tagDictionary: TagDictionary;
}

/**
 * @component PhotographyClient
 * @description Main gallery component that manages state and coordinates sub-components.
 * Uses deferred values for smooth filtering and memoization for performance.
 * @param {PhotographyClientProps} props - The component props.
 * @returns {JSX.Element} The rendered photography gallery.
 */
const PhotographyClient = ({
  photos,
  tagDictionary,
}: PhotographyClientProps) => {
  const [filter, setFilter] = useState<string>("all");

  // Defer filter for smooth interactions
  const deferredFilter = useDeferredValue(filter);

  const filteredPhotos = useMemo(() => {
    if (deferredFilter === "all") return photos;
    return photos.filter(
      (photo) => photo.tags?.length && photo.tags.includes(deferredFilter),
    );
  }, [photos, deferredFilter]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-ctp-base to-ctp-mantle px-4 sm:px-6 pt-16 md:pt-6 pb-4 sm:pb-6 md:pl-72 overflow-x-hidden">
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
          tagDictionary={tagDictionary}
          activeFilter={filter}
          onFilterChange={setFilter}
        />

        {/* Photo Grid — CSS columns masonry. No AnimatePresence/layout — they fight
            CSS columns reflow and cause adjacent items to flicker on hover. */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
          {filteredPhotos.map((photo, index) => (
            <PhotoGridItem
              key={photo.slug}
              photo={photo}
              index={index}
            />
          ))}
        </div>

        {/* Licensing CTA */}
        <LicensingCTA />
      </div>
    </div>
  );
};

export default PhotographyClient;
