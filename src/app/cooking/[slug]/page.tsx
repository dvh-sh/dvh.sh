import PostClient from "@container/blog/PostClient";

interface CookingPostProps {
  params: { slug: string };
}

export default function CookingPost({ params }: CookingPostProps) {
  return <PostClient params={{ slug: params.slug, isCooking: true }} />;
}

// path: src/app/cooking/[slug]/page.tsx
