import Link from 'next/link'
import { NextSeo } from 'next-seo'
import { format } from 'timeago.js'

import Outer from 'layouts/outer'
import Header from 'components/header'

import { getAllFilesFrontMatter } from 'lib/mdx/mdx'
import getPosts from 'lib/notion/getPosts'
import Emoji from 'components/emoji'

const seo = {
  url: 'https://michaeluloth.com/writing',
  title: 'Writing ✍',
  description: 'Thoughts about coding.',
}

export default function Writing({ posts }) {
  return (
    <Outer narrow>
      <NextSeo
        canonical={seo.url}
        title={seo.title}
        description={seo.description}
        openGraph={{ ...seo }}
      />
      <Header title="Writing" summary="Thoughts about coding." />
      <main>
        <section className="mt-14">
          <h2 className="sr-only">All Posts</h2>
          <Articles posts={posts} />
        </section>
      </main>
    </Outer>
  )
}

function Articles({ posts }) {
  return (
    <ol reversed>
      {posts.map(post => {
        const { type, title, slug, description, date } = parsePostProperties(post)

        return (
          <li key={slug} className="space-y-1 mb-8 leading-relaxed">
            <Link
              href={`/${slug}`}
              className="text-lg font-semibold text-blue-500 dark:text-blue-400 hover:underline"
            >
              {title}
              {type === '🔖' && (
                <>
                  &nbsp;
                  <Emoji picture={type} />
                </>
              )}
            </Link>
            <p className="clamp-2">{description}</p>
            <p className="text-sm text-gray-700 dark:text-gray-500">Updated {format(date)}</p>
          </li>
        )
      })}
    </ol>
  )
}

/**
 * Parses the post metadata, regardless of whether it comes from Notion or MDX.
 */
function parsePostProperties(post) {
  const type = post?.properties ? post.properties['Type'].select.name : post.type

  const title = post?.properties ? post.properties['Title'].title[0].plain_text : post.title

  const slug = post?.properties ? post.properties['Slug'].rich_text[0].plain_text : post.slug

  const description = post?.properties
    ? post.properties['Description'].rich_text[0].plain_text
    : post.description

  const date = post?.properties
    ? post.properties['First published'].date.start
    : post.dateUpdated || post.datePublished

  return { type, title, slug, description, date }
}

export async function getStaticProps() {
  const notionPosts = await getPosts()
  // Stop querying note frontmatter after all posts are migrated to Notion
  const unsortedMdxArticles = await getAllFilesFrontMatter('articles')

  // Prefer Notion version of duplicate posts by putting them first before deduping
  const allPosts = [...notionPosts, ...unsortedMdxArticles]

  const deduplicatedPosts = getUniquePosts(allPosts)

  const posts = deduplicatedPosts.sort((a, b) => {
    const aDatePublished = a?.properties
      ? a.properties['First published'].date.start // Notion post
      : a.datePublished // MDX article

    const bDatePublished = b?.properties
      ? b.properties['First published'].date.start // Notion post
      : b.datePublished // MDX article

    return bDatePublished.localeCompare(aDatePublished)
  })

  return {
    props: { posts },
    revalidate: 86400, // refetch data for this route once per day without requiring a new build
  }
}

function getUniquePosts(posts: any[]) {
  let uniquePostSlugs = new Set()

  const uniquePosts = posts.reduce((allUniquePosts, post) => {
    const postSlug = post?.properties
      ? post.properties['Slug'].rich_text[0].plain_text // Notion post
      : post.slug // MDX article

    if (uniquePostSlugs.has(postSlug)) {
      return allUniquePosts
    } else {
      uniquePostSlugs.add(postSlug)
      return [...allUniquePosts, post]
    }
  }, [])

  return uniquePosts
}
