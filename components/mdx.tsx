import NextLink from 'next/link'
import NextImage from 'next/image'
import Tweet from 'react-tweet-embed'

const Link = ({ children, href, ...rest }) => {
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'))

  if (isInternalLink) {
    return (
      <NextLink href={href}>
        <a {...rest}>{children}</a>
      </NextLink>
    )
  }

  return (
    <a target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  )
}

const Image = ({ alt, src, width, height, priority = false }) => {
  return (
    <NextImage
      alt={alt}
      src={src}
      width={width}
      height={height}
      priority={priority}
      layout="responsive"
      className="rounded bg-gray-900"
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

const MDXComponents = {
  a: Link,
  Figure,
  Image,
  Tweet,
}

export default MDXComponents
