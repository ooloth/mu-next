import Link from 'next/link'
import { NextSeo } from 'next-seo'
import { format } from 'timeago.js'

import Header from 'components/header'
import Outer from 'layouts/outer'
import getTopics from 'lib/notion/getTopics'

export default function Bookmarks({ topics }) {
  return (
    <Outer narrow>
      <NextSeo
        canonical={seo.url}
        title={seo.title}
        description={seo.description}
        openGraph={{ ...seo }}
      />

      <Header title="Bookmarks" summary="Helpful links about interesting topics." />

      <main>
        <section className="mt-14">
          <h2 className="sr-only">Topics</h2>

          <ul>
            {topics.map(topic => {
              const path = `/${topic.properties['Path'].rich_text[0].plain_text}`
              const name = topic.properties['Name'].title[0].plain_text
              const description = topic.properties['Description'].rich_text[0].plain_text
              const lastEdited = format(topic.properties['Last edited'].last_edited_time)

              return (
                <li key={path} className="space-y-1 mb-8 leading-relaxed">
                  <Link
                    href={path}
                    className="text-lg font-semibold text-blue-500 dark:text-blue-400 hover:underline"
                  >
                    {name}
                  </Link>
                  <p className="clamp-2">{description}</p>
                  <p className="text-sm text-gray-700 dark:text-gray-500">Updated {lastEdited}</p>
                </li>
              )
            })}
          </ul>
        </section>
      </main>
    </Outer>
  )
}

const seo = {
  url: 'https://michaeluloth.com/bookmarks',
  title: 'Bookmarks 🔖',
  description: 'Helpful links about interesting topics.',
}

export async function getStaticProps() {
  const topics = await getTopics()

  return {
    props: { topics },
    revalidate: 86400, // refetch data for this route once per day without requiring a new build
  }
}
