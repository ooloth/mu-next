import Layout from 'components/layout'
import Header from 'components/header'

export default function Writes({ data, preview }) {
  return (
    <Layout>
      <Header
        title="Blog"
        emoji={{
          picture: '✍️',
          label: 'A hand writing with a pen.',
        }}
        summary="Things I've learned about coding."
      />

      <main>{/* <pre>{JSON.stringify(data, null, 2)}</pre> */}</main>
    </Layout>
  )
}

// export async function getStaticProps({ preview = false }) {
//   const data = await getAllPostsForHome(preview)
//   return {
//     props: { data, preview },
//   }
// }
