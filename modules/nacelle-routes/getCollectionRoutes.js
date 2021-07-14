import client from './client'

export default async (collectionRoutePath) => {
  const collectionData = await client.data.allCollections()
  return collectionData.map((item) => `${collectionRoutePath}${item.handle}`)
}
