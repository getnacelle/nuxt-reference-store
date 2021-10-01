import routes from "./config/routes";

export default {
  ssr: true,
  target: "static",
  head: {
    title: "nuxt-reference-store",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  css: [],

  plugins: [{ src: "~/plugins/globalSetup.js" }],

  components: true,

  image: {
    domains: ["https://cdn.shopify.com"]
  },

  publicRuntimeConfig: {
    nacelle: {
      id: process.env.NACELLE_SPACE_ID,
      token: process.env.NACELLE_GRAPHQL_TOKEN,
      nacelleEndpoint: process.env.NACELLE_ENDPOINT,
      locale: process.env.NACELLE_LOCALE || "en-us"
    },
    shopify: {
      storefrontCheckoutToken: process.env.SHOPIFY_STOREFRONT_TOKEN,
      myshopifyDomain: process.env.SHOPIFY_STOREFRONT_DOMAIN,
      storefrontApiVersion: process.env.SHOPIFY_STOREFRONT_VERSION
    }
  },

  buildModules: [
    "@nuxt/image",
    "@nuxtjs/svg",
    "@nuxtjs/composition-api/module",
    "@nuxtjs/pwa",
    "@nuxtjs/tailwindcss"
  ],

  modules: [],

  pwa: {
    manifest: {
      lang: "en"
    }
  },

  build: {},

  vue: {
    config: {
      productionTip: false,
      devtools: true
    }
  },

  generate: {
    crawler: false,
    concurrency: 25,
    interval: 2000,
    fallback: true,
    routes: () => routes()
  }
};
