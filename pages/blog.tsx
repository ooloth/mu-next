import Link from 'next/link'
import { NextSeo } from 'next-seo'
import { format } from 'timeago.js'

import Outer from 'layouts/outer'
import Header from 'components/header'

import { getAllFilesFrontMatter } from 'lib/mdx'

const seo = {
  url: 'https://michaeluloth.com/blog',
  title: 'Blog ✍',
  description: 'Thoughts about coding and web development.',
}

export default function Blog({ articles }) {
  return (
    <Outer>
      <NextSeo
        canonical={seo.url}
        title={seo.title}
        description={seo.description}
        openGraph={{ ...seo }}
      />
      <Header title="Blog" summary="Thoughts about coding and web development." />

      <main>
        <section className="mt-14">
          <h2 className="sr-only">All Posts</h2>

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
        </section>

        {/* <section className="mt-14">
          <Heading level={2} className="mb-5 text-4xl font-extrabold">
            Up and Running with Gatsby
          </Heading>
        </section> */}
      </main>
    </Outer>
  )
}

export async function getStaticProps() {
  const unsortedArticles = await getAllFilesFrontMatter('articles')
  const articles = unsortedArticles.sort(
    (a, b) =>
      Number(new Date(b.dateUpdated || b.datePublished)) -
      Number(new Date(a.dateUpdated || a.datePublished)),
  )

  return { props: { articles } }
}
