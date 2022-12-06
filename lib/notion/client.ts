import { Client } from '@notionhq/client'

const notion = new Client({
  auth: process.env.NOTION_ACCESS_TOKEN,
  notionVersion: '2022-06-28',
})

export default notion
