export default {
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/global.scss'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: ['~/components/nacelle', '~/components/nacelle/image'],

  // Add environment variables to either `publicRuntineConfig` (exposed to client)
  // or to `privateRuntimeConfig`
  // https://nuxtjs.org/blog/moving-from-nuxtjs-dotenv-to-runtime-config/#introducing-the-nuxtjs-runtime-config
  publicRuntimeConfig: {
    API_PORT: process.env.API_PORT,
    contentAssetStorage: process.env.CONTENT_ASSET_STORAGE || '',
    nacelleId: process.env.NACELLE_SPACE_ID,
    nacelleToken: process.env.NACELLE_GRAPHQL_TOKEN,
    nacelleEndpoint: process.env.NACELLE_ENDPOINT
  },
  privateRuntimeConfig: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/eslint-module',
    'nuxt-purgecss',
    '~/modules/nacelle-routes'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/sitemap',
    'nuxt-polyfill',
    '~/modules/nacelle'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/nuxt-client-init.js', mode: 'client' },
    { src: '~/plugins/script-loader.js', mode: 'client' },
    { src: '~/plugins/vuex-product-module-registration.js' }
  ],

  /*
   ** Nacelle Configuration
   * https://docs.getnacelle.com/nuxt/nuxt-config.html
   */
  nacelle: {
    spaceID: process.env.NACELLE_SPACE_ID,
    token: process.env.NACELLE_GRAPHQL_TOKEN,
    endpoint: process.env.NACELLE_ENDPOINT

    /* Optional */
    // Set the default internationalization locales string for Nacelle to use
    // defaultLocale: 'en-us'

    // Optional array of data type strings to direct Nacelle to include other data types
    // besides products in search data.
    // searchDataTypes: ['article', 'page', 'blog'],
  },

  generate: {
    crawler: false,
    concurrency: 25
  },

  polyfill: {
    features: [
      {
        require: 'intersection-observer',
        detect: () => 'IntersectionObserver' in window
      }
    ]
  },

  // Customize the progress-bar color
  loading: { color: '#fff' },

  router: {
    middleware: 'cart'
  },

  sitemap: {
    gzip: true,
    hostname: 'http://localhost:3000' // When deploying, change this to your production URL
  },

  vue: {
    config: {
      devtools: true
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config) {
      config.node = {
        Buffer: false
      }
    },
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    html: {
      minify: {
        collapseBooleanAttributes: true,
        decodeEntities: true,
        minifyCSS: false,
        minifyJS: false,
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true
      }
    }
  }
}
