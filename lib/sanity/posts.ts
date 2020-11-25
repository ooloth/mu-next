import { groq } from 'next-sanity'

import { getClient } from './client'

const testQuery = groq`*`

// const postQuery = groq`
//   *[_type == "post" && slug.current == $slug][0] {
//     _id,
//     title,
//     body,
//     mainImage,
//     categories[]->{
//       _id,
//       title
//     },
//     "slug": slug.current
//   }
// `

export async function getAllPostsForHome(preview) {
  const results = await getClient(preview).fetch(testQuery)
  return results
}
