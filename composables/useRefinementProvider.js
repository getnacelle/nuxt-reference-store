import { inject } from '@vue/composition-api'

export default function useRefinementProvider() {
  const filters = inject('filters')
  const setupFilters = inject('setupFilters')
  const activeFilters = inject('activeFilters')
  const filteredData = inject('filteredData')
  const computeSortedData = inject('computeSortedData')
  const computeFilteredData = inject('computeFilteredData')
  const clearFilters = inject('clearFilters')

  return {
    filters,
    setupFilters,
    activeFilters,
    filteredData,
    computeSortedData,
    computeFilteredData,
    clearFilters
  }
}
