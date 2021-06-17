import Link from 'next/link'
import { NextSeo } from 'next-seo'
import { format } from 'timeago.js'

import Outer from 'layouts/outer'
import Header from 'components/header'

import { getAllFilesFrontMatter } from 'lib/mdx/mdx'

const seo = {
  url: 'https://michaeluloth.com/writing',
  title: 'Writing ✍',
  description: 'Thoughts about coding.',
}

export default function Writing({ articles }) {
  return (
    <Outer narrow>
      <NextSeo
        canonical={seo.url}
        title={seo.title}
        description={seo.description}
        openGraph={{ ...seo }}
      />
      <Header title="Writing" summary="Thoughts about coding." />
      <main>
        <section className="mt-14">
          <h2 className="sr-only">All Posts</h2>
          <Articles articles={articles} />
        </section>
      </main>
    </Outer>
  )
}

function Articles({ articles }) {
  return (
    <ol reversed>
      {articles.map(article => (
        <li key={article.slug} className="space-y-1 mb-8 leading-relaxed">
          <Link href={`/${article.slug}`}>
            <a className="text-lg font-semibold text-blue-500 dark:text-blue-400 hover:underline">
              {article.title}
            </a>
          </Link>
          <p className="clamp-2">{article.description}</p>
          <p className="text-sm text-gray-700 dark:text-gray-500">
            Updated {format(article.dateUpdated || article.datePublished)}
          </p>
        </li>
      ))}
    </ol>
  )
}

export async function getStaticProps() {
  const unsortedArticles = await getAllFilesFrontMatter('articles')

  const articles = unsortedArticles.sort((a, b) =>
    (b.dateUpdated || b.datePublished).localeCompare(
      a.dateUpdated || a.datePublished,
    ),
  )

  return { props: { articles } }
}
