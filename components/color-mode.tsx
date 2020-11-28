import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'

interface ColorModeProviderValue {
  colorMode: string
  setColorMode: Dispatch<SetStateAction<string>>
}

const defaultContext: ColorModeProviderValue = {
  colorMode: undefined,
  setColorMode: () => '',
}

const ColorModeContext = createContext(defaultContext)

export function useColorMode() {
  return useContext(ColorModeContext)
}

export default function ColorModeProvider({ children }) {
  const [colorMode, setAppColorMode] = useState(defaultContext.colorMode)

  useEffect(() => {
    if (colorMode) {
      return
    }

    const activeColorMode = document
      .querySelector('html')
      .classList.contains('dark')
      ? 'dark'
      : 'light'

    setAppColorMode(activeColorMode)
  }, [colorMode])

  function setColorMode(newColorMode: string) {
    if (newColorMode === colorMode) {
      return
    }

    // Update HTML classes
    if (newColorMode === 'dark') {
      document.querySelector('html').classList.add('dark')
    } else {
      document.querySelector('html').classList.remove('dark')
    }

    // Update localStorage
    localStorage.setItem('theme', newColorMode)

    // Update state
    setAppColorMode(newColorMode)
  }

  const value = {
    colorMode,
    setColorMode,
  }

  return (
    <ColorModeContext.Provider value={value}>{children}</ColorModeContext.Provider>
  )
}
