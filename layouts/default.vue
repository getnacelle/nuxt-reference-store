<template>
  <space-provider
    :config="$config.nacelle"
    :space="initialSpace"
    :locale="$config.nacelle.locale"
    :sdk="nacelleSdk"
    class="app"
  >
    <event-provider>
      <cart-provider>
        <site-container />
      </cart-provider>
    </event-provider>
  </space-provider>
</template>

<script>
import { inject } from "@nuxtjs/composition-api";

import { SpaceProvider, EventProvider, CartProvider } from "@nacelle/vue";
import SiteContainer from "~/components/core/SiteContainer.vue";

export default {
  components: {
    SpaceProvider,
    EventProvider,
    CartProvider,
    SiteContainer,
  },
  setup() {
    const initialSpace = inject("initialSpace");
    const nacelleSdk = inject("nacelleSdk");

    return { initialSpace, nacelleSdk };
  },
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
