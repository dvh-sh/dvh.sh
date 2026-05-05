/**
 * @file src/app/cooking/page.tsx
 * @author David @dvhsh (https://dvh.sh)
 *
 * @created Wed, Aug 20 2025
 * @updated Mon, May 04 2026
 *
 * @description
 * Cooking index page. Renders BlogClient with isCooking set to true.
 */

import type { Metadata } from "next";

import BlogClient from "@/containers/blog/BlogClient";

export const metadata: Metadata = {
  title: "Cooking — David Heffler",
  description:
    "Recipes and technique notes — desserts, savory plates, and weekend experiments with weights and timings.",
  openGraph: {
    title: "Cooking — David Heffler",
    description:
      "Recipes and technique notes — desserts, savory plates, and weekend experiments with weights and timings.",
    url: "https://www.dvh.sh/cooking",
    type: "website",
  },
};

const CookingPage = () => {
  return <BlogClient isCooking={true} />;
};

export default CookingPage;
