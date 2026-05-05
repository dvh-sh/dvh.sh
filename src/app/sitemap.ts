/**
 * @file app/sitemap.ts
 * @author David @dvhsh (https://dvh.sh)
 *
 * @created Wed, Aug 20 2025
 * @updated Mon, May 04 2026
 *
 * @description
 * Generates the sitemap.xml file dynamically.
 * Static pages use a stable lastModified derived from the most recent post,
 * so we don't signal "everything modified today" on every build.
 */

import type { MetadataRoute } from "next";

import { getSortedPostsData } from "@/lib/posts";
import { getPhotos } from "@/lib/photos";

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const baseUrl = process.env.PRODUCTION_URL || "https://www.dvh.sh";

  const [blogPosts, cookingPosts, photos] = await Promise.all([
    getSortedPostsData(false),
    getSortedPostsData(true),
    getPhotos(),
  ]);

  const recentPostDate = blogPosts[0]?.date
    ? new Date(blogPosts[0].date)
    : undefined;
  const recentCookingDate = cookingPosts[0]?.date
    ? new Date(cookingPosts[0].date)
    : undefined;
  const homepageMod = [recentPostDate, recentCookingDate]
    .filter((d): d is Date => d instanceof Date && !isNaN(d.getTime()))
    .sort((a, b) => b.getTime() - a.getTime())[0];

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      ...(homepageMod ? { lastModified: homepageMod } : {}),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/software`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      ...(recentPostDate ? { lastModified: recentPostDate } : {}),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cooking`,
      ...(recentCookingDate ? { lastModified: recentCookingDate } : {}),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/photography`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  const cookingPages: MetadataRoute.Sitemap = cookingPosts.map((post) => ({
    url: `${baseUrl}/cooking/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  const photoPages: MetadataRoute.Sitemap = photos.map((photo) => ({
    url: `${baseUrl}/photography/${photo.slug}`,
    lastModified: new Date(photo.date),
    changeFrequency: "yearly",
    priority: 0.7,
    images: [`${process.env.NEXT_PUBLIC_R2_URL}/${photo.sizes.large}`],
  }));

  return [...staticPages, ...blogPages, ...cookingPages, ...photoPages];
};

export default sitemap;
