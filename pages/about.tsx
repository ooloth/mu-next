/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote'
import { NextSeo } from 'next-seo'
import { format } from 'timeago.js'

import addImagePlaceholderToMdxFrontMatter from 'lib/mdx/addImagePlaceholderToMdxFrontMatter'
import { getAllFilesFrontMatter, getFileContents } from 'lib/mdx/mdx'
import Outer from 'layouts/outer'
import { transformCloudinaryImage } from 'lib/cloudinary/utils'

const seo = {
  url: 'https://michaeluloth.com/about',
  title: 'About 👶',
  description:
    'A summary of my career plus links to my recent videos, blog posts and side projects.',
}

export default function About({ bio, projects, articles }) {
  return (
    <Outer narrow>
      <NextSeo
        title={seo.title}
        description={seo.description}
        canonical={seo.url}
        openGraph={{ ...seo }}
      />

      <header>
        <h1 className="sr-only">About</h1>
        <img
          src={transformCloudinaryImage(bio.frontMatter.featuredImage, 624)}
          alt="Michael smiling into the camera."
          className="flex bg-gray-900 rounded shadow-md"
          width={2883}
          height={2058}
        />
      </header>

      <main className="divide-y divide-gray-300 divide-opacity-20">
        <Bio bio={bio} />
        <Projects projects={projects} />
        <Writing articles={articles} />
      </main>
    </Outer>
  )
}

function Bio({ bio: { frontMatter, mdxSource } }) {
  return (
    <section className="py-12 prose dark:prose-dark md:prose-lg dark:md:prose-lg">
      <h2 className="sr-only">{frontMatter.heading}</h2>
      <p className="text-lg">{frontMatter.lead}</p>
      <MDXRemote {...mdxSource} />
    </section>
  )
}

function Projects({ projects: { frontMatter, mdxSource } }) {
  return (
    <section className="py-12">
      <header>
        <h2 className="text-2xl font-extrabold">{frontMatter.heading}</h2>
        <p className="mt-1 text-lg">{frontMatter.description}</p>
      </header>

      <ul>
        <MDXRemote {...mdxSource} />
      </ul>
    </section>
  )
}

function Writing({ articles }) {
  return (
    <section className="py-12">
      <header>
        <h2 className="text-2xl font-extrabold">Writing</h2>
        <p className="mt-1 text-lg">Thoughts about coding.</p>
      </header>

      <ol reversed>
        {articles.map(article => (
          <li key={article.slug} className="mt-8 space-y-1 leading-relaxed">
            <Link
              href={`/${article.slug}`}
              className="text-lg font-semibold text-blue-500 dark:text-blue-400 hover:underline"
            >
              {article.title}
            </Link>
            <p className="clamp-2">{article.description}</p>
            <p className="text-sm text-gray-700 dark:text-gray-400">
              Updated {format(article.dateUpdated || article.datePublished)}
            </p>
          </li>
        ))}
      </ol>

      <Link
        href="/writing"
        className="flex mt-8 font-semibold text-blue-500 dark:text-blue-400 hover:underline"
      >
        See all posts &rarr;
      </Link>
      <Link
        href="/rss.xml"
        className="flex mt-4 font-semibold text-blue-500 dark:text-blue-400 hover:underline"
      >
        Subscribe via RSS &rarr;
      </Link>
    </section>
  )
}

export async function getStaticProps() {
  const bio = await getFileContents('bio')
  const bioWithImagePlaceholder = await addImagePlaceholderToMdxFrontMatter(bio)

  const projects = await getFileContents('projects')

  const unsortedArticles = await getAllFilesFrontMatter('articles')
  const lastFiveArticles = unsortedArticles
    .sort((a, b) =>
      (b.dateUpdated || b.datePublished).localeCompare(a.dateUpdated || a.datePublished),
    )
    .slice(0, 5)

  return {
    props: { bio: bioWithImagePlaceholder, projects, articles: lastFiveArticles },
  }
}
