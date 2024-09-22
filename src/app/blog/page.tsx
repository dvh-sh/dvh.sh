import { getSortedPostsData } from "@lib/posts";
import BlogCard from "@component/card/BlogCard";

import { Post } from "@types";

export default async function Blog() {
  const posts = await getSortedPostsData();

  return (
    <div className="w-full h-full p-4 sm:p-6 md:pl-72 py-8 bg-base text-text">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-pink">Blog Posts</h1>
        <div className="space-y-6">
          {posts.map((post: Post) => (
            <BlogCard key={post.id} {...post} />
          ))}
        </div>
      </div>
    </div>
  );
}

// path: src/app/blog/page.tsx