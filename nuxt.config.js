import routes from "./config/routes";

const isPreview = process.env.APP_CONTENT_MODE === "preview";

export default {
  ssr: !isPreview,
  target: "static",
  head: {
    title: "nuxt-reference-store",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "format-detection", content: "telephone=no" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  css: [],

  plugins: [
    { src: "~/plugins/nacelleSdk.js" },
    { src: "~/plugins/globalSetup.js" },
    { src: "~/plugins/shopifyCheckout.js", mode: "client" }
  ],

  components: true,

  image: {
    domains: ["https://cdn.shopify.com", "cdn.sanity.io"]
  },

  publicRuntimeConfig: {
    app: {
      contentMode: process.env.APP_CONTENT_MODE,
      contentSource: process.env.APP_CONTENT_SOURCE
    },
    nacelle: {
      id: process.env.NACELLE_SPACE_ID,
      token: process.env.NACELLE_GRAPHQL_TOKEN,
      nacelleEndpoint: process.env.NACELLE_ENDPOINT,
      locale: process.env.NACELLE_LOCALE || "en-us"
    },
    sanity: {
      projectId: process.env.SANITY_PROJECT_ID,
      dataset: process.env.SANITY_DATASET,
      token: process.env.SANITY_TOKEN
    },
    shopify: {
      storefrontCheckoutToken: process.env.SHOPIFY_STOREFRONT_TOKEN,
      myshopifyDomain: process.env.SHOPIFY_SHOP_ID,
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
    name: "Nacelle x Nuxt Reference Store",
    manifest: {
      lang: "en"
    },
    meta: {
      name: false, // prevent overriding `useMeta` in `onGlobalSetup`
      theme_color: "#4f46e5"
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
