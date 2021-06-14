import Link from 'next/link'

import { NavItem } from './nav-top'
import TwitterIcon from '../svg/twitter-brands.svg'
import GitHubIcon from '../svg/github-brands.svg'
import YouTubeIcon from '../svg/youtube-brands.svg'
import LinkedInIcon from '../svg/linkedin-brands.svg'
import EmailIcon from '../svg/paper-plane-solid.svg'
import RssIcon from '../svg/rss-solid.svg'

export default function SocialLinks() {
  return (
    <nav>
      <ul className="flex justify-center">
        {socialLinks.map(item => (
          <SocialLink
            key={item.platform}
            platform={item.platform}
            href={item.href}
            text={item.text}
          />
        ))}
      </ul>
    </nav>
  )
}

function SocialLink({ platform, href, text }: SocialNavItem) {
  return (
    <li className="mx-3">
      <Link href={href}>
        <a className="text-2xl text-gray-400 hover:text-gray-100">
          <span className="sr-only">{text}</span>
          {getIcon(platform)}{' '}
        </a>
      </Link>
    </li>
  )
}

const iconClasses = 'inline-block w-1em h-1em leading-0 pointer-events-none'

const icons = {
  Twitter: <TwitterIcon className={iconClasses} aria-hidden />,
  YouTube: <YouTubeIcon className={iconClasses} aria-hidden />,
  GitHub: <GitHubIcon className={iconClasses} aria-hidden />,
  LinkedIn: <LinkedInIcon className={iconClasses} aria-hidden />,
  Email: <EmailIcon className={iconClasses} aria-hidden />,
  RSS: <RssIcon className={iconClasses} aria-hidden />,
}

export type Platform = keyof typeof icons

const getIcon = (platform: Platform): any => icons[platform]

interface SocialNavItem extends NavItem {
  platform: Platform
}

const socialLinks: SocialNavItem[] = [
  {
    platform: 'YouTube',
    href: 'https://www.youtube.com/user/michaeluloth',
    text: `Subscribe to Michael's YouTube channel`,
  },
  {
    platform: 'Twitter',
    href: 'https://twitter.com/ooloth',
    text: 'Follow Michael on Twitter',
  },
  {
    platform: 'GitHub',
    href: 'https://github.com/ooloth',
    text: 'Follow Michael on GitHub',
  },
  {
    platform: 'LinkedIn',
    href: 'https://www.linkedin.com/in/michael-uloth-848a1b98/',
    text: 'Connect with Michael on LinkedIn',
  },
  { platform: 'RSS', href: '/rss.xml', text: `Subscribe to Michael's blog` },
  {
    platform: 'Email',
    href: 'mailto:hello@michaeluloth.com',
    text: 'Email Michael',
  },
]
