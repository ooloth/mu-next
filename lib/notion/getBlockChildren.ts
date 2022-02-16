import notion from './client'

// TODO: add pagination logic for pages with more than 100 blocks?
export default async function getBlockChildren(blockId: string) {
  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 100,
  })

  return response.results
}
