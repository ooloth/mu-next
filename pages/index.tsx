import Head from 'next/head'

import { getAllPostsForHome } from '../lib/sanity/posts'

export default function Home({ data, preview }) {
  return (
    <>
      <Head>
        <title>Michael Uloth</title>
      </Head>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const data = await getAllPostsForHome(preview)
  return {
    props: { data, preview },
  }
}
