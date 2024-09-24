import { cache } from 'react';
import connectDB from "@util/db.util";
import Blog from "@model/blog.model";

export const updateViewCount = async (slug: string) => {
  try {
    await connectDB();
    const blog = await Blog.findOne({ slug });

    if (!blog) {
      const newBlog = new Blog({ slug, views: 1 });
      await newBlog.save();
      return { blog: { slug, views: 1 } };
    } else {
      blog.views++;
      await blog.save();
      return { blog: { slug: blog.slug, views: blog.views } };
    }
  } catch (error) {
    console.error("Error updating view count:", error);
    throw error;
  }
};

export const getAllBlogViews = cache(async () => {
  try {
    await connectDB();
    const blogs = await Blog.find({}, 'slug views');
    
    return blogs.reduce(
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
});