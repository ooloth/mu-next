import notion from './client'

const getBlocks = async blockId => {
  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 50,
  })

  return response.results
}

export default getBlocks
