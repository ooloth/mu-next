import { ReactNode } from 'react'

import Head from '../components/head'
import TopNav from '../components/nav-top'
import Footer from '../components/footer'

interface OuterProps {
  narrow?: boolean
  children: ReactNode
}

export default function Outer({ narrow, children }: OuterProps) {
  return (
    <>
      <Head />
      <TopNav />
      <div
        className={`flex flex-col pt-28 px-6 min-h-screen ${
          narrow ? 'mx-auto max-w-2xl' : ''
        }`}
      >
        <div className="flex-auto">{children}</div>
        <Footer />
      </div>
    </>
  )
}
