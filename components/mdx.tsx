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

const Step = ({ icon, heading, date, children }) => {
  return (
    <li className="flex mt-6">
      <p className="flex-none w-6 text-lg">{icon}</p>

      <div className="ml-2">
        <p className="text-lg leading-normal font-semibold">{heading}</p>
        <p className="mt-2 text-gray-500">{date}</p>
        <p className="mt-4 leading-relaxed text-gray-400">{children}</p>
      </div>
    </li>
  )
}

const MDXComponents = {
  a: Link,
  Figure,
  Image,
  Step,
  Tweet,
}

export default MDXComponents
