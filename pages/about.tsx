import Outer from 'layouts/outer'
import Header from 'components/header'

export default function Uses({ data, preview }) {
  return (
    <Outer>
      <Header
        title="About"
        emoji={{
          picture: '🤪',
          label: `A zany face with eyes crossed and tongue out.`,
        }}
        summary="Singing → accounting → teaching → coding. Phew."
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
