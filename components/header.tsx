import Emoji, { EmojiProps } from './emoji'

interface HeaderProps {
  title: string
  emoji: EmojiProps
  summary: string
}

export default function Header({ title, emoji, summary }: HeaderProps) {
  return (
    <header className="mt-16 mx-auto max-w-2xl">
      <h1 className="text-6xl font-extrabold tracking-tighter text-gray-900 dark:text-gray-200">
        {title}
        <Emoji picture={emoji.picture} label={emoji.label} className="ml-4" />
      </h1>

      <p className="mt-3 leading-relaxed text-xl tracking-tight">{summary}</p>
    </header>
  )
}
