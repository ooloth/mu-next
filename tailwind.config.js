// Must remain a CommonJS file (not ESM or TS)

const defaultTheme = require('tailwindcss/defaultTheme')
const allColors = require('tailwindcss/colors')

// See: https://tailwindcss.com/docs/controlling-file-size#purgecss-options
// See: https://tailwindcss.com/docs/controlling-file-size#writing-purgeable-html
const purge = ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}']

const darkMode = 'media'

/**
 * Theme (extensions)
 */

const sans =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'

const fontFamily = {
  sans: ['Inter', sans],
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
  fontFamily,
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

const colors = {
  ...defaultTheme.colors,
  gray: allColors.gray,
}

const theme = { extend, screens, colors }

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
