import notion from './client'

type FetchArgs = {
  databaseId: string
  filter?: any
  sorts?: any
  start_cursor?: string
}

async function fetch100Rows({ databaseId, filter, sorts, start_cursor }: FetchArgs) {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter,
    sorts,
    start_cursor,
  })

  return response
}

type GetDbArgs = {
  databaseId: string
  filter?: any
  sorts?: any
}

async function getDatabase({ databaseId, filter, sorts }: GetDbArgs) {
  let allRows = []
  let has_more = false
  let start_cursor: string = undefined

  do {
    const response = await fetch100Rows({ databaseId, filter, sorts, start_cursor })

    // Accumulate the results 100 rows at a time
    allRows = [...allRows, ...response.results]

    // Check if there are more rows than the 100 in the latest response
    has_more = response.has_more
    start_cursor = response.next_cursor
  } while (has_more)

  return await Promise.all(allRows)
}

export default getDatabase
