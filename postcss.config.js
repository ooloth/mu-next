// See: https://tailwindcss.com/docs/using-with-preprocessors#using-postcss-as-your-preprocessor
// See: https://preset-env.cssdb.org/features#stage-3

module.exports = {
  plugins: {
    'postcss-import': {},
    tailwindcss: {},
    'postcss-flexbugs-fixes': {},
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
      features: {
        'custom-properties': false,
      },
    },
  },
}
