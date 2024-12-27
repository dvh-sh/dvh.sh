import { PostHeader } from "@component/blog/PostHeader";
import { PostContent } from "@component/blog/PostContent";
import { LicenseInfo } from "@component/blog/LicenseInfo";

import { getPostData } from "@lib/posts";
import { updateViewCount } from "@lib/views";

export const dynamic = "force-dynamic";

interface PostProps {
  params: { slug: string; isCooking?: boolean };
}

export default async function PostClient({ params }: PostProps) {
  const bIsCooking = params.isCooking || false;
  const post = await getPostData(params.slug, bIsCooking);

  let views = 0;

  if (post) {
    try {
      const entry = await updateViewCount(params.slug, bIsCooking);
      views = entry.blog.views;
    } catch (error) {
      console.error("Failed to update view count:", error);
    }
  }

  if (!post) {
    return (
      <div className="w-full min-h-screen bg-base p-4 md:p-8 md:pl-72 text-text flex items-center justify-center">
        <div className="text-center p-8 bg-surface0 rounded-lg shadow-lg transform -skew-x-2">
          <p className="text-2xl font-bold text-accent mb-2">Post not found.</p>
          <p className="text-subtext0">You might be rate-limited.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-base to-mantle p-4 sm:p-6 md:pl-72 py-8">
      <div className="max-w-4xl mx-auto mt-8 relative">
        {bIsCooking ? (
          <PostHeader
            title={post.title}
            date={post.date}
            views={views}
            isCooking
          />
        ) : (
          <PostHeader title={post.title} date={post.date} views={views} />
        )}
        <PostContent content={post.content} />
        <LicenseInfo />
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1]">
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
    </div>
  );
}

// Path: src/app/blog/[slug]/page.tsx
