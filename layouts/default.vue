<template>
  <space-provider
    v-if="site"
    :config="$config.nacelle"
    :space="site.space"
    :sdk="nacelleSdk"
    class="app"
  >
    <event-provider>
      <cart-provider>
        <search-provider :searchData="site.searchData">
          <site-header :content="site.header" />
          <site-cart :content="site.cart" />
          <nuxt />
          <site-newsletter :content="site.newsletter" />
          <site-footer :content="site.footer" />
          <site-nav :content="site.header" />
        </search-provider>
      </cart-provider>
    </event-provider>
  </space-provider>
</template>

<script>
import NacelleClient from "@nacelle/client-js-sdk";
import {
  defineComponent,
  ref,
  useContext,
  useAsync,
  watch,
  provide
} from "@nuxtjs/composition-api";

import {
  SpaceProvider,
  EventProvider,
  CartProvider,
  SearchProvider
} from "@nacelle/vue";
import SiteHeader from "~/components/header/Header";
import SiteNewsletter from "~/components/newsletter/Newsletter";
import SiteFooter from "~/components/footer/Footer";
import SiteNav from "~/components/nav/Nav";
import SiteCart from "~/components/cart/Cart";

export default defineComponent({
  components: {
    SpaceProvider,
    EventProvider,
    CartProvider,
    SearchProvider,
    SiteHeader,
    SiteNewsletter,
    SiteFooter,
    SiteNav,
    SiteCart
  },
  head() {
    const properties = {};
    const meta = [];
    const space = this.site?.space;
    const metaTitle = space?.metafields?.find(
      field => field.namespace === "metatag" && field.key === "title"
    );
    const metaDescription = space?.metafields?.find(
      field => field.namespace === "metatag" && field.key === "description"
    );

    if (metaTitle) {
      properties.title = metaTitle.value;
      meta.push({
        hid: "og:title",
        property: "og:title",
        content: metaTitle
      });
      meta.push({
        // Control title used in social shares, e.g. Slack link previews
        hid: "apple-mobile-web-app-title",
        property: "apple-mobile-web-app-title",
        content: metaTitle
      });
      meta.push({
        hid: "og:site_name",
        property: "og:site_name",
        content: metaTitle
      });
    }
    if (metaDescription) {
      meta.push({
        hid: "description",
        name: "description",
        content: metaDescription
      });
      meta.push({
        hid: "og:description",
        property: "og:description",
        content: metaDescription
      });
    }
    return {
      ...properties,
      meta
    };
  },
  setup() {
    const cartOpen = ref(false);
    const navOpen = ref(false);
    const { $config, route } = useContext();

    const nacelleSdk = new NacelleClient({
      ...$config.nacelle,
      useStatic: false
    });

    const setCartOpen = val => (cartOpen.value = val);
    const setNavOpen = val => (navOpen.value = val);

    const site = useAsync(async () => {
      const [
        space,
        header,
        footer,
        newsletter,
        cart,
        searchData
      ] = await Promise.all([
        nacelleSdk.data.space(),
        nacelleSdk.data.content({
          handle: "component-header",
          type: "componentHeader"
        }),
        nacelleSdk.data.content({
          handle: "component-footer",
          type: "componentFooter"
        }),
        nacelleSdk.data.content({
          handle: "component-newsletter",
          type: "componentNewsletter"
        }),
        nacelleSdk.data.content({
          handle: "component-cart",
          type: "componentCart"
        }),
        nacelleSdk.data.allProducts()
      ]);
      return {
        space,
        header,
        footer,
        newsletter,
        cart,
        searchData
      };
    });

    watch(route, () => {
      cartOpen.value = false;
      navOpen.value = false;
    });

    provide("cartOpen", cartOpen);
    provide("navOpen", navOpen);
    provide("setCartOpen", setCartOpen);
    provide("setNavOpen", setNavOpen);

    return {
      nacelleSdk,
      site
    };
  }
});
</script>

<style lang="scss" scoped>
.app {
  min-height: 100vh;
}
.app::v-deep * {
  box-sizing: border-box;
}
</style>
