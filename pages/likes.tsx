import Image from 'next/image'
import Link from 'next/link'
import { NextSeo } from 'next-seo'

import Outer from 'layouts/outer'
import Header from 'components/header'
import fetchItunesItems, { iTunesItem } from 'lib/itunes/fetchItunesItems'
import { albumsDbId, booksDbId, podcastsDbId } from 'lib/notion/constants'
import getDatabase from 'lib/notion/getDatabase'
import { tmdbMovieListId, tmdbTvListId } from 'lib/tmdb/constants'
import fetchTmdbList, { TmdbItem } from 'lib/tmdb/fetchTmdbList'

const seo = {
  url: 'https://michaeluloth.com/likes',
  title: 'Likes ❤️',
  description: 'TV shows, movies, albums, books and podcasts I liked a lot.',
}

interface LikesProps {
  tvShows: TmdbItem[]
  movies: TmdbItem[]
  books: iTunesItem[]
  albums: iTunesItem[]
  podcasts: iTunesItem[]
}

export default function LikesPage({
  tvShows,
  movies,
  books,
  albums,
  podcasts,
}: LikesProps) {
  return (
    <Outer>
      <NextSeo
        title={seo.title}
        description={seo.description}
        canonical={seo.url}
        openGraph={{ ...seo }}
      />

      <Header title="Likes" summary="You can't work all the time." />

      <main>
        <Category heading="TV" items={tvShows} info="TMDB" />
        <Category heading="Movies" items={movies} info="TMDB" />
        <Category heading="Books" items={books} info="Apple Books" />
        <Category heading="Albums" items={albums} info="Apple Music" />
        <Category heading="Podcasts" items={podcasts} info="Apple Podcasts" />
      </main>
    </Outer>
  )
}

type LikesItem = TmdbItem | iTunesItem

interface LikesCategory {
  heading: string
  items: LikesItem[]
  info: string
}

function Category({ heading, items, info }: LikesCategory) {
  return (
    <section className="mt-16">
      <h2 className="text-5xl font-extrabold">{heading}</h2>

      <ul className="flex relative mt-6 overflow-x-auto overflow-y-hidden hide-scrollbar scrolling-touch">
        {items.map(item => (
          <li key={item.id} className="flex-none mr-10 w-48">
            <Link
              href={item.link || 'https://youtu.be/dQw4w9WgXcQ'}
              aria-label={`Visit the ${info} page for "${item.title}" in a new window.`}
            >
              <a>
                <Image
                  src={item.imageUrl}
                  alt="" // decorative, so hide from screen readers
                  width={300}
                  height={
                    heading === 'Albums' || heading === 'Podcasts' ? 300 : 435
                  }
                  className="shadow-lg rounded bg-gray-900"
                />

                <p className="mt-2 leading-snug sm:leading-tight text-center font-semibold">
                  {item.title}
                </p>

                {'artist' in item && item.artist && (
                  <p className="mt-1 text-sm text-center font-semibold">
                    {item.artist}
                  </p>
                )}

                {item.date && (
                  <p className="mt-1 text-sm text-center font-semibold">
                    ({new Date(item.date).getFullYear()})
                  </p>
                )}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

async function fetchNotionLikesContent(notionDbId: string) {
  const rows = await getDatabase(notionDbId)

  const iTunesQueryData = rows.reduce((validatedItems, item) => {
    // @ts-ignore
    const name = item.properties['Title']?.title[0]?.plain_text
    // @ts-ignore
    const id = item.properties['Apple ID']?.number
    // @ts-ignore
    const date = item.properties['Date']?.date.start

    if (name && id && date) {
      return [...validatedItems, { name, id, date }]
    }

    return validatedItems
  }, [])

  return iTunesQueryData
}

export async function getStaticProps() {
  const bookList = await fetchNotionLikesContent(booksDbId)
  const albumList = await fetchNotionLikesContent(albumsDbId)
  const podcastList = await fetchNotionLikesContent(podcastsDbId)

  let tvShows: TmdbItem[],
    movies: TmdbItem[],
    books: iTunesItem[],
    albums: iTunesItem[],
    podcasts: iTunesItem[]

  await Promise.all([
    (tvShows = await fetchTmdbList(tmdbTvListId, 'tv')),
    (movies = await fetchTmdbList(tmdbMovieListId, 'movie')),
    (books = await fetchItunesItems(bookList, 'ebook', 'ebook')),
    (albums = await fetchItunesItems(albumList, 'music', 'album')),
    (podcasts = await fetchItunesItems(podcastList, 'podcast', 'podcast')),
  ])

  return {
    props: { tvShows, movies, books, albums, podcasts },
  }
}
