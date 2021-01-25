import Link from 'next/link'

import Outer from 'layouts/outer'
import Header from 'components/header'

function TimelineItem({ item }) {
  return (
    <li className="flex mt-6">
      <p className="flex-none w-6 text-lg">{item.icon}</p>

      <div className="ml-2">
        <p className="text-lg leading-normal font-semibold">{item.heading}</p>
        <p className="mt-2 text-gray-500">{item.date}</p>
        <p className="mt-4 leading-relaxed text-gray-400">{item.blurb}</p>
      </div>
    </li>
  )
}

function TimelineYear({ year, items }) {
  return (
    <section className="mt-16">
      <h3 className="pt-8 text-2xl font-extrabold">{year}</h3>
      <ul>
        {items.map(item => (
          <TimelineItem item={item} />
        ))}
      </ul>
    </section>
  )
}

function Timeline({ items }) {
  return (
    <section className="mt-24 divide-y divide-gray-300 divide-opacity-20">
      <h2 className="sr-only">Timeline</h2>
      <TimelineYear year="2021" items={items['2021']} />
      <TimelineYear year="2020" items={items['2020']} />
      <TimelineYear year="2019" items={items['2019']} />
    </section>
  )
}

export default function Home({ timelineItems }) {
  return (
    <Outer>
      <header>
        <Header
          title="Hey, I'm Michael"
          summary="I'm a web developer and opera singer living in Toronto. I'm currently building a React-based ecommerce website at ecobee."
        />

        <div className="flex flex-col md:flex-row md:items-center md:justify-center space-y-2 md:space-y-0 md:space-x-4 mt-8">
          <Link href="/about">
            <a className="shadow-md rounded bg-blue-600 py-3 px-6 text-center text-sm font-semibold">
              More about me
            </a>
          </Link>
          <a
            href="https://twitter.com/ooloth"
            target="_blank"
            rel="noopener noreferrer"
            className="shadow-md rounded bg-gray-900 py-3 px-6 text-center text-sm font-semibold"
          >
            Follow me on Twitter
          </a>
        </div>
      </header>

      <main>
        <Timeline items={timelineItems} />
      </main>
    </Outer>
  )
}

export async function getStaticProps() {
  const timelineItems = {
    2021: [
      {
        icon: '🎨',
        heading: 'Launched redesigned michaeluloth.com',
        date: 'January 25, 2021',
        blurb:
          'Finally! After years of bright-white versions of this site built with Gatsby.js, I had fun creating a dark concept built with Next.js and TailwindCSS.',
      },
    ],
    2020: [
      {
        icon: '🛍',
        heading: 'Launched ecobee.com cart',
        date: 'February 26, 2020',
        blurb:
          "I helped bring a new shopping experience to ecobee.com by leading the development of a new cart powered by XState and Shopify's Storefront API.",
      },
    ],
    2019: [
      {
        icon: '💼',
        heading: 'Joined ecobee, Inc.',
        date: 'August 15, 2019',
        blurb: '',
      },
      {
        icon: '☕',
        heading: 'Work in progress...',
        date: '',
        blurb: 'More timeline entries coming soon.',
      },
    ],
  }

  return {
    props: { timelineItems },
  }
}
