const emojiLabel = {
  '📖': 'An emoji of an open book.',
  '✍': 'An emoji of a hand writing with a pen.',
  '📺': 'An emoji of a televison.',
  '🎧': 'An emoji of a pair of large black headphones.',
  '👩‍💻': 'An emoji of a person writing software code on a laptop.',
  '📤': 'An emoji of an outbox tray.',
  '☀️': 'An emoji of a sun.',
  '🌙️': 'An emoji of a crescent moon.',
}

export type EmojiPicture = keyof typeof emojiLabel

export interface EmojiProps {
  picture: EmojiPicture
  className?: string
}

export default function Emoji({ picture, className, ...props }: EmojiProps) {
  return (
    <span
      role="img"
      aria-label={emojiLabel[picture]}
      className={`flex-none ${className || ''}`}
      {...props}
    >
      {picture}
    </span>
  )
}
