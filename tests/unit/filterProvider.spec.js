import { mount } from '@vue/test-utils'
import FilterProvider from '~/providers/FilterProvider'
import productsArray from '~/tests/mocks/productsArray'

const InjectedWithFilters = () => {
  return {
    inject: ['filteredData'],
    name: 'InjectedWithFilters',
    template: `<div></div>`
  }
}

const FilterProviderContainer = ({ props }) => ({
  render: (h) => h(FilterProvider, { props }, [h(InjectedWithFilters())])
})

describe('Filter Provider', () => {
  const filterProvider = mount(
    FilterProviderContainer({
      props: {
        inputData: productsArray,
        propertyFilters: [{ field: 'color', label: 'Color' }],
        activeFilters: [{ property: 'color', values: ['blue'] }],
        activePriceRange: { label: '< $50', range: [0, 50] }
      }
    })
  )
  const injectedWithFilterProvider = filterProvider.findComponent({
    name: 'InjectedWithFilters'
  })

  it('Filters & Sorts with property', () => {
    expect(injectedWithFilterProvider.vm.filteredData.value).toStrictEqual([
      productsArray[2]
    ])
  })
})
