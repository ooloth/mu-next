import Link from 'next/link'
import { NextSeo } from 'next-seo'
import { format } from 'timeago.js'

import Outer from 'layouts/outer'
import Header from 'components/header'
import { getAllFilesFrontMatter } from 'lib/mdx'

const seo = {
  url: 'https://michaeluloth.com/notes',
  title: 'Notes 📝',
  description: 'Helpful ideas and links I want to remember.',
}

export default function Notes({ notes }) {
  return (
    <Outer>
      <NextSeo
        canonical={seo.url}
        title={seo.title}
        description={seo.description}
        openGraph={{ ...seo }}
      />

      <Header title="Notes" summary="Helpful ideas and links I want to remember." />

      <main>
        <section className="mt-14">
          <h2 className="sr-only">All Posts</h2>

          <ul>
            {notes.map(note => (
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
            ))}
          </ul>
        </section>
      </main>
    </Outer>
  )
}

export async function getStaticProps() {
  const unsortedNotes = await getAllFilesFrontMatter('notes')
  const notesByTitle = unsortedNotes.sort((a, b) => a.title.localeCompare(b.title))

  return { props: { notes: notesByTitle } }
}
