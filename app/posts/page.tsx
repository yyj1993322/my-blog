"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Post, PostsPageRes } from "@type/posts";
import Pagination from "@components/Pagination";
import axiosInstance from "@components/AxiosInstance";
import SearchPosts from "@components/Search";

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const pageSize = 15;

  // 获取文章列表
  async function fetchPosts(page: number) {
    const {
      data: { posts, currentPage, totalPages },
    } = await axiosInstance.get<PostsPageRes>(`/posts`, {
      params: { page: page, pageSize: pageSize },
    });

    setPosts(posts);
    setCurrentPage(currentPage);
    setTotalPages(totalPages);
    // 存储当前页码到 SessionStorage
    sessionStorage.setItem("currentPage", String(page));
  }

  // 在组件加载时获取文章
  useEffect(() => {
    let page = 1;
    // 判断是否是返回操作
    if (document.referrer && sessionStorage.getItem("currentPage")) {
      page = parseInt(sessionStorage.getItem("currentPage") || "1");
    }
    setCurrentPage(page);
    fetchPosts(page);
  }, []);

  return (
    <div className="flex flex-col h-screen p-4 w-full mdTheme">
      <div className="relative mb-4 flex items-center space-x-2">
        <SearchPosts />
      </div>
      <div className="md:col-span-2 flex-1 overflow-y-auto space-y-4">
        {/* 文章卡片 */}
        {posts.reverse().map((post) => (
          <article
            key={post.slug}
            className="bg-gray-100 dark:bg-gray-800 p-4 shadow rounded-lg relative"
          >
            <div className="flex justify-between items-center">
              <h4 className="text-base sm:text-ml break-words max-w-[80%]">
                {post.title}
              </h4>
              <div className="flex-shrink-0">
                <Link
                  href={`/posts/${post.slug}`}
                  className="hover:text-blue-500 mt-2 no-underline text-sm"
                >
                  阅读全文
                </Link>
              </div>
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
