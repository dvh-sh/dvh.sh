/**
 * @file src/containers/photography/TagFilter.tsx
 * @author David @dvhsh (https://dvh.sh)
 *
 * @created Wed, Aug 20 2025
 * @updated Sat, May 10 2026
 *
 * @description
 * Tag filter for the photography gallery. Renders a master "All" chip
 * above two labeled groups — Places and Type — sourced from the
 * tagDictionary in photos.json. Mobile-locked: chips wrap, touch targets
 * clear 44×44, alignment recenters on narrow screens.
 */

"use client";

import { motion } from "motion/react";
import { memo } from "react";
import { FaTag } from "react-icons/fa";

import type { TagDictionary } from "@/types/photography";

interface TagFilterProps {
  tagDictionary: TagDictionary;
  activeFilter: string;
  onFilterChange: (tag: string) => void;
}

interface TagChipProps {
  tag: string;
  label: string;
  active: boolean;
  onClick: (tag: string) => void;
}

const TagChip = ({ tag, label, active, onClick }: TagChipProps) => (
  <motion.button
    onClick={() => onClick(tag)}
    className={`
      px-4 py-2.5 sm:py-2 font-mono uppercase tracking-tight border-2
      transition-all duration-200 min-h-[44px]
      ${
        active
          ? "bg-accent text-ctp-base border-accent transform -rotate-2"
          : "bg-ctp-surface0 text-ctp-text border-accent hover:bg-accent hover:text-ctp-base hover:transform hover:-rotate-1"
      }
      shadow-brutal
      hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)]
    `}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    aria-label={`Filter by ${label}`}
    aria-pressed={active}
  >
    <FaTag className="inline mr-2" size={12} />
    {label}
  </motion.button>
);

const TagFilter = memo(
  ({ tagDictionary, activeFilter, onFilterChange }: TagFilterProps) => (
    <div className="mb-10 max-w-5xl mx-auto">
      <div className="flex justify-center mb-6">
        <TagChip
          tag="all"
          label="All"
          active={activeFilter === "all"}
          onClick={onFilterChange}
        />
      </div>

      {tagDictionary.places.length > 0 && (
        <div className="mb-6">
          <h2 className="text-ctp-subtext0 font-mono uppercase tracking-wider text-xs mb-3 text-center sm:text-left">
            Places
          </h2>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {tagDictionary.places.map((tag) => (
              <TagChip
                key={tag}
                tag={tag}
                label={tag}
                active={activeFilter === tag}
                onClick={onFilterChange}
              />
            ))}
          </div>
        </div>
      )}

      {tagDictionary.subjects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-ctp-subtext0 font-mono uppercase tracking-wider text-xs mb-3 text-center sm:text-left">
            Type
          </h2>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {tagDictionary.subjects.map((tag) => (
              <TagChip
                key={tag}
                tag={tag}
                label={tag}
                active={activeFilter === tag}
                onClick={onFilterChange}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  ),
);

TagFilter.displayName = "TagFilter";

export default TagFilter;
