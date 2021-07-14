import client from './client'

export default async (pageRoutePath) => {
  const pageData = await client.data.allContent()
  if (pageData) {
    return pageData
      .filter((item) => item.type === 'page')
      .map((item) => `${pageRoutePath}${item.handle}`)
  }
  return []
}
