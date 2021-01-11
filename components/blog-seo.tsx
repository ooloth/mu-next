import { NextSeo, ArticleJsonLd } from 'next-seo'

const BlogSeo = ({ title, summary, datePublished, url, image }) => {
  const date = new Date(datePublished).toISOString()
  const featuredImage = {
    url: `https://michaeluloth.com${image}`,
    alt: title,
  }

  return (
    <>
      <NextSeo
        title={`${title} – Michael Uloth`}
        description={summary}
        canonical={url}
        openGraph={{
          type: 'article',
          article: {
            publishedTime: date,
          },
          url,
          title,
          description: summary,
          images: [featuredImage],
        }}
      />
      <ArticleJsonLd
        authorName="Michael Uloth"
        dateModified={date}
        datePublished={date}
        description={summary}
        images={[featuredImage.url]}
        publisherLogo="/static/favicons/android-chrome-192x192.png"
        publisherName="Michael Uloth"
        title={title}
        url={url}
      />
    </>
  )
}

export default BlogSeo
