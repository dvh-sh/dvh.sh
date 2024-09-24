import BlogCard from "@component/card/BlogCard";
import { getSortedPostsData } from "@lib/posts";
import { getAllBlogViews } from "@lib/views";
import { Post } from "@types";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function Blog() {
  const posts = await getSortedPostsData();
  const viewCounts = await getAllBlogViews();

  const postsWithViews = posts.map((post: Post) => ({
    ...post,
    views: viewCounts[post.slug] || 0,
  }));

  return (
    <div className="w-full h-full p-4 sm:p-6 md:pl-72 py-8 bg-base text-text">
      <div className="max-w-3xl mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-8 text-accent">Blog Posts</h1>
        {postsWithViews.length > 0 ? (
          <div className="space-y-6">
            {postsWithViews.map((post: Post & { views: number }) => (
              <BlogCard key={post.slug} {...post} />
            ))}
          </div>
        ) : (
          <div className="text-center p-8 bg-surface0 rounded-lg shadow-lg">
            <p className="text-lg text-text mb-2">No posts found.</p>
            <p className="text-subtext0">You might be rate-limited.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// path: src/app/blog/page.tsx
