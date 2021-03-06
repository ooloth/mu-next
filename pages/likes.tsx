import Image from 'next/image'
import Link from 'next/link'
import { NextSeo } from 'next-seo'

import Outer from 'layouts/outer'
import Header from 'components/header'
import fetchTmdbList, { TmdbItem } from 'lib/tmdb/fetchTmdbList'
import { iTunesItem } from 'lib/itunes/fetchItunesItems'

const seo = {
  url: 'https://michaeluloth.com/likes',
  title: 'Likes ❤️',
  description: 'TV shows, movies, albums, books and podcasts I liked a lot.',
}

export default function LikesPage({ tvShows, movies }) {
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

const Category = ({ heading, items, info }: LikesCategory) => (
  <section className="mt-16">
    <h2 className="text-5xl font-extrabold">{heading}</h2>

    <ul className="flex relative mt-4 overflow-x-auto overflow-y-hidden hide-scrollbar scrolling-touch">
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
                height={435}
                className="shadow-lg rounded"
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
                  ({item.date})
                </p>
              )}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  </section>
)

export async function getStaticProps() {
  const tvShows = await fetchTmdbList(process.env.TMDB_TV_LIST_ID, 'tv')
  const movies = await fetchTmdbList(process.env.TMDB_MOVIE_LIST_ID, 'movie')

  return {
    props: { tvShows, movies },
  }
}
