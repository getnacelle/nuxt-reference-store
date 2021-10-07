<template>
  <space-provider
    v-if="content"
    :config="$config.nacelle"
    :space="initialSpace"
    :locale="$config.nacelle.locale"
    class="app"
  >
    <event-provider>
      <cart-provider>
        <site-header :content="content.header" />
        <nuxt />
        <site-newsletter :content="content.newsletter" />
        <site-footer :content="content.footer" />
        <site-nav :content="content.header" />
      </cart-provider>
    </event-provider>
  </space-provider>
</template>

<script>
import {
  ref,
  inject,
  provide,
  watch,
  useContext,
  useFetch
} from "@nuxtjs/composition-api";

import { SpaceProvider, EventProvider, CartProvider } from "@nacelle/vue";
import SiteHeader from "~/components/header/Header.vue";
import SiteNewsletter from "~/components/newsletter/Newsletter.vue";
import SiteFooter from "~/components/footer/Footer.vue";
import SiteNav from "~/components/nav/Nav.vue";

export default {
  components: {
    SpaceProvider,
    EventProvider,
    CartProvider,
    SiteHeader,
    SiteNewsletter,
    SiteFooter,
    SiteNav
  },
  setup() {
    const content = ref(null);
    const cartOpen = ref(false);
    const navOpen = ref(false);
    const initialSpace = inject("initialSpace");
    const nacelleSdk = inject("nacelleSdk");
    const { route } = useContext();

    const setCartOpen = val => (cartOpen.value = val);
    const setNavOpen = val => (navOpen.value = val);

    useFetch(async () => {
      const [header, footer, newsletter] = await Promise.all([
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
        })
      ]);
      content.value = { header, footer, newsletter };
    });

    watch(route, () => {
      cartOpen.value = false;
      navOpen.value = false;
    });

    provide("cartOpen", cartOpen);
    provide("navOpen", navOpen);
    provide("setCartOpen", setCartOpen);
    provide("setNavOpen", setNavOpen);

    return { initialSpace, content };
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
