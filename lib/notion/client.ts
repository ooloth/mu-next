import { Client } from '@notionhq/client'

const notion = new Client({
  auth: process.env.NOTION_ACCESS_TOKEN,
  notionVersion: '2022-02-22',
})

export default notion
