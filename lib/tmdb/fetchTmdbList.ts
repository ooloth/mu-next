export interface TmdbItem {
  id: string
  imageUrl: string
  date: string
  link: string
  title: string
}

export default async function fetchTmdbList(
  listId: string,
  api: 'tv' | 'movie',
): Promise<TmdbItem[]> {
  if (!listId) {
    console.log('fetchTMDBListData error: listId is undefined')
    return []
  }

  let items = []
  let page = 1
  let totalPages = 999 // will be updated after the first API response

  // FIXME: specify variable and return types from here down...
  const fetch20Items = async () =>
    await fetch(
      // See: https://www.themoviedb.org/talk/55aa2a76c3a3682d63002fb1?language=en
      // See: https://developers.themoviedb.org/4/list/get-list
      `https://api.themoviedb.org/4/list/${listId}?sort_by=primary_release_date.desc&page=${page}`,
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
        },
      },
    )

  do {
    try {
      const response = await fetch20Items()
      const data = await response.json()
      totalPages = data.total_pages

      if (data.results && data.results.length > 0) {
        for (let result of data.results) {
          const title = result.title || result.name
          const id = result.id
          const date = new Date(
            result.release_date || result.first_air_date,
          ).getFullYear()
          const imageUrl = `https://image.tmdb.org/t/p/original${result.poster_path}`
          const link = `https://www.themoviedb.org/${api}/${id}`

          if (!title || !id || !date || !result.poster_path) {
            console.log(`Removed TMDB result:`, title || result)
            continue
          }

          items.push({ title, id, date, imageUrl, link })
        }
      }
    } catch (error) {
      console.log('fetchTMDBListData error', error)
    }

    page++
  } while (page <= totalPages)

  return await Promise.all(items)
}