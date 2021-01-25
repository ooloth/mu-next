import Head from '../components/head'
import TopNav from '../components/nav-top'
import Footer from '../components/footer'

export default function Outer({ children }) {
  return (
    <>
      <Head />
      <TopNav />
      <div className="flex flex-col mx-auto pt-28 px-6 max-w-2xl min-h-screen">
        <div className="flex-auto">{children}</div>
        <Footer />
      </div>
    </>
  )
}
