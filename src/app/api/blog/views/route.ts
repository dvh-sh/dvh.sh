import { NextResponse } from "next/server";

import connectDB from "@util/db.util";

import Blog from "@model/blog.model";

const indexBlog = async (slug: string) => {
  const blog = await Blog.findOne({ slug });

  if (!blog) {
    const newBlog = new Blog({ slug });
    newBlog.views = 1;
    await newBlog.save();
    return newBlog;
  } else {
    blog.views++;
    await blog.save();
    return blog;
  }
};

export async function POST(request: Request) {
  try {
    await connectDB();

    const { slug } = await request.json();

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    const updatedBlog = await indexBlog(slug);

    return NextResponse.json(
      {
        blog: {
          slug: updatedBlog.slug,
          views: updatedBlog.views,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      { error: "Internal Server Error", details: err.message },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const blogs = await Blog.find({}, "slug views");

    return NextResponse.json(
      {
        blogs: blogs.map((blog) => ({
          slug: blog.slug,
          views: blog.views,
        })),
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// path: src/app/api/blog/views/route.ts
