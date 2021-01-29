import Article from 'templates/article'
import Note from 'templates/note'
import { getFileNames, getFileContents } from 'lib/mdx'

export default function DynamicRoute({ article, note }) {
  if (article) {
    return <Article article={article} />
  }

  if (note) {
    return <Note note={note} />
  }

  return null
}

export async function getStaticPaths() {
  const articleFileNames = await getFileNames('articles')
  const noteFileNames = await getFileNames('notes')

  const allPaths = [...articleFileNames, ...noteFileNames].map(fileName => ({
    params: {
      slug: fileName.replace('.mdx', ''),
    },
  }))

  return { paths: allPaths, fallback: false }
}

export async function getStaticProps({ params }) {
  const article = await getFileContents('articles', params.slug)
  const note = await getFileContents('notes', params.slug)

  return { props: { article, note } }
}
