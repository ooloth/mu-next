import hydrate from 'next-mdx-remote/hydrate'
import { format } from 'timeago.js'

import Outer from 'layouts/outer'
import Header from 'components/header'
import MdxComponents from 'components/mdx'
import { getFileContents } from 'lib/mdx'

export default function Uses({ uses: { mdxSource, frontMatter } }) {
  const content = hydrate(mdxSource, {
    components: MdxComponents,
  })

  return (
    <Outer>
      <header>
        <Header title={frontMatter.title} summary={frontMatter.summary} />
      </header>

      <main>
        <div className="mt-14 prose dark:prose-dark lg:prose-lg dark:lg:prose-lg">
          {content}
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
