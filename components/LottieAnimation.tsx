"use client"; // 重要！必须加上这个
import dynamic from "next/dynamic";

// import Lottie from "lottie-react";
import type { FC } from "react";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import catAnimation from "@public/lottie/CatAnimation.json"; // 导入 JSON 动画

interface LottieAnimProps {
  jsonData?: object;
  loop?: boolean;
  className?: string;
}

// 通用动画组件
const LottieAnim: FC<LottieAnimProps> = ({
  jsonData = catAnimation,
  loop = true,
  className = "w-40 h-40",
}) => {
  return (
    <Lottie
      animationData={jsonData}
      loop={loop}
      className={className}
    />
  );
};

export default LottieAnim;
