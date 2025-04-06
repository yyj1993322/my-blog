import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-4 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
        404 - 页面未找到
      </h1>
      <p className="mt-3 text-base sm:text-lg text-gray-600 dark:text-gray-300 text-center">
        抱歉，您访问的页面不存在。
      </p>
      <Link
        href="/"
        className="mt-5 text-blue-600 dark:text-blue-400 hover:underline text-sm sm:text-base"
      >
        返回首页
      </Link>
    </div>
  );
}
