"use client";

import { useState, useMemo } from "react";
import { FaSearch, FaSort, FaGlobe, FaUtensils } from "react-icons/fa";
import { Post } from "@types";
import BlogCard from "@component/card/BlogCard";

type SortOption = "newest" | "oldest" | "most-views";

interface FilterControls {
  search: string;
  sortBy: SortOption;
  origin: string;
  type: string;
}

interface BlogFiltersProps {
  posts: Post[];
  isCooking: boolean;
}

export default function BlogFilters({ posts, isCooking }: BlogFiltersProps) {
  const SelectButton = ({
    label,
    value,
    options,
    onChange,
    icon: Icon,
  }: {
    label: string;
    value: string;
    options: string[];
    onChange: (value: string) => void;
    icon: React.ComponentType<{ className?: string }>;
  }) => (
    <div className="relative group">
      <button
        className="w-full md:w-auto bg-surface0 px-4 py-2 border-2 border-accent 
                       hover:border-blue transition-colors duration-200
                       transform hover:-rotate-1 hover:scale-105
                       flex items-center justify-between space-x-2
                       font-mono uppercase tracking-tight
                       shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]
                       hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)]
                       active:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]
                       active:transform active:translate-x-1 active:translate-y-1"
      >
        <Icon className="w-4 h-4" />
        <span>{value}</span>
      </button>
      <div className="absolute -bottom-4 left-0 w-full h-8 bg-transparent" />
      <div
        className="absolute z-50 w-full md:w-48 mt-2 opacity-0 group-hover:opacity-100 
                       transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto"
      >
        <div className="absolute -top-4 left-0 w-full h-4 bg-transparent" />
        <div
          className="bg-surface0 border-2 border-accent shadow-lg 
                         transform -rotate-1 hover:rotate-0 transition-transform duration-200"
        >
          {options.map((option) => (
            <button
              key={option}
              onClick={() => onChange(option)}
              className={`w-full px-4 py-2 text-left hover:bg-blue hover:text-base 
                             transition-colors duration-200 font-mono uppercase tracking-tight
                             ${value === option ? "bg-accent text-base" : ""}`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const origins = useMemo(() => {
    if (!isCooking) return [];
    const uniqueOrigins = new Set(
      posts.map((post) => post.origin).filter(Boolean),
    );
    return ["All", ...Array.from(uniqueOrigins)];
  }, [posts, isCooking]);

  const types = useMemo(() => {
    if (!isCooking) return [];
    const uniqueTypes = new Set(posts.map((post) => post.type).filter(Boolean));
    return ["All", ...Array.from(uniqueTypes)];
  }, [posts, isCooking]);

  const [filters, setFilters] = useState<FilterControls>({
    search: "",
    sortBy: "newest",
    origin: "All",
    type: "All",
  });

  const filteredPosts = useMemo(() => {
    return posts
      .filter((post) => {
        const matchesSearch =
          post.title?.toLowerCase().includes(filters.search.toLowerCase()) ||
          post.excerpt?.toLowerCase().includes(filters.search.toLowerCase()) ||
          filters.search === "";

        const matchesOrigin =
          filters.origin === "ALL" ||
          post.origin?.toUpperCase() === filters.origin ||
          filters.origin === "All";

        const matchesType =
          filters.type === "ALL" ||
          post.type?.toUpperCase() === filters.type ||
          filters.type === "All";

        return matchesSearch && matchesOrigin && matchesType;
      })
      .sort((a, b) => {
        switch (filters.sortBy) {
          case "oldest":
            return new Date(a.date).getTime() - new Date(b.date).getTime();
          case "most-views":
            return (b.views || 0) - (a.views || 0);
          case "newest":
          default:
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
      });
  }, [posts, filters]);

  return (
    <>
      <div className="mb-8 space-y-6">
        <div className="relative transform hover:-rotate-1 transition-transform duration-200">
          <input
            type="text"
            placeholder="SEARCH POSTS..."
            value={filters.search}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, search: e.target.value }))
            }
            className="w-full p-3 pl-12 bg-surface0 
                     border-2 border-accent hover:border-blue
                     focus:border-blue focus:outline-none
                     font-mono uppercase tracking-tight
                     shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]
                     hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)]
                     transition-all duration-200"
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-subtext0 w-5 h-5" />
        </div>

        <div className="flex flex-wrap gap-4">
          <SelectButton
            label="Sort"
            value={
              filters.sortBy === "newest"
                ? "NEWEST FIRST"
                : filters.sortBy === "oldest"
                  ? "OLDEST FIRST"
                  : "MOST VIEWS"
            }
            options={["NEWEST FIRST", "OLDEST FIRST", "MOST VIEWS"]}
            onChange={(value) =>
              setFilters((prev) => ({
                ...prev,
                sortBy:
                  value === "NEWEST FIRST"
                    ? "newest"
                    : value === "OLDEST FIRST"
                      ? "oldest"
                      : "most-views",
              }))
            }
            icon={FaSort}
          />

          {isCooking && origins.length > 1 && (
            <SelectButton
              label="Origin"
              value={filters.origin.toUpperCase()}
              options={origins.map((o) => o!.toUpperCase())}
              onChange={(value) =>
                setFilters((prev) => ({
                  ...prev,
                  origin: value,
                }))
              }
              icon={FaGlobe}
            />
          )}

          {isCooking && types.length > 1 && (
            <SelectButton
              label="Type"
              value={filters.type.toUpperCase()}
              options={types.map((t) => t!.toUpperCase())}
              onChange={(value) =>
                setFilters((prev) => ({
                  ...prev,
                  type: value,
                }))
              }
              icon={FaUtensils}
            />
          )}
        </div>
      </div>

      {isCooking && (
        <div className="mb-6 font-mono text-subtext0 uppercase tracking-tight transform -rotate-1">
          <span className="bg-surface0 px-4 py-2 border-2 border-accent inline-block">
            SHOWING {filteredPosts.length}{" "}
            {filteredPosts.length === 1 ? "POST" : "POSTS"}
          </span>
        </div>
      )}
      {filteredPosts.length > 0 ? (
        <div className="space-y-12">
          {filteredPosts.map((post, index) => (
            <div
              key={post.slug}
              className="blog-card-container"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <BlogCard {...post} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-8 bg-surface0 border-2 border-accent transform -rotate-1">
          <p className="text-lg text-subtext0 font-mono uppercase tracking-tight">
            NO POSTS FOUND ¯\_(ツ)_/¯
          </p>
        </div>
      )}
    </>
  );
}

// path: src/container/blog/BlogFilters.tsx
