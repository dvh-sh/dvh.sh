import { cache } from "react";

const getBaseUrl = () => {
  if (typeof window !== "undefined") return "";
  if (process.env.PRODUCTION_URL) return process.env.PRODUCTION_URL;
  return `http://localhost:${process.env.PORT ?? 3000}`;
};

export const updateViewCount = async (slug: string) => {
  try {
    const url = `${getBaseUrl()}/api/blog/views`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slug }),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to update view count: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getAllBlogViews = cache(async () => {
  try {
    const url = `${getBaseUrl()}/api/blog/views`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!response.ok) {
      throw new Error("Failed to fetch blog views");
    }

    const data = await response.json();
    return data.blogs.reduce(
      (acc: Record<string, number>, blog: { slug: string; views: number }) => {
        acc[blog.slug] = blog.views;
        return acc;
      },
      {},
    );
  } catch (error) {
    return {};
  }
});

// path: src/lib/views.ts
