<template>
  <product-provider v-if="page" :product="page.product">
    <product :content="page.content" />
  </product-provider>
</template>

<script>
import { useContext, useStatic } from "@nuxtjs/composition-api";
import { ProductProvider, useSpaceProvider } from "@nacelle/vue";
import Product from "~/components/products/Product.vue";
import { buildRobotsTags, buildMetaTags } from "~/utils";

export default {
  components: {
    ProductProvider,
    Product
  },
  head() {
    const product = this.page?.product;
    const content = this.page?.content;
    if (product || content) {
      const title = content?.fields?.meta?.title
        ? product?.fields?.meta?.title
        : product?.title;
      const description = content?.fields?.meta?.description;
      const tags = content?.fields?.meta?.tags;
      const robots = content?.fields?.meta?.robots;

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

    const page = useStatic(
      async () => {
        const [product, content] = await Promise.all([
          nacelleSdk.data.product({ handle }),
          nacelleSdk.data
            .content({
              handle,
              type: "productContent"
            })
            .catch(() => {
              console.info(`No content entry found for ${handle}`);
            })
        ]);
        return {
          product,
          content
        };
      },
      route.value.path,
      route.value.path
    );

    return {
      page
    };
  }
};
</script>
