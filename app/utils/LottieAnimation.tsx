"use client"; // 重要！必须加上这个
import dynamic from 'next/dynamic';

// import Lottie from "lottie-react";
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import animationData from "../../public/CatAnimation.json"; // 导入 JSON 动画

const LottieAnimation = () => {
  return (
    <div className="w-full max-w-md mx-auto">
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default LottieAnimation;
