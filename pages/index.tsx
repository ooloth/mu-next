import Link from 'next/link'
import { NextSeo } from 'next-seo'
import { MDXRemote } from 'next-mdx-remote'

import Header from 'components/header'
import Outer from 'layouts/outer'
import addImagePlaceholdersToMdxSource from 'lib/mdx/addImagePlaceholdersToMdxSource'
import { getAllFilesFrontMatter, getFileContents } from 'lib/mdx/mdx'

const seo = {
  url: 'https://michaeluloth.com',
  title: 'Hey 👋',
  description: "Hi! I'm Michael. I'm a web developer living in Hamilton, Ontario.",
}

export default function Home({ timelineByYear }) {
  return (
    <Outer narrow>
      <NextSeo
        canonical={seo.url}
        title={seo.title}
        description={seo.description}
        openGraph={{ ...seo }}
      />

      <header>
        <Header
          title="Hey, I'm Michael"
          summary="I'm a web developer living in Hamilton, Ontario. I'm currently helping biologists discover life-saving drugs at Recursion."
        />

        <div className="flex flex-col mt-8 space-y-2 md:flex-row md:items-center md:justify-center md:space-y-0 md:space-x-4">
          <Link href="/about">
            <a className="px-6 py-3 text-sm font-semibold text-center text-gray-200 bg-blue-600 rounded shadow-md">
              More about me
            </a>
          </Link>
          <a
            href="https://twitter.com/ooloth"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 text-sm font-semibold text-center bg-gray-800 rounded shadow-md hover:bg-gray-700"
          >
            Follow me on Twitter
          </a>
        </div>
      </header>

      <main>
        <Timeline years={timelineByYear} />
      </main>
    </Outer>
  )
}

function Timeline({ years }) {
  return (
    <section className="mt-24 divide-y divide-gray-300 divide-opacity-20">
      <h2 className="sr-only">Timeline</h2>
      {years.map(({ frontMatter, mdxSource }) => (
        <TimelineYear
          key={frontMatter.year}
          year={frontMatter.year}
          steps={mdxSource}
        />
      ))}
    </section>
  )
}

function TimelineYear({ year, steps }) {
  return (
    <section className="mt-16">
      <h3 className="py-8 text-2xl font-extrabold">{year}</h3>
      <ul>
        <MDXRemote {...steps} />
      </ul>
    </section>
  )
}

export async function getStaticProps() {
  const timelineFilesFrontmatter = await getAllFilesFrontMatter('timeline')

  const timelineByYear = await Promise.all(
    timelineFilesFrontmatter.map(async metadata => {
      const fileContents = await getFileContents('timeline', metadata.year)
      return await addImagePlaceholdersToMdxSource(fileContents)
    }),
  )

  return {
    props: { timelineByYear },
  }
}
