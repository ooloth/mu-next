// Must remain a CommonJS file (not ESM or TS)

const defaultTheme = require('tailwindcss/defaultTheme')

// See: https://tailwindcss.com/docs/controlling-file-size#purgecss-options
// See: https://tailwindcss.com/docs/controlling-file-size#writing-purgeable-html
const purge = ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}']

const darkMode = 'media'

/**
 * Theme (extensions)
 */

const colors = {
  purple: {
    ...defaultTheme.colors.purple,
    /* Contrast with white text = 4.58: */
    default: 'hsl(267, 85%, 62%)',
    /* Contrast with white text = 4.84: */
    light: 'hsla(267, 85%, 62%, 90%)',
  },
}

const fontFamily = {
  sans: ['Avenir Next', ...defaultTheme.fontFamily.sans],
}

const fontSize = {
  // '7xl': '5rem',
  // '8xl': '6rem',
  // '9xl': '7rem',
  '10xl': '8rem',
  '11xl': '9rem',
  '12xl': '10rem',
  '13xl': '11rem',
  '14xl': '12rem',
}

const height = {
  '1em': '1em',
}

const inset = {
  '1/2': '50%',
}

const lineHeight = {
  0: '0',
}

const width = {
  '1em': '1em',
}

const zIndex = {
  '-1': '-1',
  100: '100',
}

const extend = {
  colors,
  fontFamily,
  fontSize,
  height,
  inset,
  lineHeight,
  width,
  zIndex,
}

/**
 * Theme (replacements)
 */

const screens = {
  iPhoneX: '375px',
  ...defaultTheme.screens,
}

const theme = { extend, screens }

/**
 * Variants
 */

const letterSpacing = ['responsive', 'hover']

const variants = { letterSpacing }

/**
 * Plugins
 */

const plugins = []

module.exports = { purge, darkMode, theme, variants, plugins }
