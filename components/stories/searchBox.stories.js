import { withActions } from '@storybook/addon-actions'
import { text, number, withKnobs } from '@storybook/addon-knobs'
import StoryRouter from 'storybook-vue-router'
import { mapState, mapActions, mapMutations } from 'vuex'
import productModule from '~/store/product/productModule'

import searchResults from '~/tests/mocks/search-results'
import mockProducts from '~/tests/mocks/products'

export default {
  title: 'Components | Search & Filtering',

  decorators: [
    withKnobs,
    StoryRouter(),
    withActions(),
    () => ({
      template: `
        <div style="margin: 3rem auto;"><story/></div>
      `,
      async created() {
        this.$store.commit('search/setSearchData', searchResults.product)

        const products = mockProducts.map(async (product) => {
          const namespace = `product/${product.handle}`
          if (!this.$store.hasModule(namespace)) {
            this.$store.registerModule(namespace, productModule(), {
              preserveState: !!this.$store.state[namespace]
            })
          }
          await this.$store.dispatch(`${namespace}/setupProduct`, product)
        })
        await Promise.all(products)
      }
    })
  ]
}

export const SearchGlobal = () => ({
  props: {
    placeholderText: {
      default: text('Placeholder Text', 'Search products...')
    }
  },
  template: `
    <div style="max-width: 600px; margin: 0 auto; position: relative;">
      <search-box
        :placeholder-text="placeholderText"
        position="global"
      />
      <search-autocomplete />
    </div>
  `
})

SearchGlobal.story = {
  name: 'Global Search',
  parameters: {
    info: {
      // summary: "Hello"
    }
  }
}

export const SearchBoxPage = () => ({
  props: {
    placeholderText: {
      default: text('Placeholder Text', 'Search products...')
    },
    columns: {
      default: number('Search Results Columns', 3)
    },
    noResultsTitle: {
      default: text('No Results Title', 'Oops...no results!')
    },
    noResultsSubtitle: {
      default: text(
        'No Results Subtitle',
        'Try adjusting the filters or try another search...'
      )
    }
  },
  template: `
    <div>
      <section>
        <search-box
          :placeholder-text="placeholderText"
          position="page"
        />
      </section>
      <section>
        <refinement-results v-if="pageResults" :search-data="pageResults">
          <template #results="{ results }">
            <product-grid :products="results" :columns="columns" />
          </template>
          <template #no-results>
            <search-no-results
              :title="noResultsTitle"
              :subtitle="noResultsSubtitle"
            />
          </template>
        </refinement-results>
      </section>
    </div>
  `,
  computed: {
    ...mapState('search', ['pageResults', 'pageQuery'])
  },
  watch: {
    pageQuery(newVal) {
      if (newVal && String(newVal) !== '') {
        this.searchCatalog({ value: newVal, position: 'page' })
      }
    }
  },
  methods: {
    ...mapActions('search', ['searchCatalog'])
  }
})

SearchBoxPage.story = {
  name: 'Search Only Page',
  parameters: {
    info: {
      // summary: "Hello"
    }
  }
}

export const FilterPage = () => ({
  props: {
    columns: {
      default: number('Search Results Columns', 3)
    },
    noResultsTitle: {
      default: text('No Results Title', 'Oops...no results!')
    },
    noResultsSubtitle: {
      default: text(
        'No Results Subtitle',
        'Try adjusting the filters or try another search...'
      )
    }
  },
  template: `
    <div>
      <section>
        <refinement-filters
          v-if="searchData.length"
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
          :input-data="searchData"
          @refined="setFilteredData"
        />
      </section>
      <section>
        <refinement-results v-if="filteredData" :search-data="filteredData">
          <template #results="{ results }">
            <product-grid :products="results" :columns="columns" />
          </template>
          <template #no-results>
            <search-no-results
              :title="noResultsTitle"
              :subtitle="noResultsSubtitle"
            />
          </template>
        </refinement-results>
      </section>
    </div>
  `,
  computed: {
    ...mapState('search', ['searchData', 'filteredData'])
  },
  methods: {
    ...mapMutations('search', ['setFilteredData'])
  }
})

FilterPage.story = {
  name: 'Filtering Only Page',
  parameters: {
    info: {
      // summary: "Hello"
    }
  }
}

export const SearchAndFilterPage = () => ({
  props: {
    placeholderText: {
      default: text('Placeholder Text', 'Search products...')
    },
    columns: {
      default: number('Search Results Columns', 3)
    },
    noResultsTitle: {
      default: text('No Results Title', 'Oops...no results!')
    },
    noResultsSubtitle: {
      default: text(
        'No Results Subtitle',
        'Try adjusting the filters or try another search...'
      )
    }
  },
  template: `
    <div>
      <section>
        <search-box
          :placeholder-text="placeholderText"
          position="page"
        />
      </section>
      <section>
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
      </section>
      <section>
        <refinement-results v-if="filteredData" :search-data="filteredData">
          <template #results="{ results }">
            <product-grid :products="results" :columns="columns" />
          </template>
          <template #no-results>
            <search-no-results
              :title="noResultsTitle"
              :subtitle="noResultsSubtitle"
            />
          </template>
        </refinement-results>
      </section>
    </div>
  `,
  computed: {
    ...mapState('search', [
      'pageResults',
      'pageQuery',
      'searchData',
      'filteredData'
    ])
  },
  watch: {
    pageQuery(newVal) {
      if (newVal && String(newVal) !== '') {
        this.searchCatalog({ value: newVal, position: 'page' })
      }
    }
  },
  mounted() {
    // set default state to show products
    this.setResults({ results: this.searchData, position: 'page' })
    this.setFilteredData(this.searchData)
  },
  methods: {
    ...mapActions('search', ['searchCatalog']),
    ...mapMutations('search', ['setFilteredData', 'setResults'])
  }
})

SearchAndFilterPage.story = {
  name: 'Search + Filtering Page',
  parameters: {
    info: {
      // summary: "Hello"
    }
  }
}
