import { mount } from '@vue/test-utils'
import ProductProvider from '~/providers/ProductProvider'
import productData from '~/utils/productData'

jest.mock('@nacelle/client-js-sdk')

const InjectedComponent = () => {
  return {
    name: 'InjectedComponent',
    inject: [
      'products',
      'setProducts',
      'addProducts',
      'fetchProducts',
      'removeProducts',
      'clearProducts',
      'setSelectedVariant',
      'getProducts'
    ],
    template: `<div></div>`
  }
}

const WrapperComponent = ({ props = {} } = {}) => ({
  render: (h) => h(ProductProvider, { props }, [h(InjectedComponent())])
})

describe('Product Provider', () => {
  it('provides `products`, `setProducts`, `addProducts`, `fetchProducts`, `removeProducts`, `clearProducts`, `setSelectedVariant` and `getProducts` to children', () => {
    const productProvider = mount(WrapperComponent())
    const injectedComponent = productProvider.findComponent({
      name: 'InjectedComponent'
    })

    expect(Array.isArray(injectedComponent.vm.products.value)).toBe(true)
    expect(typeof injectedComponent.vm.setProducts).toEqual('function')
    expect(typeof injectedComponent.vm.addProducts).toEqual('function')
    expect(typeof injectedComponent.vm.fetchProducts).toEqual('function')
    expect(typeof injectedComponent.vm.removeProducts).toEqual('function')
    expect(typeof injectedComponent.vm.clearProducts).toEqual('function')
    expect(typeof injectedComponent.vm.setSelectedVariant).toEqual('function')
    expect(typeof injectedComponent.vm.getProducts).toEqual('function')
  })

  it('provides products based on initial prop', () => {
    const productProvider = mount(
      WrapperComponent({ props: { products: productData } })
    )
    const injectedComponent = productProvider.findComponent({
      name: 'InjectedComponent'
    })
    expect(injectedComponent.vm.products.value.length).toBe(2)
  })

  it('initializes products from props', () => {
    const productProvider = mount(
      WrapperComponent({ props: { products: productData } })
    )
    const injectedComponent = productProvider.findComponent({
      name: 'InjectedComponent'
    })
    expect(injectedComponent.vm.products.value.length).toBe(2)
    expect(injectedComponent.vm.products.value.length).toBe(2)
  })

  it('calls setProducts function to update products', () => {
    const productProvider = mount(
      WrapperComponent({ props: { products: [productData[1]] } })
    )
    const injectedComponent = productProvider.findComponent({
      name: 'InjectedComponent'
    })
    jest.spyOn(injectedComponent.vm, 'setProducts')
    injectedComponent.vm.setProducts({ products: productData })
    expect(injectedComponent.vm.setProducts).toHaveBeenCalledTimes(1)
    expect(injectedComponent.vm.products.value.length).toBe(2)
  })

  it('calls addProducts function to update products', () => {
    const productProvider = mount(
      WrapperComponent({ props: { products: [productData[0]] } })
    )
    const injectedComponent = productProvider.findComponent({
      name: 'InjectedComponent'
    })
    jest.spyOn(injectedComponent.vm, 'addProducts')
    injectedComponent.vm.addProducts({ products: [productData[1]] })
    expect(injectedComponent.vm.addProducts).toHaveBeenCalledTimes(1)
    expect(injectedComponent.vm.products.value.length).toBe(2)
  })

  it('calls addProducts function to update products w/o duplicates', () => {
    const productProvider = mount(
      WrapperComponent({ props: { products: [productData[1]] } })
    )
    const injectedComponent = productProvider.findComponent({
      name: 'InjectedComponent'
    })
    jest.spyOn(injectedComponent.vm, 'addProducts')
    injectedComponent.vm.addProducts({ products: [productData[1]] })
    expect(injectedComponent.vm.addProducts).toHaveBeenCalledTimes(1)
    expect(injectedComponent.vm.products.value.length).toBe(1)
  })

  it('calls fetchProducts function to fetch products', async () => {
    const productProvider = mount(WrapperComponent())
    const injectedComponent = productProvider.findComponent({
      name: 'InjectedComponent'
    })
    jest.spyOn(injectedComponent.vm, 'fetchProducts')
    const test = await injectedComponent.vm.fetchProducts({
      handles: [productData[1].handle]
    })
    console.log('test', test)
    // expect(injectedComponent.vm.addProducts).toHaveBeenCalledTimes(1)
    // expect(injectedComponent.vm.products.value.length).toBe(2)
  })

  it('calls removeProducts function to remove products', () => {
    const productProvider = mount(
      WrapperComponent({ props: { products: productData } })
    )
    const injectedComponent = productProvider.findComponent({
      name: 'InjectedComponent'
    })
    jest.spyOn(injectedComponent.vm, 'removeProducts')
    injectedComponent.vm.removeProducts({ handles: [productData[1].handle] })
    expect(injectedComponent.vm.removeProducts).toHaveBeenCalledTimes(1)
    expect(injectedComponent.vm.products.value.length).toBe(1)
  })

  it('calls clearProducts function to clear products', () => {
    const productProvider = mount(
      WrapperComponent({ props: { products: productData } })
    )
    const injectedComponent = productProvider.findComponent({
      name: 'InjectedComponent'
    })
    jest.spyOn(injectedComponent.vm, 'clearProducts')
    injectedComponent.vm.clearProducts()
    expect(injectedComponent.vm.clearProducts).toHaveBeenCalledTimes(1)
    expect(injectedComponent.vm.products.value.length).toBe(0)
  })

  it('calls setSelectedVariant function to update product variant', () => {
    const productProvider = mount(
      WrapperComponent({ props: { products: [productData[0]] } })
    )
    const injectedComponent = productProvider.findComponent({
      name: 'InjectedComponent'
    })
    jest.spyOn(injectedComponent.vm, 'setSelectedVariant')
    injectedComponent.vm.setSelectedVariant({
      product: productData[0],
      options: productData[0].variants[0].selectedOptions
    })
    expect(injectedComponent.vm.setSelectedVariant).toHaveBeenCalledTimes(1)
    expect(injectedComponent.vm.products.value[0].selectedVariant.name).toBe(
      'blue-shirt'
    )
  })

  it('calls getProducts function to return product by handle', () => {
    const productProvider = mount(
      WrapperComponent({ props: { products: productData } })
    )
    const injectedComponent = productProvider.findComponent({
      name: 'InjectedComponent'
    })
    jest.spyOn(injectedComponent.vm, 'getProducts')
    const shirts = injectedComponent.vm.getProducts({
      handles: ['shirt']
    })
    const shirtsAndHats = injectedComponent.vm.getProducts({
      handles: ['shirt', 'hat']
    })
    const allProducts = injectedComponent.vm.getProducts({
      handles: null
    })
    expect(shirts.length).toBe(1)
    expect(shirts[0].handle).toBe('shirt')
    expect(shirtsAndHats.length).toBe(2)
    expect(shirtsAndHats[1].handle).toBe('hat')
    expect(allProducts.length).toBe(2)
    expect(injectedComponent.vm.getProducts).toHaveBeenCalledTimes(3)
  })
})
