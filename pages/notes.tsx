import Link from 'next/link'
import { NextSeo } from 'next-seo'
import { format } from 'timeago.js'

import Header from 'components/header'
import Outer from 'layouts/outer'
// import { getAllFilesFrontMatter } from 'lib/mdx'
import { topicsDbId } from 'lib/notion/constants'
import getDatabase from 'lib/notion/getDatabase'

export default function Bookmarks({ notes, topics }) {
  console.log('topics', topics)

  return (
    <Outer narrow>
      <NextSeo
        canonical={seo.url}
        title={seo.title}
        description={seo.description}
        openGraph={{ ...seo }}
      />

      <Header title="Bookmarks" summary="Helpful links I want to remember." />

      <main>
        <section className="mt-14">
          <h2 className="sr-only">Topics</h2>

          <ul>
            {topics.map(topic => (
              <li key={topic.id} className="space-y-1 mb-8 leading-relaxed">
                <Link href={`/${topic.properties['Path'].rich_text[0].plain_text}`}>
                  <a className="text-lg font-semibold text-blue-500 dark:text-blue-400 hover:underline">
                    {topic.properties['Name'].title[0].plain_text}
                  </a>
                </Link>
                <p className="clamp-2">
                  {topic.properties['Description'].rich_text[0].plain_text}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-500">
                  Updated {format(topic.properties['Last edited'].last_edited_time)}
                </p>
              </li>
            ))}

            {/* {notes.map(note => (
              <li key={note.slug} className="space-y-1 mb-8 leading-relaxed">
                <Link href={`/${note.slug}`}>
                  <a className="text-lg font-semibold text-blue-500 dark:text-blue-400 hover:underline">
                    {note.title}
                  </a>
                </Link>
                <p className="clamp-2">{note.description}</p>
                <p className="text-sm text-gray-700 dark:text-gray-500">
                  Updated {format(note.dateUpdated)}
                </p>
              </li>
            ))} */}
          </ul>
        </section>
      </main>
    </Outer>
  )
}

const seo = {
  url: 'https://michaeluloth.com/notes',
  title: 'Bookmarks 🔖',
  description: 'Helpful links I want to remember.',
}

async function fetchNotionTopics() {
  const topics = await getDatabase({
    databaseId: topicsDbId,
    filter: {
      and: [
        {
          property: 'Name',
          title: {
            is_not_empty: true,
          },
        },
        {
          property: 'Path',
          rich_text: {
            is_not_empty: true,
          },
        },
        {
          property: 'Description',
          rich_text: {
            is_not_empty: true,
          },
        },
        {
          property: 'Subtopics',
          relation: {
            is_not_empty: true,
          },
        },
        {
          property: 'Bookmarks',
          relation: {
            is_not_empty: true,
          },
        },
      ],
    },
    sorts: [
      {
        property: 'Name',
        direction: 'ascending',
      },
    ],
  })

  return topics
}

export async function getStaticProps() {
  // const unsortedNotes = await getAllFilesFrontMatter('notes')
  // const notesByTitle = unsortedNotes.sort((a, b) => a.title.localeCompare(b.title))

  const topics = await fetchNotionTopics()

  return { props: { /*notes: notesByTitle,*/ topics } }
}
