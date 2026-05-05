/**
 * @file src/containers/photography/PhotoGridItem.tsx
 * @author David @dvhsh (https://dvh.sh)
 *
 * @created Wed, Aug 20 2025
 * @updated Tue, May 05 2026
 *
 * @description
 * Photo grid item — minimal stable baseline (no JS animation, no hover transform).
 * Hover overlay uses CSS group-hover only. Personality (rotate/scale/etc) can be
 * re-layered on top of this if desired, but the foundation is now flicker-free.
 */

"use client";

import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { FaEye, FaMapMarkerAlt, FaUser } from "react-icons/fa";

import type { Photo } from "@/types/photography";

interface PhotoGridItemProps {
  photo: Photo & { views: number };
  index: number;
}

const PhotoGridItem = memo(({ photo, index }: PhotoGridItemProps) => {
  const r2Url = process.env.NEXT_PUBLIC_R2_URL || "";
  const imageUrl = r2Url
    ? `${r2Url}/photos/${photo.sizes.medium}`
    : `/photos/${photo.sizes.medium}`;

  return (
    <div className="break-inside-avoid mb-4 inline-block w-full align-top">
      <Link href={`/photography/${photo.slug}`} prefetch={false}>
        <div className="relative group cursor-pointer overflow-hidden bg-ctp-surface0 border-4 border-accent">
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

          <div className="absolute inset-0 bg-gradient-to-t from-ctp-base via-transparent to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300 p-4 flex flex-col justify-end pointer-events-none">
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
          </div>

          <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-accent border-l-[40px] border-l-transparent opacity-20" />
        </div>
      </Link>
    </div>
  );
});

PhotoGridItem.displayName = "PhotoGridItem";

export default PhotoGridItem;
