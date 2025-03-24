import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {Post} from "@type/posts"

export async function getPostsList():Promise<Post[]> {
      // 1. 读取 `posts/` 目录
  const postsDirectory = path.join(process.cwd(), "posts");
  const fileNames = fs.readdirSync(postsDirectory);

  // 2. 解析 Markdown 文件
  let posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title,
      date: data.date,
    };
  });
  posts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return posts.slice(0, 5);
}