<template>
  <div>
    <h1
      class="text-4xl text-center p-10 font-extrabold text-gray-900 tracking-tight sm:text-5xl"
    >
      Search
    </h1>
    <div class="flex justify-center">
      <div class="flex ">
        <label for="search" class="sr-only">Search</label>
        <div class="relative">
          <div
            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
          >
            <svg
              class="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <input
            id="search"
            name="search"
            v-model="query"
            class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Search"
            type="search"
          />
        </div>
      </div>
    </div>
    <refinement-provider
      v-if="results && query"
      :input-data="results"
      :property-filters="[
        { field: 'productType', label: 'Product Type' },
        { field: 'color', label: 'Color' },
        { field: 'material', label: 'Material' },
        { field: 'size', label: 'Size' }
      ]"
    >
      <refinement />
    </refinement-provider>
    <div v-else class="text-center p-5">
      <p>No results...</p>
    </div>
  </div>
</template>

<script>
import {
  onMounted,
  ref,
  useRoute,
  useRouter,
  watch
} from "@nuxtjs/composition-api";
import { useSearchProvider, RefinementProvider } from "@nacelle/vue";
import Refinement from "../refinement/Refinement.vue";

export default {
  name: "Search",
  components: { RefinementProvider, Refinement },
  setup() {
    const query = ref("");
    const route = useRoute();
    const router = useRouter();
    const { search, results } = useSearchProvider();
    const refinedData = ref([]);
    onMounted(() => {
      if (route.value.query.q) {
        query.value = route.value.query.q;
      }
    });

    watch(query, value => {
      router.push({ path: `/search?q=${value}` });
      search({ query: value });
    });

    return { query, results, refinedData };
  }
};
</script>
