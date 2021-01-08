import Outer from 'layouts/outer'
import Header from 'components/header'

export default function Learns({ data, preview }) {
  return (
    <Outer>
      <Header
        title="Notes"
        emoji={{
          picture: '📚',
          label: 'A stack of three hardcover books.',
        }}
        summary="Helpful resources I want to remember."
      />

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
