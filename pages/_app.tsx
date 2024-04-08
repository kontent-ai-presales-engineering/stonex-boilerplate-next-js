import '../styles/globals.css'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { Html } from 'next/document'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="layout">
      <Component {...pageProps} />
      <Html lang="en-gb">
        <Head>
          <title>Kontent.ai Next.js boilerplate</title>
          <meta name='description' content="Discover the fascinating world of Dancing Goat high-quality coffee and you will never miss a single coffee break again." />
          <link rel="icon" href="/favicon.png" />
        </Head>
      </Html>
    </div>
  )
}

