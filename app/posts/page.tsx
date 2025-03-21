"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// 📌 文章接口
interface Post {
  slug: string;
  title: string;
  date: string;
}

// 📌 API 响应数据
interface PostsResponse {
  posts: Post[];
  totalPages: number;
  currentPage: number;
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // 📌 获取文章列表
  async function fetchPosts(page: number) {
    const res = await fetch(`/api/posts?page=${page}&pageSize=15`);
    const data: PostsResponse = await res.json();

    setPosts(data.posts);
    setCurrentPage(data.currentPage);
    setTotalPages(data.totalPages);
  }

  // 📌 在组件加载时获取文章
  useEffect(() => {
    fetchPosts(1);
  }, []);

  return (
    <div className="p-8 w-full h-full mdTheme">
      <h1 className="max-w-3xl mx-auto p-6">全部文章</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug} className="mb-4">
            <Link
              href={`/posts/${post.slug}`}
              className="text-blue-500 hover:underline"
            >
              {post.title} - {post.date}
            </Link>
          </li>
        ))}
      </ul>

      {/* 📌 分页 */}
      <div className="mt-4 flex space-x-4 mdTheme">
        {currentPage > 1 && (
          <button
            onClick={() => fetchPosts(currentPage - 1)}
            className="mdTheme px-4 py-2 rounded"
          >
            上一页
          </button>
        )}
        <span>
          第 {currentPage} 页 / 共 {totalPages} 页
        </span>
        {currentPage < totalPages && (
          <button
            onClick={() => fetchPosts(currentPage + 1)}
            className="mdTheme px-4 py-2 rounded"
          >
            下一页
          </button>
        )}
      </div>
    </div>
  );
}
