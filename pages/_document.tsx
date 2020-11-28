import Document, { Html, Head, Main, NextScript } from 'next/document'
import React from 'react'

function SetColorModeBeforeFirstRender({ defaultMode }) {
  // Runs only once (when the first page loads) to avoid a FOUC when the content appears

  const lightUnlessDarkPrefered = `
    (function() {
      const userChoseDark = localStorage.theme === 'dark'

      const userPrefersDark =
        !('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches

      if (userChoseDark || userPrefersDark) {
        document.querySelector('html').classList.add('dark')
      } else {
        document.querySelector('html').classList.remove('dark')
      }
    })()
  `

  const darkUnlessLightChosen = `
    (function() {
      const userChoseLight = localStorage.theme === 'light'

      if (userChoseLight) {
        document.querySelector('html').classList.remove('dark')
      }
    })()
    `

  const setInitialColorMode =
    defaultMode === 'light' ? lightUnlessDarkPrefered : darkUnlessLightChosen

  return <script dangerouslySetInnerHTML={{ __html: setInitialColorMode }} />
}

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="dark">
        <Head />
        <body className="overflow-x-hidden bg-white dark:bg-gray-900 min-h-screen font-sans text-gray-600 dark:text-gray-400">
          <SetColorModeBeforeFirstRender defaultMode="dark" />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
