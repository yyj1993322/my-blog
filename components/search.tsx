"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@components/AxiosInstance";
import { Post, PostsRes } from "@type/posts";

export default function SearchPosts() {
  const [isVisible, setIsVisible] = useState(false);
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const router = useRouter();

  // 监听搜索框输入，动态获取搜索结果
  useEffect(() => {
    if (query.trim() === "") {
      setPosts([]);
      return;
    }

    async function SearchResults() {
      const res = await axiosInstance.get<PostsRes>(`/search`, {
        params: { q: query },
      });
      setPosts(res.data.posts);
    }

    const delayDebounce = setTimeout(() => {
      SearchResults();
    }, 300); // 延迟 300ms，防止每次输入都请求 API

    return () => clearTimeout(delayDebounce);
  }, [query]);

  //onMouseDown 解决下拉框消失导致没有跳转文章
  const handleClick = (slug: string) => {
    router.push(`/posts/${slug}`);
  };

  return (
    <div className="mx-2 rounded">
      {/* 搜索框容器 */}
      <div className="relative">
        {/* 搜索图标 */}
        {
          isVisible && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 4a7 7 0 017 7c0 1.657-.422 3.214-1.206 4.577l4.58 4.579a1 1 0 01-1.414 1.415l-4.579-4.58A7 7 0 1111 4z"
              />
            </svg>
          </div>
          )
        }
        {/* 搜索框 */}
        <input
          className={`rounded defalutConpomentText h-8 w-52 focus:outline-none transition-all duration-300 ${
            isVisible ? "pl-8" : "pl-2"
          }`}
          type="search"
          placeholder="search blog"
          onFocus={() => setIsVisible(true)}
          onBlur={() => setIsVisible(false)}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {isVisible && (
        <ul
          className={
            "defalutConpomentText absolute w-52 z-50 overflow-y-auto scrollbar-hide"
          }
        >
          {posts.length > 0
            ? posts.map((post) => (
                <li key={post.slug} className="px-2 py-1">
                  <button
                    className="text-blue-500 hover:underline"
                    onMouseDown={() => handleClick(post.slug)}
                  >
                    {post.title}
                  </button>
                </li>
              ))
            : query && <p className="text-gray-500 px-2 py-1">No result</p>}
        </ul>
      )}
    </div>
  );
}
