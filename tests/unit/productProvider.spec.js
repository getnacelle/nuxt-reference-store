import { mount } from '@vue/test-utils'
import sdk from '@nacelle/client-js-sdk'
import ProductProvider from '~/providers/ProductProvider'
import productData from '~/tests/mocks/product'

jest.mock('@nacelle/client-js-sdk')

const InjectedComponent = () => {
  return {
    name: 'InjectedWithProduct',
    inject: ['product', 'isFetching', 'setProduct', 'setSelectedVariant'],
    template: `<div></div>`
  }
}

const ProductProviderContainer = ({ props } = {}) => ({
  render: (h) => h(ProductProvider, { props }, [h(InjectedComponent())])
})

describe('Product Provider', () => {
  it('provides `product`, `isFetching`, `setProduct  and `setSelectedVariant` to children', () => {
    const productProvider = mount(ProductProviderContainer())
    const injectedProductComponent = productProvider.findComponent({
      name: 'InjectedWithProduct'
    })

    expect(injectedProductComponent.vm.product.value).toBe(null)
    expect(injectedProductComponent.vm.isFetching.value).toBe(false)
    expect(typeof injectedProductComponent.vm.setProduct).toEqual('function')
    expect(typeof injectedProductComponent.vm.setSelectedVariant).toEqual(
      'function'
    )
  })

  it('initializes product from props', () => {
    const productProvider = mount(
      ProductProviderContainer({ props: { product: productData } })
    )
    const injectedProductComponent = productProvider.findComponent({
      name: 'InjectedWithProduct'
    })
    expect(injectedProductComponent.vm.product.value.handle).toEqual(
      productData.handle
    )
  })

  it('it calls setProduct with a product object', () => {
    const productProvider = mount(ProductProviderContainer())
    const injectedProductComponent = productProvider.findComponent({
      name: 'InjectedWithProduct'
    })
    jest.spyOn(injectedProductComponent.vm, 'setProduct')
    injectedProductComponent.vm.setProduct({ product: productData })
    expect(injectedProductComponent.vm.setProduct).toHaveBeenCalledTimes(1)
    expect(injectedProductComponent.vm.product.value.handle).toEqual(
      productData.handle
    )
  })

  it('it calls setProduct with a handle', async () => {
    sdk.mockImplementation(() => ({
      data: { product: () => Promise.resolve(productData) }
    }))
    const productProvider = mount(ProductProviderContainer())
    const injectedProductComponent = productProvider.findComponent({
      name: 'InjectedWithProduct'
    })
    jest.spyOn(injectedProductComponent.vm, 'setProduct')
    await injectedProductComponent.vm.setProduct({ handle: productData.handle })
    expect(injectedProductComponent.vm.setProduct).toHaveBeenCalledTimes(1)
    expect(injectedProductComponent.vm.product.value.handle).toEqual(
      productData.handle
    )
  })

  it('it calls setSelectedVariant with options array', async () => {
    const productProvider = mount(
      ProductProviderContainer({ props: { product: productData } })
    )
    const injectedProductComponent = productProvider.findComponent({
      name: 'InjectedWithProduct'
    })
    jest.spyOn(injectedProductComponent.vm, 'setSelectedVariant')
    await injectedProductComponent.vm.setSelectedVariant({
      options: productData.variants[0].selectedOptions
    })
    expect(
      injectedProductComponent.vm.setSelectedVariant
    ).toHaveBeenCalledTimes(1)
    expect(injectedProductComponent.vm.product.value.handle).toEqual(
      productData.handle
    )
  })
})
