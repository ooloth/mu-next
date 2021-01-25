import Image from 'next/image'
import Link from 'next/link'
import { format } from 'timeago.js'

import { getAllFilesFrontMatter } from 'lib/mdx'
import Outer from 'layouts/outer'
import Emoji from 'components/emoji'

export default function About({ projects, articles }) {
  return (
    <Outer>
      <header>
        <h1 className="sr-only">About | Michael Uloth</h1>
        <Image
          alt="Michael smiling into the camera."
          src={`/images/michael-landscape.jpg`}
          width={2883}
          height={2058}
          priority
          className="flex mt-8 shadow-md rounded bg-gray-900"
        />
      </header>

      <main className="divide-y divide-gray-300 divide-opacity-20">
        <section className="py-12 prose dark:prose-dark md:prose-lg dark:md:prose-lg">
          <h2 className="sr-only">My story</h2>
          <p className="text-lg">
            I'm a web developer and opera singer currently living in Toronto.{' '}
            <Emoji picture="👋" label="A hand waving" />
          </p>
          <p>
            At the moment, I'm working at ecobee and helping to migrate their
            ecommerce site from a legacy WordPress codebase to a modern stack that
            includes React, Gatsby, Netlify, Contentful and Shopify.
          </p>
          <p>
            Before ecobee, I built and maintained 25+ marketing websites for
            Coffeeshop Creative and helped them modernize their workflow and tech
            stack to include static site generation with React and GatsbyJS,
            continuous deployment with Netlify, and performance, SEO and
            accessibility auditing with Lighthouse.
          </p>
          <p>
            I also teach whenever I can, including on YouTube where I have ten
            beginner videos explaining how to get started with React and Gatsby. I'm
            currently working on a new course for newline teaching headless
            ecommerce with Next and Shopify.
          </p>
          <p>
            You can find me on Twitter where I talk about web development and share
            links to useful resources, or on GitHub where I build in the open.
          </p>
        </section>

        <section className="py-12">
          <header>
            <h2 className="text-2xl font-extrabold">Projects</h2>
            <p className="mt-1 text-lg">
              Software and side projects I have fun working on.
            </p>
          </header>
          <ol reversed>
            {projects.map(project => (
              <li key={project.slug} className="space-y-1 mt-8 leading-relaxed">
                <Link href={project.url}>
                  <a className="text-lg font-semibold text-blue-500 dark:text-blue-400 hover:underline">
                    {project.name}
                  </a>
                </Link>
                <p className="clamp-2">{project.blurb}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="py-12">
          <header>
            <h2 className="text-2xl font-extrabold">Writing</h2>
            <p className="mt-1 text-lg">
              Thoughts about coding and web development.
            </p>
          </header>
          <ol reversed>
            {articles.map(article => (
              <li key={article.slug} className="space-y-1 mt-8 leading-relaxed">
                <Link href={`/${article.slug}`}>
                  <a className="text-lg font-semibold text-blue-500 dark:text-blue-400 hover:underline">
                    {article.title}
                  </a>
                </Link>
                <p className="clamp-2">{article.description}</p>
                <p className="text-sm text-gray-700 dark:text-gray-400">
                  Updated {format(article.dateUpdated || article.datePublished)}
                </p>
              </li>
            ))}
          </ol>

          <Link href="/blog">
            <a className="flex mt-8 font-semibold text-blue-500 dark:text-blue-400 hover:underline">
              See all posts &rarr;
            </a>
          </Link>
          {/* <Link href="">
            <a className="flex mt-4 font-semibold text-blue-500 dark:text-blue-400 hover:underline">
              Subscribe via RSS &rarr;
            </a>
          </Link>*/}
        </section>
      </main>
    </Outer>
  )
}

export async function getStaticProps() {
  const projects = [
    {
      name: 'ecobee.com',
      url: 'https://www.ecobee.com',
      blurb:
        "The ecommerce website I work on every day. I'm particularly proud of the part I played in building the new cart experience, which includes optimistic UI and reliable logic powered by XState.",
    },
    {
      name: 'Gatsby Tutorials',
      url: 'https://www.gatsbytutorials.com',
      blurb:
        'A searchable and filterable community-updated list of 200+ Gatsby.js tutorials, including video, audio and written learning resources.',
    },
  ]

  const unsortedArticles = await getAllFilesFrontMatter('articles')
  const recentArticles = unsortedArticles
    .sort(
      (a, b) =>
        Number(new Date(b.dateUpdated || b.datePublished)) -
        Number(new Date(a.dateUpdated || a.datePublished)),
    )
    .slice(0, 5)

  return { props: { projects, articles: recentArticles } }
}
