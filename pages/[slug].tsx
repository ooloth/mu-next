import { getAllPageContent /* getAllPageSlugs */ } from '../lib/sanity/pages'

// See step 8 here: https://graphcms.com/blog/forms-and-submissions-with-nextjs-and-graphql#8-build-pages-programatically-with-nextjs

export default function Index(props) {
  return <pre>{JSON.stringify(props, null, 2)}</pre>
}

export async function getStaticProps({ preview = false }) {
  const data = await getAllPageContent(preview)
  return {
    props: { data, preview },
  }
}

// export async function getStaticPaths() {
//   const slugs = await getAllPageSlugs(preview)

//   return {
//     paths: pages.map(({ slug }) => ({ params: { slug } })),
//     fallback: false,
//   }
// }
