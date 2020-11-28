export interface EmojiProps {
  picture: string
  label: string
  className?: string
}

export default function Emoji({ picture, label, className, ...props }: EmojiProps) {
  return (
    <span
      role="img"
      aria-label={label}
      className={`flex-none ${className}`}
      {...props}
    >
      {picture}
    </span>
  )
}
