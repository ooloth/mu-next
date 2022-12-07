import Link from 'next/link'
import classNames from 'utils/class-names'

export default function Text({ text }) {
  if (!text) return null

  return text.map(value => {
    const {
      annotations: { bold, code, italic, strikethrough, underline },
      text,
    } = value

    const Tag = code ? 'code' : italic ? 'em' : 'span'

    return (
      <Tag
        key={text.link?.url || text.content}
        className={classNames([
          bold && 'font-semibold',
          strikethrough && 'line-through',
          underline && 'underline',
        ])}
      >
        {text.link ? (
          text.link.url.includes('michaeluloth.com') ? (
            <Link href={text.link.url.replace('https://michaeluloth.com', '')}>{text.content}</Link>
          ) : (
            <a href={text.link.url} rel="noreferrer">
              {text.content}
            </a>
          )
        ) : (
          text.content
        )}
      </Tag>
    )
  })
}
