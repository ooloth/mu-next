// JS version is for scripts/generate-rss.js

const { Client } = require('@notionhq/client')

const notion = new Client({
  auth: process.env.NOTION_ACCESS_TOKEN,
  notionVersion: '2022-06-28',
})

module.exports = notion
