import getImagePlaceholderForEnv from 'utils/getImagePlaceholderForEnv'

export default async function addImagePlaceholderToMdxFrontMatter(
  fileContents: any,
) {
  const { featuredImage } = fileContents.frontMatter

  const imagePlaceholder = await getImagePlaceholderForEnv(featuredImage, 64)

  fileContents.frontMatter.featuredImagePlaceholder = imagePlaceholder

  return fileContents
}
