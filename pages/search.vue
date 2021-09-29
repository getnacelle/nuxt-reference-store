<template>
  <div>Search</div>
</template>

<script>
import { inject, ref, useFetch } from '@nuxtjs/composition-api';
import { SearchProvider } from '@nacelle/vue';
import Search from '~/components/Search';

export default {
  components: { SearchProvider, Search },
  setup() {
    const searchData = ref([]);
    const nacelleSdk = inject('nacelleSdk');
    const { fetchState } = useFetch(async () => {
      searchData.value = await nacelleSdk.data.allProducts();
    });
    return { fetchState, searchData };
  }
};
</script>
