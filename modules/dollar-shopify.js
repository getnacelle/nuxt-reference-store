import axios from 'axios'
export default function (context, inject) {
  const client = axios.create({
    baseURL: `https://${context.$config.myshopifyDomain}/api/2020-04/graphql`,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Shopify-Storefront-Access-Token': context.$config.shopifyToken
    }
  })

  const plugin = {
    client
  }

  inject('shopify', plugin)
}
