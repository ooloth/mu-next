import notion from './client'

const getPage = async pageId => {
  const response = await notion.pages.retrieve({ page_id: pageId })

  return response
}

export default getPage
