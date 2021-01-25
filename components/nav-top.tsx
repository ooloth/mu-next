import Link from 'next/link'
import { useRouter } from 'next/router'

import Emoji from './emoji'
import notCurrentPage from '../utils/not-current-page'
import classNames from '../utils/class-names'
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
      className="rounded bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 p-1 w-8 h-8 leading-none text-xl"
    >
      {colorMode && <Emoji picture={emoji.picture} label={emoji.label} />}
    </button>
  )
}

export interface NavItem {
  href: string
  text: string
  active?: boolean
}

const topNavItems: NavItem[] = [
  { href: '/', text: 'Home' },
  { href: '/about', text: 'About' },
  { href: '/blog', text: 'Blog' },
  // { href: '/notes', text: 'Notes' },
]

function TopNavItem({ href, text, active = false }: NavItem) {
  const baseClasses = 'mx-0.5 inline-flex rounded py-2 px-7 text-sm font-semibold'

  const activeColors = 'bg-blue-600 bg-opacity-20 text-blue-400'
  const inactiveColors =
    'text-gray-300 bg-transparent hover:bg-blue-600 hover:bg-opacity-20 hover:text-blue-400'

  const colorClasses = active ? activeColors : inactiveColors

  return (
    <li className="leading-none">
      <Link href={href}>
        <a className={classNames([baseClasses, colorClasses])}>{text}</a>
      </Link>
    </li>
  )
}

export default function TopNav() {
  const { pathname } = useRouter()

  return (
    <nav
      className="flex justify-center items-center fixed z-50 top-0 bg-gray-900 bg-opacity-50 py-1 w-full"
      style={{ backdropFilter: 'saturate(180%) blur(20px)' }}
    >
      {/*<ToggleDarkMode />*/}

      <ul className="flex">
        {topNavItems
          // .filter(item => notCurrentPage(pathname, item.href))
          .map(item => (
            <TopNavItem
              key={item.text}
              href={item.href}
              text={item.text}
              active={!notCurrentPage(pathname, item.href)}
            />
          ))}
      </ul>
    </nav>
  )
}
