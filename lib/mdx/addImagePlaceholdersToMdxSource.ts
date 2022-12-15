import getImagePlaceholderForEnv from 'utils/getImagePlaceholderForEnv'

export default async function addImagePlaceholdersToMdxSource(fileContents: any) {
  // Break long MDX string into lots of short strings
  const compiledSourceAsArray = fileContents.mdxSource.compiledSource.split(',')

  const compiledSourceWithBase64Placeholders = await Promise.all(
    compiledSourceAsArray.map(async string => {
      if (!string.includes('imageUrl')) {
        return string
      }

      // If a string includes "imageUrl", append an "imagePlaceholder" to it
      const imageUrl = string.replace('imageUrl: "', '').replace('"', '')
      const imagePlaceholder = await getImagePlaceholderForEnv(imageUrl, 64)

      return `${string},imagePlaceholder:"${imagePlaceholder}"`
    }),
  )

  // Put all the strings back together
  fileContents.mdxSource.compiledSource = compiledSourceWithBase64Placeholders.join(',')

  return fileContents
}
