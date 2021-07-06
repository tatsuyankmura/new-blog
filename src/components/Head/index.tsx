import NextHead from 'next/head'
import { createTitle, createOgpPath, createUrl } from '../../utils/head'
import { BLOG_TITLE } from '../../config/constants'

type Props = {
  title?: string
  description?: string
  blogId?: string
}

export const Head = ({ title = BLOG_TITLE, description = '', blogId = '' }: Props) => (
  <NextHead>
    <title>{createTitle(title)}</title>
    <meta property="og:title" content={createTitle(title)} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="blog" />
    <meta property="og:url" content={createUrl(blogId)} />
    <meta property="og:image" content={createOgpPath(blogId)} />
    <meta property="og:site_name" content={title} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content={createUrl(blogId)} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={createOgpPath(blogId)} />
    <link rel="canonical" href={createUrl(blogId)} />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500&display=swap"
      rel="stylesheet"
    />
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-1HQ8Y2QB4Y"></script>
    <script>
      window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments)}
      gtag('js', new Date()); gtag('config', 'G-1HQ8Y2QB4Y');
    </script>
  </NextHead>
)
