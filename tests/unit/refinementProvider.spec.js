import { mount } from '@vue/test-utils'
import RefinementProvider from '~/providers/RefinementProvider'
import productsArray from '~/tests/mocks/productsArray'

const InjectedWithRefinements = () => {
  return {
    inject: ['filteredData'],
    name: 'InjectedWithRefinements',
    template: `<div></div>`
  }
}

const RefinementProviderContainer = ({ props }) => ({
  render: (h) =>
    h(RefinementProvider, { props }, [h(InjectedWithRefinements())])
})

describe('Refinement Provider', () => {
  const refinementProvider = mount(
    RefinementProviderContainer({
      props: {
        inputData: productsArray,
        propertyFilters: [{ field: 'color', label: 'Color' }],
        activeFilters: [{ property: 'color', values: ['blue'] }],
        activePriceRange: { label: '< $50', range: [0, 50] }
      }
    })
  )
  const injectedWithRefinementProvider = refinementProvider.findComponent({
    name: 'InjectedWithRefinements'
  })

  it('Filters & Sorts with property', () => {
    expect(injectedWithRefinementProvider.vm.filteredData.value).toStrictEqual([
      productsArray[2]
    ])
  })
})
