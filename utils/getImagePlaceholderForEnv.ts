import { getPlaiceholder } from 'plaiceholder'

export default async function getImagePlaceholderForEnv(
  imageUrl: string,
  size: number,
): Promise<string> {
  // Validate size argument
  if ((size && size < 4) || (size && size > 64)) {
    throw Error(
      '[getImagePlaceholderForEnv]: size argument must be an integer between 4 and 64',
    )
  }

  if (process.env.NODE_ENV === 'production') {
    // Generate a real placeholder in production
    const { base64 } = await getPlaiceholder(imageUrl, { size })
    return base64
  } else {
    // Make development faster by using a fake placeholder
    return gray900AsBase64
  }
}

// See: https://png-pixel.com
const gray900AsBase64 =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOUkJD+DwAB5wFMR598EAAAAABJRU5ErkJggg=='
