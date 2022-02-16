const fs = require('fs')
const globby = require('globby')
const prettier = require('prettier')

;(async () => {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.yml')

  const pages = await globby([
    'content/articles/*.mdx',
    'content/notes/*.mdx',
    'content/snippets/*.mdx',
    'content/*.mdx',
    'pages/*.tsx',
    '!pages/_*.tsx',
    '!pages/api',
  ])

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map(page => {
          const path = page
            .replace('content/articles', '')
            .replace('content/notes', '')
            .replace('content/snippets', '')
            .replace('content', '')
            .replace('.mdx', '')
            .replace('pages', '')
            .replace('.tsx', '')

          const route = path === '/index' ? '' : path

          return `
            <url>
              <loc>${`https://michaeluloth.com${route}`}</loc>
            </url>
          `
        })
        .join('')}
    </urlset>
  `

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html',
  })

  // eslint-disable-next-line no-sync
  fs.writeFileSync('public/sitemap.xml', formatted)
})()
