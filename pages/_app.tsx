import '../styles/globals.css'
import Head from 'next/head'
import { AppProps } from 'next/app'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="layout">
      <Component {...pageProps} />
      <Head>
        <title>Kontent.ai Next.js boilerplate</title>
        <meta name='description' content="Discover the fascinating world of Dancing Goat high-quality coffee and you will never miss a single coffee break again." />
        <link rel="icon" href="/favicon.png" />
      </Head>
    </div>
  )
}