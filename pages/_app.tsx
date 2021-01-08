import type { AppProps /*, AppContext */ } from 'next/app'
import 'what-input'

import ColorModeProvider from 'components/color-mode'
import '../styles/tailwind.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ColorModeProvider>
      <Component {...pageProps} />
    </ColorModeProvider>
  )
}

export default MyApp
