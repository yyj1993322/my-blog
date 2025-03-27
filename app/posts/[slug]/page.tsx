import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import MarkdownRenderer from "@components/MarkdownRenderer";

// 📌 读取 Markdown 文件
async function getPost(slug: string) {
  const postsDirectory = path.join(process.cwd(), "posts");
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  try {
    const fileContents = await fs.promises.readFile(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      title: data.title,
      date: data.date,
      content,
    };
  } catch (error) {
    console.log("getPost---" + error);
  }
}

// 📌 生成静态路径
export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), "posts");
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => ({
    slug: fileName.replace(/\.md$/, ""),
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

// 首先定义 Post 的类型
interface Post {
  title: string;
  // 添加其他需要的属性
  content?: string;
  date?: string;
  // ... 其他属性
}

// 📌 组件
export default async function PostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const post = (await getPost(slug)) as Post;

  if (!post) {
    return <h1 className="text-center text-4xl mt-10">404 - Post Not Found</h1>;
  }

  return (
    <div className="w-full max-w-full min-h-screen flex mdTheme p-2 sm:p-4">
      <div className="p-4 sm:p-10 w-full max-w-screen-xl mx-auto flex flex-col justify-center items-center">
        <h4 className="text-base sm:text-4xl font-bold text-center mb-4 sm:mb-6">
          {post.title}
        </h4>
        <div className="w-full max-w-full p-2 sm:p-4 rounded-lg shadow-md">
          <MarkdownRenderer content={post.content ?? ""} />
        </div>
      </div>
    </div>
  );
}
