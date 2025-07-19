import path from "path";
import fs from "fs";
import { ENCODING, POST_DIRECTORY } from "@/constants";
import matter from "gray-matter";

function getMdFileName(slug: string) {
  const mdFileName = slug.match(/^[0-9a-zA-Z_\-. ]+.(md|mdx)$/gim)
    ? slug
    : slug + ".md";
  return mdFileName;
}

export type Post = {
  title: string;
  link: string;
};

export async function getPost(slug: string): Promise<Post> {
  const mdFileName = getMdFileName(slug);
  const postPath = path.join(POST_DIRECTORY, mdFileName);
  const postFileContent = fs.readFileSync(postPath, ENCODING);
  const matterResult = matter(postFileContent);
  return matterResult.data as Post;
}

export async function getAllPost() {
  const fileList = fs.readdirSync(POST_DIRECTORY);
  const allPost: Post[] = [];
  for (const fileName of fileList) {
    const slug = fileName.replaceAll(".md", "");
    const post = await getPost(slug);
    allPost.push(post);
  }
  return allPost.sort((a, b) => a.title.localeCompare(b.title));
}
