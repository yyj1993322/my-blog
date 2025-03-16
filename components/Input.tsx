"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function SearchInput() {
  const [isVisible, setIsVisible] = useState(false);
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
      />
      {isVisible && (
        <ul
          className={
            "defalutBgText absolute w-52 h-52 z-50 overflow-y-auto scrollbar-hide"
          }
        >
          <li className="py-1 px-2 truncate whitespace-nowrap overflow-hidden text-ellipsis">
            <Link href="/" className="hover:text-blue-500 m-0 no-underline">
            前端响应式编程
            </Link>
          </li>
          <li className="py-1 px-2 truncate whitespace-nowrap overflow-hidden text-ellipsis">Django项目优化计划</li>
          <li className="py-1 px-2 truncate whitespace-nowrap overflow-hidden text-ellipsis">Curser新手入门视频</li>
          <li className="py-1 px-2 truncate whitespace-nowrap overflow-hidden text-ellipsis">基本面数据</li>
          <li className="py-1 px-2 truncate whitespace-nowrap overflow-hidden text-ellipsis">市场情绪指标（VIX & Put/Call Ratio）</li>
        </ul>
      )}
    </div>
  );
}
