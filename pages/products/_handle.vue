<template>
  <product-provider v-if="page" :product="page.product">
    <product :content="page.content" />
  </product-provider>
</template>

<script>
import { useContext, useAsync } from "@nuxtjs/composition-api";
import { ProductProvider, useSpaceProvider } from "@nacelle/vue";
import Product from "~/components/products/Product.vue";
import { buildRobotsTags, buildMetaTags } from "~/utils";

export default {
  components: {
    ProductProvider,
    Product
  },
  head() {
    if (this.product || this.content) {
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
    const { route } = useContext();
    const { nacelleSdk } = useSpaceProvider();

    const handle = route.value.params.handle;

    const page = useAsync(async () => {
      const [product, content] = await Promise.all([
        nacelleSdk.data.product({ handle }),
        nacelleSdk.data.content({
          handle,
          type: "productContent"
        })
      ]);
      return {
        product,
        content
      };
    });

    return {
      page
    };
  }
};
</script>
