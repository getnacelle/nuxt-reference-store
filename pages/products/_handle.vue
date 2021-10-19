<template>
  <product-provider v-if="product" :product="product">
    <product :content="content" />
  </product-provider>
  <div v-else-if="fetchState.pending">Loading...</div>
  <div v-else-if="fetchState.error">Error</div>
</template>

<script>
import { ProductProvider } from "@nacelle/vue";
import Product from "~/components/products/Product.vue"
import { buildRobotsTags, buildMetaTags } from "~/utils";
import { inject, ref, useContext, useFetch } from "@nuxtjs/composition-api";

export default {
  components: {
    ProductProvider,
    Product
  },
  head() {
    if(this.product || this.content) {
      const title = this.content?.fields?.meta?.title
        ? this.product?.fields?.meta?.title
        : this.product?.title;
      const description = this.content?.fields?.meta?.description;
      const tags = this.content?.fields?.meta?.tags;
      const robots = this.content?.fields?.meta?.robots;

      return {
        title: title,
        meta: [
          ...buildRobotsTags(robots),
          ...buildMetaTags(title, description, tags)
        ]
      };
    }
  },
  setup() {
    const product = ref(null);
    const content = ref({});
    const { route } = useContext();
    const nacelleSdk = inject("nacelleSdk");

    const handle = route.value.params.handle;
    const { fetchState } = useFetch(async () => {
      product.value = await nacelleSdk.data.product({ handle });

      try {
        content.value = await nacelleSdk.data.content({
          handle,
          type: "productContent"
        })
      } catch(error) {}
    });

    return { fetchState, product, content }
  },
}
</script>
