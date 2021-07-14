import client from './client'
export default async (productRoutePath) => {
  const productData = await client.data.allProducts()
  if (productData) {
    return productData.map((item) => `${productRoutePath}${item.handle}`)
  }
  return []
}
