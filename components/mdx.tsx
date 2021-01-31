import NextLink from 'next/link'
import NextImage from 'next/image'
import { ReactNode } from 'react'
import Tweet from 'react-tweet-embed'

interface LinkProps {
  href: string
  children?: ReactNode
  ariaLabel?: string
  className: string
}

const Link = ({ href, children, ariaLabel, className }: LinkProps) => {
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'))

  if (isInternalLink) {
    return (
      <NextLink href={href}>
        <a aria-label={ariaLabel || null} className={className}>
          {children}
        </a>
      </NextLink>
    )
  }

  return (
    <a
      href={href}
      aria-label={ariaLabel || null}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  )
}

interface ImageProps {
  alt: string
  src: string
  width: number
  height: number
  priority?: boolean
  className?: string
}

const Image = ({
  alt,
  src,
  width,
  height,
  priority = false,
  className,
}: ImageProps) => {
  return (
    <NextImage
      alt={alt}
      src={src}
      width={width}
      height={height}
      priority={priority}
      layout="responsive"
      className={`rounded bg-gray-900  ${className || ''}`}
    />
  )
}

const Figure = ({ caption, alt, src, width, height, priority }) => {
  return (
    <figure>
      <Image
        alt={alt}
        src={src}
        width={width}
        height={height}
        priority={priority}
      />
      <figcaption className="text-center text-sm">{caption}</figcaption>
    </figure>
  )
}

const Step = ({ icon, heading, date, children }) => {
  return (
    <li className="flex mt-8">
      <p className="flex-none w-6 text-lg">{icon}</p>

      <div className="ml-2 w-full">
        <p className="text-lg leading-normal font-semibold">{heading}</p>
        <p className="mt-2 text-gray-500">{date}</p>
        <p className="mt-4 prose dark:prose-dark lg:prose-lg dark:lg:prose-lg dark:text-gray-400">
          {children}
        </p>
      </div>
    </li>
  )
}

const Card = ({ imageUrl, title, blurb, href }) => {
  return (
    <div className="relative shadow-md rounded bg-gray-900">
      <Link href={href} ariaLabel={title} className="absolute inset-0 z-10" />

      {imageUrl && (
        <Image
          src={imageUrl}
          alt="Blah"
          width={1600}
          height={900}
          className="rounded-b-none"
        />
      )}

      <div className="p-3">
        <p
          className="leading-normal font-medium dark:text-gray-200"
          style={{ margin: 0 }}
        >
          {title}
        </p>
        <p
          className="pt-1 mb-0 leading-relaxed dark:text-gray-400"
          style={{ margin: 0 }}
        >
          {blurb}
        </p>
      </div>
    </div>
  )
}

function Project({ name, url, children }) {
  return (
    <li key={name} className="space-y-1 mt-8 leading-relaxed">
      <Link
        href={url}
        className="text-lg font-semibold text-blue-500 dark:text-blue-400 hover:underline"
      >
        {name}
      </Link>

      {children}
    </li>
  )
}

const MDXComponents = {
  a: Link,
  Figure,
  Image,
  Step,
  Card,
  Project,
  Tweet,
}

export default MDXComponents
