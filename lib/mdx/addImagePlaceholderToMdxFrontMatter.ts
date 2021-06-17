import { getPlaiceholder } from 'plaiceholder'

export default async function addImagePlaceholderToMdxFrontMatter(
  fileContents: any,
) {
  const { featuredImage } = fileContents.frontMatter
  const { base64 } = await getPlaiceholder(featuredImage, { size: 64 })

  fileContents.frontMatter.featuredImagePlaceholder = base64

  return fileContents
}
