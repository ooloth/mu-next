import Outer from 'layouts/outer'
import Header from 'components/header'

export default function Tracks({ data, preview }) {
  return (
    <Outer>
      <Header
        title="Stats"
        emoji={{
          picture: '👀',
          label: 'Two eyes looking to the left.',
        }}
        summary="Numbers I track just for fun."
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
