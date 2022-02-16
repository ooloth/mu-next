// JS version is for scripts/generate-rss.js

const { postsDbId } = require('./constants')
const getDatabase = require('./getDatabase')

async function getPosts() {
  const posts = await getDatabase({
    databaseId: postsDbId,
    filter: {
      and: [
        {
          property: 'Title',
          title: {
            is_not_empty: true,
          },
        },
        {
          property: 'Type',
          select: {
            is_not_empty: true,
          },
        },
        {
          property: 'Slug',
          rich_text: {
            is_not_empty: true,
          },
        },
        {
          property: 'Status',
          select: {
            equals: 'Published',
          },
        },
        {
          property: 'First published',
          date: {
            on_or_before: new Date().toISOString(),
          },
        },
      ],
    },
    sorts: [
      {
        property: 'First published',
        direction: 'descending',
      },
    ],
  })

  return posts
}

module.exports = getPosts
