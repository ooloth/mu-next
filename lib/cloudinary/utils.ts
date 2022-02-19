function transformCloudinaryImage(url: string, width: number) {
  if (url.includes('res.cloudinary.com')) {
    return url.replace('upload/', `upload/w_${width}f_auto,q_auto,dpr_2.0/`)
  }

  return url
}

export { transformCloudinaryImage }
