import hydrate from 'next-mdx-remote/hydrate'
import { format } from 'timeago.js'

import { getFiles, getFileBySlug } from 'lib/mdx'
import Outer from 'layouts/outer'
import BlogSeo from 'components/blog-seo'
import MDXComponents from 'components/mdx'

const discussUrl = slug =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(
    `https://michaeluloth.com/${slug}`,
  )}`

const editUrl = slug =>
  `https://github.com/ooloth/mu-next/edit/master/content/blog/${slug}.mdx`

function BlogFooter(frontMatter) {
  return (
    <footer className="mt-12 text-sm text-gray-700 dark:text-gray-300">
      <a
        href={discussUrl(frontMatter.slug)}
        target="_blank"
        rel="noopener noreferrer"
      >
        {'Discuss on Twitter'}
      </a>
      {` • `}
      <a href={editUrl(frontMatter.slug)} target="_blank" rel="noopener noreferrer">
        {'Edit on GitHub'}
      </a>
    </footer>
  )
}

export default function Blog({ mdxSource, frontMatter }) {
  const content = hydrate(mdxSource, {
    components: MDXComponents,
  })

  return (
    <Outer>
      <BlogSeo
        url={`https://michaeluloth.com/${frontMatter.slug}`}
        {...frontMatter}
      />

      <article>
        <header>
          <h1 className="mb-0 leading-tight font-extrabold text-4xl">
            {frontMatter.title}
          </h1>
          <p className="mt-3 text-sm text-gray-700 dark:text-gray-500">
            Updated {format(frontMatter.dateUpdated || frontMatter.datePublished)}
          </p>
        </header>

        <div className="mt-8 prose dark:prose-dark lg:prose-lg dark:lg:prose-lg">
          {content}
        </div>
      </article>
    </Outer>
  )
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
