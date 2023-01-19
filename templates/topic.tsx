import Link from 'next/link'
import { NextSeo, ArticleJsonLd } from 'next-seo'
import { format } from 'timeago.js'

import Outer from 'layouts/outer'
import Emoji from 'components/emoji'

export default function Topic({ topic, bookmarks }) {
  const title = topic.properties['Name'].title[0].plain_text
  const description = topic.properties['Description'].rich_text[0].plain_text
  const slug = topic.properties['Path'].rich_text[0].plain_text
  const dateUpdated = topic.properties['Last edited'].last_edited_time

  return (
    <Outer narrow>
      <TopicSeo
        title={title}
        slug={slug}
        description={description}
        dateUpdated={dateUpdated}
        featuredImage={null}
      />

      <article>
        <header>
          <h1 className="mb-0 leading-tight font-extrabold text-4xl">{title}</h1>
          <p className="mt-3 text-sm text-gray-700 dark:text-gray-500">
            Updated {format(dateUpdated)}
          </p>
        </header>

        <div className="mt-8 prose dark:prose-dark lg:prose-lg dark:lg:prose-lg">
          {bookmarks.map(bookmarksSubtopic => (
            <Subtopic
              key={bookmarksSubtopic.subtopic}
              heading={bookmarksSubtopic.subtopic}
              bookmarks={bookmarksSubtopic.bookmarks}
            />
          ))}
        </div>
      </article>
    </Outer>
  )
}

const TopicSeo = ({ title, slug, description, featuredImage, dateUpdated }) => {
  const url = `https://michaeluloth.com/${slug}`

  const date = new Date(dateUpdated).toISOString()

  const image = featuredImage
    ? {
        url: `https://michaeluloth.com${featuredImage}`,
        alt: title,
      }
    : {
        alt: 'Michael Uloth smiling into the camera',
        url: 'https://michaeluloth.com/images/michael-landscape.jpg',
        width: 2883,
        height: 2058,
      }

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          type: 'article',
          article: {
            publishedTime: date,
          },
          url,
          title,
          description,
          images: [image],
        }}
      />

      <ArticleJsonLd
        authorName="Michael Uloth"
        dateModified={date}
        datePublished={date}
        description={description}
        images={[image.url]}
        publisherLogo="/static/favicons/android-chrome-192x192.png"
        publisherName="Michael Uloth"
        title={title}
        url={url}
      />
    </>
  )
}

function Subtopic({ heading, bookmarks }) {
  return (
    <section>
      <h2>{heading}</h2>
      <ul>
        {bookmarks.map(({ url, emoji, title, description, creators }) => (
          <li key={url}>
            <Emoji picture={emoji.picture} label={emoji.label} />
            {` `}
            <Link href={url}>{title}</Link>
            {` • `}
            {description ?? creators}
          </li>
        ))}
      </ul>
    </section>
  )
}
