// pages/posts/[slug].js
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { useRouter } from 'next/router'
import ReactMarkdown from 'react-markdown'

const Post = ({ post }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
      <h1 className="text-4xl font-bold">{post.title}</h1>
      <p className="text-sm text-gray-500">{post.date}</p>
      <div className="prose mt-6">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </div>
  )
}

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), 'posts')
  const fileNames = fs.readdirSync(postsDirectory)

  const paths = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '')
    return {
      params: {
        slug,
      },
    }
  })

  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  const { slug } = params
  const postsDirectory = path.join(process.cwd(), 'posts')
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const { data, content } = matter(fileContents)

  return {
    props: {
      post: {
        title: data.title,
        date: data.date,
        content,
      },
    },
  }
}

export default Post
