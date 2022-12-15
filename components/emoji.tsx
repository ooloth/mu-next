const emojiLabel = {
  '📖': 'An emoji of an open book.',
  '✍': 'An emoji of a hand writing with a pen.',
  '📺': 'An emoji of a televison.',
  '🎧': 'An emoji of a pair of large headphones.',
  '🧑‍🏫': 'An emoji of a teacher in front of a green chalkboard.',
  '👩‍💻': 'An emoji of a person using a laptop.',
  '📤': 'An emoji of an outbox tray.',
  '🧰': 'An emoji of a red toolbox.',
  '🎉': 'An emoji of confetti flying out of a striped party decoration.',
  '☀️': 'An emoji of a sun.',
  '🌙️': 'An emoji of a crescent moon.',
  '🔖': 'An emoji of a bookmark.',
}

export type EmojiPicture = keyof typeof emojiLabel

export type EmojiProps = {
  picture: EmojiPicture
  label?: string
  className?: string
}

export default function Emoji({ picture, label, className, ...props }: EmojiProps) {
  const ariaLabel = label ?? emojiLabel[picture] ?? ''

  return (
    <span role="img" aria-label={ariaLabel} className={`flex-none ${className || ''}`} {...props}>
      {picture}
    </span>
  )
}
