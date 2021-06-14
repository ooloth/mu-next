import { topicsDbId } from './constants'
import getDatabase from './getDatabase'

export default async function getTopics(): Promise<any[]> {
  const topics = await getDatabase({
    databaseId: topicsDbId,
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
          property: 'Subtopics',
          relation: {
            is_not_empty: true,
          },
        },
        {
          property: 'Bookmarks',
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
