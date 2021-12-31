<template>
  <div v-if="content">
    <search-provider :searchData="content.searchData">
      <site-header :content="content.header" />
      <cart :content="content.cart" />
      <nuxt />
      <site-newsletter :content="content.newsletter" />
      <site-footer :content="content.footer" />
      <site-nav :content="content.header" />
    </search-provider>
  </div>
</template>

<script>
import {
  inject,
  provide,
  ref,
  useContext,
  useFetch,
  watch,
} from "@nuxtjs/composition-api";
import { SearchProvider } from "@nacelle/vue";
import SiteHeader from "~/components/header/Header.vue";
import SiteNewsletter from "~/components/newsletter/Newsletter.vue";
import SiteFooter from "~/components/footer/Footer.vue";
import SiteNav from "~/components/nav/Nav.vue";
import Cart from "~/components/cart/Cart.vue";

export default {
  name: "SiteContainer",
  components: {
    SearchProvider,
    SiteHeader,
    SiteNewsletter,
    SiteFooter,
    SiteNav,
    Cart,
  },
  setup() {
    const content = ref(null);
    const nacelleSdk = inject("nacelleSdk");
    const cartOpen = ref(false);
    const navOpen = ref(false);

    const { route } = useContext();

    const setCartOpen = (val) => (cartOpen.value = val);
    const setNavOpen = (val) => (navOpen.value = val);

    watch(route, () => {
      cartOpen.value = false;
      navOpen.value = false;
    });

    useFetch(async () => {
      const [header, footer, newsletter, cart, searchData] = await Promise.all([
        nacelleSdk.data.content({
          handle: "component-header",
          type: "componentHeader",
        }),
        nacelleSdk.data.content({
          handle: "component-footer",
          type: "componentFooter",
        }),
        nacelleSdk.data.content({
          handle: "component-newsletter",
          type: "componentNewsletter",
        }),
        nacelleSdk.data.content({
          handle: "component-cart",
          type: "componentCart",
        }),
        nacelleSdk.data.allProducts(),
      ]);
      content.value = { header, footer, newsletter, cart, searchData };
    });

    provide("cartOpen", cartOpen);
    provide("navOpen", navOpen);
    provide("setCartOpen", setCartOpen);
    provide("setNavOpen", setNavOpen);

    return { content };
  },
};
</script>
