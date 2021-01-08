import Link from 'next/link'
import BlockContent from '@sanity/block-content-to-react'
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import synthwave84 from 'react-syntax-highlighter/dist/cjs/styles/prism/synthwave84'

import Layout from '../layouts/outer'
import { Figure, Heading, List, ListItem, P, Quote } from './elements'
import { dataset, projectId } from '../lib/sanity/constants'

export function Code({ language, code }) {
  return (
    <SyntaxHighlighter
      language={language}
      style={synthwave84}
      customStyle={{ marginTop: '2rem', marginBottom: '2rem' }}
      className="shadow-md rounded"
    >
      {code}
    </SyntaxHighlighter>
  )
}

const BlockRenderer = props => {
  const { style } = props.node

  const isParagraph = style === 'normal'
  const isHeading = ['h2', 'h3', 'h4'].includes(style)
  const isQuote = style === 'blockquote'

  if (isParagraph) {
    return <P className="my-6 dark:text-gray-300">{props.children}</P>
  }

  if (isHeading) {
    const level = style.replace(/[^\d]/g, '')
    const size = level === '2' ? 'text-3xl' : level === '3' ? 'text-2xl' : 'text-xl'

    return (
      <Heading
        level={level}
        className={`mt-14 leading-tight ${size} font-semibold`}
      >
        {props.children}
      </Heading>
    )
  }

  if (isQuote) {
    return <Quote>{props.children}</Quote>
  }

  // Fall back to default handling
  return BlockContent.defaultSerializers.types.block(props)
}

const serializers = {
  types: {
    block: BlockRenderer,
    code: ({ node: { language, code } }) => (
      <Code language={language} code={code} />
    ),
    image: ({ node: image }) => <Figure image={image} className="my-8" />,
  },

  marks: {
    strong: props => (
      <span className="font-semibold dark:text-white">{props.children}</span>
    ),
    em: props => <span className="italic dark:text-white">{props.children}</span>,
    underline: props => (
      <span className="underline dark:text-white">{props.children}</span>
    ),
    strikethrough: props => (
      <span className="line-through dark:text-gray-400">{props.children}</span>
    ),
    code: props => (
      <code className="rounded-sm bg-green-400 dark:bg-green-300 bg-opacity-20 dark:bg-opacity-20 py-0.5 px-1 font-mono dark:text-green-300">
        {props.children}
      </code>
    ),
    highlight: props => (
      <span className="rounded-sm bg-yellow-300 dark:bg-yellow-300 bg-opacity-20 dark:bg-opacity-20 py-0.5 px-1 dark:text-yellow-200">
        {props.children}
      </span>
    ),
    link: props => (
      <Link href={props.mark.href}>
        <a className="font-semibold text-blue-600 dark:text-blue-400 underline hover:bg-blue-600 dark:hover:bg-blue-400 hover:no-underline hover:text-white dark:hover:text-gray-900">
          {props.children[0]}
        </a>
      </Link>
    ),
  },

  list: props => (
    <List type={props.type} className="mt-4">
      {props.children}
    </List>
  ),

  listItem: props => (
    <ListItem className="dark:text-gray-300">{props.children}</ListItem>
  ),
}

export default function Post({ post, preview }) {
  console.log('post', post)
  return (
    <Layout>
      <main className="mt-8">
        <article className="">
          <Heading level={1} className="text-5xl font-extrabold">
            {post.title}
          </Heading>

          <BlockContent
            projectId={projectId}
            dataset={dataset}
            blocks={post.body}
            serializers={serializers}
          />

          <aside></aside>
        </article>
      </main>
    </Layout>
  )
}
