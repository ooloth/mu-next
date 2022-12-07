import { topicsDbId } from './constants'
import getDatabase from './getDatabase'

export default async function getTopicBySlug(slug: string): Promise<any> {
  const topics = await getDatabase({
    databaseId: topicsDbId,
    filter: {
      and: [
        {
          property: 'Path',
          rich_text: {
            equals: slug,
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
  })

  return topics[0]
}
