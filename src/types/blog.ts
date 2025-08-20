/**
 * @file src/types/blog.ts
 * @author David @dvhsh (https://dvh.sh)
 *
 * @created Wed, Aug 20 2025
 * @updated Wed, Aug 20 2025
 *
 * @description
 * Type definitions for blog and cooking posts.
 */

/**
 * @interface Post
 * @description Defines the structure for a single blog or cooking post.
 */
export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  readingTime: string;
  views?: number;
  // Cooking-specific fields
  cookingTime?: string;
  origin?: string;
  type?: string;
}
