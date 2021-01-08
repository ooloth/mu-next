// See: https://github.com/sanity-io/next-sanity#example-minimal-blog-post-template
import { groq } from 'next-sanity'

import { getClient } from './client'

interface SanityImageBase {
  asset: any
  crop?: any
  hotspot?: any
}

interface SanityImageCustom extends SanityImageBase {
  alt: string
  aspectRatio: number
  caption?: string
  eager?: boolean
  height: number
  lqip: string
  width: number
}

interface SanityUnsplashImage extends SanityImageCustom {
  creditLine: string
  description: string
}

// interface SanityImageUpload extends SanityImageCustom {}

// export type SanityImage = SanityUnsplashImage | SanityImageUpload

export type SanityImage = SanityUnsplashImage

type SanityPostBody = any[]

interface SanityPost {
  body: SanityPostBody
  devToLink: string
  image: SanityImage
  published: string
  slug: string
  summary: string
  title: string
  twitterLink: string
  updated: string
  _id: string
}

const imageQuery = groq`
  'alt': @.alt,
  'asset': @.asset,
  "aspectRatio": @.asset->metadata.dimensions.aspectRatio, 
  'caption': @.caption,
  "creditLine": @.asset->creditLine,       
  'crop': @.crop,
  "description": @.asset->description,       
  "height": @.asset->metadata.dimensions.height, 
  'hotspot': @.hotspot,
  'eager': @.eager,
  "lqip": @.asset->metadata.lqip,
  "width": @.asset->metadata.dimensions.width, 
`

const slugsQuery = groq`*[_type == "post" && defined(slug.current)][].slug.current`

const excerptQuery = groq`
  *[_type == "post"] | order(published desc){
    title,
    "slug": slug.current,
    summary,
    published,
    updated
  }
`

// See: https://hangindev.com/blog/create-a-custom-figure-block-in-sanity-that-supports-lazy-loading-effect
const postDetailsQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    'slug': slug.current,
    summary,
    'image': { 
      ${imageQuery}
    },
    published,
    updated,
    body[] {
      ...,
      _type == "image" => { 
        ${imageQuery}
      }
    },
    twitterLink,
    devToLink
  }
`

export async function getAllPostSlugs() {
  return await getClient(false).fetch<string[]>(slugsQuery)
}

export async function getAllPostExcerpts(preview: boolean) {
  return await getClient(preview).fetch<SanityPost[]>(excerptQuery)
}

export async function getPostDetails(slug: string, preview: boolean) {
  return await getClient(preview).fetch<SanityPost[]>(postDetailsQuery, {
    slug,
  })
}
