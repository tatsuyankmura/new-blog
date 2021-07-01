import Link from 'next/link'
import { Head } from '../components/Head'
import { API_PATH } from '../config/constants'
import { convertBlogDate } from '../utils/day'

export default function Home({ blog }) {
  return (
    <>
      <Head />
      {blog.map((blog) => (
        <article className="article-list" key={blog.id}>
          <h2 className="article-list-title">
            <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
          </h2>
          <div className="article-list-date">{convertBlogDate(blog.createdAt)}</div>
        </article>
      ))}
    </>
  )
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  }
  const data = await fetch(API_PATH, key)
    .then((res) => res.json())
    .catch(() => null)
  return {
    props: {
      blog: data.contents,
    },
  }
}
