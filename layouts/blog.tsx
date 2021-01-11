import Image from 'next/image'
import { parseISO, format } from 'date-fns'

import Outer from 'layouts/outer'
// import Subscribe from 'components/Subscribe'
import BlogSeo from 'components/blog-seo'

const discussUrl = slug =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(
    `https://michaeluloth.com/${slug}`,
  )}`

const editUrl = slug =>
  `https://github.com/ooloth/mu-next/edit/master/content/blog/${slug}.mdx`

export default function BlogLayout({ children, frontMatter }) {
  return (
    <Outer>
      <BlogSeo
        url={`https://michaeluloth.com/${frontMatter.slug}`}
        {...frontMatter}
      />

      <article className="mt-8">
        <h1 className="mb-8 font-bold text-3xl md:text-5xl tracking-tight text-black dark:text-white">
          {frontMatter.title}
        </h1>

        <div className="prose dark:prose-dark lg:prose-lg dark:lg:prose-lg">
          {children}
        </div>

        <footer className="mt-12 text-sm text-gray-700 dark:text-gray-300">
          <a
            href={discussUrl(frontMatter.slug)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {'Discuss on Twitter'}
          </a>
          {` • `}
          <a
            href={editUrl(frontMatter.slug)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {'Edit on GitHub'}
          </a>
        </footer>
      </article>
    </Outer>
  )
}
