import Emoji, { EmojiProps } from './emoji'
import { Heading } from './elements'

interface HeaderProps {
  title: string
  emoji: EmojiProps
  summary: string
}

export default function Header({ title, emoji, summary }: HeaderProps) {
  return (
    <header className="mt-8 mx-auto max-w-2xl">
      <Heading
        level={1}
        className="flex flex-col-reverse sm:flex-row text-6xl font-extrabold"
      >
        {title}
        <Emoji
          picture={emoji.picture}
          label={emoji.label}
          className="mb-4 sm:ml-4 sm:mb-0"
        />
      </Heading>

      <p className="mt-3 leading-relaxed text-xl tracking-tight">{summary}</p>
    </header>
  )
}
