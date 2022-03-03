import type { AppProps } from 'next/app'
import 'prismjs'
import 'what-input'
import { DefaultSeo } from 'next-seo'
import { MDXProvider } from '@mdx-js/react'

import MdxComponents from 'components/mdx'
import ColorModeProvider from 'components/color-mode'
import '../styles/tailwind.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        titleTemplate="Michael Uloth — %s"
        openGraph={{
          type: 'website',
          locale: 'en_CA',
          url: 'https://michaeluloth.com',
          site_name: 'Michael Uloth',
          images: [
            {
              alt: 'Michael Uloth smiling into the camera',
              url: 'https://michaeluloth.com/images/michael-landscape.jpg',
              width: 2883,
              height: 2058,
            },
          ],
        }}
        twitter={{
          handle: '@ooloth',
          site: '@ooloth',
          cardType: 'summary_large_image',
        }}
      />

      <ColorModeProvider>
        <MDXProvider components={MdxComponents}>
          <Component {...pageProps} />
        </MDXProvider>
      </ColorModeProvider>
    </>
  )
}

export default MyApp
