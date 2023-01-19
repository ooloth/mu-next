import getTopics from 'lib/notion/getTopics'
import getTopicBySlug from 'lib/notion/getTopicBySlug'
import Article from 'templates/article'
import Topic from 'templates/topic'
import getPosts from 'lib/notion/getPosts'
import getBlockChildren from 'lib/notion/getBlockChildren'
import getBookmarkedResearchByIds from 'lib/notion/getBookmarkedResearchByIds'
import getRelationPropertyValueIds from 'lib/notion/getRelationPropertyValueIds'

export default function DynamicRoute({ article, topic, bookmarks }) {
  if (article) {
    return <Article article={article} />
  }

  if (topic && bookmarks) {
    return <Topic topic={topic} bookmarks={bookmarks} />
  }

  return null
}

async function getPostSlugs(): Promise<string[]> {
  const posts = await getPosts()

  const postSlugs: string[] = posts.map(post => post.properties['Slug'].rich_text[0].plain_text)

  return postSlugs
}

async function getTopicSlugs(): Promise<string[]> {
  const topics = await getTopics()

  const topicSlugs: string[] = topics.map(topic => topic.properties['Path'].rich_text[0].plain_text)

  return topicSlugs
}

export async function getStaticPaths() {
  const postSlugs = await getPostSlugs()
  const topicSlugs = await getTopicSlugs()

  const allSlugs = [...postSlugs, ...topicSlugs]

  const paths = allSlugs.map(slug => ({ params: { slug } }))

  return { paths, fallback: 'blocking' }
}

export async function getStaticProps({ params }) {
  const allPosts = await getPosts()
  const post = allPosts.find(
    post => post.properties['Slug'].rich_text[0].plain_text === params.slug,
  )

  if (post) {
    const postBlocks = await getBlockChildren(post.id)
    return {
      props: {
        article: { properties: post.properties, blocks: postBlocks },
      },
    }
  }

  const topic = await getTopicBySlug(params.slug)

  if (!topic) return { props: {} }

  const topicResearchIds = await getRelationPropertyValueIds({
    pageId: topic.id,
    relationPropertyId: topic.properties['Research'].id,
  })

  const topicBookmarkedResearch = await getBookmarkedResearchByIds(topicResearchIds)

  const bookmarkedResearchBySubtopic: Record<string, any[]> = topicBookmarkedResearch.reduce(
    (researchBySubtopic, research) => {
      const researchSubtopics = research.properties['Subtopics'].multi_select

      researchSubtopics.forEach(subtopic => {
        // Remove "Topic > " from beginning of string
        const subtopicName = subtopic.name.replace(/^.*>\s/, '')

        if (researchBySubtopic[subtopicName]) {
          researchBySubtopic[subtopicName] = [...researchBySubtopic[subtopicName], research]
        } else {
          researchBySubtopic[subtopicName] = [research]
        }
      })

      return researchBySubtopic
    },
    {},
  )

  type SubtopicBookmarks = {
    subtopic: string
    bookmarks: Bookmark[]
  }

  const bookmarksBySubtopic: SubtopicBookmarks[] = Object.entries(
    bookmarkedResearchBySubtopic,
  ).reduce((subtopicsArray: SubtopicBookmarks[], [subtopic, bookmarks]) => {
    const subtopicBookmarks = {
      subtopic,
      bookmarks: getParsedBookmarks(bookmarks),
    }

    if (subtopic === 'General' || subtopic === 'Introduction') {
      // Sort "Introduction" and "General" to the top of the page
      subtopicsArray.unshift(subtopicBookmarks)
    } else {
      subtopicsArray.push(subtopicBookmarks)
    }

    return subtopicsArray
  }, [])

  return {
    props: {
      topic,
      bookmarks: bookmarksBySubtopic,
    },
    revalidate: 86400, // refetch data for this route once per day without requiring a new build
  }
}

type Bookmark = {
  url: string
  emoji: {
    picture: string
    label: string
  }
  title: string
  description?: string
  creators?: string
}

function getParsedBookmarks(notionBookmarks: any[]): Bookmark[] {
  return notionBookmarks.map(getParsedBookmark).filter(Boolean)
}

function getParsedBookmark(notionBookmark: any): Bookmark {
  const { properties } = notionBookmark

  const title = properties['Name']?.title?.[0]?.plain_text
  const description = properties['Description']?.rich_text?.[0]?.plain_text ?? null
  const creators =
    properties['Creators']?.multi_select?.map(creator => creator.name).join(', ') ?? null
  const url = properties['URL']?.url

  const emojiPicture = properties['Format']?.select?.name
  const emojiLabel = emojiLabels[emojiPicture]
  const emoji = { picture: emojiPicture, label: emojiLabel }

  // TODO: log which properties were missing?
  if (title && url && emoji.picture && emoji.label && (creators || description)) {
    return { title, url, emoji, creators, description }
  } else {
    return null
  }
}

const emojiLabels = {
  '✍️': 'Article',
  '👩‍💻': 'Code snippet',
  '🧑‍🏫': 'Course',
  '🎧': 'Podcast',
  '📖': 'Book',
  '📚': 'Reference',
  '🧰': 'Tool',
  '🐦': 'Tweet',
  '📺': 'Video',
}
