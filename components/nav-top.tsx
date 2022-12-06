import Link from 'next/link'
import { useRouter } from 'next/router'

// import Emoji, { EmojiPicture } from './emoji'
import notCurrentPage from '../utils/not-current-page'
import classNames from '../utils/class-names'
// import { useColorMode } from './color-mode'

export default function TopNav() {
  const { pathname } = useRouter()

  return (
    <nav
      className="flex justify-center items-center fixed z-50 top-0 bg-gray-900 bg-opacity-60 py-1 w-full"
      style={{
        WebkitBackdropFilter: 'saturate(180%) blur(20px)',
        backdropFilter: 'saturate(180%) blur(20px)',
      }}
    >
      {/*<ToggleDarkMode />*/}

      <ul className="flex">
        {topNavItems.map(item => (
          <TopNavItem
            key={item.text}
            href={item.href}
            text={item.text}
            active={!notCurrentPage(pathname, item.href)}
          />
        ))}

        <TopNavItem
          key="Bookmarks"
          href="/bookmarks"
          text="Bookmarks"
          active={!notCurrentPage(pathname, '/bookmarks')}
          className="hidden sm:inline-flex"
        />
      </ul>
    </nav>
  )
}

function TopNavItem({ href, text, active = false, className }: NavItem) {
  const baseClasses = 'mx-0.5 inline-flex rounded py-2 px-4 sm:px-7 text-sm font-semibold'

  const activeColors = 'bg-blue-600 bg-opacity-20 text-blue-400'
  const inactiveColors =
    'text-gray-300 bg-transparent hover:bg-blue-600 hover:bg-opacity-20 hover:text-blue-400'

  const colorClasses = active ? activeColors : inactiveColors

  return (
    <li className="leading-none">
      <Link href={href} className={classNames([baseClasses, colorClasses, className])}>
        {text}
      </Link>
    </li>
  )
}

export interface NavItem {
  href: string
  text: string
  active?: boolean
  className?: any
}

const topNavItems: NavItem[] = [
  { href: '/', text: 'Home' },
  { href: '/about', text: 'About' },
  { href: '/writing', text: 'Writing' },
  // "Bookmarks" is added separately above with conditional styling
]

// function ToggleDarkMode() {
//   const { colorMode, setColorMode } = useColorMode()

//   const emoji: EmojiPicture = colorMode === 'light' ? '🌙' : '☀️️'

//   function handleClick() {
//     setColorMode(colorMode === 'dark' ? 'light' : 'dark')
//   }

//   return (
//     <button
//       onClick={handleClick}
//       className="rounded bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 p-1 w-8 h-8 leading-none text-xl"
//     >
//       {colorMode && <Emoji picture={emoji} />}
//     </button>
//   )
// }
