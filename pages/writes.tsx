import Link from 'next/link'

import Layout from 'components/layout'
import Header from 'components/header'
import { Heading } from 'components/elements'

import { getAllPostExcerpts } from 'lib/sanity/posts'

export default function Writes({ excerpts, preview }) {
  return (
    <Layout>
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
          <Heading level={2} className="mb-7 text-4xl font-extrabold">
            Articles
          </Heading>

          <ol reversed>
            {excerpts.map(excerpt => (
              <li key={excerpt.slug} className="mb-9">
                <Link href={`/${excerpt.slug}`}>
                  <a className="">
                    <header className="flex justify-between items-baseline">
                      <Heading
                        level={3}
                        className="leading-tight text-2xl font-semibold"
                      >
                        {excerpt.title}
                      </Heading>
                      <p className="text-right">{excerpt.published}</p>
                    </header>
                    <p className="mt-2">{excerpt.summary}</p>
                  </a>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14">
          <Heading level={2} className="mb-5 text-4xl font-extrabold">
            Up and Running with Gatsby
          </Heading>
        </section>

        {/* <pre className="mt-6">{JSON.stringify(excerpts, null, 2)}</pre> */}
      </main>
    </Layout>
  )
}

export async function getStaticProps({ preview = false }) {
  // See: https://github.com/sanity-io/next-sanity#example-minimal-blog-post-template
  const excerpts = await getAllPostExcerpts(preview)

  return {
    props: { excerpts, preview },
  }
}
