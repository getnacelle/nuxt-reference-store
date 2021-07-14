import { defaultProduct, defaultContent } from './defaultObjects'
import staticCollectionPage from './static-collection-page'
import staticCollection from './static-collection'

export default {
  install(Vue) {
    Vue.prototype.$nacelle = {
      locale: 'en-us',
      data: {
        products({ handles }) {
          const products = handles.map(() => defaultProduct)

          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(products)
            }, 100)
          })
        },
        content({ handle, type }) {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                id: '12345',
                source: 'contentful',
                type: 'content',
                title: 'Mock Response',
                description: 'This is a mock content response',
                sections: defaultContent.contentful,
                tags: [],
                fields: {}
              })
            }, 100)
          })
        },
        collection({ handle }) {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(staticCollection)
            })
          })
        },
        collectionPage({ handle, paginate, itemsPerPage }) {
          if (paginate) {
            return Promise.resolve(staticCollectionPage.slice(0, itemsPerPage))
          }
          return Promise.resolve(staticCollectionPage)
        }
      },
      checkout() {
        return Promise.resolve({
          id: '1234',
          ur: 'testing'
        })
      }
    }
  }
}
