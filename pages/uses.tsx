import { MDXRemote } from 'next-mdx-remote'
import { format } from 'timeago.js'
import { NextSeo } from 'next-seo'

import Outer from 'layouts/outer'
import Header from 'components/header'
import { getFileContents } from 'lib/mdx'

const seo = {
  url: 'https://michaeluloth.com/uses',
  title: 'Uses 🧰',
  description: 'Hardware and software I use to build cool things.',
}

export default function Uses({ uses: { mdxSource, frontMatter } }) {
  return (
    <Outer narrow>
      <NextSeo
        title={seo.title}
        description={seo.description}
        canonical={seo.url}
        openGraph={{ ...seo }}
      />

      <header>
        <Header title={frontMatter.title} summary={frontMatter.summary} />
      </header>

      <main>
        <div className="mt-14 prose dark:prose-dark lg:prose-lg dark:lg:prose-lg">
          <MDXRemote {...mdxSource} />
        </div>
      </main>

      <footer className="mt-14">
        <p className="text-sm text-gray-700 dark:text-gray-500">
          Updated {format(frontMatter.dateUpdated)}
        </p>
      </footer>
    </Outer>
  )
}

export async function getStaticProps() {
  const uses = await getFileContents('uses')

  return { props: { uses } }
}
