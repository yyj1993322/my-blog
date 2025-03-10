"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function SearchInput() {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className="rounded-lg mx-2 ">
      <input
        className="bg-white dark:bg-white-300 px-2 h-8 w-40 text-gray-900 focus:outline-none relative"
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
            "bg-white dark:bg-white-300 px-2 absolute w-40 h-20  text-gray-900 z-50 overflow-y-auto scrollbar-hide"
          }
        >
          <li>
            <Link href="/" className="hover:text-blue-500 m-0 no-underline">
              111
            </Link>
          </li>
          <li>222</li>
          <li>333</li>
          <li>333</li>
          <li>333</li>
          <li>333</li>
          <li>333</li>
          <li>333</li>
        </ul>
      )}
    </div>
  );
}
