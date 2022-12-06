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
          {/* TODO: render general subtopic first (create an array of subtopic names and sort them here?) */}
          {Object.entries(bookmarks).map(([subtopicName, subtopicBookmarks]) => (
            <Subtopic key={subtopicName} heading={subtopicName} bookmarks={subtopicBookmarks} />
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
        {bookmarks.map(({ properties }) => {
          const url = properties['URL']?.url
          const emojiPicture = emoji[properties['Format']?.select?.name]
          const title = properties['Name']?.title?.[0]?.plain_text
          const description = properties['Description']?.rich_text?.[0]?.plain_text
          const creators = properties['Creators']?.multi_select
            ?.map(creator => creator.name)
            .join(', ')

          return url && emojiPicture && title && creators ? (
            <li key={url}>
              <Emoji picture={emojiPicture} />
              {` `}
              <Link href={url}>{title}</Link>
              {` • `}
              {description ?? creators}
            </li>
          ) : null
        })}
      </ul>
    </section>
  )
}

const emoji = {
  Article: '✍️',
  'Code snippet': '👩‍💻',
  Course: '🧑‍🏫',
  Podcast: '🎧',
  Reference: '📖',
  Tool: '🧰',
  Tweet: '🐦',
  Video: '📺',
}
