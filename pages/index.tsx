import Layout from 'components/layout'
import Header from 'components/header'

import { getAllPostsForHome } from '../lib/sanity/posts'

export default function Home({ data, preview }) {
  return (
    <Layout>
      <Header
        title="Hi, I'm Michael."
        emoji={{ picture: '👋', label: 'A hand waving "hello"' }}
        summary="I'm a web developer and opera singer working for ecobee in Toronto."
      />

      <main>{/* <pre>{JSON.stringify(data, null, 2)}</pre> */}</main>
    </Layout>
  )
}

export async function getStaticProps({ preview = false }) {
  const data = await getAllPostsForHome(preview)
  return {
    props: { data, preview },
  }
}
