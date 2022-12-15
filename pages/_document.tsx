import Document, { Html, Head, Main, NextScript } from 'next/document'
// import Script from 'next/script'
import React from 'react'

import { googleSearchConsoleSiteVerification } from 'lib/google/constants'

// function SetColorModeBeforeFirstRender({ defaultMode }) {
//   // Runs only once (when the first page loads) to avoid a FOUC when the content appears

//   const lightUnlessDarkPrefered = `
//     (function() {
//       const userChoseDark = localStorage.theme === 'dark'

//       const userPrefersDark =
//         !('theme' in localStorage) &&
//         window.matchMedia('(prefers-color-scheme: dark)').matches

//       if (userChoseDark || userPrefersDark) {
//         document.querySelector('html').classList.add('dark')
//       } else {
//         document.querySelector('html').classList.remove('dark')
//       }
//     })()
//   `

//   const darkUnlessLightChosen = `
//     (function() {
//       const userChoseLight = localStorage.theme === 'light'

//       if (userChoseLight) {
//         document.querySelector('html').classList.remove('dark')
//       }
//     })()
//     `

//   const setInitialColorMode =
//     defaultMode === 'light' ? lightUnlessDarkPrefered : darkUnlessLightChosen

//   // return <script dangerouslySetInnerHTML={{ __html: setInitialColorMode }} />

//   return (
//     <Script
//       dangerouslySetInnerHTML={{ __html: setInitialColorMode }}
//       strategy="beforeInteractive" // lazyOnload, afterInteractive
//     />
//   )
// }

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="dark">
        <Head>
          {/* Fonts */}
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;800&display=swap"
            rel="stylesheet"
          />

          {/* Favicons */}
          <link rel="shortcut icon" href="/favicons/favicon.ico" />
          <link rel="manifest" href="/favicons/site.webmanifest" />
          <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
          <meta name="theme-color" content="#ffffff" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="msapplication-config" content="/favicons/browserconfig.xml" />

          {/* RSS */}
          <link
            rel="alternate"
            type="application/rss+xml"
            title="RSS for blog posts"
            href="https://michaeluloth.com/rss.xml"
          />

          {/* Site verification */}
          <meta name="google-site-verification" content={googleSearchConsoleSiteVerification} />
        </Head>

        <body className="overflow-x-hidden bg-white dark:bg-black min-h-screen font-sans text-gray-600 dark:text-gray-300">
          {/* <SetColorModeBeforeFirstRender defaultMode="dark" /> */}
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
