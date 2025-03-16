import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { NextResponse } from "next/server";

// 📌 GET 请求：获取所有文章（支持分页 & 排序）
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "5", 10);

  // 1️⃣ 读取 `posts/` 目录
  const postsDirectory = path.join(process.cwd(), "posts");
  const fileNames = fs.readdirSync(postsDirectory);

  // 2️⃣ 解析 Markdown 文件
  let posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title || "无标题",
      date: data.date || "无日期",
    };
  });

  // 3️⃣ 按 `date` 倒序排序（最新文章在前）
  posts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // 4️⃣ 分页处理
  const totalPosts = posts.length;
  const paginatedPosts = posts.slice((page - 1) * pageSize, page * pageSize);

  return NextResponse.json({
    posts: paginatedPosts,
    totalPages: Math.ceil(totalPosts / pageSize),
    currentPage: page,
  });
}