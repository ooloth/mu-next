import { MDXRemote } from 'next-mdx-remote'
import { NextSeo, ArticleJsonLd } from 'next-seo'
import { format } from 'timeago.js'

import Outer from 'layouts/outer'
import Emoji from 'components/emoji'
import Block from 'lib/notion/ui/Block'

const ArticleSeo = ({ title, slug, description, featuredImage, date }) => {
  const url = `https://michaeluloth.com/${slug}`
  const formattedDate = new Date(date).toISOString()
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
            publishedTime: formattedDate,
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

export default function Article({ article }) {
  const { type, title, slug, description, featuredImage, date } =
    parsePostProperties(article)

  return (
    <Outer narrow>
      <ArticleSeo
        title={title}
        slug={slug}
        description={description}
        featuredImage={featuredImage}
        date={date}
      />

      <article>
        <header>
          <h1 className="mb-0 leading-tight font-extrabold text-4xl">
            {title}
            {type === '🔖' && (
              <>
                &nbsp;
                <Emoji picture={type} />
              </>
            )}
          </h1>
          <p className="mt-3 text-sm text-gray-700 dark:text-gray-500">
            Updated {format(date)}
          </p>
        </header>

        <div className="mt-8 prose dark:prose-dark lg:prose-lg dark:lg:prose-lg">
          {article?.mdxSource ? (
            <MDXRemote {...article.mdxSource} />
          ) : (
            article.blocks.map(block => <Block key={block.id} block={block} />)
          )}
        </div>
      </article>
    </Outer>
  )
}

/**
 * Parses the post metadata, regardless of whether it comes from Notion or MDX.
 */
function parsePostProperties(post) {
  const type = post?.properties
    ? post.properties['Type'].select.name
    : post.frontMatter.type

  const title = post.properties
    ? post.properties['Title'].title[0].plain_text
    : post.frontMatter.title

  const slug = post?.properties
    ? post.properties['Slug'].rich_text[0].plain_text
    : post.frontMatter.slug

  const description = post?.properties
    ? post.properties['Description'].rich_text[0].plain_text
    : post.frontMatter.description

  const featuredImage = post?.properties
    ? // TODO: support an optional featured image in Notion posts?
      null
    : post.frontMatter.featuredImage

  const date = post?.properties
    ? post.properties['First published'].date.start
    : post.frontMatter.dateUpdated || post.frontMatter.datePublished

  return { type, title, slug, description, featuredImage, date }
}

// const discussUrl = slug =>
//   `https://mobile.twitter.com/search?q=${encodeURIComponent(
//     `https://michaeluloth.com/${slug}`,
//   )}`

// const editUrl = slug =>
//   `https://github.com/ooloth/mu-next/edit/master/content/blog/${slug}.mdx`

// function BlogFooter(frontMatter) {
//   return (
//     <footer className="mt-12 text-sm text-gray-700 dark:text-gray-300">
//       <a
//         href={discussUrl(frontMatter.slug)}
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         {'Discuss on Twitter'}
//       </a>
//       {` • `}
//       <a href={editUrl(frontMatter.slug)} target="_blank" rel="noopener noreferrer">
//         {'Edit on GitHub'}
//       </a>
//     </footer>
//   )
// }
