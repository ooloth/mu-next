import Link from 'next/link'

import Outer from 'layouts/outer'
import Header from 'components/header'
import { Heading } from 'components/elements'

import { getAllFilesFrontMatter } from 'lib/mdx'

export default function Blog({ articles }) {
  return (
    <Outer>
      <Header
        title="Blog"
        emoji={{
          picture: '✍️',
          label: 'A hand writing with a pen.',
        }}
        summary="Things I've learned about coding."
      />

      <main>
        <section className="mt-14">
          <h2 className="sr-only">All Posts</h2>
          {/* <Heading level={2} className="mb-7 text-4xl font-extrabold">
            Articles
          </Heading> */}

          <ol reversed>
            {articles.map(article => (
              <li key={article.slug} className="mb-9">
                <Link href={`/${article.slug}`}>
                  <a className="">
                    <header className="flex justify-between items-baseline">
                      <Heading
                        level={3}
                        className="leading-tight text-2xl font-semibold"
                      >
                        {article.title}
                      </Heading>
                      <p className="text-right">{article.datePublished}</p>
                    </header>
                    <p className="mt-2">{article.description}</p>
                  </a>
                </Link>
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
    (a, b) => Number(new Date(b.datePublished)) - Number(new Date(a.datePublished)),
  )

  return { props: { articles } }
}
