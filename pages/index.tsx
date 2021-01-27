import Link from 'next/link'
import { NextSeo } from 'next-seo'
import hydrate from 'next-mdx-remote/hydrate'

import Outer from 'layouts/outer'
import Header from 'components/header'
import MdxComponents from 'components/mdx'
import { getAllFilesFrontMatter, getFileContents } from 'lib/mdx'

function TimelineYear({ year, steps }) {
  const content = hydrate(steps, {
    components: MdxComponents,
  })

  return (
    <section className="mt-16">
      <h3 className="pt-8 text-2xl font-extrabold">{year}</h3>
      <ul>{content}</ul>
    </section>
  )
}

function Timeline({ years }) {
  return (
    <section className="mt-24 divide-y divide-gray-300 divide-opacity-20">
      <h2 className="sr-only">Timeline</h2>
      {years.map(({ frontMatter, mdxSource }) => (
        <TimelineYear year={frontMatter.year} steps={mdxSource} />
      ))}
    </section>
  )
}

const seo = {
  url: 'https://michaeluloth.com',
  title: 'Hey 👋',
  description:
    "Hi! I'm Michael. I'm a web developer and opera singer living in Toronto.",
}

export default function Home({ timelineByYear }) {
  return (
    <Outer>
      <NextSeo
        canonical={seo.url}
        title={seo.title}
        description={seo.description}
        openGraph={{ ...seo }}
      />

      <header>
        <Header
          title="Hey, I'm Michael"
          summary="I'm a web developer and opera singer living in Toronto. I'm currently building a React-based ecommerce website at ecobee."
        />

        <div className="flex flex-col md:flex-row md:items-center md:justify-center space-y-2 md:space-y-0 md:space-x-4 mt-8">
          <Link href="/about">
            <a className="shadow-md rounded bg-blue-600 py-3 px-6 text-center text-sm font-semibold">
              More about me
            </a>
          </Link>
          <a
            href="https://twitter.com/ooloth"
            target="_blank"
            rel="noopener noreferrer"
            className="shadow-md rounded bg-gray-900 py-3 px-6 text-center text-sm font-semibold"
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

export async function getStaticProps() {
  const timelineFileMetadata = await getAllFilesFrontMatter('timeline')

  const timelineByYear = await Promise.all(
    timelineFileMetadata.map(async metadata =>
      getFileContents('timeline', metadata.year),
    ),
  )

  return {
    props: { timelineByYear },
  }
}
