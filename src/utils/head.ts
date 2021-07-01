import { useRouter } from 'next/router'
import { BLOG_TITLE } from '../config/constants'

export const createTitle = (title: string) => {
  return title ? `${title} | ${BLOG_TITLE}` : BLOG_TITLE
}

export const createOgpPath = (blogId: string) => {
  return blogId
    ? `${process.env.NEXT_PUBLIC_WEB_URL}/api/blog/${blogId}/ogp`
    : `${process.env.NEXT_PUBLIC_WEB_URL}/images/ogp.png`
}

export const createUrl = (blogId: string) => {
  const router = useRouter()
  return blogId
    ? `${process.env.NEXT_PUBLIC_WEB_URL}/blog/${blogId}`
    : `${process.env.NEXT_PUBLIC_WEB_URL}${router.pathname}`
}
