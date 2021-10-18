<template>
  <product-provider v-if="product" :product="product">
    <product />
  </product-provider>
  <div v-else-if="fetchState.pending">Loading...</div>
  <div v-else-if="fetchState.error">Error</div>
</template>

<script>
import { ProductProvider } from "@nacelle/vue";
import Product from "~/components/products/Product.vue"
import { inject, ref, useContext, useFetch } from "@nuxtjs/composition-api";

export default {
  components: {
    ProductProvider,
    Product
  },
  setup() {
    const product = ref(null);
    const { route } = useContext();
    const nacelleSdk = inject("nacelleSdk");

    const handle = route.value.params.handle;
    const { fetchState } = useFetch(async () => {
      product.value = await nacelleSdk.data.product({ handle });
    });

    return { fetchState, product }
  },
}
</script>
