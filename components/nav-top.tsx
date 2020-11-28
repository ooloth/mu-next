import Link from 'next/link'
import { useRouter } from 'next/router'

import Emoji from './emoji'
import notCurrentPage from '../utils/not-current-page'
import { useColorMode } from './color-mode'

function ToggleDarkMode() {
  const { colorMode, setColorMode } = useColorMode()

  const emoji =
    colorMode === 'light'
      ? {
          picture: '🌙',
          label: 'A crescent moon.',
        }
      : {
          picture: '☀️️',
          label: 'A yellow sun.',
        }

  function handleClick() {
    setColorMode(colorMode === 'dark' ? 'light' : 'dark')
  }

  return (
    <button
      onClick={handleClick}
      className="rounded bg-gray-700 dark:bg-gray-700 p-1 w-8 h-8 leading-none text-xl"
    >
      {colorMode && <Emoji picture={emoji.picture} label={emoji.label} />}
    </button>
  )
}

export interface NavItem {
  href: string
  text: string
}

const topNavItems: NavItem[] = [
  { href: '/writes', text: 'Blog' },
  { href: '/experiments', text: 'Lab' },
  { href: '/learns', text: 'Notes' },
  { href: '/is', text: 'About' },
  { href: '/', text: 'Home' },
]

function TopNavItem({ href, text }: NavItem) {
  return (
    <li className="leading-none">
      <Link href={href}>
        <a className="ml-5 text-lg">{text}</a>
      </Link>
    </li>
  )
}

export default function TopNav() {
  const { pathname } = useRouter()

  return (
    <nav className="flex justify-between sticky mt-16">
      <ToggleDarkMode />

      <ul className="flex">
        {topNavItems
          .filter(item => notCurrentPage(pathname, item.href))
          .map(item => (
            <TopNavItem key={item.text} href={item.href} text={item.text} />
          ))}
      </ul>
    </nav>
  )
}
