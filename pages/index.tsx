import Head from 'next/head'
import GoogleFonts from 'next-google-fonts'
import Link from 'next/link'

import { getAllPostsForHome } from '../lib/sanity/posts'

export default function Home({ data, preview }) {
  return (
    <>
      <>
        <GoogleFonts href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" />
        <Head>
          <title>Michael Uloth</title>
        </Head>
      </>

      <nav className="flex justify-between mt-16 mx-auto max-w-2xl">
        {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
        <button className="rounded bg-gray-700 p-1 w-8 h-8 leading-none text-xl">
          ☀️
        </button>

        <ul className="flex">
          <li className="leading-none">
            <Link href="/writes">
              <a className="ml-5 text-xl text-gray-500 dark:text-gray-400">Blog</a>
            </Link>
          </li>
          <li className="leading-none">
            <Link href="/writes">
              <a className="ml-5 text-xl text-gray-500 dark:text-gray-400">Stats</a>
            </Link>
          </li>
          <li className="leading-none">
            <Link href="/writes">
              <a className="ml-5 text-xl text-gray-500 dark:text-gray-400">Notes</a>
            </Link>
          </li>
          <li className="leading-none">
            <Link href="/writes">
              <a className="ml-5 text-xl text-gray-500 dark:text-gray-400">About</a>
            </Link>
          </li>
        </ul>
      </nav>

      <header className="mt-16 mx-auto max-w-2xl">
        {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
        <h1 className="text-6xl font-extrabold tracking-tighter text-gray-900 dark:text-gray-200">
          Hi, I'm Michael. 👋
        </h1>
        <p className="mt-3 leading-relaxed text-xl tracking-tight text-gray-500 dark:text-gray-400">
          I'm a web developer and opera singer working for ecobee in Toronto.
        </p>
      </header>

      <main></main>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}

      <footer className="mt-14">
        <nav>
          <ul className="flex justify-center mx-auto max-w-3xl">
            <li className="mx-2">
              <Link href="/writes">
                <a className="text-gray-500 dark:text-gray-400">/uses</a>
              </Link>
            </li>
            <li className="mx-2">
              <Link href="/writes">
                <a className="text-gray-500 dark:text-gray-400">/likes</a>
              </Link>
            </li>
            <li className="mx-2">
              <Link href="/writes">
                <a className="text-gray-500 dark:text-gray-400">/newsletter</a>
              </Link>
            </li>
          </ul>
        </nav>
      </footer>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const data = await getAllPostsForHome(preview)
  return {
    props: { data, preview },
  }
}
