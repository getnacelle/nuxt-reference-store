import { inject } from '@vue/composition-api'

export default function useRefinementProvider() {
  const filters = inject('filters')
  const setupFilters = inject('setupFilters')
  const activeFilters = inject('activeFilters')
  const filteredData = inject('filteredData')
  const clearFilters = inject('clearFilters')

  return {
    filters,
    setupFilters,
    activeFilters,
    filteredData,
    clearFilters
  }
}
