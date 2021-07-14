import createDataItemObject from '../utils/createDataItemObject'

export default async ({ client, routeConfig }) => {
  const content = await client.data.allContent()

  if (content && content.length > 0) {
    const items = content.map((item) => {
      item.source = item.cmsSyncSource

      return createDataItemObject({
        type: item.type,
        item,
        routeConfig
      })
    })

    return items
  }

  return []
}
