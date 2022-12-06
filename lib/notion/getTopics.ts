import getDatabase from './getDatabase'

export default async function getTopics(): Promise<any[]> {
  const topics = await getDatabase({
    databaseId: process.env.NOTION_DB_ID_TOPICS,
    filter: {
      and: [
        {
          property: 'Name',
          title: {
            is_not_empty: true,
          },
        },
        {
          property: 'Path',
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
        {
          property: 'Research',
          relation: {
            is_not_empty: true,
          },
        },
      ],
    },
    sorts: [
      {
        property: 'Name',
        direction: 'ascending',
      },
    ],
  })

  return topics
}
