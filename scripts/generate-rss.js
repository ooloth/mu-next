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

  const posts = await fs.readdir(path.join(__dirname, '..', 'content', 'articles'))

  await Promise.all(
    posts.map(async name => {
      const content = await fs.readFile(
        path.join(__dirname, '..', 'content', 'articles', name),
      )
      const frontmatter = matter(content)

      feed.item({
        title: frontmatter.data.title,
        url: 'https://michaeluloth.com/' + name.replace(/\.mdx?/, ''),
        date: frontmatter.data.datePublished,
        description: frontmatter.data.description,
      })
    }),
  )

  await fs.writeFile('./public/rss.xml', feed.xml({ indent: true }))
}

generate()
