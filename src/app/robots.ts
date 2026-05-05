/**
 * @file app/robots.ts
 * @author David @dvhsh (https://dvh.sh)
 *
 * @created Wed, Aug 20 2025
 * @updated Mon, May 04 2026
 *
 * @description
 * Generates the robots.txt file for web crawlers.
 */

import type { MetadataRoute } from "next";

const robots = (): MetadataRoute.Robots => {
  const baseUrl = process.env.PRODUCTION_URL || "https://www.dvh.sh";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/static/", "/*?*", "/404"],
        crawlDelay: 0,
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        crawlDelay: 0,
      },
      {
        userAgent: "Googlebot-Image",
        allow: ["/photography/", "/photos/"],
        disallow: "/api/",
        crawlDelay: 1,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
};

export default robots;
