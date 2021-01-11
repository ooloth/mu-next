import Link from 'next/link'
import Image from 'next/image'
import Tweet from 'react-tweet-embed'

// import { Figure, Heading, List, ListItem, P, Quote } from './elements'

// import Step from '@/components/Step'

const CustomLink = ({ children, href, ...rest }) => {
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'))

  if (isInternalLink) {
    return (
      <Link href={href}>
        <a {...rest}>{children}</a>
      </Link>
    )
  }

  return (
    <a target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  )
}

const Figure = ({ caption, alt, src, width, height, className, ...rest }) => {
  return (
    <figure>
      <Image
        alt={alt}
        src={src}
        width={width}
        height={height}
        className="rounded"
        layout="responsive"
        {...rest}
      />
      <figcaption className="mt-1 text-center text-sm">{caption}</figcaption>
    </figure>
  )
}

const MDXComponents = {
  a: CustomLink,
  Figure,
  Image,
  Tweet,
}

export default MDXComponents
