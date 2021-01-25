module.exports = {
  experimental: {
    optimizeFonts: true,
  },
  images: {
    domains: ['media.giphy.com'],
  },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/codes',
        destination: '/',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/',
        permanent: true,
      },
      {
        source: '/likes',
        destination: '/',
        permanent: false,
      },
      {
        source: '/opera',
        destination: '/',
        permanent: true,
      },
      {
        source: '/sings',
        destination: '/',
        permanent: true,
      },
      {
        source: '/tax-preparation',
        destination: '/',
        permanent: true,
      },
      {
        source: '/web-design',
        destination: '/',
        permanent: true,
      },
      {
        source: '/websites',
        destination: '/',
        permanent: true,
      },
      {
        source: '/writes',
        destination: '/blog',
        permanent: true,
      },
    ]
  },
}
