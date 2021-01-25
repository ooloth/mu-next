import type { AppProps } from 'next/app'
import 'what-input'
import { DefaultSeo } from 'next-seo'

import ColorModeProvider from 'components/color-mode'
import '../styles/tailwind.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        titleTemplate="Michael Uloth | %s"
        openGraph={{
          type: 'website',
          locale: 'en_CA',
          url: 'https://michaeluloth.com',
          site_name: 'Michael Uloth',
          images: [
            {
              alt: 'Michael Uloth smiling into the camera',
              url: 'https://michaeluloth.com/images/michael-square.jpg',
              width: 1929,
              height: 1928,
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
        <Component {...pageProps} />
      </ColorModeProvider>
    </>
  )
}

export default MyApp
