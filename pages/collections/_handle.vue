<template>
  <collection-provider
    v-if="page"
    :collection="page.collection"
    class="collection-page"
  >
    <collection />
  </collection-provider>
</template>

<script>
import { useContext, useStatic } from "@nuxtjs/composition-api";
import { CollectionProvider, useSpaceProvider } from "@nacelle/vue";
import Collection from "~/components/collection/Collection";
export default {
  components: { CollectionProvider, Collection },
  setup() {
    const { route } = useContext();
    const { nacelleSdk } = useSpaceProvider();

    const handle = route.value.params.handle;

    const page = useStatic(
      async () => {
        const [collection, products] = await Promise.all([
          nacelleSdk.data.collection({ handle }),
          nacelleSdk.data.collectionPage({
            handle
          })
        ]);
        return {
          collection: {
            ...collection,
            products
          }
        };
      },
      route.value.path,
      route.value.path
    );

    return { page };
  }
};
</script>
