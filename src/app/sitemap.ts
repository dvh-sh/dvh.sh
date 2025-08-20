/**
 * @file app/sitemap.ts
 * @author David @dvhsh (https://dvh.sh)
 *
 * @created Wed, Aug 20 2025
 * @updated Wed, Aug 20 2025
 *
 * @description
 * Generates the sitemap.xml file dynamically.
 */

import type { MetadataRoute } from "next";

import { getSortedPostsData } from "@/lib/posts";
import { getPhotos } from "@/lib/photos";

/**
 * @function sitemap
 * @description Asynchronously generates the sitemap by combining static pages with
 * dynamic routes from blog posts, cooking posts, and photos.
 * @returns {Promise<MetadataRoute.Sitemap>} A promise that resolves to the sitemap array.
 */
const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const baseUrl = process.env.PRODUCTION_URL || "https://dvh.sh";

  // Get dynamic content
  const [blogPosts, cookingPosts, photos] = await Promise.all([
    getSortedPostsData(false),
    getSortedPostsData(true),
    getPhotos(),
  ]);

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/software`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cooking`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/photography`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // Blog posts
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  // Cooking posts
  const cookingPages: MetadataRoute.Sitemap = cookingPosts.map((post) => ({
    url: `${baseUrl}/cooking/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  // Photography pages
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
