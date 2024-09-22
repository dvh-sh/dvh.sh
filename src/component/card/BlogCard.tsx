"use client";

import { FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import React, { useState } from "react";
import Link from "next/link";
import { Post } from "@types";

const BlogCard: React.FC<Post> = ({ id, title, date, excerpt }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-surface0 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-pink">{title}</h3>
        <div className="flex items-center text-subtext0">
          <FaCalendarAlt size={16} className="mr-2" />
          <span className="text-sm">{new Date(date).toLocaleDateString()}</span>
        </div>
      </div>
      <p className="text-text mb-4 flex-grow">{excerpt}</p>
      <Link
        href={`/blog/${id}`}
        className="text-blue hover:text-pink transition-colors duration-200 flex items-center mt-auto group"
      >
        Read more
        <FaArrowRight
          size={16}
          className="ml-2 transition-transform duration-300 group-hover:translate-x-2"
        />
      </Link>
      <div
        className="absolute inset-0 bg-gradient-to-r from-pink to-blue opacity-0 transition-opacity duration-300 pointer-events-none"
        style={{ opacity: isHovered ? 0.1 : 0 }}
      ></div>
    </div>
  );
};

export default BlogCard;

// path: src/component/card/BlogCard.tsx
