import Vuex from 'vuex'
import { mount, createLocalVue } from '@vue/test-utils'
import SearchResults from '@/components/nacelle/SearchResults'
import storeConfig from '@/tests/storeConfig'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('SearchResults.vue', () => {
  const store = new Vuex.Store(storeConfig())
  const wrapper = mount(SearchResults, {
    localVue,
    store
  })

  wrapper.vm.setAutocompleteVisible = jest.fn()
  wrapper.vm.searchCatalog = jest.fn()

  it('hides autocomplete and requests fresh search results when search query changes', async () => {
    wrapper.setProps({ searchQuery: 'test' })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.setAutocompleteVisible).toHaveBeenCalledWith(true)
    expect(wrapper.vm.searchCatalog).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.searchCatalog).toHaveBeenCalledWith({
      value: 'test',
      position: 'global'
    })
  })
})
