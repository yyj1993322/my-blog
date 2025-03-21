"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

interface Post {
  slug: string;
  title: string;
  date: string;
}

export default function SearchPosts() {
  const [isVisible, setIsVisible] = useState(false);
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);

  // 📌 监听搜索框输入，动态获取搜索结果
  useEffect(() => {
    if (query.trim() === "") {
      setPosts([]);
      return;
    }

    async function fetchSearchResults() {
      const res = await fetch(`/api/search?q=${query}`);
      const data = await res.json();
      setPosts(data.posts);
    }

    const delayDebounce = setTimeout(() => {
      fetchSearchResults();
    }, 300); // 延迟 300ms，防止每次输入都请求 API

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div className="mx-2 defalutBgText">
      <input
        className="defalutBgText px-2 h-8 w-52 focus:outline-none relative"
        type="search"
        placeholder="search blog"
        onFocus={() => {
          setIsVisible(true);
        }}
        onBlur={() => {
          setIsVisible(false);
        }}
        onChange={(e) => setQuery(e.target.value)}
      />
      {isVisible && (
        <ul
          className={
            "defalutBgText absolute w-52 z-50 overflow-y-auto scrollbar-hide"
          }
        >
          {posts.length > 0
            ? posts.map((post) => (
                <li key={post.slug} className="px-2 py-1">
                  <Link
                    href={`/posts/${post.slug}`}
                    className="text-blue-500 hover:underline"
                  >
                    {post.title}
                  </Link>
                </li>
              ))
            : query && <p className="text-gray-500 px-2 py-1">未找到相关文章</p>}
        </ul>
      )}
    </div>
  );
}
