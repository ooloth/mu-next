import getDatabase from './getDatabase'

export default async function getBookmarkedResearchByIds(researchIds: string[]): Promise<any[]> {
  if (!researchIds.length) return []

  const bookmarkedResearch = await getDatabase({
    databaseId: process.env.NOTION_DB_ID_RESEARCH,
    filter: {
      and: [
        {
          property: 'Status',
          status: {
            equals: 'Bookmarked',
          },
        },
        {
          property: 'Name',
          title: {
            is_not_empty: true,
          },
        },
        {
          property: 'Topics',
          relation: {
            is_not_empty: true,
          },
        },
        {
          property: 'Subtopics',
          multi_select: {
            is_not_empty: true,
          },
        },
        {
          property: 'Format',
          select: {
            is_not_empty: true,
          },
        },
        {
          property: 'URL',
          url: {
            is_not_empty: true,
          },
        },
        {
          or: [
            {
              property: 'Creators',
              multi_select: {
                is_not_empty: true,
              },
            },
            {
              property: 'Description',
              rich_text: {
                is_not_empty: true,
              },
            },
          ],
        },
      ],
    },
    sorts: [
      {
        property: 'Topics',
        direction: 'ascending',
      },
      {
        property: 'Subtopics',
        direction: 'ascending',
      },
      {
        property: 'Date',
        direction: 'descending',
      },
    ],
  })

  const matchingResearch = bookmarkedResearch.filter(research => researchIds.includes(research.id))

  return matchingResearch
}
