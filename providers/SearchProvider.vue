<template>
  <div><slot /></div>
</template>

<script>
import { ref, provide } from '@vue/composition-api'

export default {
  props: {
    searchData: {
      type: Array,
      default: () => []
    },
    defaultSearchOptions: {
      type: Object,
      default: () => ({
        relevanceThreshold: 0.5,
        keys: ['title']
      })
    }
  },
  setup(props) {
    const searchOptions = ref(props.defaultSearchOptions)
    const searchWorker = ref(null)
    const results = ref([])

    const setSearchOptions = (options) => {
      searchOptions.value = options
    }

    const search = ({ query, options }) => {
      if (!searchWorker.value) {
        searchWorker.value = new Worker('/worker/search.js') // This worker will need to be added with module
        searchWorker.value.postMessage({
          searchData: props.searchData
        })
      }
      searchWorker.value.postMessage({
        options: options || searchOptions.value,
        value: query
      })
      searchWorker.value.onmessage = (e) => {
        results.value = e.data
      }
    }

    provide('search', search)
    provide('setSearchOptions', setSearchOptions)
    provide('results', results)
  }
}
</script>
