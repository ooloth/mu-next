// JS version is for scripts/generate-rss.js

const notion = require('./client')

async function fetch100Rows({ databaseId, filter, sorts, start_cursor }) {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter,
    sorts,
    start_cursor,
  })

  return response
}

async function getDatabase({ databaseId, filter, sorts }) {
  let allRows = []
  let has_more = false
  let start_cursor = undefined

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

module.exports = getDatabase
