<template>
  <div><slot /></div>
</template>

<script>
import { ref, provide } from '@vue/composition-api'
import fetchSearchData from '~/utils/fetchSearchData'

export default {
  props: {
    searchData: {
      type: [Array, Function],
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
    const searchData = ref([])
    const searchOptions = ref(props.defaultSearchOptions)
    const searchWorker = ref(null)
    const results = ref([])

    if (Array.isArray(props.searchData) && props.searchData.length) {
      searchData.value = props.searchData
    } else if (typeof props.searchData === 'function') {
      props
        .searchData()
        .then((res) => {
          searchData.value = res.data ? res.data : res
        })
        .catch((err) => console.error(err))
    } else {
      fetchSearchData()
        .then((res) => {
          searchData.value = res.data ? res.data : res
        })
        .catch((err) => console.error(err))
    }

    const setSearchOptions = (options) => {
      searchOptions.value = options
    }

    const search = ({ query, options }) => {
      if (!searchData.value) {
        console.warn('Search Data is loading')
        return { message: 'Search Data is loading' }
      }
      if (!searchWorker.value) {
        searchWorker.value = new Worker('/worker/search.js') // This worker will need to be added with module
        searchWorker.value.postMessage({
          searchData: searchData.value
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
