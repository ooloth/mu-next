import fs from 'fs'
import matter from 'gray-matter'
import mdxPrism from 'mdx-prism'
import path from 'path'
import { serialize } from 'next-mdx-remote/serialize'

const root = process.cwd()

type ContentType =
  | 'about'
  | 'articles'
  | 'bio'
  | 'notes'
  | 'projects'
  | 'snippets'
  | 'timeline'
  | 'uses'

export async function getFileNames(type: ContentType) {
  return fs.readdirSync(path.join(root, 'content', type))
}

export async function getFileContents(type: ContentType, fileName?: string) {
  let source: string

  try {
    source = fileName
      ? fs.readFileSync(path.join(root, 'content', type, `${fileName}.mdx`), 'utf8')
      : fs.readFileSync(path.join(root, 'content', `${type}.mdx`), 'utf8')
  } catch (e) {
    return null
  }

  const { data, content } = matter(source)

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [
        require('remark-autolink-headings'),
        require('remark-slug'),
        require('remark-code-titles'),
      ],
      rehypePlugins: [mdxPrism],
    },
  })

  return {
    frontMatter: {
      ...data,
      slug: (fileName || type).replace('.mdx', ''),
    },
    mdxSource,
  }
}

export async function getAllFilesFrontMatter(type: ContentType) {
  const fileNames = await getFileNames(type)

  return fileNames.reduce((allFrontMatter, fileName) => {
    const source = fs.readFileSync(
      path.join(root, 'content', type, fileName),
      'utf8',
    )

    const { data } = matter(source)

    return [
      {
        ...data,
        slug: fileName.replace('.mdx', ''),
      },
      ...allFrontMatter,
    ]
  }, [])
}
