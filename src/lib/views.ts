import { headers } from "next/headers";

export const updateViewCount = async (slug: string) => {
  try {
    const headersList = headers();
    const protocol = headersList.get("x-forwarded-proto") || "http";
    const host = headersList.get("host") || "localhost:3000";

    const response = await fetch(`${protocol}://${host}/api/blog/views`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slug }),
    });

    const responseText = await response.text();

    if (!response.ok) {
      throw new Error(
        `Failed to update view count: ${response.status} ${response.statusText}`,
      );
    }

    try {
      const data = JSON.parse(responseText);
      return data;
    } catch (parseError) {
      throw new Error("Invalid JSON response");
    }
  } catch (error) {
    throw error;
  }
};

export const getAllBlogViews = async () => {
  try {
    const headersList = headers();
    const protocol = headersList.get("x-forwarded-proto") || "http";
    const host = headersList.get("host") || "localhost:3000";

    const response = await fetch(`${protocol}://${host}/api/blog/views`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
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
    console.error("Error fetching blog views:", error);
    return {};
  }
};

// path: src/lib/views.ts
