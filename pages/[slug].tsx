import hydrate from 'next-mdx-remote/hydrate'

import { getFiles, getFileBySlug } from 'lib/mdx'
import BlogLayout from 'layouts/blog'
import MDXComponents from 'components/mdx'

export default function Blog({ mdxSource, frontMatter }) {
  const content = hydrate(mdxSource, {
    components: MDXComponents,
  })

  return <BlogLayout frontMatter={frontMatter}>{content}</BlogLayout>
}

export async function getStaticPaths() {
  const articles = await getFiles('articles')

  return {
    paths: articles.map(p => ({
      params: {
        slug: p.replace(/\.mdx/, ''),
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const post = await getFileBySlug('articles', params.slug)

  return { props: post }
}
