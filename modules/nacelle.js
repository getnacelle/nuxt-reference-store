import NacelleClient from '@nacelle/client-js-sdk/dist/client-js-sdk.esm'
import generateSiteData from './data/generateSiteData'
import writeData from './utils/writeData'
import createSearchDataObject from './utils/createSearchDataObject'
import transformProductData from './utils/transformProductData'

const path = require('path')

module.exports = async function (moduleOptions) {
  const options = {
    ...this.options.nacelle,
    ...moduleOptions,
    locale: this.options.nacelle.locale || 'en-us',
    endpoint: this.options.nacelle.endpoint
  }

  const client = new NacelleClient({
    id: this.options.nacelle.spaceID,
    token: this.options.nacelle.token,
    locale: options.defaultLocale,
    nacelleEndpoint: options.endpoint,
    useStatic: false
  })

  // Read space data
  const space = await client.data.space()

  // Add $nacelle plugin
  this.addPlugin({
    src: path.resolve(__dirname, './dollar-nacelle.js'),
    filename: 'dollar-nacelle.js',
    options: {
      settings: options,
      space
    }
  })

  // install nacelle vuex stores
  this.addPlugin({
    src: path.resolve(__dirname, '../plugins/vuex-store-plugin.js'),
    filename: 'vuex-store-plugin.js',
    options
  })

  // generate search.json in static dir
  const routeConfig = this.options.nacelle.routeConfig || {}
  const buildDir = this.options.srcDir
  const staticDir = path.resolve(buildDir, './static/data')
  const searchDataTypes = this.options.nacelle.searchDataTypes || []

  this.nuxt.hook('build:before', async () => {
    try {
      const items = await generateSiteData({
        routeConfig,
        client
      })
      const searchDataObject = createSearchDataObject({
        items,
        searchDataTypes
      })
      if (searchDataObject.product) {
        searchDataObject.product = transformProductData(
          searchDataObject.product
        )
      }

      writeData(`${staticDir}/search.json`, searchDataObject)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(
        `Error generating static data files. Aborting build.\n\n${error}`
      )
    }
  })
}
