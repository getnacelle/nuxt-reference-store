<template>
  <div>
    <h3>Refine Your Search</h3>
    <select v-model="sortBy">
      <option selected disabled>Sort By</option>
      <option value="hi-low">High to Low</option>
      <option value="low-hi">Low To High</option>
    </select>
    <button class="button is-text" @click="clearFilters">Clear Filters</button>
    <div class="filters">
      <div
        v-for="filter in filters"
        :key="filter.property.field"
        class="filter"
      >
        <h4>{{ filter.property.label }}</h4>

        <div class="facet-values">
          <div
            v-for="value in filter.values"
            :key="value"
            class="value"
            @click="
              toggleFilterActive({ property: filter.property.field, value })
            "
          >
            <refinement-filter-select
              :value="value"
              :active-filters="activeFilters"
              :property="filter.property.field"
            />
          </div>
        </div>
      </div>
      <div class="filter">
        <h4>Price</h4>

        <div>
          <div
            v-for="priceRange in priceRangeFilters"
            :key="priceRange.label"
            class="value"
            @click="togglePriceRangeActive(priceRange)"
          >
            <refinement-price-filter-select
              :price-range="priceRange"
              :active-price-range="activePriceRange || {}"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

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
  data() {
    return {
      filters: null,
      filteredData: null,
      activeFilters: [],
      refinedData: null,
      activePriceRange: null,
      sortBy: 'Sort By',
      filterWorker: null,
      sortWorker: null
    }
  },
  computed: {
    ...mapState('search', ['pageQuery'])
  },
  watch: {
    inputData() {
      this.setupFilters()
      this.clearFilters()
      this.computeFilteredData()
    },
    refinedData(newVal) {
      this.$emit('refined', newVal)
    },
    filters() {
      this.computeFilteredData()
    },
    activeFilters() {
      this.computeFilteredData()
    },
    activePriceRange() {
      this.computeSortedData()
    },
    sortBy() {
      this.computeSortedData()
    }
  },

  created() {
    if (process.client) {
      this.setupFilters()
      this.activeFilters = this.readFiltersFromQueryParams()
      if (this.filteredData && this.refinedData.length) {
        this.$emit('refined', this.refinedData)
      }
    }
  },
  activated() {
    if (this.pageQuery !== this.$route.query?.q) {
      this.setupFilters()
      this.clearFilters()
      if (this.filteredData && this.refinedData.length) {
        this.$emit('refined', this.refinedData)
      }
    }
  },
  beforeDestroy() {
    if (this.filterWorker) {
      this.filterWorker.terminate()
    }
    if (this.sortWorker) {
      this.sortWorker.terminate()
    }
  },

  methods: {
    computeSortedData() {
      const vm = this
      this.sortWorker = this.sortWorker || new Worker('/worker/sort.js')
      this.sortWorker.postMessage({
        filteredData: this.filteredData,
        activePriceRange: this.activePriceRange,
        sortBy: this.sortBy
      })
      this.sortWorker.onmessage = function (e) {
        vm.refinedData = e.data
      }
    },
    computeFilteredData() {
      const vm = this
      this.filterWorker = this.filterWorker || new Worker('/worker/filter.js')
      this.filterWorker.postMessage({
        activeFilters: this.activeFilters,
        inputData: this.inputData
      })
      this.filterWorker.onmessage = function (e) {
        vm.filteredData = e.data
        vm.computeSortedData()
      }
    },
    clearFilters() {
      this.activeFilters = []
      this.activePriceRange = null
      this.sortBy = 'Sort By'
      this.removeFiltersInQueryParams()
    },
    setupFilters() {
      const vm = this
      if (vm.inputData && vm.propertyFilters) {
        vm.filters = vm.inputData
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
            return vm.propertyFilters.find((filter) => {
              return filter.field === facet.property
            })
          })
          .map((facet) => {
            const index = vm.propertyFilters.findIndex((filter) => {
              return filter.field === facet.property
            })
            return {
              property: {
                field: facet.property,
                label: vm.propertyFilters[index].label
              },
              values: facet.values
            }
          })
      }
    },
    filterActive(value) {
      return requestAnimationFrame(() => {
        if (this.activeFilters) {
          const filterArray = this.activeFilters.filter((filter) => {
            return filter.value === value
          })
          if (filterArray.length > 0) {
            return true
          } else {
            return false
          }
        }
      })
    },
    toggleFilterActive(filter) {
      return requestAnimationFrame(() => {
        const filterInFilters = this.activeFilters.filter((filtersItem) => {
          return filtersItem.property === filter.property
        })
        if (filterInFilters.length === 0) {
          this.activeFilters.push({
            property: filter.property,
            values: [filter.value]
          })
        } else {
          this.activeFilters.map((filtersItem, index) => {
            if (
              filtersItem.property === filter.property &&
              !filtersItem.values.some((value) => value === filter.value)
            ) {
              filtersItem.values.push(filter.value)
            } else if (
              filtersItem.property === filter.property &&
              filtersItem.values.some((value) => value === filter.value)
            ) {
              const filterIndex = filtersItem.values.indexOf(filter.value)
              filtersItem.values.splice(filterIndex, 1)
            } else {
              return filtersItem
            }

            if (filtersItem.values.length === 0) {
              this.activeFilters.splice(index, 1)
            }

            return null
          })
        }
        this.setFilterInQueryParams(filter)
        this.computeFilteredData()
      })
    },
    togglePriceRangeActive(priceRange) {
      if (
        JSON.stringify(this.activePriceRange) === JSON.stringify(priceRange)
      ) {
        this.activePriceRange = null
      } else {
        this.activePriceRange = priceRange
      }
    },
    setFilterInQueryParams(filter) {
      return requestAnimationFrame(() => {
        if (process.client) {
          let currentParams = this.readFiltersFromQueryParams()
          let transformedParams

          if (currentParams.length > 0) {
            if (
              currentParams.some((param) => {
                return param.property === filter.property
              })
            ) {
              currentParams = currentParams.map((param) => {
                if (
                  param.property === filter.property &&
                  !param.values.includes(filter.value)
                ) {
                  param.values.push(filter.value)
                  return param
                } else if (
                  param.property === filter.property &&
                  param.values.includes(filter.value)
                ) {
                  const index = param.values.indexOf(filter.value)
                  param.values.splice(index, 1)
                  return param
                } else {
                  return param
                }
              })
            } else {
              currentParams.push(filter)
            }
            transformedParams = {}

            currentParams.forEach((param) => {
              if (param.values && param.values.length > 0) {
                transformedParams[param.property] = param.values.join(',')
              } else {
                transformedParams[param.property] = param.value
              }
            })
          } else {
            transformedParams = {
              [filter.property]: filter.value
            }
          }

          const routeQuery = this.$route.query
          const newRouteQuery = { ...routeQuery, ...transformedParams }
          this.safelyUpdateSearchQueryParam(newRouteQuery)
        }
      })
    },
    removeFiltersInQueryParams() {
      if (process.client && this.$route.query) {
        const omitKeysFromUrl = this.propertyFilters.map((filter) => {
          return filter.field
        })

        const retainQueryEntries = Object.entries(this.$route.query).filter(
          ([key]) => !omitKeysFromUrl.includes(key)
        )

        const retainQueryObj = Object.fromEntries(retainQueryEntries)

        this.safelyUpdateSearchQueryParam(retainQueryObj)
      }
    },
    safelyUpdateSearchQueryParam(query) {
      const routeQuery = this.$route.query

      if (JSON.stringify(routeQuery) !== JSON.stringify(query)) {
        this.$router.replace({ query })
      }
    },
    readFiltersFromQueryParams() {
      const filtersFromRoute = this.propertyFilters
        .filter(({ field }) => !!this.$route.query[field])
        .map(({ field }) => ({
          property: field,
          values: this.$route.query[field].split(',')
        }))

      if (filtersFromRoute.length) {
        return filtersFromRoute
      } else {
        return []
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.filters {
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
}
.filter {
  padding-left: 1rem;
  border-right: 1px solid rgb(206, 206, 206);

  flex-grow: 3;
  margin-bottom: 0.5rem;
  @media screen and (max-width: 768px) {
    border: none;
    margin-bottom: 2rem;
  }
  margin-right: 1rem;
  &:last-of-type {
    border-right: unset;
  }
}
.facet-values {
  columns: 3;
  @media screen and (max-width: 1215px) {
    columns: 2;
  }
  @media screen and (max-width: 950px) {
    columns: 1;
  }
}
.value {
  break-inside: avoid;
  cursor: pointer;
  user-select: none;
}
h3 {
  font-size: 16pt;
  margin-bottom: 1.5rem;
}
h4 {
  font-size: 14pt;
  margin-bottom: 0.5rem;
}
</style>
