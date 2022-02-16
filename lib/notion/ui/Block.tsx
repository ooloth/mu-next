import { Fragment } from 'react'
import Text from './Text'

export default function Block({ block }) {
  const { type } = block
  const value = block[type]

  switch (type) {
    case 'paragraph':
      return (
        <p>
          <Text text={value.text} />
        </p>
      )

    case 'heading_1':
      return (
        <h1>
          <Text text={value.text} />
        </h1>
      )

    case 'heading_2':
      return (
        <h2>
          <Text text={value.text} />
        </h2>
      )

    case 'heading_3':
      return (
        <h3>
          <Text text={value.text} />
        </h3>
      )

    case 'bulleted_list_item':
    case 'numbered_list_item':
      return (
        <li>
          <Text text={value.text} />
        </li>
      )

    case 'quote':
      return (
        <blockquote>
          <Text text={value.text} />
        </blockquote>
      )

    case 'code':
      return (
        <code>
          <Text text={value.text} />
        </code>
      )

    case 'toggle':
      return (
        <details>
          <summary>{value.text}</summary>
          {value.children?.map(block => (
            <Fragment key={block.id}>{Block(block)}</Fragment>
          ))}
        </details>
      )

    case 'child_page':
      return (
        <p>
          <Text text={value.text} />
        </p>
      )

    // case 'image':
    //   return (
    //     <figure>
    //       <img
    //         src={value.type === 'external' ? value.external.url : value.file.url}
    //         alt={value.caption ? value.caption[0]?.plain_text : ''}
    //       />
    //       {value.caption && (
    //         <figcaption>
    //           {value.caption ? value.caption[0]?.plain_text : ''}
    //         </figcaption>
    //       )}
    //     </figure>
    //   )

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
