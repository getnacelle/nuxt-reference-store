import createDataItemObject from '../utils/createDataItemObject'

export default async ({ client, routeConfig }) => {
  const collections = await client.data.allCollections()

  if (collections && collections.length > 0) {
    const items = collections.map((collection) =>
      createDataItemObject({
        type: 'collection',
        item: collection,
        routeConfig
      })
    )

    return items
  }

  return []
}
