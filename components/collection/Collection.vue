<template>
  <div v-if="collection">
    <refinement-provider
      :input-data="collection.products"
      :property-filters="[
        { field: 'productType', label: 'Category' },
        { field: 'color', label: 'Color' },
        { field: 'material', label: 'Material' },
        { field: 'size', label: 'Size' }
      ]"
    >
      <refinement :title="collection.title" />
    </refinement-provider>
  </div>
</template>

<script>
import { useCollectionProvider, RefinementProvider } from "@nacelle/vue";
import Refinement from "../refinement/Refinement.vue";

export default {
  name: "Collection",
  components: { Refinement, RefinementProvider },
  setup() {
    const { collection, isFetching } = useCollectionProvider();
    return {
      collection,
      isFetching
    };
  }
};
</script>
