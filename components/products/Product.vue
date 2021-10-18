<template>
  <div v-if="product && content">
    <product-buy-box />
    <site-section
      v-for="section in sections"
      :key="section._key"
      :content="section"
    />
  </div>
</template>

<script>
import { useProductProvider } from "@nacelle/vue";
import ProductBuyBox from "~/components/products/ProductBuyBox.vue";
import SiteSection from "~/components/core/Section.vue";
import { computed, provide } from '@nuxtjs/composition-api';

export default {
  name: "Product",
  components: {
    ProductBuyBox,
    SiteSection
  },
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const { product } = useProductProvider();
    const sections = computed(() => {
      return props.content?.sections
    });

    provide("features", props.content?.fields?.features);

    return { product, sections };
  }
}
</script>
