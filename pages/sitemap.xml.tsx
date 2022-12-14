import getPosts from 'lib/notion/getPosts'
import getTopics from 'lib/notion/getTopics'

export async function getServerSideProps({ res }) {
  const allPosts = await getPosts()
  const allTopics = await getTopics()
  const allPageSlugs = [
    ...allPosts.map(post => post.properties['Slug'].rich_text[0].plain_text),
    ...allTopics.map(post => post.properties['Path'].rich_text[0].plain_text),
    ...['', 'about', 'bookmarks', 'lab', 'likes', 'metrics', 'uses', 'writing'],
  ]

  res.setHeader('Content-Type', 'text/xml')
  res.setHeader('Cache-Control', 'public, s-maxage=1200, stale-while-revalidate=600')
  res.write(createSitemap(allPageSlugs))
  res.end()

  return {
    props: {},
  }
}

const createSitemap = (slugs: string[]) => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${slugs
          .map(slug => {
            return `
                <url>
                    <loc>${`https://michaeluloth.com/${slug}`}</loc>
                </url>
            `
          })
          .join('')}
    </urlset>
`

export default function Sitemap() {
  return null
}
