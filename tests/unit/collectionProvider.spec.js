import { mount } from '@vue/test-utils'
import CollectionProvider from '~/providers/CollectionProvider'
import collectionData from '~/utils/collectionData'
require('dotenv').config()

// const config = {
//   nacelleId: process.env.NACELLE_SPACE_ID,
//   nacelleToken: process.env.NACELLE_GRAPHQL_TOKEN,
//   nacelleEndpoint: process.env.NACELLE_ENDPOINT
// }

const InjectedComponent = () => {
  return {
    name: 'InjectedComponent',
    inject: [
      'products',
      'collections',
      'setCollections',
      'addCollections',
      'fetchCollections',
      'removeCollections',
      'clearCollections',
      'getCollections',
      'fetchCollectionProducts'
    ],
    template: `<div></div>`
  }
}

const WrapperComponent = ({ props = {} } = {}) => ({
  render: (h) => h(CollectionProvider, { props }, [h(InjectedComponent())])
})

describe('Colletion Provider', () => {
  it('provides `products`, `collections`, `setCollections`, `addCollections`, `fetchCollections`, `removeCollections`, `clearCollections`, `getCollections` and `fetchCollectionProducts` to children', () => {
    const collectionProvider = mount(WrapperComponent())
    const injectedComponent = collectionProvider.findComponent({
      name: 'InjectedComponent'
    })
    expect(Array.isArray(injectedComponent.vm.products.value)).toBe(true)
    expect(Array.isArray(injectedComponent.vm.collections.value)).toBe(true)
    expect(typeof injectedComponent.vm.setCollections).toEqual('function')
    expect(typeof injectedComponent.vm.addCollections).toEqual('function')
    expect(typeof injectedComponent.vm.fetchCollections).toEqual('function')
    expect(typeof injectedComponent.vm.removeCollections).toEqual('function')
    expect(typeof injectedComponent.vm.clearCollections).toEqual('function')
    expect(typeof injectedComponent.vm.getCollections).toEqual('function')
    expect(typeof injectedComponent.vm.fetchCollectionProducts).toEqual(
      'function'
    )
  })

  // it('provides products based on initial prop', () => {
  //   const productProvider = mount(
  //     WrapperComponent({ props: { products: productData } })
  //   )
  //   const injectedComponent = productProvider.findComponent({
  //     name: 'InjectedComponent'
  //   })
  //   expect(injectedComponent.vm.products.value.length).toBe(2)
  // })

  // it('initializes products from props', () => {
  //   const productProvider = mount(
  //     WrapperComponent({ props: { products: productData } })
  //   )
  //   const injectedComponent = productProvider.findComponent({
  //     name: 'InjectedComponent'
  //   })
  //   expect(injectedComponent.vm.products.value.length).toBe(2)
  //   expect(injectedComponent.vm.products.value.length).toBe(2)
  // })

  // it('calls setProducts function to update products', () => {
  //   const productProvider = mount(
  //     WrapperComponent({ props: { products: [productData[1]] } })
  //   )
  //   const injectedComponent = productProvider.findComponent({
  //     name: 'InjectedComponent'
  //   })
  //   jest.spyOn(injectedComponent.vm, 'setProducts')
  //   injectedComponent.vm.setProducts({ products: productData })
  //   expect(injectedComponent.vm.setProducts).toHaveBeenCalledTimes(1)
  //   expect(injectedComponent.vm.products.value.length).toBe(2)
  // })

  // it('calls addProducts function to update products', () => {
  //   const productProvider = mount(
  //     WrapperComponent({ props: { products: [productData[0]] } })
  //   )
  //   const injectedComponent = productProvider.findComponent({
  //     name: 'InjectedComponent'
  //   })
  //   jest.spyOn(injectedComponent.vm, 'addProducts')
  //   injectedComponent.vm.addProducts({ products: [productData[1]] })
  //   expect(injectedComponent.vm.addProducts).toHaveBeenCalledTimes(1)
  //   expect(injectedComponent.vm.products.value.length).toBe(2)
  // })

  // it('calls addProducts function to update products w/o duplicates', () => {
  //   const productProvider = mount(
  //     WrapperComponent({ props: { products: [productData[1]] } })
  //   )
  //   const injectedComponent = productProvider.findComponent({
  //     name: 'InjectedComponent'
  //   })
  //   jest.spyOn(injectedComponent.vm, 'addProducts')
  //   injectedComponent.vm.addProducts({ products: [productData[1]] })
  //   expect(injectedComponent.vm.addProducts).toHaveBeenCalledTimes(1)
  //   expect(injectedComponent.vm.products.value.length).toBe(1)
  // })

  // it('calls fetchProducts function to fetch products', async () => {
  //   const productProvider = mount(WrapperComponent({ props: { config } }))
  //   const injectedComponent = productProvider.findComponent({
  //     name: 'InjectedComponent'
  //   })
  //   /*
  //     Not sure best way to mock this one
  //   */
  // })

  // it('calls removeProducts function to remove products', () => {
  //   const productProvider = mount(
  //     WrapperComponent({ props: { products: productData } })
  //   )
  //   const injectedComponent = productProvider.findComponent({
  //     name: 'InjectedComponent'
  //   })
  //   jest.spyOn(injectedComponent.vm, 'removeProducts')
  //   injectedComponent.vm.removeProducts({ handles: [productData[1].handle] })
  //   expect(injectedComponent.vm.removeProducts).toHaveBeenCalledTimes(1)
  //   expect(injectedComponent.vm.products.value.length).toBe(1)
  // })

  // it('calls clearProducts function to clear products', () => {
  //   const productProvider = mount(
  //     WrapperComponent({ props: { products: productData } })
  //   )
  //   const injectedComponent = productProvider.findComponent({
  //     name: 'InjectedComponent'
  //   })
  //   jest.spyOn(injectedComponent.vm, 'clearProducts')
  //   injectedComponent.vm.clearProducts()
  //   expect(injectedComponent.vm.clearProducts).toHaveBeenCalledTimes(1)
  //   expect(injectedComponent.vm.products.value.length).toBe(0)
  // })

  // it('calls setSelectedVariant function to update product variant', () => {
  //   const productProvider = mount(
  //     WrapperComponent({ props: { products: [productData[0]] } })
  //   )
  //   const injectedComponent = productProvider.findComponent({
  //     name: 'InjectedComponent'
  //   })
  //   jest.spyOn(injectedComponent.vm, 'setSelectedVariant')
  //   injectedComponent.vm.setSelectedVariant({
  //     product: productData[0],
  //     options: productData[0].variants[0].selectedOptions
  //   })
  //   expect(injectedComponent.vm.setSelectedVariant).toHaveBeenCalledTimes(1)
  //   expect(injectedComponent.vm.products.value[0].selectedVariant.name).toBe(
  //     'blue-shirt'
  //   )
  // })

  // it('calls getProducts function to return product by handle', () => {
  //   const productProvider = mount(
  //     WrapperComponent({ props: { products: productData } })
  //   )
  //   const injectedComponent = productProvider.findComponent({
  //     name: 'InjectedComponent'
  //   })
  //   jest.spyOn(injectedComponent.vm, 'getProducts')
  //   const shirts = injectedComponent.vm.getProducts({
  //     handles: ['shirt']
  //   })
  //   const shirtsAndHats = injectedComponent.vm.getProducts({
  //     handles: ['shirt', 'hat']
  //   })
  //   const allProducts = injectedComponent.vm.getProducts({
  //     handles: null
  //   })
  //   expect(shirts.length).toBe(1)
  //   expect(shirts[0].handle).toBe('shirt')
  //   expect(shirtsAndHats.length).toBe(2)
  //   expect(shirtsAndHats[1].handle).toBe('hat')
  //   expect(allProducts.length).toBe(2)
  //   expect(injectedComponent.vm.getProducts).toHaveBeenCalledTimes(3)
  // })
})
