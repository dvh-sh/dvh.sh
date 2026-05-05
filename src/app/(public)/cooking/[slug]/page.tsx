/**
 * @file app/cooking/[slug]/page.tsx
 * @author David @dvhsh (https://dvh.sh)
 *
 * @created Wed, Aug 20 2025
 * @updated Mon, May 04 2026
 *
 * @description
 * Cooking post [slug] page. Generates per-post metadata. The matching Recipe
 * JSON-LD is rendered into <head> by the root layout (driven by x-pathname).
 */

import type { Metadata } from "next";

import PostClient from "@/containers/blog/PostClient";
import { getPostData } from "@/lib/posts";
import { SITE_URL } from "@/lib/seo";

interface CookingPostProps {
  params: Promise<{ slug: string }>;
}

export const generateMetadata = async ({
  params,
}: CookingPostProps): Promise<Metadata> => {
  const { slug } = await params;
  const post = await getPostData(slug, true);
  if (!post) return { title: "Recipe Not Found" };
  const url = `${SITE_URL}/cooking/${slug}`;
  const published = new Date(post.date);
  return {
    title: `${post.title} | Cooking — David Heffler`,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url,
      publishedTime: isNaN(published.getTime())
        ? undefined
        : published.toISOString(),
      authors: ["David Heffler"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
};

const CookingPost = async ({ params }: CookingPostProps) => {
  const { slug } = await params;
  return <PostClient params={{ slug, isCooking: true }} />;
};

export default CookingPost;
