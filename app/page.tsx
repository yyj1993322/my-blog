import Head from "next/head";
import Image from "next/image";
import LottieCat,{ NextAnimation } from "components/LottieAnimation";
import { getPostsList } from "components/PostsData";
import SearchPosts from "components/Search";
import ThemeSwitcher from "components/ThemeSwitcher";
import Link from "next/link";

export default async function HomePage() {
  const posts = await getPostsList();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Head>
        <title>Joker的博客</title>
        <meta name="description" content="分享技术与生活的个人博客" />
      </Head>

      {/* 1️⃣ 顶部导航栏 */}
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
          <div className="flex items-center">
            <Image src="/coding.png" alt="coding" width={60} height={60} />
            <SearchPosts />
            <ThemeSwitcher />
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link
                  href="https://github.com/trending"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500"
                >
                  github热门
                </Link>
              </li>
              <li>
                <Link href="/posts" className="hover:text-blue-500">
                  全部文章
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* 2️⃣ 封面 */}
      <section className="relative bg-blue-500 text-white text-center py-12">
        <h2 className="text-4xl font-bold">欢迎来到 Joker Blog</h2>
        <p className="mt-4 text-lg">技术-生活-分享</p>
      </section>

      {/* 3️⃣ 主要内容区 */}
      <main className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 文章列表 */}
        <div className="md:col-span-2 space-y-6 max-h-[800px] overflow-y-auto">
          {/* 文章卡片 */}
          {posts.map((post) => (
            <article
              key={post.slug}
              className="bg-white dark:bg-gray-800 p-4 shadow rounded-lg relative"
            >
              <h4 className="text-1xl font-semibold "> {post.title}</h4>
              <p className="text-gray-600 dark:text-gray-300 ">{post.date}</p>
              <div className="right-4 bottom-2 absolute">
                <Link
                  href={`/posts/${post.slug}`}
                  className="hover:text-blue-500 mt-2 no-underline "
                >
                  阅读全文
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* 侧边栏 */}
        <aside className="defalutBgText dark:bg-gray-800 p-4 shadow rounded-lg">
          <h3 className="text-xl font-semibold">关于我</h3>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            我是一个看清楚现实逃跑的了的韭菜。
          </p>
          <div className="h-[300px] w-[300px] overflow-y-auto flex justify-center items-center">
            <div className="flex justify-center items-center">
              <LottieCat />
              <NextAnimation />
            </div>
          </div>
        </aside>
      </main>

      {/* 4️⃣ 页脚 */}
      <footer className="text-center p-4 bg-gray-200 dark:bg-gray-800">
        <p>© My Blog is Powered by Next.js + Tailwind CSS + Vercel</p>
      </footer>
    </div>
  );
}
