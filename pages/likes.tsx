import Layout from 'components/layout'
import Header from 'components/header'

export default function Likes({ data, preview }) {
  return (
    <Layout>
      <Header
        title="Likes"
        emoji={{
          picture: '❤️',
          label: 'A red heart',
        }}
        summary="You can't work all the time."
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
