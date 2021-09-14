<template>
  <div><slot /></div>
</template>

<script>
import { ref, provide, onMounted, onUnmounted } from '@nuxtjs/composition-api'

// NOTE Should return filtered data
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

    const filters = ref([])
    const activeFilters = ref([])
    const activePriceRange = ref(null)
    const sortBy = ref('Sort By')
    const filterWorker = ref(null)
    const sortWorker = ref(null)

    // Worker blobs
    const filterWorkerBlob = [
      `
        onmessage = function (e) {
          const inputData = e.data.inputData
          const activeFilters = e.data.activeFilters

          if (inputData && activeFilters) {
            const output = inputData.filter((item) => {
              const filterChecks = activeFilters.map((filter) => {
                if (
                  filter.values.some((filterCheck) => {
                    const value = item.facets.find((facet) => {
                      return facet.value === filterCheck
                    })
                    if (value) {
                      return true
                    }
                    return false
                  })
                ) {
                  return true
                }
                return false
              })

              const itemShouldPass = filterChecks.every((filterCheck) => {
                return filterCheck === true
              })
              return itemShouldPass
            })
            postMessage(output)
          } else {
            postMessage(inputData)
          }
        }
      `
    ]

    const sortWorkerBlob = [
      `      
        onmessage = function (e) {
          const { filteredData, activePriceRange, sortBy } = e.data

          const output = filteredData.filter(({ minPrice }) => {
            if (activePriceRange) {
              const [min, max] = activePriceRange.range
              if (min === 0) {
                return minPrice < max
              } else if (max === 0) {
                return minPrice > min
              } else {
                return minPrice > min && parseFloat(minPrice) < max
              }
            } else {
              return true
            }
          })

          switch (sortBy) {
            case 'hi-low':
              postMessage(
                output.sort((a, b) => {
                  if (a.priceRange.min < b.priceRange.min) {
                    return 1
                  }
                  if (a.priceRange.min > b.priceRange.min) {
                    return -1
                  }

                  return 0
                })
              )
              break
            case 'low-hi':
              postMessage(
                output.sort((a, b) => {
                  if (a.priceRange.min < b.priceRange.min) {
                    return -1
                  }
                  if (a.priceRange.min > b.priceRange.min) {
                    return 1
                  }

                  return 0
                })
              )
              break
            default:
              postMessage(output)
          }
        }
      `
    ]

    const setupFilters = () => {
      if (props.inputData && props.propertyFilters) {
        filters.value = props.inputData
          .reduce((output, item) => {
            if (!item.facets) {
              console.warn(
                `No facets have been generated for this item: ${
                  item.handle || item
                }`
              )
            } else {
              item.facets
                .filter((facet) => facet.name.toLowerCase() !== 'title')
                .forEach((facet) => {
                  const index = output.findIndex((arrayItem) => {
                    return facet.name === arrayItem.property
                  })
                  if (index === -1) {
                    output.push({ property: facet.name, values: [facet.value] })
                  } else {
                    output[index].values.push(facet.value)
                  }
                })
            }
            return output
          }, [])
          .map((facet) => {
            const values = Array.from(new Set(facet.values))
            return { property: facet.property, values }
          })
          .filter((facet) => {
            return props.propertyFilters.find((filter) => {
              return filter.field === facet.property
            })
          })
          .map((facet) => {
            const index = props.propertyFilters.findIndex((filter) => {
              return filter.field === facet.property
            })
            return {
              property: {
                field: facet.property,
                label: props.propertyFilters[index].label
              },
              values: facet.values
            }
          })
      }
    }

    const clearFilters = () => {
      activeFilters.value = []
      activePriceRange.value = null
      sortBy.value = 'Sort By'
    }

    onMounted(() => setupFilters)

    provide('filters', filters)
    provide('setupFilters', setupFilters)
    provide('clearFilters', clearFilters)
  }
}
</script>
