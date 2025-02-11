import axios from "axios";
import matter from "gray-matter";

import { Post } from "@types";

const GITHUB_API_URL = "https://api.github.com/repos/dvh-sh/blog/contents";
const GITHUB_COOKING_URL =
  "https://api.github.com/repos/dvh-sh/blog/contents/cooking";
const EXCERPT_SEPARATOR = "<!-- end -->";
const WORDS_PER_MINUTE = 250;

const fetchAndParseMd = async (
  url: string,
): Promise<matter.GrayMatterFile<string>> => {
  const { data } = await axios.get(url);
  return matter(data, { excerpt_separator: EXCERPT_SEPARATOR });
};

const createPost = (
  slug: string,
  matterResult: matter.GrayMatterFile<string>,
  removeExcerpt = false,
): Post => {
  let content = matterResult.content;
  if (removeExcerpt) {
    content = content
      .replace(matterResult.excerpt || "", "")
      .replace(EXCERPT_SEPARATOR, "")
      .trim();
  }

  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / WORDS_PER_MINUTE).toString();

  return {
    slug,
    title: matterResult.data.title,
    date: matterResult.data.date,
    excerpt: matterResult.excerpt?.trim() || "",
    content,
    readingTime,
    cookingTime: matterResult.data.cookingTime,
    origin: matterResult.data.origin,
    type: matterResult.data.type,
  };
};

export const getSortedPostsData = async (
  isCooking = false,
): Promise<Post[]> => {
  try {
    const url = isCooking ? GITHUB_COOKING_URL : GITHUB_API_URL;
    const { data } = await axios.get(url);

    const mdFiles = data.filter(
      (file: { name: string; type: string }) =>
        file.name.endsWith(".md") &&
        // Exclude cooking directory from main blog posts
        (!isCooking ? file.type === "file" && file.name !== "cooking" : true),
    );

    const posts = await Promise.all(
      mdFiles.map(async (file: { name: string; download_url: string }) => {
        const matterResult = await fetchAndParseMd(file.download_url);
        return createPost(file.name.replace(/\.md$/, ""), matterResult);
      }),
    );

    return posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

export const getPostData = async (
  slug: string,
  isCooking = false,
): Promise<Post | null> => {
  try {
    const baseUrl = isCooking ? GITHUB_COOKING_URL : GITHUB_API_URL;
    const { data } = await axios.get(`${baseUrl}/${slug}.md`);
    const matterResult = await fetchAndParseMd(data.download_url);
    return createPost(slug, matterResult, true);
  } catch (error) {
    console.error(`Error fetching post ${slug}:`, error);
    return null;
  }
};

// path: src/lib/posts.ts
