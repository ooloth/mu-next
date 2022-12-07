/* eslint-disable @next/next/no-img-element */
import NextLink from 'next/link'
import { ReactNode } from 'react'
// import Tweet from 'react-tweet-embed'

import Emoji from 'components/emoji'

interface LinkProps {
  href: string
  children?: ReactNode
  ariaLabel?: string
  className?: string
  style?: any
}

const Link = ({ href, children, ariaLabel, className, style }: LinkProps) => {
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'))

  if (isInternalLink) {
    return (
      <NextLink href={href} aria-label={ariaLabel || null} className={className} style={style}>
        {children}
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
      style={style}
    >
      {children}
    </a>
  )
}

function BlockLink({ icon, href, children }) {
  return (
    <Link
      href={href}
      className="inline-flex px-5 py-3 mb-3 mr-3 text-sm font-semibold text-center bg-gray-800 rounded shadow-md hover:bg-gray-700"
      style={{ textDecoration: 'none', color: 'rgb(228, 228, 231)' }}
    >
      {icon && <Emoji picture={icon} className="pr-2" />}
      {children}
    </Link>
  )
}

interface ImageProps {
  alt: string
  imageUrl: string
  blurDataURL?: string
  width?: number
  height?: number
  priority?: boolean
  className?: string
}

const Image = ({ alt, imageUrl, width, height, className }: ImageProps) => {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imageUrl}
      alt={alt || '""'}
      width={width}
      height={height}
      className={`rounded bg-gray-900  ${className || ''}`}
    />
  )
}

export const Figure = ({
  caption,
  alt,
  imageUrl,
  imagePlaceholder, // injected dynamically
  width,
  height,
  priority,
}) => {
  return (
    <figure>
      <Image
        alt={alt}
        imageUrl={imageUrl}
        blurDataURL={imagePlaceholder}
        width={width}
        height={height}
        priority={priority}
      />
      <figcaption className="text-sm text-center">{caption}</figcaption>
    </figure>
  )
}

const Step = ({ icon, heading, date, children }) => {
  return (
    <li className="flex mb-12">
      <p className="flex-none w-6 text-lg">{icon}</p>

      <div className="w-full ml-2">
        <p className="text-lg font-semibold leading-normal">{heading}</p>
        <p className="mt-2 text-gray-500">{date}</p>
        <p className="mt-4 prose dark:prose-dark lg:prose-lg dark:lg:prose-lg dark:text-gray-400">
          {children}
        </p>
      </div>
    </li>
  )
}

const Card = ({ imageUrl, imageWidth = 1600, imageHeight = 900, title, blurb, href }) => {
  return (
    <div className="relative bg-gray-900 rounded shadow-md">
      <Link href={href} ariaLabel={title} className="absolute inset-0 z-10" />

      {imageUrl && (
        <img
          src={imageUrl}
          alt=""
          width={imageWidth}
          height={imageHeight}
          className="rounded-b-none"
          style={{ marginTop: 0, marginBottom: 0 }}
        />
      )}

      <div className="p-3">
        <p className="font-medium leading-normal dark:text-gray-200" style={{ margin: 0 }}>
          {title}
        </p>
        <p className="pt-1 mb-0 leading-relaxed dark:text-gray-400" style={{ margin: 0 }}>
          {blurb}
        </p>
      </div>
    </div>
  )
}

function Project({ name, url, children }) {
  return (
    <li key={name} className="mt-8 space-y-1 leading-relaxed">
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
  BlockLink,
  Figure,
  Image,
  Step,
  Card,
  Project,
  // Tweet,
}

export default MDXComponents
