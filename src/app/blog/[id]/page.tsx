import { getPostData, getSortedPostsData } from "@lib/posts";
import { PostHeader } from "@component/blog/PostHeader";
import { PostContent } from "@component/blog/PostContent";

interface PostProps {
  params: { id: string };
}

export default async function Post({ params }: PostProps) {
  const post = await getPostData(params.id);

  if (!post) {
    return <div className="w-full min-h-screen bg-base p-4 md:p-8 md:pl-72 text-text">Post not found. Ratelimited?</div>;
  }

  return (
    <div className="w-full min-h-screen bg-base p-4 sm:p-6 md:pl-72 py-8">
      <div className="max-w-4xl mx-auto">
        <PostHeader title={post.title} date={post.date} />
        <PostContent content={post.content} />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const posts = await getSortedPostsData();
  return posts.map((post) => ({ id: post.id }));
}

// Path: src/app/blog/[id]/page.tsx
