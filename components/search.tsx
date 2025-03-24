"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@components/AxiosInstance";
import {Post,PostsRes} from "@type/posts"



export default function SearchPosts() {
  const [isVisible, setIsVisible] = useState(false);
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const router = useRouter();

  // 📌 监听搜索框输入，动态获取搜索结果
  useEffect(() => {
    if (query.trim() === "") {
      setPosts([]);
      return;
    }

    async function SearchResults() {
      const res = await axiosInstance.get<PostsRes>(`/search`, {
        params: { q: query }
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
