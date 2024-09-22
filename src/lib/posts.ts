import axios from "axios";
import matter from "gray-matter";
import { Post } from "@types";

const GITHUB_API_URL = "https://api.github.com/repos/dvh-sh/blog/contents";
const EXCERPT_SEPARATOR = "<!-- end -->";

const fetchAndParseMd = async (
  url: string,
): Promise<matter.GrayMatterFile<string>> => {
  const { data } = await axios.get(url);
  return matter(data, { excerpt_separator: EXCERPT_SEPARATOR });
};

const createPost = (
  id: string,
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

  return {
    id,
    title: matterResult.data.title,
    date: matterResult.data.date,
    excerpt: matterResult.excerpt?.trim() || "",
    content,
  };
};

export const getSortedPostsData = async (): Promise<Post[]> => {
  try {
    const { data } = await axios.get(GITHUB_API_URL);
    const mdFiles = data.filter((file: { name: string }) =>
      file.name.endsWith(".md"),
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

export const getPostData = async (id: string): Promise<Post | null> => {
  try {
    const { data } = await axios.get(`${GITHUB_API_URL}/${id}.md`);
    const matterResult = await fetchAndParseMd(data.download_url);
    return createPost(id, matterResult, true);
  } catch (error) {
    console.error(`Error fetching post ${id}:`, error);
    return null;
  }
};

// path: src/lib/posts.ts
