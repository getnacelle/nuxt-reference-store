import client from './client'

export default async (articleRoutePath) => {
  const pageData = await client.data.allContent()
  if (pageData) {
    return pageData
      .filter((item) => item.type === 'article')
      .map((item) => `${articleRoutePath}${item.handle}`)
  }
  return []
}
