import { MDXRemote } from 'next-mdx-remote'
import { NextSeo, ArticleJsonLd } from 'next-seo'
import { format } from 'timeago.js'

import Outer from 'layouts/outer'

export default function Note({ note: { mdxSource, frontMatter } }) {
  return (
    <Outer narrow>
      <NoteSeo {...frontMatter} />

      <article>
        <header>
          <h1 className="mb-0 leading-tight font-extrabold text-4xl">{frontMatter.title}</h1>
          <p className="mt-3 text-sm text-gray-700 dark:text-gray-500">
            Updated {format(frontMatter.dateUpdated || frontMatter.datePublished)}
          </p>
        </header>

        <div className="mt-8 prose dark:prose-dark lg:prose-lg dark:lg:prose-lg">
          <MDXRemote {...mdxSource} />
        </div>
      </article>
    </Outer>
  )
}

const NoteSeo = ({ title, slug, description, featuredImage, dateUpdated }) => {
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
