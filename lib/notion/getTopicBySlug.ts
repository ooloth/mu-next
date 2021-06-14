import { topicsDbId } from './constants'
import getDatabase from './getDatabase'

export default async function getTopicBySlug(slug: string): Promise<any> {
  const topics = await getDatabase({
    databaseId: topicsDbId,
    filter: {
      property: 'Path',
      rich_text: {
        equals: slug,
      },
    },
  })

  return topics[0]
}
