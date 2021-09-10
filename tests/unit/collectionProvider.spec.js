import { mount } from '@vue/test-utils'
// import sdk from '@nacelle/client-js-sdk'
import CollectionProvider from '~/providers/CollectionProvider'
// import productData from '~/tests/mocks/product'

jest.mock('@nacelle/client-js-sdk')

const InjectedComponent = () => {
  return {
    name: 'InjectedWithCollection',
    inject: ['collection', 'isFetching', 'setCollection', 'loadProducts'],
    template: `<div></div>`
  }
}

const CollectionProviderContainer = ({ props } = {}) => ({
  render: (h) => h(CollectionProvider, { props }, [h(InjectedComponent())])
})

describe('Collection Provider', () => {
  it('provides `collection`, `isFetching`, `setCollection`  and `loadProducts` to children', () => {
    const collectionProvider = mount(CollectionProviderContainer())
    const injectedCollectionComponent = collectionProvider.findComponent({
      name: 'InjectedWithCollection'
    })

    expect(injectedCollectionComponent.vm.collection.value).toBe(null)
    expect(injectedCollectionComponent.vm.isFetching.value).toBe(false)
    expect(typeof injectedCollectionComponent.vm.setCollection).toEqual(
      'function'
    )
    expect(typeof injectedCollectionComponent.vm.loadProducts).toEqual(
      'function'
    )
  })
})
