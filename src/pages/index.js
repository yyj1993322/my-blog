// pages/index.js
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

const Home = ({ posts }) => {
  return (
    <div>
      <h1>Joker Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`}>
              <h3>{post.title}</h3>
              <p>{post.date}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), "posts");
  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title,
      date: data.date,
    };
  });

  return {
    props: {
      posts,
    },
  };
}

export default Home;
