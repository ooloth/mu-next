import Outer from 'layouts/outer'
import Header from 'components/header'

export default function Plays({ data, preview }) {
  return (
    <Outer>
      <Header title="Lab" summary="Trying things out to see what happens." />

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
