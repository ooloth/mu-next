import Layout from 'components/layout'
import Header from 'components/header'

export default function Uses({ data, preview }) {
  return (
    <Layout>
      <Header
        title="Tools"
        emoji={{
          picture: '🧰',
          label: 'A red toolbox',
        }}
        summary="Gear I use to build cool things."
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
