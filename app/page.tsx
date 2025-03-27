import Head from "next/head";
import Image from "next/image";
import LottieCat, { NextAnimation } from "components/LottieAnimation";
import { getPostsList } from "components/PostsData";
import SearchPosts from "components/Search";
import ThemeSwitcher from "components/ThemeSwitcher";
import Link from "next/link";

export default async function HomePage() {
  const posts = await getPostsList();

  return (
    <div className="min-h-screen defalutBgText">
      <Head>
        <title>Joker Blog</title>
        <meta name="description" content="分享技术与生活的个人博客" />
      </Head>

      {/* 1️⃣ 顶部导航栏 */}
      <header className="bg-white dark:bg-gray-800 shadow-md ">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center p-4 space-y-2 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <Image src="/coding.png" alt="coding" width={50} height={50} className="w-10 h-10 sm:w-12 sm:h-12" />
            <SearchPosts />
            <ThemeSwitcher />
          </div>
          <nav>
            <ul className="flex flex-wrap gap-2 sm:space-x-4">
              <li>
                <Link
                  href="https://github.com/trending"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500 text-sm sm:text-base"
                >
                  github热门
                </Link>
              </li>
              <li>
                <Link href="/posts" className="hover:text-blue-500 text-sm sm:text-base">
                  全部文章
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* 2️⃣ 封面 */}
      <section className="relative bg-blue-500 text-white text-center py-8 sm:py-12">
        <h2 className="text-2xl sm:text-4xl font-bold">欢迎来到 Joker Blog</h2>
        <p className="mt-2 text-base sm:text-lg">技术-生活-分享</p>
      </section>

      {/* 3️⃣ 主要内容区 */}
      <main className="max-w-6xl mx-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {/* 文章列表 */}
        <div className="md:col-span-2 space-y-4 sm:space-y-6 max-h-[800px] overflow-y-auto">
          {/* 文章卡片 */}
          {posts.map((post) => (
            <article
              key={post.slug}
              className="bg-white dark:bg-gray-800 p-4 shadow rounded-lg relative"
            >
              <h5 className="text-sm sm:text-base break-words">{post.title}</h5>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">{post.date}</p>
              <p className="text-gray-600 dark:text-gray-300 right-4 top-2 absolute text-xs">NEW</p>
              <div className="right-4 bottom-2 absolute">
                <Link
                  href={`/posts/${post.slug}`}
                  className="hover:text-blue-500 mt-2 no-underline text-sm"
                >
                  阅读全文
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* 侧边栏 */}
        <aside className="defalutBgText dark:bg-gray-800 p-4 shadow rounded-lg">
          <h6 className="text-lg sm:text-xl font-semibold">关于我</h6>
          <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm sm:text-base">
            一个看清楚现实跑路了的韭菜。
          </p>
          <div className="h-60 w-full overflow-y-auto flex justify-center items-center">
            <div className="flex justify-center items-center">
              <LottieCat />
              <NextAnimation />
            </div>
          </div>
        </aside>
      </main>

      {/* 4️⃣ 页脚 */}
      <footer className="text-center p-2 sm:p-4 bg-gray-200 dark:bg-gray-800 text-sm sm:text-base">
        <p>© My Blog is Powered by Next.js + Tailwind CSS + Vercel</p>
      </footer>
    </div>
  );
}