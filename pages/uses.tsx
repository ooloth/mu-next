import Outer from 'layouts/outer'
import Header from 'components/header'

export default function Uses({ data, preview }) {
  return (
    <Outer>
      <Header title="Tools" summary="Gear I use to build cool things." />

      <main>{/* <pre>{JSON.stringify(data, null, 2)}</pre> */}</main>
    </Outer>
  )
}

// export async function getStaticProps({ preview = false }) {
//   const data = await getAllPostsForHome(preview)
//   return {
//     props: { data, preview },
//   }
// }
