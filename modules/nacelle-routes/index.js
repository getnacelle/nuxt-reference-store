import getProductRoutes from './getProductRoutes'
import getCollectionRoutes from './getCollectionRoutes'
import getPageRoutes from './getPageRoutes'
import getArticleRoutes from './getArticleRoutes'

const productRoutePath = '/products/'
const collectionRoutePath = '/collections/'
const pageRoutePath = '/pages/'
const articleRoutePath = '/blog/'

export default function generateRoutes() {
  this.nuxt.hook('generate:before', async (_generator, generateOptions) => {
    const routesArrays = await Promise.all([
      getProductRoutes(productRoutePath),
      getCollectionRoutes(collectionRoutePath),
      getPageRoutes(pageRoutePath),
      getArticleRoutes(articleRoutePath)
    ])

    const nacelleRoutes = routesArrays.reduce((acc, curr) => {
      return acc.concat(curr)
    }, [])

    generateOptions.routes.push(...nacelleRoutes)
  })
}
