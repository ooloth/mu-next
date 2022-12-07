/* eslint-disable @next/next/no-img-element */
import { transformCloudinaryImage } from 'lib/cloudinary/utils'
import { Fragment } from 'react'
import Text from './Text'

// TODO: add type definitions for raw Notion blocks + my parsed blocks
// see: https://github.com/9gustin/react-notion-render/blob/93bc519a4b0e920a0a9b980323c9a1456fab47d5/src/types/NotionBlock.ts
type BlockProps = {
  block: any
}

export default function Block({ block }: BlockProps) {
  const { type } = block
  const value = block[type]

  // TODO: move each markup component into a separate file
  // see: https://github.com/9gustin/react-notion-render/tree/93bc519a4b0e920a0a9b980323c9a1456fab47d5/src/components/common
  switch (type) {
    case 'paragraph':
      return (
        <p>
          <Text text={value.rich_text} />
        </p>
      )

    case 'heading_1':
      return (
        <h1>
          <Text text={value.rich_text} />
        </h1>
      )

    case 'heading_2':
      return (
        <h2>
          <Text text={value.rich_text} />
        </h2>
      )

    case 'heading_3':
      return (
        <h3>
          <Text text={value.rich_text} />
        </h3>
      )

    case 'bulleted_list_item':
      // TODO: extract into a List component that handles ul, ol, todos and toggles
      // see: https://github.com/9gustin/react-notion-render/blob/main/src/components/common/List/index.tsx
      return (
        <ul>
          {block.items.map((item, index) => (
            <li key={index}>
              <Text text={item[type].rich_text} />
            </li>
          ))}
        </ul>
      )

    case 'numbered_list_item':
      return (
        <ol>
          {block.items.map((item, index) => (
            <li key={index}>
              <Text text={item[type].rich_text} />
            </li>
          ))}
        </ol>
      )

    case 'quote':
      return (
        <blockquote>
          <Text text={value.rich_text} />
        </blockquote>
      )

    case 'code':
      return (
        <pre className={`language-${value.language}`}>
          <code className={`language-${value.language}`}>
            <Text text={value.rich_text} />
          </code>
        </pre>
      )

    case 'toggle':
      return (
        <details>
          <summary>{value.rich_text}</summary>
          {value.children?.map(block => (
            <Fragment key={block.id}>{Block(block)}</Fragment>
          ))}
        </details>
      )

    case 'child_page':
      return (
        <p>
          <Text text={value.rich_text} />
        </p>
      )

    case 'image':
      const { alt, width, height } = parseImageCaption(value.caption)

      return (
        <img
          src={
            value.type === 'external'
              ? transformCloudinaryImage(value.external.url, 624)
              : transformCloudinaryImage(value.file.url, 624)
          }
          alt={alt}
          width={width}
          height={height}
          className="bg-gray-900 rounded"
        />
      )

    // FIXME: support video embeds
    // case 'video':
    //   return (
    //     <figure>
    //       Hi
    //       <video
    //         src={value.type === 'external' ? value.external.url : value.file.url}
    //       />
    //       <video controls>
    //         <source
    //           src={value.type === 'external' ? value.external.url : value.file.url}
    //         />
    //       </video>
    //       {value.caption && (
    //         <figcaption>
    //           {value.caption ? value.caption[0]?.plain_text : ''}
    //         </figcaption>
    //       )}
    //     </figure>
    //   )

    default:
      return null
    // return `❌ Unsupported block (${
    //   type === 'unsupported'
    //     ? `The "${type}" type is not supported by the Notion API.`
    //     : type
    // })`
  }
}

function parseImageCaption(caption) {
  if (!caption) {
    throw new Error('Image block must include a caption.')
  }

  const dimensions = caption[0].plain_text.match(/\d+x\d+/)

  if (!dimensions) {
    throw new Error('Image caption must start with valid dimensions: [<width>x<height>]')
  }

  const width = dimensions[0].replace(/x.*/, '')
  const height = dimensions[0].replace(/.*x/, '')

  const alt = caption[0]?.plain_text.replace(/\[\d+x\d+\]/, '').trim()

  if (!alt) {
    throw new Error('Image caption must end with alt text.')
  }

  return { alt, width, height }
}
