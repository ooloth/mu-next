import { groq } from 'next-sanity'

import { getClient } from './client'

const pageQuery = groq`*`

export async function getAllPageSlugs(preview) {
  const pageSlugs = await getClient(preview).fetch(pageQuery)
  return pageSlugs
}

export async function getAllPageContent(preview) {
  const pages = await getClient(preview).fetch(pageQuery)
  return pages
}
