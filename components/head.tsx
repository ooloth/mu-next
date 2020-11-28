import NextHead from 'next/head'
import GoogleFonts from 'next-google-fonts'

export default function Head() {
  return (
    <>
      <GoogleFonts href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" />
      <NextHead>
        <title>Michael Uloth</title>
      </NextHead>
    </>
  )
}
