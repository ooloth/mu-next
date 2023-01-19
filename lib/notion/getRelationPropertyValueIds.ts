import {
  GetPagePropertyParameters,
  GetPagePropertyResponse,
  PropertyItemPropertyItemListResponse,
} from '@notionhq/client/build/src/api-endpoints'

import notion from './client'

type FetchArgs = {
  pageId: string
  propertyId: string
  start_cursor?: string
}

async function fetch25PropertyValues({
  pageId,
  propertyId,
  start_cursor,
}: FetchArgs): Promise<GetPagePropertyResponse> {
  const args: GetPagePropertyParameters = {
    page_id: pageId,
    property_id: propertyId,
    start_cursor,
  }

  const response = await notion.pages.properties.retrieve(args)

  return response
}

function isRelationPropertyItemResponse(
  response: GetPagePropertyResponse,
): response is PropertyItemPropertyItemListResponse {
  return (
    response?.type === 'property_item' &&
    response?.object === 'list' &&
    'relation' in response?.results?.[0]
  )
}

type GetPropertyValuesArgs = {
  pageId: string
  relationPropertyId: string
}

// NOTE: Notion returns max 25 property values per page in a single request (need to paginate to get all)
// see: https://stackoverflow.com/a/72532216/8802485
// see: https://developers.notion.com/reference/retrieve-a-page-property
// see: https://developers.notion.com/reference/property-item-object
async function getRelationPropertyValueIds({ pageId, relationPropertyId }: GetPropertyValuesArgs) {
  let allValues = []
  let has_more = false
  let start_cursor: string = undefined

  do {
    const response = await fetch25PropertyValues({
      pageId,
      propertyId: relationPropertyId,
      start_cursor,
    })

    if (!isRelationPropertyItemResponse(response)) {
      throw Error('This helper only handles Relation properties')
    }

    // Accumulate the relation value IDs 25 at a time
    allValues = [
      ...allValues,
      ...response.results.map(result => (result.type === 'relation' ? result.relation.id : '')),
    ]

    // Check if there are more values than the 25 in the latest response
    has_more = response.has_more
    start_cursor = response.next_cursor
  } while (has_more)

  return await Promise.all(allValues)
}

export default getRelationPropertyValueIds
