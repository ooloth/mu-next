import Head from './head'
import TopNav from './nav-top'
import Footer from './footer'

export default function Layout({ children }) {
  return (
    <div className="flex flex-col mx-auto px-6 max-w-2xl min-h-screen">
      <Head />
      <TopNav />
      <div className="flex-auto">{children}</div>
      <Footer />
    </div>
  )
}
