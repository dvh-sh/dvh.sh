/**
 * @file src/containers/photography/TagFilter.tsx
 * @author David @dvhsh (https://dvh.sh)
 *
 * @created Wed, Aug 20 2025
 * @updated Wed, Aug 20 2025
 *
 * @description
 * Tag filter component for the photography gallery.
 * Displays clickable tag buttons for filtering photos.
 */

"use client";

import { motion } from "motion/react";
import { memo } from "react";
import { FaTag } from "react-icons/fa";

interface TagFilterProps {
  tags: string[];
  activeFilter: string;
  onFilterChange: (tag: string) => void;
}

/**
 * @component TagFilter
 * @description Renders filter buttons for photo tags with animations.
 * Memoized to prevent unnecessary re-renders.
 * @param {TagFilterProps} props - The component props.
 * @returns {JSX.Element} The rendered tag filter.
 */
const TagFilter = memo(
  ({ tags, activeFilter, onFilterChange }: TagFilterProps) => (
    <div className="mb-8 flex flex-wrap gap-2 justify-center">
      {tags.map((tag) => (
        <motion.button
          key={tag}
          onClick={() => onFilterChange(tag)}
          className={`
          px-4 py-2 font-mono uppercase tracking-tight border-2 
          transition-all duration-200
          ${
            activeFilter === tag
              ? "bg-accent text-ctp-base border-accent transform -rotate-2"
              : "bg-ctp-surface0 text-ctp-text border-accent hover:bg-accent hover:text-ctp-base hover:transform hover:-rotate-1"
          }
          shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] 
          hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)]
        `}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={`Filter by ${tag}`}
        >
          <FaTag className="inline mr-2" size={12} />
          {tag}
        </motion.button>
      ))}
    </div>
  ),
);

TagFilter.displayName = "TagFilter";

export default TagFilter;
