import Link from 'next/link'

import { NavItem } from './nav-top'
import TwitterIcon from '../svg/twitter-brands.svg'
import GitHubIcon from '../svg/github-brands.svg'
import YouTubeIcon from '../svg/youtube-brands.svg'
import LinkedInIcon from '../svg/linkedin-brands.svg'
import EmailIcon from '../svg/paper-plane-solid.svg'
// import RssIcon from '../svg/rss-solid.svg'

const iconClasses = 'inline-block w-1em h-1em leading-0 pointer-events-none'

const icons = {
  Twitter: <TwitterIcon className={iconClasses} />,
  GitHub: <GitHubIcon className={iconClasses} />,
  YouTube: <YouTubeIcon className={iconClasses} />,
  LinkedIn: <LinkedInIcon className={iconClasses} />,
  Email: <EmailIcon className={iconClasses} />,
  // RSS: <RssIcon className={iconClasses} />,
}

export type Platform = keyof typeof icons

const getIcon = (platform: Platform): any => icons[platform]

interface SocialNavItem extends NavItem {
  platform: Platform
}

const socialLinks: SocialNavItem[] = [
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
    platform: 'YouTube',
    href: 'https://www.youtube.com/user/michaeluloth',
    text: `Subscribe to Michael's YouTube channel`,
  },
  {
    platform: 'LinkedIn',
    href: 'https://www.linkedin.com/in/michael-uloth-848a1b98/',
    text: 'Connect with Michael on LinkedIn',
  },
  {
    platform: 'Email',
    href: 'mailto:hello@michaeluloth.com',
    text: 'Email Michael',
  },
  // { href: 'https://www.michaeluloth.com/rss.xml', text: '' },
]

function SocialLink({ platform, href, text }: SocialNavItem) {
  return (
    <li className="mx-3">
      <Link href={href}>
        <a className="text-2xl text-gray-500 dark:text-gray-400">
          <span className="sr-only">{text}</span>
          {getIcon(platform)}{' '}
        </a>
      </Link>
    </li>
  )
}

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
