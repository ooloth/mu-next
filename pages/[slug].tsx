import addImagePlaceholdersToMdxSource from 'lib/mdx/addImagePlaceholdersToMdxSource'
import { getFileNames, getFileContents } from 'lib/mdx/mdx'
import getTopics from 'lib/notion/getTopics'
import getTopicBySlug from 'lib/notion/getTopicBySlug'
import getBookmarksByIds from 'lib/notion/getBookmarksByIds'
import getSubtopicNameById from 'lib/notion/getSubtopicNameById'
import Article from 'templates/article'
import Note from 'templates/note'
import Topic from 'templates/topic'

export default function DynamicRoute({ article, note, topic, bookmarks }) {
  if (article) {
    return <Article article={article} />
  }

  if (note) {
    return <Note note={note} />
  }

  if (topic && bookmarks) {
    return <Topic topic={topic} bookmarks={bookmarks} />
  }

  return null
}

async function getTopicSlugs(): Promise<string[]> {
  const topics = await getTopics()

  const topicSlugs: string[] = topics.map(
    topic => topic.properties['Path'].rich_text[0].plain_text,
  )

  return topicSlugs
}

export async function getStaticPaths() {
  // Stop querying note file names after all bookmarks are migrated to Notion
  const articleFileNames = await getFileNames('articles')
  const noteFileNames = await getFileNames('notes')
  const topicSlugs = await getTopicSlugs()

  const allSlugs = [...articleFileNames, ...noteFileNames, ...topicSlugs].map(
    slug => slug.replace('.mdx', ''),
  )

  const deduplicatedSlugs = Array.from(new Set(allSlugs))

  const paths = deduplicatedSlugs.map(slug => ({ params: { slug } }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const article = await getFileContents('articles', params.slug)

  if (article) {
    const articleWithImagePlaceholders = await addImagePlaceholdersToMdxSource(
      article,
    )
    return { props: { article: articleWithImagePlaceholders } }
  }

  const note = await getFileContents('notes', params.slug)

  if (note) {
    return { props: { note } }
  }

  const topic = await getTopicBySlug(params.slug)

  if (!topic) return

  const topicBookmarkIds = topic.properties['Bookmarks'].relation.map(
    bookmark => bookmark.id,
  )

  const topicBookmarks = await getBookmarksByIds(topicBookmarkIds)

  let bookmarksBySubtopic = {}

  await Promise.all(
    topicBookmarks.map(async bookmark => {
      const bookmarkSubtopicId = bookmark.properties['Subtopic'].relation[0].id
      const bookmarkSubtopicName = await getSubtopicNameById(bookmarkSubtopicId)

      if (bookmarksBySubtopic[bookmarkSubtopicName]) {
        bookmarksBySubtopic[bookmarkSubtopicName] = [
          ...bookmarksBySubtopic[bookmarkSubtopicName],
          bookmark,
        ]
      } else {
        bookmarksBySubtopic[bookmarkSubtopicName] = [bookmark]
      }
    }),
  )

  return { props: { topic, bookmarks: bookmarksBySubtopic } }
}
