/**
 * @file src/containers/photography/PhotoClient.tsx
 * @author David @dvhsh (https://dvh.sh)
 *
 * @created Wed, Aug 20 2025
 * @updated Wed, Aug 20 2025
 *
 * @description
 * The main client component for displaying a single photo and its details.
 */

"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  FaArrowLeft,
  FaCamera,
  FaCalendar,
  FaDollarSign,
  FaEye,
  FaExpand,
  FaInfoCircle,
  FaMapMarkerAlt,
  FaTimes,
} from "react-icons/fa";

import type { Photo } from "@/types/photography";

interface PhotoClientProps {
  photo: Photo;
  views: number;
}

/**
 * @component FullscreenModal
 * @description Renders the photo in a fullscreen modal view.
 */
const FullscreenModal = ({
  photo,
  onClose,
}: {
  photo: Photo;
  onClose: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 bg-ctp-base/95 flex items-center justify-center p-4"
    onClick={onClose}
  >
    <button
      className="absolute top-4 right-4 p-3 bg-ctp-surface0 text-accent hover:bg-accent hover:text-ctp-base transition-all duration-200"
      onClick={onClose}
    >
      <FaTimes size={24} />
    </button>
    <Image
      src={`${process.env.NEXT_PUBLIC_R2_URL}/photos/${photo.sizes.full}`}
      alt={photo.title}
      width={photo.width}
      height={photo.height}
      className="max-w-full max-h-full object-contain"
    />
  </motion.div>
);

/**
 * @component PhotoDisplay
 * @description Displays the main photo image and size selection controls.
 */
const PhotoDisplay = ({
  photo,
  onFullscreen,
}: {
  photo: Photo;
  onFullscreen: () => void;
}) => {
  const [selectedSize, setSelectedSize] = useState<"large" | "full">("large");
  return (
    <div className="lg:col-span-2">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-ctp-surface0 border-4 border-accent shadow-brutal overflow-hidden group"
      >
        <div style={{ aspectRatio: photo.aspectRatio }}>
          <Image
            src={`${process.env.NEXT_PUBLIC_R2_URL}/photos/${photo.sizes[selectedSize]}`}
            alt={photo.title}
            fill
            className="object-contain"
            priority
            sizes="(max-width: 768px) 100vw, 66vw"
          />
        </div>
        <button
          onClick={onFullscreen}
          className="absolute top-4 right-4 p-3 bg-ctp-base/90 text-accent hover:bg-accent hover:text-ctp-base transition-all duration-200 opacity-0 group-hover:opacity-100"
        >
          <FaExpand size={20} />
        </button>
      </motion.div>
      <div className="mt-4 flex gap-2 justify-center">
        <button
          onClick={() => setSelectedSize("large")}
          className={`px-4 py-2 font-mono uppercase tracking-tight border-2 ${
            selectedSize === "large"
              ? "bg-accent text-ctp-base border-accent"
              : "bg-ctp-surface0 text-ctp-text border-accent hover:bg-accent hover:text-ctp-base"
          } transition-all duration-200`}
        >
          HD (1920px)
        </button>
        <button
          onClick={() => setSelectedSize("full")}
          className={`px-4 py-2 font-mono uppercase tracking-tight border-2 ${
            selectedSize === "full"
              ? "bg-accent text-ctp-base border-accent"
              : "bg-ctp-surface0 text-ctp-text border-accent hover:bg-accent hover:text-ctp-base"
          } transition-all duration-200`}
        >
          Full (4032px)
        </button>
      </div>
    </div>
  );
};

/**
 * @component PhotoDetails
 * @description Displays the detailed information about the photo.
 */
const PhotoDetails = ({ photo, views }: PhotoClientProps) => (
  <div className="space-y-6">
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-ctp-surface0 p-6 border-4 border-accent shadow-brutal transform -rotate-1"
    >
      <h1 className="text-3xl font-black text-accent uppercase mb-4 transform skew-x-3">
        {photo.title}
      </h1>
      {photo.description && (
        <p className="text-ctp-text font-mono text-sm mb-4">
          {photo.description}
        </p>
      )}
      <div className="space-y-2 text-ctp-subtext0 font-mono text-sm">
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt size={14} />
          <span>{photo.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaCalendar size={14} />
          <span>{new Date(photo.date).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaEye size={14} />
          <span>{views} views</span>
        </div>
      </div>
    </motion.div>
    {photo.camera && (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-ctp-surface0 p-6 border-4 border-accent shadow-brutal transform rotate-1"
      >
        <h3 className="text-xl font-bold text-accent uppercase mb-3 flex items-center gap-2">
          <FaCamera size={16} />
          Camera Info
        </h3>
        <div className="space-y-1 text-ctp-text font-mono text-sm">
          <div>{photo.camera}</div>
        </div>
      </motion.div>
    )}
    {photo.price && (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-accent text-ctp-base p-6 border-4 border-ctp-base shadow-brutal transform -rotate-1"
      >
        <h3 className="text-xl font-black uppercase mb-4 flex items-center gap-2">
          <FaDollarSign size={16} />
          Licensing
        </h3>
        <a
          href={`mailto:david@dvh.sh?subject=Licensing: ${photo.title}`}
          className="mt-4 block w-full text-center py-2 bg-ctp-base text-accent font-black uppercase tracking-wider hover:bg-ctp-surface0 transition-colors duration-200"
        >
          Get License
        </a>
      </motion.div>
    )}
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="flex flex-wrap gap-2"
    >
      {photo.tags.map((tag: any) => (
        <Link
          key={tag}
          href={`/photography?tag=${tag}`}
          className="px-3 py-1 bg-ctp-surface0 text-ctp-text border-2 border-accent font-mono text-xs uppercase hover:bg-accent hover:text-ctp-base transition-all duration-200 transform hover:-rotate-2"
        >
          #{tag}
        </Link>
      ))}
    </motion.div>
  </div>
);

/**
 * @component PhotoClient
 * @description The main client component that orchestrates the display of a single photo page.
 */
const PhotoClient = ({ photo, views }: PhotoClientProps) => {
  const [showFullscreen, setShowFullscreen] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-ctp-base to-ctp-mantle p-4 sm:p-6 md:pl-72">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/photography"
            className="inline-flex items-center text-ctp-blue hover:text-accent transition-colors duration-200 mb-6 font-mono uppercase tracking-wide"
          >
            <FaArrowLeft className="mr-2" />
            Back to Gallery
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <PhotoDisplay
              photo={photo}
              onFullscreen={() => setShowFullscreen(true)}
            />
            <PhotoDetails photo={photo} views={views} />
          </div>
          <div className="mt-12 p-4 bg-ctp-surface0 border-t-4 border-accent">
            <p className="text-sm text-ctp-subtext0 font-mono flex items-center gap-2">
              <FaInfoCircle />© 2017 - {new Date().getFullYear()} David
              Heffler. All rights reserved. No unauthorized use.
            </p>
          </div>
        </div>
      </div>
      {showFullscreen && (
        <FullscreenModal
          photo={photo}
          onClose={() => setShowFullscreen(false)}
        />
      )}
    </>
  );
};

export default PhotoClient;
