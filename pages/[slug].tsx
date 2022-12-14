import getTopics from 'lib/notion/getTopics'
import getTopicBySlug from 'lib/notion/getTopicBySlug'
import Article from 'templates/article'
import Topic from 'templates/topic'
import getPosts from 'lib/notion/getPosts'
import getBlockChildren from 'lib/notion/getBlockChildren'
import getBookmarkedResearchByIds from 'lib/notion/getBookmarkedResearchByIds'

export default function DynamicRoute({ article, note, topic, bookmarks }) {
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
  // Prefer the Notion version of a post to the MDX version by looking for it first
  const notionPosts = await getPosts()
  const notionPost = notionPosts.find(
    post => post.properties['Slug'].rich_text[0].plain_text === params.slug,
  )

  if (notionPost) {
    const notionPostBlocks = await getBlockChildren(notionPost.id)
    return {
      props: {
        article: { properties: notionPost.properties, blocks: notionPostBlocks },
      },
    }
  }

  const topic = await getTopicBySlug(params.slug)

  if (!topic) return { props: {} }

  const topicResearchIds = topic.properties['Research'].relation.map(research => research.id)

  const topicBookmarkedResearch = await getBookmarkedResearchByIds(topicResearchIds)

  const bookmarkedResearchBySubtopic = topicBookmarkedResearch.reduce(
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

  return {
    props: {
      topic,
      bookmarks: bookmarkedResearchBySubtopic,
    },
    revalidate: 86400, // refetch data for this route once per day without requiring a new build
  }
}
