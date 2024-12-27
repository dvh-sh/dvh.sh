// path: src/container/blog/BlogClient.tsx
import { WavyTitle } from "@component/WavyTitle";
import { getSortedPostsData } from "@lib/posts";
import { getAllBlogViews } from "@lib/views";
import BlogFilters from "./BlogFilters";
import { Post } from "@types";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function BlogClient({ isCooking = false }) {
  const posts = await getSortedPostsData(isCooking);
  const viewCounts = await getAllBlogViews(isCooking);

  const postsWithViews = posts.map((post: Post) => ({
    ...post,
    views: viewCounts[post.slug] || 0,
  }));

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-base to-mantle p-4 sm:p-6 md:pl-72 text-text overflow-hidden">
      <div className="max-w-4xl mx-auto mt-12 pt-4 relative z-10">
        <WavyTitle>{isCooking ? "Cookbook" : "Blog Posts"}</WavyTitle>

        <BlogFilters posts={postsWithViews} isCooking={isCooking} />
      </div>

      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <svg
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect
            width="100%"
            height="100%"
            filter="url(#noise)"
            opacity="0.05"
          />
        </svg>
      </div>
    </div>
  );
}

// path: src/app/container/blog/BlogClient.tsx
