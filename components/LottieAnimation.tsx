"use client"; // 重要！必须加上这个
import dynamic from "next/dynamic";

// import Lottie from "lottie-react";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import catAnimation from "../public/CatAnimation.json"; // 导入 JSON 动画

const LottieCat = () => {
  return <Lottie animationData={catAnimation} loop={true} />
};

export default LottieCat;

export function LottieAnimation() {
  return <Lottie animationData={catAnimation} loop={true} />;
};
