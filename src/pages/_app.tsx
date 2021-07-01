import Link from 'next/link'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { BLOG_TITLE } from '../config/constants'
import '../styles/app.scss'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <div className="container">
      <header className="header">
        <h1 className="blog-name">
          <Link href="/">{BLOG_TITLE}</Link>
        </h1>
      </header>
      <Component {...pageProps} />
    </div>
  )
}

export default App
