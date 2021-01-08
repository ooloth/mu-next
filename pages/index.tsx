import Outer from 'layouts/outer'
import Header from 'components/header'

// import { getAllPostExcerpts } from '../lib/sanity/posts'

export default function Home({ data, preview }) {
  return (
    <Outer>
      <Header
        title="Hi, I'm Michael."
        emoji={{ picture: '👋', label: 'A hand waving "hello"' }}
        summary="I'm a web developer and opera singer working for ecobee in Toronto."
      />

      <main>{/* <pre>{JSON.stringify(data, null, 2)}</pre> */}</main>
    </Outer>
  )
}

// export async function getStaticProps({ preview = false }) {
//   const data = await getAllPostExcerpts(preview)
//   return {
//     props: { data, preview },
//   }
// }
