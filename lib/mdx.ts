import fs from 'fs'
import matter from 'gray-matter'
import mdxPrism from 'mdx-prism'
import path from 'path'
import renderToString from 'next-mdx-remote/render-to-string'

import MDXComponents from 'components/mdx'

const root = process.cwd()

type ContentType = 'about' | 'articles' | 'notes' | 'snippets' | 'timeline'

export async function getFiles(type: ContentType) {
  return fs.readdirSync(path.join(root, 'content', type))
}

export async function getFileBySlug(type: ContentType, slug: string) {
  const source = slug
    ? fs.readFileSync(path.join(root, 'content', type, `${slug}.mdx`), 'utf8')
    : fs.readFileSync(path.join(root, 'content', `${type}.mdx`), 'utf8')

  const { data, content } = matter(source)
  const mdxSource = await renderToString(content, {
    components: MDXComponents,
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
    mdxSource,
    frontMatter: {
      slug: slug || null,
      ...data,
    },
  }
}

export async function getAllFilesFrontMatter(type: ContentType) {
  const fileNames = await getFiles(type)

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
