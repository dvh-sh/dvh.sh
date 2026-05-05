/**
 * @file src/app/blog/page.tsx
 * @author David @dvhsh (https://dvh.sh)
 *
 * @created Wed, Aug 20 2025
 * @updated Mon, May 04 2026
 *
 * @description
 * Blog index page. Renders BlogClient (isCooking: false).
 */

import type { Metadata } from "next";

import BlogClient from "@/containers/blog/BlogClient";

export const metadata: Metadata = {
  title: "Blog — David Heffler",
  description:
    "Engineering posts on full-stack development, backend systems, infrastructure, and the occasional deep dive.",
  openGraph: {
    title: "Blog — David Heffler",
    description:
      "Engineering posts on full-stack development, backend systems, infrastructure, and the occasional deep dive.",
    url: "https://www.dvh.sh/blog",
    type: "website",
  },
};

const BlogPage = () => {
  return <BlogClient isCooking={false} />;
};

export default BlogPage;
