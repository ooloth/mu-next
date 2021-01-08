export default function classNames(arr: string[]): string {
  return arr.filter(Boolean).join(' ')
}
