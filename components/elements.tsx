// Don't include outer spacing in this file; add it via className when these elements are used.

import { ReactNode } from 'react'
import Image from 'next/image'
import { urlFor } from '../lib/sanity/client'

import classNames from 'utils/class-names'
import { MAX_LAYOUT_WIDTH } from '../styles/constants'

import { SanityImage } from '../lib/sanity/posts'

/**
 * HEADING
 */

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6
  children: ReactNode
  className?: string
}

export function Heading({ level, children, className, ...rest }: HeadingProps) {
  // See: https://stackoverflow.com/a/59685929/8802485v
  const Tag = `h${level}` as keyof JSX.IntrinsicElements
  const baseClasses = 'tracking-tight text-gray-800 dark:text-gray-200'

  return (
    <Tag className={classNames([baseClasses, className])} {...rest}>
      {children}
    </Tag>
  )
}

/**
 * IMAGE
 */

interface ImgProps {
  image: SanityImage
  className?: string
}

export function Img({ image, className, ...rest }: ImgProps) {
  const width = Math.min(image.width, MAX_LAYOUT_WIDTH * 2)
  const height = width / image.aspectRatio

  const url = urlFor(image).width(width).fit('max').quality(80).auto('format').url()

  return (
    <div className={classNames(['flex shadow-md', className])}>
      <Image
        src={url}
        alt={image.alt || ''}
        width={width}
        height={height}
        priority={image.eager}
        loading={image.eager ? 'eager' : 'lazy'}
        className="rounded"
        {...rest}
      />
    </div>
  )
}

/**
 * FIGURE
 */

interface FigureProps {
  image: SanityImage
  className?: string
}

export function Figure({ image, ...rest }: FigureProps) {
  const creditLine = image.creditLine ? `Photo: ${image.creditLine}` : undefined
  const caption = image.caption || creditLine

  return (
    <figure {...rest}>
      <Img image={image} />
      {caption && (
        <figcaption className="mt-1 text-center text-sm">{caption}</figcaption>
      )}
    </figure>
  )
}

/**
 * LIST
 */

interface ListProps {
  type: 'bullet' | 'number'
  children: ReactNode
  className?: string
}

export function List({ type = 'bullet', children, className, ...rest }: ListProps) {
  const Tag = (type === 'number' ? 'ol' : 'ul') as keyof JSX.IntrinsicElements
  const baseClasses = 'pl-4 leading-relaxed'
  const listStyle = type === 'number' ? 'list-disc' : 'list-decimal'

  return (
    <Tag className={classNames([baseClasses, listStyle, className])} {...rest}>
      {children}
    </Tag>
  )
}

/**
 * LIST ITEM
 */

interface ListItemProps {
  children: ReactNode
  className?: string
}

export function ListItem({ children, className, ...rest }: ListItemProps) {
  return (
    <li className={classNames(['mt-1', className])} {...rest}>
      {children}
    </li>
  )
}

/**
 * PARAGRAPH
 */

interface PProps {
  children: ReactNode
  className?: string
}

export function P({ children, className, ...rest }: PProps) {
  return (
    <p className={classNames(['leading-relaxed', className])} {...rest}>
      {children}
    </p>
  )
}

/**
 * QUOTE
 */

interface QuoteProps {
  children: ReactNode
  className?: string
}

export function Quote({ children, ...rest }: QuoteProps) {
  // TODO: Improve markup + styling

  return <blockquote {...rest}>- {children}</blockquote>
}
