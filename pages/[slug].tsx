import ErrorPage from 'next/error'
import { useRouter } from 'next/router'

import Post from '../components/post'
import { getAllPostSlugs, getPostDetails } from '../lib/sanity/posts'

// See step 8 here: https://graphcms.com/blog/forms-and-submissions-with-nextjs-and-graphql#8-build-pages-programatically-with-nextjs

export default function Index({ post, preview }) {
  const router = useRouter()

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <>
      {post && <Post post={post} preview={preview} />}
      {/* <pre>{JSON.stringify(post, null, 2)}</pre> */}
    </>
  )
}

export async function getStaticProps({ params, preview = false }) {
  // TODO: get page data as well
  const post = await getPostDetails(params.slug, preview)

  return {
    props: {
      // page,
      post,
      preview,
    },
  }
}

export async function getStaticPaths() {
  // TODO: get page route as well
  const slugs = await getAllPostSlugs()

  return {
    paths: slugs.map(slug => ({ params: { slug } })),
    fallback: true,
  }
}
