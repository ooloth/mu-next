import Link from 'next/link'
import Image from 'next/image'
import Tweet from 'react-tweet-embed'

// import { Figure, Heading, List, ListItem, P, Quote } from './elements'

// import ProsCard from '@/components/ProsCard'
// import ConsCard from '@/components/ConsCard'
// import Gumroad from '@/components/metrics/Gumroad'
// import Unsplash from '@/components/metrics/Unsplash'
// import Analytics from '@/components/metrics/Analytics'
// import YouTube from '@/components/metrics/Youtube'
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
    <figure className={className}>
      <Image alt={alt} src={src} width={width} height={height} {...rest} />
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
