<template>
  <space-provider
    v-if="content"
    :config="$config.nacelle"
    :space="initialSpace"
    :locale="$config.nacelle.locale"
    :sdk="nacelleSdk"
    class="app"
  >
    <event-provider>
      <cart-provider>
        <search-provider :searchData="content.searchData">
          <site-header :content="content.header" />
          <cart :content="content.cart" />
          <nuxt />
          <site-newsletter :content="content.newsletter" />
          <site-footer :content="content.footer" />
          <site-nav :content="content.header" />
        </search-provider>
      </cart-provider>
    </event-provider>
  </space-provider>
</template>

<script>
import {
  inject,
  provide,
  ref,
  useContext,
  useFetch,
  watch
} from "@nuxtjs/composition-api";

import {
  SpaceProvider,
  EventProvider,
  CartProvider,
  SearchProvider
} from "@nacelle/vue";
import SiteHeader from "~/components/header/Header.vue";
import SiteNewsletter from "~/components/newsletter/Newsletter.vue";
import SiteFooter from "~/components/footer/Footer.vue";
import SiteNav from "~/components/nav/Nav.vue";
import Cart from "~/components/cart/Cart.vue";

export default {
  components: {
    SpaceProvider,
    EventProvider,
    CartProvider,
    SearchProvider,
    SiteHeader,
    SiteNewsletter,
    SiteFooter,
    SiteNav,
    Cart
  },
  setup() {
    const content = ref(null);
    const cartOpen = ref(false);
    const navOpen = ref(false);
    const updater = ref(null);
    const initialSpace = inject("initialSpace");
    const nacelleSdk = inject("nacelleSdk");
    const { route } = useContext();

    const setCartOpen = val => (cartOpen.value = val);
    const setNavOpen = val => (navOpen.value = val);

    useFetch(async () => {
      const [header, footer, newsletter, cart, searchData] = await Promise.all([
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
      content.value = { header, footer, newsletter, cart, searchData };
    });

    watch(route, () => {
      cartOpen.value = false;
      navOpen.value = false;
    });

    provide("cartOpen", cartOpen);
    provide("navOpen", navOpen);
    provide("setCartOpen", setCartOpen);
    provide("setNavOpen", setNavOpen);

    return { initialSpace, content, nacelleSdk, updater };
  }
};
</script>

<style lang="scss" scoped>
.app {
  min-height: 100vh;
}
.app::v-deep * {
  box-sizing: border-box;
}
</style>
