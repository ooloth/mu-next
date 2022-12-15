import Link from 'next/link'
import { NextSeo } from 'next-seo'
import { format } from 'timeago.js'

import Outer from 'layouts/outer'
import Header from 'components/header'

import getPosts from 'lib/notion/getPosts'
import Emoji from 'components/emoji'

const seo = {
  url: 'https://michaeluloth.com/writing',
  title: 'Writing ✍',
  description: 'Thoughts about coding.',
}

export default function Writing({ posts }) {
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
          <Articles posts={posts} />
        </section>
      </main>
    </Outer>
  )
}

function Articles({ posts }) {
  return (
    <ol reversed>
      {posts.map(post => {
        const { type, title, slug, description, date } = parsePostProperties(post)

        return (
          <li key={slug} className="space-y-1 mb-8 leading-relaxed">
            <Link
              href={`/${slug}`}
              className="text-lg font-semibold text-blue-500 dark:text-blue-400 hover:underline"
            >
              {title}
              {type === 'link post' && (
                <>
                  &nbsp;
                  <Emoji picture="🔖" />
                </>
              )}
            </Link>
            <p className="clamp-2">{description}</p>
            <p className="text-sm text-gray-700 dark:text-gray-500">Updated {format(date)}</p>
          </li>
        )
      })}
    </ol>
  )
}

/**
 * Parses the Notion post properties
 */
function parsePostProperties(post) {
  const type = post.properties['Type'].select?.name
  const title = post.properties['Title'].title[0].plain_text
  const slug = post.properties['Slug'].rich_text[0].plain_text
  const description = post.properties['Description'].rich_text[0].plain_text
  const date = post.properties['First published'].date.start

  return { type, title, slug, description, date }
}

export async function getStaticProps() {
  const posts = await getPosts()

  return {
    props: { posts },
    revalidate: 86400, // refetch data for this route once per day without requiring a new build
  }
}
