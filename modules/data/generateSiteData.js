import getProductDataItems from './getProductDataItems'
import getCollectionDataItems from './getCollectionDataItems'
import getContentDataItems from './getContentDataItems'

// Get all data for products, pages, blogs, articles, and collections.
// Return an array of objects where each object describes the type of data,
// the payload, and route to generate if it needs one
export default async ({ client, routeConfig = {} }) => {
  if (!client.token) {
    throw new Error(`You must add your Nacelle Token in order to build. \n\n 
    Either you bypassed the token input screen or someone invited you to this project on Github.\n\n
    Our docs outline how to get a token if you need one: https://docs.getnacelle.com/nuxt/join-a-project.html#git-clone`)
  }

  if (!client.id) {
    throw new Error(`You must add your Nacelle Space ID in order to build. \n\n 
    Either you bypassed the Space ID input screen or someone invited you to this project on Github.\n\n
    Our docs outline how to get a Space ID if you need one: https://docs.getnacelle.com/nuxt/join-a-project.html#git-clone`)
  }

  // eslint-disable-next-line no-console
  console.info(
    '\x1B[36m',
    '҈',
    '\x1B[0m',
    `Prefetching data from space, ${client.id}`
  )

  const items = await Promise.all([
    getProductDataItems({ client, routeConfig }),
    getCollectionDataItems({ client, routeConfig }),
    getContentDataItems({ client, routeConfig })
  ]).then((results) => {
    return [].concat.apply([], results)
  })

  return items
}
