import type { NextPage } from 'next'
import Head from 'next/head'

import Counter from '../../src/features/counter/Counter'
import styles from './CounterHome.module.css'

const IndexPage: NextPage = () => {

  return (
    <>
      <Head>
        <title>Redux Toolkit</title>
        <link rel="icon" href="/front/public/favicon.ico" />
      </Head>
      <header className="w-screen h-screen">
        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className={styles.link}
            href="front/pages/counter/index"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className={styles.link}
            href="front/pages/counter/index"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className={styles.link}
            href="front/pages/counter/index"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className={styles.link}
            href="front/pages/counter/index"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </>
  )
}

export default IndexPage
