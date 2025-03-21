import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { NextResponse } from "next/server";

// 📌 搜索 API
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q")?.toLowerCase() || ""; // 获取搜索关键词

  // 1️⃣ 读取 `posts/` 目录
  const postsDirectory = path.join(process.cwd(), "posts");
  const fileNames = fs.readdirSync(postsDirectory);

  // 2️⃣ 解析 Markdown 文件
  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents); // 解析 front-matter 和内容

    return {
      slug,
      title: data.title || "无标题",
      date: data.date || "无日期",
      content,
    };
  });

  // 3️⃣ 过滤符合搜索关键词的文章（匹配 `title` 或 `content`）
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(query)
  );

  return NextResponse.json({ posts: filteredPosts });
}