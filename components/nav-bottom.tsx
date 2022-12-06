import Link from 'next/link'
import { useRouter } from 'next/router'

import { NavItem } from './nav-top'
import classNames from 'utils/class-names'
import notCurrentPage from 'utils/not-current-page'

export default function BottomNavItems() {
  const { pathname } = useRouter()

  return (
    <nav>
      <ul className="flex justify-center mt-5">
        <BottomNavItem
          href="/bookmarks"
          text="/bookmarks"
          className={notCurrentPage(pathname, '/bookmarks') ? 'block sm:hidden' : 'hidden'}
        />

        {bottomNavItems
          .filter(item => notCurrentPage(pathname, item.href))
          .map(item => (
            <BottomNavItem key={item.text} href={item.href} text={item.text} />
          ))}
      </ul>
    </nav>
  )
}

const bottomNavItems: NavItem[] = [
  // "Bookmarks" is added separately above with conditional styling
  { href: 'https://buttondown.email/ooloth', text: '/newsletter' },
  { href: '/uses', text: '/uses' },
  { href: '/likes', text: '/likes' },
  // { href: '/metrics', text: '/metrics' },
]

function BottomNavItem({ href, text, className }: NavItem) {
  return (
    <li className={classNames(['mx-2', className])}>
      <Link href={href} className="text-gray-400 hover:text-gray-200 text-sm">
        {text}
      </Link>
    </li>
  )
}
