<template>
  <div><slot /></div>
</template>

<script>
// import { ref, provide } from '@nuxtjs/composition-api'

export default {
  props: {
    inputData: {
      type: Array,
      required: true
    },
    propertyFilters: {
      type: Array,
      required: true
    },
    priceRangeFilters: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    // TODO Add functions that provide/return filtered data
    // NOTE A lot of the functionalities will have to come from RefinementFilters
    // LINK ../components/nacelle/RefinementFilters.vue
  }
}
</script>
