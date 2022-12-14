import RSS from 'rss'

import getPosts from '../lib/notion/getPosts'

export async function getServerSideProps({ res }) {
  const feed = new RSS({
    title: 'Michael Uloth',
    site_url: 'https://michaeluloth.com',
    feed_url: 'https://michaeluloth.com/rss.xml',
  })

  const notionPosts = await getPosts()
  notionPosts.forEach(post => {
    feed.item({
      title: post.properties['Title'].title[0].plain_text,
      url: `https://michaeluloth.com/${post.properties['Slug'].rich_text[0].plain_text}`,
      date: post.properties['First published'].date.start,
      description: post.properties['Description'].rich_text[0].plain_text,
    })
  })

  res.setHeader('Content-Type', 'text/xml')
  res.setHeader('Cache-Control', 'public, s-maxage=1200, stale-while-revalidate=600')
  res.write(feed.xml({ indent: true }))
  res.end()

  return {
    props: {},
  }
}

export default function RSSFeed() {
  return null
}
