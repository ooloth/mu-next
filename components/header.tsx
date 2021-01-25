interface HeaderProps {
  title: string
  summary: string
}

export default function Header({ title, summary }: HeaderProps) {
  return (
    <div className="mx-auto max-w-2xl md:text-center">
      <h1 className="mb-0 leading-tight font-extrabold text-4xl md:text-5xl">
        {title}
      </h1>
      <p className="mt-3 leading-normal text-xl tracking-tight">{summary}</p>
    </div>
  )
}
