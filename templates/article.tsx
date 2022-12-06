import { NextSeo, ArticleJsonLd } from 'next-seo'
import { format } from 'timeago.js'

import Outer from 'layouts/outer'
import Emoji from 'components/emoji'
import Block from 'lib/notion/ui/Block'
import { transformCloudinaryImage } from 'lib/cloudinary/utils'
import { useEffect } from 'react'
import Prism from 'prismjs'

const ArticleSeo = ({ title, slug, description, featuredImage, date }) => {
  const url = `https://michaeluloth.com/${slug}`
  const formattedDate = new Date(date).toISOString()

  const image = featuredImage
    ? featuredImage.includes('cloudinary')
      ? {
          url: transformCloudinaryImage(featuredImage, 1280),
          alt: title,
        }
      : {
          url: `https://michaeluloth.com${featuredImage}`,
          alt: title,
        }
    : {
        alt: 'Michael Uloth smiling into the camera',
        url: transformCloudinaryImage(
          'https://res.cloudinary.com/ooloth/image/upload/mu/michael-landscape.jpg',
          1280,
        ),
      }

  useEffect(() => {
    Prism.highlightAll()
  }, [])

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          type: 'article',
          article: {
            publishedTime: formattedDate,
          },
          url,
          title,
          description,
          images: [image],
        }}
      />
      <ArticleJsonLd
        authorName="Michael Uloth"
        dateModified={date}
        datePublished={date}
        description={description}
        images={[image.url]}
        publisherLogo="/static/favicons/android-chrome-192x192.png"
        publisherName="Michael Uloth"
        title={title}
        url={url}
      />
    </>
  )
}

export default function Article({ article }) {
  const { type, title, slug, description, featuredImage, date } = parsePostProperties(article)

  return (
    <Outer narrow>
      <ArticleSeo
        title={title}
        slug={slug}
        description={description}
        featuredImage={featuredImage}
        date={date}
      />

      <article>
        <header>
          <h1 className="mb-0 text-4xl font-extrabold leading-tight">
            {title}
            {type === '🔖' && (
              <>
                &nbsp;
                <Emoji picture={type} />
              </>
            )}
          </h1>
          <p className="mt-3 text-sm text-gray-700 dark:text-gray-500">Updated {format(date)}</p>
        </header>

        <div className="mt-8 prose dark:prose-dark lg:prose-lg dark:lg:prose-lg">
          <NotionBlocks blocks={article.blocks} />
        </div>
      </article>
    </Outer>
  )
}

/**
 * Parses and renders the blocks for a Notion page.
 * @see https://github.com/9gustin/react-notion-render/blob/93bc519a4b0e920a0a9b980323c9a1456fab47d5/src/components/core/Render/index.tsx
 */
function NotionBlocks({ blocks }) {
  const blocksToRender = getBlocksToRender(blocks)
  console.log('blockToRender', blocksToRender)

  return blocksToRender.map(block => <Block key={block.id} block={block} />)
}

/**
 * Returns a list of parsed blocks that Block knows how to render.
 * @see https://github.com/9gustin/react-notion-render/blob/93bc519a4b0e920a0a9b980323c9a1456fab47d5/src/utils/getBlocksToRender.ts#L15
 */
function getBlocksToRender(blocks: any[]) {
  // Filter out blocks the Notion API doesn't support
  const supportedBlocks = blocks.filter(block => block.type !== 'unsupported')

  if (!supportedBlocks.length) return []

  // Parse the remaining blocks to make lists easier to render
  return supportedBlocks.reduce((blocksToRender, block) => {
    const previousBlock = blocksToRender.length && blocksToRender[blocksToRender.length - 1]
    const currentBlock = createParsedNotionBlock(block)

    // If the current block is part of a list, append it to the existing list block
    if (previousBlock && areRelated(previousBlock, currentBlock)) {
      previousBlock.addItem(currentBlock)
      return blocksToRender
      // Otherwise, start a new list
    } else if (currentBlock.isList()) {
      currentBlock.addItem(currentBlock)
      return [...blocksToRender, currentBlock]
      // If it's not a list item, render it separately
    } else {
      return [...blocksToRender, currentBlock]
    }
  }, [])
}

/**
 * Returns a Notion block that's been extended with helper methods and a consolidated array of list items (if applicable)
 * @see https://github.com/9gustin/react-notion-render/blob/93bc519a4b0e920a0a9b980323c9a1456fab47d5/src/types/Block.ts
 * @see https://kyleshevlin.com/what-is-a-factory-function
 */
function createParsedNotionBlock(notionBlock: any) {
  const items = []

  const getType = () => notionBlock.type

  return {
    addItem(block: any) {
      items.push(createParsedNotionBlock(block))
    },
    equalsType(type: string) {
      return notionBlock.type === type
    },
    getComponent() {
      // TODO: Implement
    },
    getType,
    isList() {
      return (
        getType() === 'bulleted_list_item' ||
        getType() === 'numbered_list_item' ||
        getType() === 'todo' ||
        getType() === 'toggle'
      )
    },
    items,
    ...notionBlock,
  }
}

function areRelated(previous: any, current: any) {
  return previous.isList() && previous.equalsType(current.type)
}

/**
 * Parses the Notion post metadata
 */
function parsePostProperties(post) {
  const type = post.properties['Type'].select.name
  const title = post.properties['Title'].title[0].plain_text
  const slug = post.properties['Slug'].rich_text[0].plain_text
  const description = post.properties['Description'].rich_text[0].plain_text
  const featuredImage = post.properties['Featured image']?.url
  const date = post.properties['First published'].date.start

  return { type, title, slug, description, featuredImage, date }
}

// const discussUrl = slug =>
//   `https://mobile.twitter.com/search?q=${encodeURIComponent(
//     `https://michaeluloth.com/${slug}`,
//   )}`

// const editUrl = slug =>
//   `https://github.com/ooloth/mu-next/edit/master/content/blog/${slug}.mdx`

// function BlogFooter(frontMatter) {
//   return (
//     <footer className="mt-12 text-sm text-gray-700 dark:text-gray-300">
//       <a
//         href={discussUrl(frontMatter.slug)}
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         {'Discuss on Twitter'}
//       </a>
//       {` • `}
//       <a href={editUrl(frontMatter.slug)} target="_blank" rel="noopener noreferrer">
//         {'Edit on GitHub'}
//       </a>
//     </footer>
//   )
// }
