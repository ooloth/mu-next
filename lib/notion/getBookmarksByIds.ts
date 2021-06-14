import { bookmarksDbId } from './constants'
import getDatabase from './getDatabase'

export default async function getBookmarksByIds(
  bookmarkIds: string[],
): Promise<any[]> {
  const bookmarks = await getDatabase({
    databaseId: bookmarksDbId,
    filter: {
      and: [
        {
          property: 'Title',
          title: {
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
          property: 'Topic',
          relation: {
            is_not_empty: true,
          },
        },
        {
          property: 'Subtopic',
          relation: {
            is_not_empty: true,
          },
        },
        {
          property: 'Creator',
          select: {
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
      ],
    },
    sorts: [
      {
        property: 'Topic',
        direction: 'ascending',
      },
      {
        property: 'Subtopic',
        direction: 'ascending',
      },
      {
        property: 'Date',
        direction: 'descending',
      },
    ],
  })

  const matchingBookmarks = bookmarks.filter(bookmark =>
    bookmarkIds.includes(bookmark.id),
  )

  return matchingBookmarks
}
