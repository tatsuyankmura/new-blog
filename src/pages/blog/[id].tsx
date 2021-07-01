import cheerio from 'cheerio'
import hljs from 'highlight.js'
import { Head } from '../../components/Head'
import { API_PATH } from '../../config/constants'
import { convertBlogDate } from '../../utils/day'
import 'highlight.js/styles/github-dark-dimmed.css'

export default function BlogId({ title, createdAt, body, id }) {
  return (
    <>
      <Head title={title} blogId={id} />
      <article className="article">
        <div className="article-header">
          <h1 className="article-title">{title}</h1>
          <div className="article-date">{convertBlogDate(createdAt)}</div>
        </div>
        <div className="article-content" dangerouslySetInnerHTML={{ __html: body }}></div>
      </article>
    </>
  )
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  }
  const data = await fetch(API_PATH, key)
    .then((res) => res.json())
    .catch(() => null)
  const paths = data.contents.map((content) => `/blog/${content.id}`)
  return { paths, fallback: false }
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
  const id = context.params.id
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  }
  const data = await fetch(`${API_PATH}/${id}`, key)
    .then((res) => res.json())
    .catch(() => null)

  const $ = cheerio.load(data.body)
  $('pre code').each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text())
    $(elm).html(result.value)
    $(elm).addClass(`hljs`)
  })

  return {
    props: {
      id: data.id,
      title: data.title,
      createdAt: data.createdAt,
      body: $.html(),
    },
  }
}
