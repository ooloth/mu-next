import Layout from 'components/layout'
import Header from 'components/header'

export default function Uses({ data, preview }) {
  return (
    <Layout>
      <Header
        title="About"
        emoji={{
          picture: '🤪',
          label: `A zany face with eyes crossed and tongue out.`,
        }}
        summary="Singing → accounting → teaching → coding. Phew."
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
