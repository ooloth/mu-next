import Outer from 'layouts/outer'
import Header from 'components/header'

export default function Likes({ data, preview }) {
  return (
    <Outer>
      <Header title="Likes" summary="You can't work all the time." />

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
