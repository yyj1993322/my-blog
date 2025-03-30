"use client"; // 重要！必须加上这个
import dynamic from "next/dynamic";

// import Lottie from "lottie-react";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import catAnimation from "@public/CatAnimation.json"; // 导入 JSON 动画

// 通用动画组件
export default function LottieAnim({
  jsonData = catAnimation,
  loop = true,
  className = "w-40 h-40",
}: {
  jsonData?: unknown;
  loop?: boolean;
  className?: string;
}) {
  return (
    <Lottie animationData={jsonData} loop={loop} className={className} />
  );
}
