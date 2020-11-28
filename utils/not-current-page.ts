export default function notCurrentPage(pathname: string, href: string) {
  return href !== pathname
}
