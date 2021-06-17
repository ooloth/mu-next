import { getPlaiceholder } from 'plaiceholder'

export default async function addImagePlaceholdersToMdx(fileContents: any) {
  const compiledSourceAsArray = fileContents.mdxSource.compiledSource.split(',')

  const compiledSourceWithBase64Placeholders = await Promise.all(
    compiledSourceAsArray.map(async string => {
      if (string.includes('imageUrl')) {
        const imageUrl = string.replace('imageUrl:"', '').replace('"', '')

        const { base64 } = await getPlaiceholder(imageUrl, { size: 64 })

        return `${string},imagePlaceholder:"${base64}"`
      }

      return string
    }),
  )

  fileContents.mdxSource.compiledSource =
    compiledSourceWithBase64Placeholders.join(',')

  return fileContents
}
