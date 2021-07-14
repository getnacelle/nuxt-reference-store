import createDataItemObject from '../utils/createDataItemObject'

export default async ({ client, routeConfig }) => {
  const locale = client.defaultLocale
  const products = await client.data.allProducts()

  if (products.length === 0) {
    throw new Error(`No products found. Ensure that your product data connector is set up correctly and that your products are available through the connector's API.
    \n
    For help, visit the docs: https://docs.getnacelle.com/api-reference/dilithium-connector.html
    `)
  }

  const items = products.reduce((acc, product) => {
    if (product && product.handle) {
      acc.push(
        createDataItemObject({
          type: 'product',
          item: product,
          routeConfig
        })
      )
    }

    return acc
  }, [])

  // Create Shop page collection item
  if (products) {
    const shopProducts = [...new Set(products.map((product) => product.handle))]
    items.push(
      createDataItemObject({
        type: 'collection',
        item: {
          id: 'shop',
          handle: 'shop',
          globalHandle: `nacelle-gen-shop-all::${locale}`,
          locale,
          title: 'Shop',
          productLists: [
            {
              title: 'Default',
              slug: 'default',
              locale,
              handles: shopProducts
            }
          ]
        },
        route: '/shop'
      })
    )
  }

  return items
}
