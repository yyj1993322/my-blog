"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Post, PostsPageRes } from "../../type/posts";
import Pagination from "../../components/Pagination";

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const pageSize = 5;

  // 获取文章列表
  async function fetchPosts(page: number) {
    const res = await fetch(`/api/posts?page=${page}&pageSize=${pageSize}`);
    const data: PostsPageRes = await res.json();

    setPosts(data.posts);
    setCurrentPage(data.currentPage);
    setTotalPages(data.totalPages);
  }

  // 在组件加载时获取文章
  useEffect(() => {
    fetchPosts(1);
  }, []);

  return (
    <div className="p-8 w-full mdTheme">
      <div className="md:col-span-2 space-y-6 max-h-[800px] overflow-y-auto">
        {/* 文章卡片 */}
        {posts.reverse().map((post) => (
          <article
            key={post.slug}
            className="bg-white dark:bg-gray-800 p-4 shadow rounded-lg relative"
          >
            <h4 className="text-1xl font-semibold "> {post.title}</h4>
            <p className="text-gray-600 dark:text-gray-300 my-1">{post.date}</p>
            <div className="right-4 top-1/2 transform -translate-y-1/2 absolute">
              <Link
                href={`/posts/${post.slug}`}
                className="hover:text-blue-500 mt-2 no-underline "
              >
                阅读全文
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* 分页 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={fetchPosts}
      />
    </div>
  );
}
