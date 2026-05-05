/**
 * @file app/blog/[slug]/page.tsx
 * @author David @dvhsh (https://dvh.sh)
 *
 * @created Wed, Aug 20 2025
 * @updated Mon, May 04 2026
 *
 * @description
 * Blog post [slug] page. Generates per-post metadata. The matching BlogPosting
 * JSON-LD is rendered into <head> by the root layout (driven by x-pathname).
 */

import type { Metadata } from "next";

import PostClient from "@/containers/blog/PostClient";
import { getPostData } from "@/lib/posts";
import { SITE_URL } from "@/lib/seo";

interface BlogPostProps {
  params: Promise<{ slug: string }>;
}

export const generateMetadata = async ({
  params,
}: BlogPostProps): Promise<Metadata> => {
  const { slug } = await params;
  const post = await getPostData(slug, false);
  if (!post) return { title: "Post Not Found" };
  const url = `${SITE_URL}/blog/${slug}`;
  const published = new Date(post.date);
  return {
    title: `${post.title} | David Heffler`,
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

const BlogPost = async ({ params }: BlogPostProps) => {
  const { slug } = await params;
  return <PostClient params={{ slug, isCooking: false }} />;
};

export default BlogPost;
