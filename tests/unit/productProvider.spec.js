import { mount } from '@vue/test-utils'
import sdk from '@nacelle/client-js-sdk'
import ProductProvider from '~/providers/ProductProvider'
import productData from '~/utils/productData'

jest.mock('@nacelle/client-js-sdk')

const InjectedComponent = () => {
  return {
    name: 'InjectedComponent',
    inject: [
      'products',
      'addProducts',
      'removeProducts',
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
  it('provides `products`, `addProducts`,`removeProducts`, `setSelectedVariant` and `getProducts` to children', () => {
    const productProvider = mount(WrapperComponent())
    const injectedComponent = productProvider.findComponent({
      name: 'InjectedComponent'
    })

    expect(Array.isArray(injectedComponent.vm.products.value)).toBe(true)
    expect(typeof injectedComponent.vm.addProducts).toEqual('function')
    expect(typeof injectedComponent.vm.removeProducts).toEqual('function')
    expect(typeof injectedComponent.vm.setSelectedVariant).toEqual('function')
    expect(typeof injectedComponent.vm.getProducts).toEqual('function')
  })

  it('initializes products from props', () => {
    const productProvider = mount(
      WrapperComponent({ props: { products: productData } })
    )
    const injectedComponent = productProvider.findComponent({
      name: 'InjectedComponent'
    })
    expect(injectedComponent.vm.products.value.length).toBe(2)
  })

  it('calls addProducts function to append products', () => {
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

  it('calls addProducts function to fetch & append products', async () => {
    sdk.mockImplementation(() => ({
      data: { products: () => Promise.resolve([productData[1]]) }
    }))
    const productProvider = mount(
      WrapperComponent({ props: { products: [productData[0]] } })
    )
    const injectedComponent = productProvider.findComponent({
      name: 'InjectedComponent'
    })
    jest.spyOn(injectedComponent.vm, 'addProducts')
    await injectedComponent.vm.addProducts({ handles: [productData[1].handle] })
    expect(injectedComponent.vm.addProducts).toHaveBeenCalledTimes(1)
    expect(injectedComponent.vm.products.value.length).toBe(2)
  })

  it('calls addProducts function to append products w/o duplicates', () => {
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

  it('calls addProducts function to replace products', () => {
    const productProvider = mount(
      WrapperComponent({ props: { products: [productData[0]] } })
    )
    const injectedComponent = productProvider.findComponent({
      name: 'InjectedComponent'
    })
    jest.spyOn(injectedComponent.vm, 'addProducts')
    injectedComponent.vm.addProducts({
      products: [productData[1]],
      method: 'replace'
    })
    expect(injectedComponent.vm.addProducts).toHaveBeenCalledTimes(1)
    expect(injectedComponent.vm.products.value.length).toBe(1)
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

  it('calls removeProducts function to clear products', () => {
    const productProvider = mount(
      WrapperComponent({ props: { products: productData } })
    )
    const injectedComponent = productProvider.findComponent({
      name: 'InjectedComponent'
    })
    jest.spyOn(injectedComponent.vm, 'removeProducts')
    injectedComponent.vm.removeProducts({ handles: null })
    expect(injectedComponent.vm.removeProducts).toHaveBeenCalledTimes(1)
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
