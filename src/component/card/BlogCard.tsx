import React from "react";
import Link from "next/link";
import {
  FaCalendarAlt,
  FaArrowRight,
  FaEye,
  FaBook,
  FaGlobe,
  FaUtensils,
} from "react-icons/fa";

import { Post } from "@types";

const BlogCard: React.FC<Post> = ({
  slug,
  title,
  date,
  excerpt,
  views,
  readingTime,
  origin,
  type,
  cookingTime,
}) => {
  const isCooking = origin && type;

  return (
    <div className="bg-surface0 p-6 shadow-lg flex flex-col h-full relative overflow-hidden border-l-4 border-accent transition-all duration-300 hover:scale-[1.03] hover:-rotate-1">
      <div className="flex flex-col mb-4">
        <h3 className="text-2xl font-bold text-accent mb-2 uppercase tracking-wide">
          {title}
        </h3>
        <div className="flex items-center text-subtext0 space-x-4 text-sm flex-wrap">
          <div className="flex items-center">
            <FaCalendarAlt size={12} className="mr-1" />
            <span>{new Date(date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center">
            <FaBook size={12} className="mr-1" />
            <span>~{readingTime} min</span>
          </div>

          <div className="flex items-center">
            <FaEye size={12} className="mr-1" />
            <span>{views} views</span>
          </div>
          {origin && (
            <div className="flex items-center">
              <FaGlobe size={12} className="mr-1" />
              <span>{origin}</span>
            </div>
          )}
          {type && (
            <div className="flex items-center">
              <FaUtensils size={12} className="mr-1" />
              <span>{type}</span>
            </div>
          )}
        </div>
      </div>
      <p className="text-text mb-4 flex-grow font-mono text-sm">{excerpt}</p>
      <Link
        href={isCooking ? `/cooking/${slug}` : `/blog/${slug}`}
        className="text-blue hover:text-accent transition-colors duration-200 flex items-center group self-start"
      >
        <span className="mr-2 uppercase tracking-wide font-bold">
          Read more
        </span>
        <FaArrowRight
          size={16}
          className="transition-transform duration-300 group-hover:translate-x-2"
        />
      </Link>
      <div className="absolute top-0 right-0 w-16 h-16 bg-accent opacity-10 rounded-full -mr-8 -mt-8"></div>
    </div>
  );
};

export const BlogCardSkeleton: React.FC = () => {
  return (
    <div className="bg-surface0 p-6 shadow-lg flex flex-col h-full relative overflow-hidden border-l-4 border-accent transition-all duration-300 animate-pulse">
      <div className="flex flex-col mb-4">
        <div className="h-6 bg-accent mb-2 w-3/4"></div>
        <div className="flex items-center text-subtext0 space-x-4 text-sm flex-wrap">
          <div className="flex items-center">
            <div className="h-4 bg-subtext0 w-16 mr-1"></div>
          </div>
          <div className="flex items-center">
            <div className="h-4 bg-subtext0 w-12 mr-1"></div>
          </div>
          <div className="flex items-center">
            <div className="h-4 bg-subtext0 w-16 mr-1"></div>
          </div>
          <div className="flex items-center">
            <div className="h-4 bg-subtext0 w-16 mr-1"></div>
          </div>
          <div className="flex items-center">
            <div className="h-4 bg-subtext0 w-16 mr-1"></div>
          </div>
        </div>
      </div>
      <div className="text-text mb-4 flex-grow font-mono text-sm">
        <div className="h-4 bg-text w-full mb-2"></div>
        <div className="h-4 bg-text w-5/6 mb-2"></div>
        <div className="h-4 bg-text w-4/6"></div>
      </div>
      <div className="text-blue hover:text-accent transition-colors duration-200 flex items-center group self-start">
        <div className="h-4 bg-blue w-24"></div>
      </div>
      <div className="absolute top-0 right-0 w-16 h-16 bg-accent opacity-10 rounded-full -mr-8 -mt-8"></div>
    </div>
  );
};

export default BlogCard;

// path: src/component/card/BlogCard.tsx
