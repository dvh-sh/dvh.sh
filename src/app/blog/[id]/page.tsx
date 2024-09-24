import { PostHeader } from "@component/blog/PostHeader";
import { PostContent } from "@component/blog/PostContent";

import { updateViewCount } from "@lib/views";
import { getPostData } from "@lib/posts";

export const dynamic = "force-dynamic";
export const revalidate = 60;

interface PostProps {
  params: { id: string };
}

export default async function Post({ params }: PostProps) {
  const post = await getPostData(params.id);

  let views = 0;

  if (post) {
    try {
      const entry = await updateViewCount(params.id);
      views = entry.blog.views;
    } catch (error) {}
  }

  if (!post) {
    return (
      <div className="w-full min-h-screen bg-base p-4 md:p-8 md:pl-72 text-text">
        Post not found. Ratelimited?
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-base p-4 sm:p-6 md:pl-72 py-8">
      <div className="max-w-4xl mx-auto mt-8">
        <PostHeader title={post.title} date={post.date} views={views} />
        <PostContent content={post.content} />
      </div>
    </div>
  );
}

// Path: src/app/blog/[id]/page.tsx
