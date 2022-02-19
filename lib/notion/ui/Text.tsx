import classNames from 'utils/class-names'

export default function Text({ text }) {
  if (!text) return null

  return text.map(value => {
    const {
      annotations: { bold, code, italic, strikethrough, underline },
      text,
    } = value

    const Tag = bold ? 'b' : code ? 'code' : italic ? 'em' : 'span'

    return (
      <Tag
        key={text.link?.url || text.content}
        className={classNames([
          strikethrough && 'line-through',
          underline && 'underline',
        ])}
      >
        {text.link ? <a href={text.link.url}>{text.content}</a> : text.content}
      </Tag>
    )
  })
}
