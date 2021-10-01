<template>
  <space-provider
    :config="$config.nacelle"
    :space="initialSpace"
    :locale="$config.nacelle.locale"
    class="app"
  >
    <event-provider>
      <cart-provider>
        <nuxt />
        <site-footer />
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
import SiteFooter from "~/components/footer/Footer.vue";

export default {
  components: {
    SpaceProvider,
    EventProvider,
    CartProvider,
    SiteFooter
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
