import Head from "next/head";
import Image from "next/image";
import LottieAnimation from "@/utils/LottieAnimation";
import { getPostsList } from "@/utils/PostsData";
import SearchInput from "@/posts/Input";
import ThemeSwitcher from "@/utils/ThemeSwitcher";
import Link from "next/link";


export default async function HomeDemo() {
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
            <h1 className="text-2xl font-bold ml-4">Joker Blog</h1>
            <SearchInput/>
            <ThemeSwitcher/>
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
                  github热门趋势
                </Link>
              </li>
              <li>
                <Link href="" className="hover:text-blue-500">
                  全部文章
                </Link>
              </li>
              {/* <li>
                <a href="" className="hover:text-blue-500">
                  关于
                </a>
              </li> */}
            </ul>
          </nav>
        </div>
      </header>

      {/* 2️⃣ 封面 */}
      <section className="relative bg-blue-500 text-white text-center py-12">
        <h2 className="text-4xl font-bold">欢迎来到我的博客</h2>
        <p className="mt-4 text-lg">技术-生活-分享</p>
      </section>

      {/* 3️⃣ 主要内容区 */}
      <main className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 3.1️⃣ 文章列表 */}
        <div className="md:col-span-2 space-y-6 max-h-[800px] overflow-y-auto">
          {/* 文章卡片 */}
          {posts.reverse().map((post) => (
            <article
              key={post.slug}
              className="bg-white dark:bg-gray-800 p-4 shadow rounded-lg relative"
            >
              <h4 className="text-1xl font-semibold "> {post.title}</h4>
              <p className="text-gray-600 dark:text-gray-300 ">
                {post.date}
              </p>
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

        {/* 3.2️⃣ 侧边栏 */}
        <aside className="bg-white dark:bg-gray-800 p-4 shadow rounded-lg">
          <h3 className="text-xl font-semibold">关于我</h3>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            我是一个看清楚现实逃跑的了的韭菜。
          </p>
          <div className="max-h-[400px] overflow-y-auto">
          <LottieAnimation />
          <LottieAnimation />
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
