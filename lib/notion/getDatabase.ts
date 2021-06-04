import notion from './client'

async function fetch100Rows(databaseId: string, start_cursor?: string) {
  const response = await notion.databases.query({
    database_id: databaseId,
    start_cursor,
  })

  return response
}

async function getDatabase(databaseId: string) {
  let allRows = []
  let has_more = false
  let start_cursor: string = undefined

  do {
    const response = await fetch100Rows(databaseId, start_cursor)

    // Accumulate the results 100 rows at a time
    allRows = [...allRows, ...response.results]

    // Check if there are more rows than the 100 in the latest response
    has_more = response.has_more
    start_cursor = response.next_cursor
  } while (has_more)

  return await Promise.all(allRows)
}

export default getDatabase
