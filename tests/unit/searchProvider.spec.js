import { mount } from '@vue/test-utils'
import SearchProvider from '~/providers/SearchProvider'

const InjectedWithSearches = () => {
  return {
    inject: ['search', 'setSearchOptions', 'results'],
    name: 'InjectedWithSearches',
    template: `<div></div>`
  }
}

const SearchProviderContainer = ({ props }) => ({
  render: (h) => h(SearchProvider, { props }, [h(InjectedWithSearches())])
})

describe('Search Provider', () => {
  const searchProvider = mount(
    SearchProviderContainer({
      props: {
        searchData: [
          { id: 1, title: 'one' },
          { id: 2, title: 'two' },
          { id: 3, title: 'onetwo' }
        ]
      }
    })
  )
  const injectedSearchComponent = searchProvider.findComponent({
    name: 'InjectedWithSearches'
  })

  it('searches through searchData', () => {
    global.URL.createObjectURL = jest.fn()
    expect(injectedSearchComponent.vm.search({ query: 'one' })).toEqual([
      { id: 1, title: 'one' },
      { id: 3, title: 'onetwo' }
    ])
  })
})
