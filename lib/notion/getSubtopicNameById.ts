import { subtopicsDbId } from './constants'
import getDatabase from './getDatabase'

export default async function getSubtopicNameById(id: string): Promise<string> {
  const subtopics = await getDatabase({
    databaseId: subtopicsDbId,
  })

  const matchingSubtopic = subtopics.find(subtopic => subtopic.id === id)

  const subtopicName = matchingSubtopic.properties['Name'].title[0].plain_text

  return subtopicName
}
