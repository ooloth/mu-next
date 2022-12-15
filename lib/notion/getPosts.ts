import getDatabase from './getDatabase'

export default async function getPosts(): Promise<any[]> {
  const posts = await getDatabase({
    databaseId: process.env.NOTION_DB_ID_WRITING,
    filter: {
      and: [
        {
          property: 'Destination',
          multi_select: {
            contains: 'blog',
          },
        },
        {
          property: 'Status',
          status: {
            equals: 'Published',
          },
        },
        {
          property: 'Title',
          title: {
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
          property: 'Description',
          rich_text: {
            is_not_empty: true,
          },
        },
        // NOTE: link posts don't have featured images atm
        // {
        //   property: 'Featured image',
        //   url: {
        //     is_not_empty: true,
        //   },
        // },
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
