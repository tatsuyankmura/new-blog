import dayjs from 'dayjs'

export const convertBlogDate = (blogDate: string) => {
  const day = dayjs(blogDate)
  return day.format('YYYY-MM-DD HH:mm:ss')
}
