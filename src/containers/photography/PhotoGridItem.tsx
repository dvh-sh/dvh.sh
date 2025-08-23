/**
 * @file src/containers/photography/PhotoGridItem.tsx
 * @author David @dvhsh (https://dvh.sh)
 *
 * @created Wed, Aug 20 2025
 * @updated Fri, Aug 23 2025
 *
 * @description
 * Individual photo grid item component for the photography gallery.
 * Handles image display, hover effects, animations, and photographer credits.
 */

"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { FaEye, FaMapMarkerAlt, FaUser } from "react-icons/fa";

import type { Photo } from "@/types/photography";

interface PhotoGridItemProps {
  photo: Photo & { views: number };
  index: number;
  onHover: (slug: string | null) => void;
  isHovered: boolean;
}

/**
 * @component PhotoGridItem
 * @description Renders a single photo in the masonry grid with hover effects.
 * Memoized for performance optimization.
 * @param {PhotoGridItemProps} props - The component props.
 * @returns {JSX.Element} The rendered photo grid item.
 */
const PhotoGridItem = memo(
  ({ photo, index, onHover, isHovered }: PhotoGridItemProps) => {
    const r2Url = process.env.NEXT_PUBLIC_R2_URL || "";
    const imageUrl = r2Url
      ? `${r2Url}/photos/${photo.sizes.medium}`
      : `/photos/${photo.sizes.medium}`;

    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ delay: Math.min(index * 0.05, 1), duration: 0.3 }}
        className="break-inside-avoid"
        style={{ willChange: "transform, opacity" }}
      >
        <Link href={`/photography/${photo.slug}`} prefetch={false}>
          <motion.div
            className="relative group cursor-pointer overflow-hidden bg-ctp-surface0 border-4 border-accent"
            onMouseEnter={() => onHover(photo.slug)}
            onMouseLeave={() => onHover(null)}
            whileHover={{ rotate: [-1, 1, -1], scale: 1.02 }}
          >
            <div
              className="relative"
              style={{ aspectRatio: photo.aspectRatio }}
            >
              <Image
                src={imageUrl}
                alt={photo.title || "Photo"}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                loading={index < 6 ? "eager" : "lazy"}
                quality={85}
              />
            </div>

            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-ctp-base via-transparent to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300 p-4 flex flex-col justify-end pointer-events-none"
              initial={false}
              animate={{ opacity: isHovered ? 1 : 0 }}
            >
              <h3 className="text-xl font-black text-accent uppercase mb-2 transform -skew-x-3">
                {photo.title}
              </h3>
              <div className="flex items-center gap-4 text-sm text-ctp-subtext0 font-mono">
                <span className="flex items-center gap-1">
                  <FaMapMarkerAlt size={12} />
                  {photo.sublocation || photo.location}
                </span>
                <span className="flex items-center gap-1">
                  <FaEye size={12} />
                  {photo.views || 0}
                </span>
                {photo.photographer &&
                  photo.photographer !== "David Heffler" && (
                    <span className="flex items-center gap-1">
                      <FaUser size={12} />
                      {photo.photographer}
                    </span>
                  )}
              </div>
            </motion.div>

            <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-accent border-l-[40px] border-l-transparent opacity-20" />
          </motion.div>
        </Link>
      </motion.div>
    );
  },
);

PhotoGridItem.displayName = "PhotoGridItem";

export default PhotoGridItem;
