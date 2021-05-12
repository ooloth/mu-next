module.exports = {
  experimental: {
    turboMode: true,
  },
  future: {
    webpack5: true,
    strictPostcssConfiguration: true,
  },
  images: {
    domains: [
      'image.tmdb.org',
      'is1-ssl.mzstatic.com',
      'is2-ssl.mzstatic.com',
      'is3-ssl.mzstatic.com',
      'is4-ssl.mzstatic.com',
      'is5-ssl.mzstatic.com',
      'media.giphy.com',
    ],
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
  webpack: (config, { isServer }) => {
    if (isServer) {
      require('./scripts/generate-rss')
      require('./scripts/generate-sitemap')
    }

    return config
  },
}
