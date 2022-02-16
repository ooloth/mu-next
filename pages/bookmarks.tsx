import Link from 'next/link'
import { NextSeo } from 'next-seo'
import { format } from 'timeago.js'

import Header from 'components/header'
import Outer from 'layouts/outer'
import getTopics from 'lib/notion/getTopics'
import { getAllFilesFrontMatter } from 'lib/mdx/mdx'

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
              const path = topic?.properties
                ? `/${topic.properties['Path'].rich_text[0].plain_text}`
                : `/${topic.slug}`

              const name = topic?.properties
                ? topic.properties['Name'].title[0].plain_text
                : topic.title

              const description = topic?.properties
                ? topic.properties['Description'].rich_text[0].plain_text
                : topic.description

              const lastEdited = format(
                topic?.properties
                  ? topic.properties['Last edited'].last_edited_time
                  : topic.dateUpdated,
              )

              return (
                <li key={path} className="space-y-1 mb-8 leading-relaxed">
                  <Link href={path}>
                    <a className="text-lg font-semibold text-blue-500 dark:text-blue-400 hover:underline">
                      {name}
                    </a>
                  </Link>
                  <p className="clamp-2">{description}</p>
                  <p className="text-sm text-gray-700 dark:text-gray-500">
                    Updated {lastEdited}
                  </p>
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
  // Stop querying note frontmatter after all bookmarks are migrated to Notion
  const unsortedNotes = await getAllFilesFrontMatter('notes')
  const topics = await getTopics()

  const allTopics = [...unsortedNotes, ...topics]

  const deduplicatedTopics = getUniqueTopics(allTopics)

  const sortedTopics = deduplicatedTopics.sort((a, b) => {
    const aTitle = a?.properties
      ? a.properties['Name'].title[0].plain_text
      : a.title

    const bTitle = b?.properties
      ? b.properties['Name'].title[0].plain_text
      : b.title

    return aTitle.localeCompare(bTitle)
  })

  return {
    props: { topics: sortedTopics },
    revalidate: 86400, // refetch data for this route once per day without requiring a new build
  }
}

function getUniqueTopics(topics: any[]) {
  let uniqueTopicNames = new Set()

  const uniqueTopics = topics.reduce((allUniqueTopics, topic) => {
    const topicName = topic?.properties
      ? topic.properties['Name'].title[0].plain_text
      : topic.title

    if (uniqueTopicNames.has(topicName)) {
      return allUniqueTopics
    } else {
      uniqueTopicNames.add(topicName)
      return [...allUniqueTopics, topic]
    }
  }, [])

  return uniqueTopics
}
