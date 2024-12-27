import PostClient from "@container/blog/PostClient";

interface BlogPostProps {
  params: { slug: string };
}

export default function BlogPost({ params }: BlogPostProps) {
  return <PostClient params={{ slug: params.slug, isCooking: false }} />;
}

// path: src/app/blog/[slug]/page.tsx
