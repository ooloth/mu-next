import Layout from 'components/layout'
import Header from 'components/header'

export default function Plays({ data, preview }) {
  return (
    <Layout>
      <Header
        title="Lab"
        emoji={{
          picture: '⚗️',
          label: 'Blue liquid in a clear glass scientific device for testing.',
        }}
        summary="Trying things out to see what happens."
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
