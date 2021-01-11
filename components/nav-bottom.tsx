import Link from 'next/link'
import { useRouter } from 'next/router'

import { NavItem } from './nav-top'
import notCurrentPage from '../utils/not-current-page'

const bottomNavItems: NavItem[] = [
  { href: '/uses', text: '/uses' },
  { href: '/metrics', text: '/metrics' },
  { href: '/likes', text: '/likes' },
  { href: 'https://buttondown.email/ooloth', text: '/newsletter' },
]

function BottomNavItem({ href, text }: NavItem) {
  return (
    <li className="mx-2">
      <Link href={href}>
        <a>{text}</a>
      </Link>
    </li>
  )
}

export default function BottomNavItems() {
  const { pathname } = useRouter()

  return (
    <nav>
      <ul className="flex justify-center mt-5">
        {bottomNavItems
          .filter(item => notCurrentPage(pathname, item.href))
          .map(item => (
            <BottomNavItem key={item.text} href={item.href} text={item.text} />
          ))}
      </ul>
    </nav>
  )
}
