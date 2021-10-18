<template>
  <div v-if="product">
    <product-buy-box />
  </div>
</template>

<script>
import { useProductProvider } from "@nacelle/vue";
import ProductBuyBox from "~/components/products/ProductBuyBox.vue";

export default {
  name: "Product",
  components: {
    ProductBuyBox
  },
  setup() {
    const { product } = useProductProvider();
    return { product };
  }
}
</script>
