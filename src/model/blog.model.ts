import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  views: {
    type: Number,
    default: 0,
  },
});

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default Blog;

// path: src/model/blog.model.ts
