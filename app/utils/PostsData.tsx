import fs from "fs";
import path from "path";
import matter from "gray-matter";

interface Post {
    slug: string;
    title: string;
    date: string;
  }

export async function getPostsList():Promise<Post[]> {
      // 1. 读取 `posts/` 目录
  const postsDirectory = path.join(process.cwd(), "posts");
  const fileNames = fs.readdirSync(postsDirectory);

  // 2. 解析 Markdown 文件
  const posts = fileNames.map((fileName) => {
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
  return posts
}