import Link from 'next/link'
import { useRouter } from 'next/router'

import Emoji from './emoji'
import notCurrentPage from '../utils/not-current-page'

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
        <a className="ml-5 text-lg text-gray-500 dark:text-gray-400">{text}</a>
      </Link>
    </li>
  )
}

export default function TopNav() {
  const { pathname } = useRouter()

  return (
    <nav className="flex justify-between sticky mt-16">
      <button className="rounded bg-gray-700 p-1 w-8 h-8 leading-none text-xl">
        <Emoji picture="☀️" label="A yellow sun" />
      </button>

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
