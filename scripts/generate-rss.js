const { promises: fs } = require('fs')
const path = require('path')
const RSS = require('rss')
const matter = require('gray-matter')

async function generate() {
  const feed = new RSS({
    title: 'Michael Uloth',
    site_url: 'https://michaeluloth.com',
    feed_url: 'https://michaeluloth.com/rss.xml',
  })

  const unsortedArticleFileNames = await fs.readdir(
    path.join(__dirname, '..', 'content', 'articles'),
  )

  const unsortedFeedItems = await Promise.all(
    unsortedArticleFileNames.map(async fileName => {
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

  const sortedFeedItems = unsortedFeedItems.sort((a, b) =>
    b.date.localeCompare(a.date),
  )

  sortedFeedItems.forEach(item => {
    feed.item(item)
  })

  await fs.writeFile('./public/rss.xml', feed.xml({ indent: true }))
}

generate()
