<!--
/****
/* For information about search & filtering, please refer to:
/*
/* https://docs.getnacelle.com/nuxt/filtering-products.html#filtering-searching
/****
-->
<template>
  <div>
    <section class="section search-section">
      <div class="container">
        <div class="columns">
          <div class="column is-4 is-offset-4">
            <search-box v-bind="{ position, searchQuery: pageQuery }" />
          </div>
        </div>
      </div>
    </section>
    <section class="section filtering">
      <div class="column is-12">
        <refinement-filters
          v-if="pageResults && pageResults.length"
          :property-filters="[
            { field: 'productType', label: 'Product Type' },
            { field: 'color', label: 'Color' },
            { field: 'material', label: 'Material' },
            { field: 'size', label: 'Size' }
          ]"
          :price-range-filters="[
            { range: [0, 50], label: '< $50' },
            { range: [50, 100], label: '$50 - 100' },
            { range: [100, 200], label: '$100 - 200' },
            { range: [200, 500], label: '$200 - 500' },
            { range: [500, 0], label: '> $500' }
          ]"
          :input-data="pageResults"
          @refined="setFilteredData"
        />
      </div>
    </section>
    <section class="section">
      <div class="columns is-multiline">
        <div class="column is-12">
          <refinement-results v-if="filteredData" :search-data="filteredData">
            <template #results="{ results }">
              <product-grid :products="results" :columns="4" />
            </template>
            <template #no-results>
              <search-no-results />
            </template>
          </refinement-results>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  data() {
    return {
      position: 'page'
    }
  },
  computed: {
    ...mapState('search', [
      'pageQuery',
      'pageResults',
      'isLoading',
      'filteredData'
    ])
  },
  watch: {
    isLoading(newVal) {
      if (!newVal && this.$route.query?.q) {
        this.searchCatalog({
          value: this.$route.query.q,
          position: this.position
        })
      }
    },
    pageQuery(newVal) {
      if (newVal && String(newVal) !== '') {
        this.searchCatalog({ value: newVal, position: this.position })
      }
    }
  },
  mounted() {
    this.refreshQuery()
  },
  activated() {
    this.refreshQuery()
  },
  methods: {
    ...mapMutations('search', ['setFilteredData', 'setQuery']),
    ...mapActions('search', ['searchCatalog']),

    refreshQuery() {
      if (!this.isLoading && this.$route.query?.q) {
        this.setQuery({
          query: this.$route.query.q,
          position: this.position
        })
      }
    }
  }
}
</script>

<style>
.search-section {
  background: whitesmoke;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.filtering {
  background: whitesmoke;
  padding: 1rem;
}
</style>
