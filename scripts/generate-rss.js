const path = require('path')
const RSS = require('rss')
const matter = require('gray-matter')
const { promises: fs } = require('fs')

const getPosts = require('../lib/notion/getPosts')

async function generateRssFeed() {
  const feed = new RSS({
    title: 'Michael Uloth',
    site_url: 'https://michaeluloth.com',
    feed_url: 'https://michaeluloth.com/rss.xml',
  })

  // Get MDX articles
  const unsortedMdxArticleFileNames = await fs.readdir(
    path.join(__dirname, '..', 'content', 'articles'),
  )

  // Create RSS feed items for MDX articles
  const unsortedMdxFeedItems = await Promise.all(
    unsortedMdxArticleFileNames.map(async fileName => {
      const content = await fs.readFile(
        path.join(__dirname, '..', 'content', 'articles', fileName),
      )
      const frontmatter = matter(content)

      return {
        title: frontmatter.data.title,
        url: 'https://michaeluloth.com/' + fileName.replace(/\.mdx?/, ''),
        date: frontmatter.data.datePublished,
        description: frontmatter.data.description,
      }
    }),
  )

  // Get Notion posts
  const notionPosts = await getPosts()

  // Create RSS feed items for Notion posts
  const notionFeedItems = notionPosts.map(post => ({
    title: post.properties['Title'].title[0].plain_text,
    url: `https://michaeluloth.com/blog/${post.properties['Slug'].rich_text[0].plain_text}`,
    date: post.properties['First published'].date.start,
    description: post.properties['Description'].rich_text[0].plain_text,
  }))

  // Deduplicate feed items (preferring Notion posts over MDX articles)
  const deduplicatedFeedItems = getUniqueFeedItems([
    ...notionFeedItems,
    ...unsortedMdxFeedItems,
  ])

  // Sort feed items by date (descending)
  const sortedFeedItems = deduplicatedFeedItems.sort((a, b) =>
    b.date.localeCompare(a.date),
  )

  // Add feed items to RSS feed
  sortedFeedItems.forEach(item => {
    feed.item(item)
  })

  await fs.writeFile('./public/rss.xml', feed.xml({ indent: true }))
}

function getUniqueFeedItems(feedItems) {
  let uniqueItemSlugs = new Set()

  const uniqueItems = feedItems.reduce((uniqueFeedItems, item) => {
    if (uniqueItemSlugs.has(item.url)) {
      return uniqueFeedItems
    } else {
      uniqueItemSlugs.add(item.url)
      return [...uniqueFeedItems, item]
    }
  }, [])

  return uniqueItems
}

generateRssFeed()
