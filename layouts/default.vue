<template>
  <space-provider
    :config="$config.nacelle"
    :space="initialSpace"
    :locale="$config.nacelle.locale"
    class="app"
  >
    <event-provider>
      <cart-provider>
        <site-header />
        <nuxt />
        <site-footer />
        <site-nav />
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
  useContext
} from "@nuxtjs/composition-api";
import { SpaceProvider, EventProvider, CartProvider } from "@nacelle/vue";
<<<<<<< HEAD
import SiteHeader from "~/components/header/Header.vue";
import SiteNav from "~/components/nav/Nav.vue";
=======
import SiteFooter from "~/components/footer/Footer.vue";
>>>>>>> 24fb483ea928d4270196aea74c9b856f9a005ba2

export default {
  components: {
    SpaceProvider,
    EventProvider,
    CartProvider,
<<<<<<< HEAD
    SiteHeader,
    SiteNav
=======
    SiteFooter
>>>>>>> 24fb483ea928d4270196aea74c9b856f9a005ba2
  },
  setup() {
    const cartOpen = ref(false);
    const navOpen = ref(false);
    const initialSpace = inject("initialSpace");
    const { route } = useContext();

    const setCartOpen = val => (cartOpen.value = val);
    const setNavOpen = val => (navOpen.value = val);

    watch(route, () => {
      cartOpen.value = false;
      navOpen.value = false;
    });

    provide("cartOpen", cartOpen);
    provide("navOpen", navOpen);
    provide("setCartOpen", setCartOpen);
    provide("setNavOpen", setNavOpen);

    return { initialSpace };
  }
};
</script>

<style lang="scss" scoped>
.app::v-deep * {
  box-sizing: border-box;
}
</style>
